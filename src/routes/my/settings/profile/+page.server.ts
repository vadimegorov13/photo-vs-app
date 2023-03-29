import { changeUsernameSchema, handleError } from "$lib/validation";
import { error } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ locals, request }) => {
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

      return {
        success: true,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return {
        data: { username: usernameData },
        errors: handleError(err),
      };
    }
  },
};
