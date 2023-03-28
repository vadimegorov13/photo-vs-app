import { redirectTo, registerSchema } from "$lib/validation";
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

      if (err?.response?.code === 400) {
        let errors = {};

        if (err.response.data.email) {
          errors = { ...errors, email: ["Email is already in use"] };
        }

        if (err.response.data.username) {
          errors = { ...errors, username: ["Username is already in use"] };
        }
        return {
          data: { username, email },
          errors,
        };
      }

      const { fieldErrors: errors } = err.flatten();

      return {
        data: { username, email },
        errors,
      };
    }

    redirectTo(url);
  },
};
