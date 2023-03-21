import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "../$types";
import {
  createUserTournament,
  updateTournamentRegisteredUsers,
  updateUserTournaments,
} from "$lib/helpers/tournamentHelpers";

type TournamentCreate = {
  title: string;
  description: string;
  maxPlayers: string;
  maxSubmissions: string;
};

export const actions: Actions = {
  create: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as TournamentCreate;
    const maxPlayers = parseInt(data?.maxPlayers, 10);
    const maxSubmissions = parseInt(data?.maxSubmissions, 10);
    const userId: string | undefined = locals.pb.authStore.model?.id;

    try {
      if (!userId) {
        throw error(404, "no userId");
      }

      const tournamentData = {
        title: data.title,
        description: data.description,
        maxPlayers,
        maxSubmissions,
        host: userId,
        status: "pending",
        joinCode: `${Math.floor(100000 + Math.random() * 900000)}`,
        registeredUsers: [],
      };
      const tournament = await locals.pb.collection("tournament").create(tournamentData);

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
      console.log(err);
      return {
        err,
      };
    }

    throw redirect(303, `/tournament/list`);
  },
};
