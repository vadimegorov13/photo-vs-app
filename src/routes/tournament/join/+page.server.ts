import { serializeNonPOJOs } from "$lib/helpers/helpers";
import {
  createUserTournament,
  updateTournamentRegisteredUsers,
  updateUserTournaments,
} from "$lib/helpers/tournamentHelpers";
import { validateTournamentEntry } from "$lib/validation/validateTournamentEntry";
import { joinSchema } from "$lib/validation/zodValidation";
import { error, redirect, type Actions } from "@sveltejs/kit";

type Join = {
  joinCode: string;
};

export const actions: Actions = {
  join: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as Join;
    const userId = locals.pb.authStore.model?.id;

    try {
      joinSchema.parse(data);

      if (!userId) {
        throw error(404, "no userId");
      }

      const tournament = await locals.pb
        .collection("tournament")
        .getFirstListItem(`joinCode="${data.joinCode}"`);
      validateTournamentEntry(serializeNonPOJOs(tournament));

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
