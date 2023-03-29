import { handleError, redirectTo, registerSchema } from "$lib/validation";
import type { Actions } from "./$types";

type RegisterUser = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const actions: Actions = {
  default: async ({ locals, request, url }) => {
    const data = Object.fromEntries(await request.formData()) as RegisterUser;

    try {
      registerSchema.parse(data);

      await locals.pb.collection("users").create(data);
      await locals.pb.collection("users").authWithPassword(data.email, data.password);

      locals.pb.authStore.clear();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { username, email } = data;

      return {
        data: { username, email },
        errors: handleError(err),
      };
    }

    redirectTo(url);
  },
};
