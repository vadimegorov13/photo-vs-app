import { serializeNonPOJOs } from "$lib/helpers/helpers";
import { registerUserForTournament } from "$lib/helpers/tournamentHelpers";
import type { Tournament } from "$lib/types";
import { validateTournamentEntry } from "$lib/validation/validateTournamentEntry";
import { joinSchema } from "$lib/validation/zodValidation";
import { error, redirect, type Actions } from "@sveltejs/kit";

type Join = {
  joinCode: string;
};

export const actions: Actions = {
  join: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as Join;
    const user = locals.user;

    try {
      if (!user) throw error(401, "Unauthorized");

      joinSchema.parse(data);

      const tournament = await locals.pb
        .collection("tournament")
        .getFirstListItem(`joinCode="${data.joinCode}"`, { expand: "settings, state" });

      validateTournamentEntry(serializeNonPOJOs(tournament) as Tournament, user);

      await registerUserForTournament(locals.pb, user, tournament.id, tournament.registeredUsers);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { joinCode } = data;

      if (err?.status === 400) {
        const errors = { joinCode: ["Something went wrong"] };

        return {
          data: { joinCode },
          errors,
        };
      }

      if (err?.status === 404) {
        const errors = { joinCode: ["Tournament doesn't exist"] };

        return {
          data: { joinCode },
          errors,
        };
      }

      if (err?.status === 409) {
        const errors = { joinCode: [err.body.message] };

        return {
          data: { joinCode },
          errors,
        };
      }

      const { fieldErrors: errors } = err.flatten();

      return {
        data: { joinCode },
        errors,
      };
    }

    throw redirect(303, `/tournament/list`);
  },
};
