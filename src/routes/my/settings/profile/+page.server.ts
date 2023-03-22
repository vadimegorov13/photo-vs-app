import type { Actions } from "./$types";
import { serializeNonPOJOs } from "$lib/helpers/helpers";

export const actions: Actions = {
  updateProfile: async ({ locals, request }) => {
    const data = await request.formData();
    const userAvatar = data.get("avatar") as File;
    if (userAvatar.size === 0) {
      data.delete("avatar");
    }

    try {
      const { username, avatar } = await locals.pb
        .collection("users")
        .update(locals?.user?.id, data);

      locals.user.username = username;
      locals.user.avatar = avatar;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(serializeNonPOJOs(err));
    }

    return {
      success: true,
    };
  },
};
