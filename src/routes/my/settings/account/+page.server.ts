import { resetPasswordSchema as changeEmailSchema } from "$lib/validation/zodValidation";
import { error, type Actions } from "@sveltejs/kit";

type ChangeEmail = {
  email: string;
};

export const actions: Actions = {
  updateEmail: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData()) as ChangeEmail;

    try {
      if (!locals.user) throw error(401, "Unauthorized");

      changeEmailSchema.parse(data);

      if (data.email === locals.user.email) {
        return {
          data: { email: locals.user.email },
          errors: { email: ["It's your current email bozo! PICK A NEW ONE!"] },
        };
      }

      await locals.pb.collection("users").requestEmailChange(data.email);

      locals.user.email = data.email;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { email } = data;

      if (err?.response?.code === 400) {
        let errors = {};

        if (err.response.data.newEmail) {
          errors = { email: ["Email is already in use"] };
        }

        return {
          data: { email },
          errors,
        };
      }

      const { fieldErrors: errors } = err.flatten();

      return {
        data: { email },
        errors,
      };
    }

    return {
      success: true,
    };
  },
};
