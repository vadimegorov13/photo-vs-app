import { resetPasswordSchema as changeEmailSchema } from "$lib/validation/zodValidation";

type ChangeEmail = {
  email: string;
};

export const actions = {
  updateEmail: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData()) as ChangeEmail;

    try {
      changeEmailSchema.parse(data);

      if (data.email === locals.user.email) {
        return {
          data: { email: locals.user.email },
          errors: { email: ["It's you current email bozo! PICK A NEW ONE!"] },
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
