import { resetPasswordSchema } from "$lib/validation/zodValidation";
import type { Actions } from "@sveltejs/kit";

type ResetPassword = {
  email: string;
};

export const actions: Actions = {
  resetPassword: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData()) as ResetPassword;

    try {
      resetPasswordSchema.parse(data);
      await locals.pb.collection("users").requestPasswordReset(data.email);

      return {
        success: true,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { email } = data;

      if (err?.response?.code) {
        let errors = {};

        if (err.response.data.email) {
          errors = { ...errors, email: ["Error processing password reset"] };
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
  },
};
