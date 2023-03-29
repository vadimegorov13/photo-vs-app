import { handleError } from "$lib/validation";
import { resetPasswordSchema } from "$lib/validation/zodValidation";
import type { Actions } from "@sveltejs/kit";

type ResetPassword = {
  email: string;
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
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

      return {
        data: { email },
        errors: handleError(err),
      };
    }
  },
};
