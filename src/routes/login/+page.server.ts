import { redirect, type ServerLoad } from "@sveltejs/kit";
import type { Actions } from "./$types";

type LoginUser = {
  email: string;
  password: string;
};

export const load: ServerLoad = (async ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    throw redirect(307, '/');
  }
  return {};
});

export const actions: Actions = {
  login: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as LoginUser;

    try {
      await locals.pb
        .collection("users")
        .authWithPassword(data.email, data.password);
    } catch (err) {
      return {
        error: true,
        message: err,
      };
    }

    throw redirect(303, "/");
  },
};
