import { serializeNonPOJOs, validateTournamnet } from "$lib/helpers";
import { error, redirect, type Actions, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals, params }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(307, "/login");
  }

  if (!params.id) {
    throw error(404, "Not Found");
  }

  try {
    const tournament = await locals.pb.collection("tournament").getOne(params.id, {
      expand: "registeredUsers, rounds, submissions, round.matches",
    });
    if (tournament) {
      return {
        tournament: serializeNonPOJOs(tournament),
      };
    }

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

type Join = {
  id: string;
};

export const actions: Actions = {
  join: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as Join;

    try {
      const userId = locals.pb.authStore.model?.id;
      const tournament = await locals.pb.collection("tournament").getOne(data.id);
      validateTournamnet(serializeNonPOJOs(tournament));

      if (userId && tournament) {
        const user = await locals.pb.collection("users").getOne(userId);

        await locals.pb
          .collection("tournament")
          .update(tournament.id, { registeredUsers: [...tournament.registeredUsers, userId] });

        await locals.pb
          .collection("users")
          .update(userId, { tournaments: [...user.tournaments, tournament.id] });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return {
        error: serializeNonPOJOs(err),
      };
    }

    throw redirect(303, "/tournament/list");
  },
};
