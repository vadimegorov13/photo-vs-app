import { serializeNonPOJOs } from "$lib/helpers/helpers";
import { error, redirect, type Actions, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(307, "/login");
  }

  try {
    const userId = locals.pb.authStore.model?.id;

    if (!userId) {
      throw error(404, "no userId");
    }

    const user = await locals.pb.collection("users").getFirstListItem(`id="${userId}"`, {
      expand:
        "tournaments, tournaments.tournament, tournaments.tournament.registeredUsers, tournaments.tournament.host, tournaments.submissions",
    });
    const tournaments = serializeNonPOJOs(user.expand.tournaments);

    // console.log(tournaments[0].expand.tournament.title)

    return { tournaments };
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
};
