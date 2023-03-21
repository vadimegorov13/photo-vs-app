import { serializeNonPOJOs } from "$lib/helpers/helpers";
import {
  createUserTournament,
  updateTournamentRegisteredUsers,
  updateUserTournaments,
} from "$lib/helpers/tournamentHelpers";
import { validateTournamentEntry } from "$lib/validation/validateTournamentEntry";
import { error, redirect, type Actions, type ServerLoad } from "@sveltejs/kit";

type Join = {
  id: string;
};

export const load: ServerLoad = async ({ locals, params }) => {
  if (!params.id) {
    throw error(404, "Not Found");
  }

  try {
    const tournament = await locals.pb.collection("tournament").getOne(params.id, {
      expand: "registeredUsers, rounds, submissions, round.matches",
    });
    return {
      tournament: serializeNonPOJOs(tournament),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err?.response?.code === 400) {
      const error = { code: 400, message: "Tournament doesn't exist" };

      return {
        error,
      };
    }
  }
};

export const actions: Actions = {
  join: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as Join;
    const userId = locals.pb.authStore.model?.id;

    try {
      if (!userId) {
        throw error(404, "no userId");
      }

      const tournament = await locals.pb.collection("tournament").getOne(data.id);
      validateTournamentEntry(serializeNonPOJOs(tournament));

      const userTournament = await createUserTournament(locals.pb, userId, tournament.id);

      await updateTournamentRegisteredUsers(
        locals.pb,
        tournament.id,
        tournament.registeredUsers,
        userTournament.id
      );

      const user = await locals.pb.collection("users").getOne(userId);
      await updateUserTournaments(locals.pb, userId, user.tournaments, userTournament.id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return {
        error: serializeNonPOJOs(err),
      };
    }

    throw redirect(303, "/tournament/list");
  },
};
