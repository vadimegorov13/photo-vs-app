import { registerUserForTournament, serializeNonPOJOs } from "$lib/helpers";
import type { Tournament, UserTournament } from "$lib/types";
import { handleError, submissionSchema, validateTournamentEntry } from "$lib/validation";
import { error, redirect, type Actions, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals, params }) => {
  try {
    if (!params.id) {
      throw error(404, "Not Found");
    }

    const id = params.id;
    const userId = locals.user?.id;
    const tournament = await locals.pb.collection("tournament").getOne(id, {
      expand:
        "registeredUsers, registeredUsers.user, state, settings, host, registeredUsers.submissions",
    });

    return {
      tournament: serializeNonPOJOs(tournament),
      tournamentId: id,
      userId,
      serverUrl: "http://127.0.0.1:8090"
    };
  } catch (err) {
    console.log(err)
    return {
      errors: ["Something went wrong"],
    };
  }
};

export const actions: Actions = {
  delete: async ({ locals, request }) => {
    const data = await request.formData();
    const id = data.get("id") as string;

    try {
      await locals.pb.collection("tournament").delete(id);
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

    throw redirect(303, `/tournament/list`);
  },
  leave: async ({ locals, request }) => {
    const data = await request.formData();
    const id = data.get("id") as string;
    const tournamentId = data.get("tournamentId") as string;

    try {
      await locals.pb.collection("userTournament").delete(id);
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
  start: async ({ locals, request }) => {
    const data = await request.formData();
    const tournamentId = data.get("tournamentId") as string;
    const userTournamentId = data.get("userTournamentId") as string;
    const userId = locals.user?.id;

    try {
      await locals.pb.collection("userTournament").update(userTournamentId, { ready: true });

      const tournament: Tournament = await locals.pb
        .collection("tournament")
        .getOne(tournamentId, { expand: "registeredUsers, settings, state" });

      if (tournament.host !== userId) {
        throw error(401, "Unauthorized");
      }

      const allReady = tournament.expand.registeredUsers.every((userTournament: UserTournament) => {
        return userTournament.ready === true;
      });

      if (!allReady) {
        throw error(400, "Not all users are ready");
      }

      await locals.pb
        .collection("tournamentState")
        .update(tournament.expand.state.id, { tournamentState: "IN_PROGRESS" });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return {
        success: false,
        errors: handleError(err, "start"),
      };
    }

    throw redirect(303, `/tournament/${tournamentId}`);
  },
  ready: async ({ locals, request }) => {
    const data = await request.formData();
    const userTournamentId = data.get("userTournamentId") as string;

    try {
      await locals.pb.collection("userTournament").update(userTournamentId, { ready: true });

      return {
        success: true,
      };
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
  },
  unready: async ({ locals, request }) => {
    const data = await request.formData();
    const userTournamentId = data.get("userTournamentId") as string;

    try {
      await locals.pb.collection("userTournament").update(userTournamentId, { ready: false });

      return {
        success: true,
      };
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
  },
  join: async ({ locals, request }) => {
    const data = await request.formData();
    const user = locals.user;
    const id = data.get("id") as string;

    try {
      if (!user) throw error(401, "Unauthorized");

      const tournament = await locals.pb
        .collection("tournament")
        .getFirstListItem(`id="${id}"`, { expand: "settings, state" });

      validateTournamentEntry(serializeNonPOJOs(tournament) as Tournament, user);

      await registerUserForTournament(locals.pb, user, tournament.id, tournament.registeredUsers);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return {
        error: handleError(err, "join"),
      };
    }
    throw redirect(303, `/tournament/${id}`);
  },
  deleteSubmission: async ({ locals, request }) => {
    const data = await request.formData();
    const id = data.get("id") as string;
    const tournamentId = data.get("tournamentId") as string;

    try {
      await locals.pb.collection("submission").delete(id);
      return {
        type: "submission",
        success: true,
        message: "Submission deleted",
      };

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
  editSubmission: async ({ locals, request }) => {
    const data = await request.formData();

    const id = data.get("id") as string;
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const image = data.get("image") as File;

    try {
      const submissionData = new FormData();
      submissionData.append("title", title);
      submissionData.append("description", description);

      if (image.size !== 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        submissionData.append("image", data.get("image") as any);
      }

      submissionSchema.parse(Object.fromEntries(data));

      await locals.pb.collection("submission").update(id, submissionData);

      return {
        type: "submission",
        success: true,
        message: "Submission updated successfully",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return {
        data: { title, description },
        errors: handleError(err, "edit"),
      };
    }
  },
};
