import { serializeNonPOJOs, validateTournamnet } from "$lib/helpers";
import { joinSchema } from "$lib/validation/zodValidation";
import { redirect, type Actions, type ServerLoad } from "@sveltejs/kit";

type Join = {
  joinCode: string;
};



export const load: ServerLoad = async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(307, "/login");
  }

  return {};
};

export const actions: Actions = {
  join: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as Join;
    let tournamentId;

    try {
      joinSchema.parse(data);
      const userId = locals.pb.authStore.model?.id;
      const tournament = await locals.pb
        .collection("tournament")
        .getFirstListItem(`joinCode="${data.joinCode}"`);

      validateTournamnet(serializeNonPOJOs(tournament));

      if (userId && tournament) {
        tournamentId = tournament.id;
        const user = await locals.pb.collection("users").getOne(userId);

        await locals.pb
          .collection("tournament")
          .update(tournamentId, { registeredUsers: [...tournament.registeredUsers, userId] });

        await locals.pb
          .collection("users")
          .update(userId, { tournaments: [...user.tournaments, tournamentId] });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { joinCode } = data;

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

    throw redirect(303, `/tournament/submission/${tournamentId}`);
  },
};
