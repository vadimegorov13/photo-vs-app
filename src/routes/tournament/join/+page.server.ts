import { registerUserForTournament, serializeNonPOJOs } from "$lib/helpers";
import type { Tournament } from "$lib/types";
import { handleError } from "$lib/validation";
import { validateTournamentEntry } from "$lib/validation/validateTournamentEntry";
import { joinSchema } from "$lib/validation/zodValidation";
import { error, redirect, type Actions } from "@sveltejs/kit";

type Join = {
  joinCode: string;
};

export const actions: Actions = {
  default: async ({ locals, request }) => {
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

      return {
        data: { joinCode },
        errors: handleError(err, "joinCode"),
      };
    }

    throw redirect(303, `/tournament/list`);
  },
};
