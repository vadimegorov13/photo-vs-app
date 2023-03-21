import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { loginSchema } from "$lib/validation/zodValidation";

type LoginUser = {
  email: string;
  password: string;
};

export const actions: Actions = {
  login: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as LoginUser;

    try {
      loginSchema.parse(data);
      await locals.pb.collection("users").authWithPassword(data.email, data.password);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { email } = data;

      if (err?.response?.code === 400) {
        const errors = { password: ["Wrong email or password"] };

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

    throw redirect(303, "/");
  },
};
