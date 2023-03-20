import { serializeNonPOJOs } from "$lib/helpers";
import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(307, "/login");
  }

  try {
    const userId = locals.pb.authStore.model?.id;

    if (!userId) {
      throw new Error("no userId");
    }

    const user = await locals.pb.collection("users").getFirstListItem(`id="${userId}"`, {
      expand: "tournaments, tournaments.registeredUsers, tournaments.submissions",
    });

    const tournaments = serializeNonPOJOs(user.expand.tournaments);

    return {
      tournaments,
    };
  } catch (err) {
    return { err };
  }
};
