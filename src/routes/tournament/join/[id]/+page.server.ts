import { registerUserForTournament, serializeNonPOJOs } from "$lib/helpers";
import type { Tournament } from "$lib/types";
import { handleError, validateTournamentEntry } from "$lib/validation";
import { error, redirect, type Actions, type ServerLoad } from "@sveltejs/kit";

type Join = {
  id: string;
};

export const load: ServerLoad = async ({ locals, params }) => {
  if (!params.id) {
    throw error(404, "Tournament doesn't exist");
  }

  try {
    const tournament = await locals.pb.collection("tournament").getOne(params.id, {
      expand: "registeredUsers, settings, state",
    });
    return {
      tournament: serializeNonPOJOs(tournament) as Tournament,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err?.response?.code === 400) {
      const error = { code: 400, message: "Something went wrong" };

      return {
        error,
      };
    }
  }
};

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as Join;
    const user = locals.user;

    try {
      if (!user) throw error(401, "Unauthorized");

      const tournament = await locals.pb
        .collection("tournament")
        .getFirstListItem(`id="${data.id}"`, { expand: "settings, state" });

      validateTournamentEntry(serializeNonPOJOs(tournament) as Tournament, user);

      await registerUserForTournament(locals.pb, user, tournament.id, tournament.registeredUsers);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return {
        error: handleError(err, "join"),
      };
    }

    throw redirect(303, "/tournament/list");
  },
};
