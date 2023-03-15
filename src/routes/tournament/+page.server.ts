import { redirect, type ServerLoad } from "@sveltejs/kit";
import type { Actions } from "./$types";

type TournamentCreate = {
  title: string;
  description: string;
  maxPlayers: string;
  maxSubmissions: string;
};

export const load: ServerLoad = async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(307, "/login");
  }
  return {};
};

export const actions: Actions = {
  create: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as TournamentCreate;
    const maxPlayers = parseInt(data?.maxPlayers, 10);
    const maxSubmissions = parseInt(data?.maxSubmissions, 10);

    let tournamentId = "";

    try {
      const userId: string | undefined = locals.pb.authStore.model?.id;

      if (!userId){
        throw new Error('no userId')
    }

      const tournament = {
        title: data.title,
        description: data.description,
        maxPlayers,
        maxSubmissions,
        organizer: userId,
        status: "pending",
        joinCode: `${Math.floor(100000 + Math.random() * 900000)}`,
        registeredUsers: [userId],
      };

      const result = await locals.pb.collection("tournament").create(tournament);
      tournamentId = result.id;

      if (userId) {
        const user = await locals.pb.collection("users").getOne(userId);

        await locals.pb
          .collection("users")
          .update(userId, { tournaments: [...user.tournaments, tournamentId] });
      }


      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      return {
        err,
      };
    }

    throw redirect(303, `/tournament/submission/${tournamentId}`);
  },
};
