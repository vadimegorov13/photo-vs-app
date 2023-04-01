import { serializeNonPOJOs } from "$lib/helpers";
import type { UserTournament } from "$lib/types";
import { error, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals }) => {
  const userId = locals.user?.id;

  try {
    if (!userId) throw error(401, "Unauthorized");

    const user = await locals.pb.collection("users").getFirstListItem(`id="${userId}"`, {
      expand:
        "tournaments, tournaments.tournament, tournaments.tournament.registeredUsers, tournaments.tournament.settings, tournaments.tournament.state",
    });

    const userTournaments: UserTournament[] = serializeNonPOJOs(user.expand.tournaments);

    return { props: { userTournaments } };
  } catch (err) {
    return serializeNonPOJOs(err);
  }
};
