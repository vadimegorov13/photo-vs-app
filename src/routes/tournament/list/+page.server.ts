import { serializeNonPOJOs } from "$lib/helpers/helpers";
import { error, redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(307, "/login");
  }

  try {
    const userId = locals.pb.authStore.model?.id;

    if (!userId) {
      throw error(404, "no userId");
    }

    const user = await locals.pb.collection("users").getFirstListItem(`id="${userId}"`, {
      expand:
        "tournaments, tournaments.tournament, tournaments.tournament.registeredUsers, tournaments.tournament.host, tournaments.submissions",
    });
    const tournaments = serializeNonPOJOs(user.expand.tournaments);

    // console.log(tournaments[0].expand.tournament.title)

    return { tournaments };
  } catch (err) {
    return serializeNonPOJOs(err);
  }
};
