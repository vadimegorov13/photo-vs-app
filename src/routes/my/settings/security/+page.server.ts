import { changePasswordSchema } from "$lib/validation/zodValidation";
import { redirect } from "@sveltejs/kit";

type PasswordChange = {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
};

export const actions = {
  updatePassword: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData()) as PasswordChange;

    try {
      changePasswordSchema.parse(data);

      await locals.pb.collection("users").update(locals.user.id, data);
      locals.pb.authStore.clear();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response?.code === 400) {
        let errors = {};

        if (err.response.data.oldPassword) {
          errors = { ...errors, oldPassword: ["Password did not match"] };
        }

        return {
          errors,
        };
      }

      const { fieldErrors: errors } = err.flatten();

      return {
        errors,
      };
    }

    throw redirect(303, "/login");
  },
};
