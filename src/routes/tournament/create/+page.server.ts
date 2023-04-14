import { registerUserForTournament } from "$lib/helpers";
import { createTournamentSchema, handleError } from "$lib/validation";
import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "../$types";

type TournamentCreate = {
  title: string;
  description: string;
  maxPlayers: string;
  maxSubmissions: string;
};

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as TournamentCreate;
    const user = locals.user;
    const maxPlayers = parseInt(data?.maxPlayers, 10);
    const maxSubmissions = parseInt(data?.maxSubmissions, 10);

    try {
      if (!user) throw error(401, "Unauthorized");

      createTournamentSchema.parse({
        title: data.title,
        description: data.description,
        maxPlayers,
        maxSubmissions,
      });

      const tournamentSettings = await locals.pb.collection("tournamentSettings").create({
        maxPlayers,
        maxSubmissions,
        voteTime: 60,
        type: "single",
      });

      const tournamentState = await locals.pb.collection("tournamentState").create({
        state: "NOT_STARTED",
        round: 0,
        match: 0,
        votes: 0,
        usersReady: 1,
      });

      const tournamentData = {
        title: data.title,
        description: data.description,
        joinCode: `${Math.floor(100000 + Math.random() * 900000)}`,
        host: user.id,
        registeredUsers: [],
        settings: tournamentSettings.id,
        state: tournamentState.id,
      };

      const tournament = await locals.pb.collection("tournament").create(tournamentData);
      await locals.pb
        .collection("tournamentSettings")
        .update(tournamentSettings.id, { tournament: tournament.id });
      await locals.pb
        .collection("tournamentState")
        .update(tournamentState.id, { tournament: tournament.id });

      await registerUserForTournament(
        locals.pb,
        user,
        tournament.id,
        tournament.registeredUsers,
        true
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { title, description } = data;

      return {
        data: { title, description, maxPlayers, maxSubmissions },
        errors: handleError(err, "create"),
      };
    }

    throw redirect(303, `/tournament/list`);
  },
};
