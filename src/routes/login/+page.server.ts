import { loginSchema, redirectTo } from "$lib/validation";
import type { Actions } from "./$types";

type LoginUser = {
  email: string;
  password: string;
};

export const actions: Actions = {
  default: async ({ locals, request, url }) => {
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

    redirectTo(url);
  },
};
