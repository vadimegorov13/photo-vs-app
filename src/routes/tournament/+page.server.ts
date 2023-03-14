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

    let id = ''

    try {
      const organizerId: string | undefined = locals.pb.authStore.model?.id;

      const tournament = {
        title: data.title,
        description: data.description,
        maxPlayers,
        maxSubmissions,
        organizerId,
        status: "pending",
        joinCode: "123451",
        registeredUsers: [organizerId]
      };

      console.log(tournament)

      const result = await locals.pb.collection("tournament").create(tournament);
      id = result.id
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      return {
        err,
      };
    }

    throw redirect(303, `/tournament/submission?id=${id}`);
  },
};
