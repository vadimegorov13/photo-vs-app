import { changeUsernameSchema } from "$lib/validation";
import { error } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  updateProfile: async ({ locals, request }) => {
    const data = await request.formData();

    const usernameData = data.get("username") as string;
    const userAvatar = data.get("avatar") as File;
    if (userAvatar.size === 0) {
      data.delete("avatar");
    }

    try {
      if (!locals.user) throw error(401, "Unauthorized");

      changeUsernameSchema.parse(Object.fromEntries(data));

      const { username, avatar } = await locals.pb.collection("users").update(locals.user.id, data);

      locals.user.username = username;
      locals.user.avatar = avatar;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response?.code === 400) {
        let errors = {};

        if (err.response.data.username) {
          errors = { ...errors, username: ["Username is already in use"] };
        }

        return {
          data: { username: usernameData },
          errors,
        };
      }

      const { fieldErrors: errors } = err.flatten();

      return {
        data: { username: usernameData },
        errors,
      };
    }

    return {
      success: true,
    };
  },
};
