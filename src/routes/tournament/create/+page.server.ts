import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "../$types";
import { registerUserForTournament } from "$lib/helpers/tournamentHelpers";
import { createTournamentSchema } from "$lib/validation/zodValidation";

type TournamentCreate = {
  title: string;
  description: string;
  maxPlayers: string;
  maxSubmissions: string;
};

export const actions: Actions = {
  create: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as TournamentCreate;
    const userId: string | undefined = locals.pb.authStore.model?.id;
    const maxPlayers = parseInt(data?.maxPlayers, 10);
    const maxSubmissions = parseInt(data?.maxSubmissions, 10);

    try {
      if (!userId) {
        throw error(404, "no userId");
      }

      createTournamentSchema.parse({
        title: data.title,
        description: data.description,
        maxPlayers,
        maxSubmissions,
      });

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

      await registerUserForTournament(locals.pb, userId, tournament.id, tournament.registeredUsers);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { title, description } = data;

      if (err?.response?.code === 400) {
        const errors = { title: ["Something went wrong"] };

        return {
          data: { title, description, maxPlayers, maxSubmissions },
          errors,
        };
      }

      const { fieldErrors: errors } = err.flatten();

      return {
        data: { title, description, maxPlayers, maxSubmissions },
        errors,
      };
    }

    throw redirect(303, `/tournament/list`);
  },
};
