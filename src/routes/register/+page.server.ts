import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

type RegisterUser = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const actions: Actions = {
  register: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as RegisterUser;

    if (data.password !== data.passwordConfirm) {
      return {
        error: true,
        msg: "Passwords do not match",
      };
    }

    try {
      await locals.pb.collection("users").create(data);
      await locals.pb.collection("users").authWithPassword(data.email, data.password);

      locals.pb.authStore.clear();
    } catch (err) {
      return {
        error: true,
        message: err,
      };
    }

    throw redirect(303, "/login");
  },
};
