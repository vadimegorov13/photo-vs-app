import { handleError } from "$lib/validation";
import { changePasswordSchema } from "$lib/validation/zodValidation";
import { redirect, type Actions, error } from "@sveltejs/kit";

type PasswordChange = {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData()) as PasswordChange;

    try {
      if (!locals.user) throw error(401, "Unauthorized");

      changePasswordSchema.parse(data);

      await locals.pb.collection("users").update(locals.user.id, data);
      locals.pb.authStore.clear();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return {
        errors: handleError(err),
      };
    }

    throw redirect(303, "/login");
  },
};
