import { serializeNonPOJOs } from "$lib/helpers";
import type { UserTournament } from "$lib/types";
import { error, redirect, type Actions, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals }) => {
  try {
    const userId = locals.user?.id;

    if (!userId) throw error(401, "Unauthorized");

    const user = await locals.pb.collection("users").getFirstListItem(`id="${userId}"`, {
      expand:
        "tournaments, tournaments.tournament, tournaments.tournament.state, tournaments.tournament.settings, tournaments.tournament.registeredUsers, tournaments.tournament.host, tournaments.submissions",
    });
    const tournaments = serializeNonPOJOs(user.expand.tournaments) as UserTournament[];

    return { tournaments: tournaments };
  } catch (err) {
    return serializeNonPOJOs(err);
  }
};

type DeleteTournament = {
  id: string;
};

export const actions: Actions = {
  delete: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as DeleteTournament;

    try {
      await locals.pb.collection("tournament").delete(data.id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response?.code) {
        const errors = { message: ["Something went wrong"] };

        return {
          success: false,
          errors,
        };
      }
    }

    return {
      success: true,
    };
  },
  leave: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as DeleteTournament;

    try {
      await locals.pb.collection("userTournament").delete(data.id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response?.code) {
        const errors = { message: ["Something went wrong"] };

        return {
          success: false,
          errors,
        };
      }
    }

    return {
      success: true,
    };
  },
  start: async ({ locals, request }) => {
    const data = await request.formData();
    const id = data.get("id") as string;
    const userId = locals.pb.authStore.model?.id;

    try {
      const tournament = await locals.pb
        .collection("tournament")
        .getOne(id, { expand: "registeredUsers" });

      if (tournament.host !== userId) {
        throw error(403, "Not authorized");
      }

      const allReady = tournament.expand.registeredUsers.every((userTournament: UserTournament) => {
        return userTournament.ready === true;
      });

      if (!allReady) {
        return {
          success: false,
          errors: { message: ["Not all users are ready"] },
        };
      }

      await locals.pb.collection("tournament").update(id, { status: "ongoing" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response?.code) {
        const errors = { message: ["Something went wrong"] };

        return {
          success: false,
          errors,
        };
      }
    }

    throw redirect(303, `/tournament/${id}`);
  },
  ready: async ({ locals, request }) => {
    const data = await request.formData();
    const userTournamentId = data.get("userTournamentId") as string;
    const tournamentId = data.get("tournamentId") as string;

    try {
      await locals.pb.collection("userTournament").update(userTournamentId, { ready: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response?.code) {
        const errors = { message: ["Something went wrong"] };

        return {
          success: false,
          errors,
        };
      }
    }

    throw redirect(303, `/tournament/${tournamentId}`);
  },
};
