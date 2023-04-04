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

    const userTournament: UserTournament | undefined = serializeNonPOJOs(
      tournament
    ).expand.registeredUsers.find(
      (userTournament: UserTournament) => userTournament.expand.user.id === userId
    );

    return {
      success: true,
      props: {
        tournament: serializeNonPOJOs(tournament) as Tournament,
        userTournament,
      },
    };
  } catch (err) {
    return {
      success: false,
      errors: handleError(err, "load"),
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
          action: "tournament",
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

    try {
      await locals.pb.collection("userTournament").delete(id);

      return {
        action: "tournament",
        success: true,
        message: "Left tournament",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response?.code) {
        const errors = { message: ["Something went wrong"] };

        return {
          action: "tournament",
          success: false,
          errors,
        };
      }
    }
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

      return {
        action: "tournament",
        success: true,
        message: "Started tournament",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return {
        action: "tournament",
        success: false,
        errors: handleError(err, "start"),
      };
    }
  },
  ready: async ({ locals, request }) => {
    const data = await request.formData();
    const userTournamentId = data.get("userTournamentId") as string;

    try {
      const userTournament = await locals.pb.collection("userTournament").getOne(userTournamentId);

      if (userTournament.submissions.length === 0) {
        throw error(400, "No submissions");
      }
      await locals.pb.collection("userTournament").update(userTournamentId, { ready: true });

      return {
        action: "tournament",
        success: true,
        message: "Ready",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      let errors = { message: "" };

      if (err?.status === 400) {
        errors = { message: "Please make at least one submission" };
      }

      return {
        action: "tournament",
        success: false,
        errors,
      };
    }
  },
  unready: async ({ locals, request }) => {
    const data = await request.formData();
    const userTournamentId = data.get("userTournamentId") as string;

    try {
      await locals.pb.collection("userTournament").update(userTournamentId, { ready: false });

      return {
        action: "tournament",
        success: true,
        message: "Not ready",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response?.code) {
        const errors = { message: ["Something went wrong"] };

        return {
          action: "tournament",
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

      return {
        action: "tournament",
        success: true,
        message: "Joined tournament",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return {
        action: "tournament",
        success: false,
        error: handleError(err, "join"),
      };
    }
  },
  deleteSubmission: async ({ locals, request }) => {
    const data = await request.formData();
    const id = data.get("id") as string;

    try {
      await locals.pb.collection("submission").delete(id);
      return {
        action: "submission",
        success: true,
        message: "Submission deleted",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response?.code) {
        const errors = { message: ["Something went wrong"] };

        return {
          action: "submission",
          success: false,
          errors,
        };
      }
    }
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
        action: "submission",
        success: true,
        message: "Submission updated successfully",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return {
        action: "submission",
        data: { title, description },
        errors: handleError(err, "edit"),
      };
    }
  },
};
