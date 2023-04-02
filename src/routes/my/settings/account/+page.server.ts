import { handleError } from "$lib/validation";
import { resetPasswordSchema as changeEmailSchema } from "$lib/validation/zodValidation";
import { error, type Actions } from "@sveltejs/kit";

type ChangeEmail = {
  email: string;
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData()) as ChangeEmail;

    try {
      if (!locals.user) throw error(401, "Unauthorized");

      changeEmailSchema.parse(data);

      if (data.email === locals.user.email) {
        return {
          data: { email: locals.user.email },
          errors: { email: ["It's your current email bozo!"] },
        };
      }

      await locals.pb.collection("users").requestEmailChange(data.email);

      locals.user.email = data.email;

      return {
        success: true,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { email } = data;

      return {
        data: { email },
        errors: handleError(err, "changeEmail"),
      };
    }
  },
};
