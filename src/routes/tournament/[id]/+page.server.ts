import {
  generateBracket,
  getNextNotStartedMatch,
  registerUserForTournament,
  serializeNonPOJOs,
} from "$lib/helpers";
import type { Match, Round, Tournament, UserTournament, UserVote } from "$lib/types";
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
        "registeredUsers, registeredUsers.user, \
        state, settings, host, registeredUsers.submissions, \
        state.rounds, state.rounds.matches, state.rounds.matches, \
        state.rounds.matches.submission1, state.rounds.matches.submission2, \
        state.rounds.matches.userVotes1, state.rounds.matches.userVotes2",
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

      const tournament: Tournament = await locals.pb.collection("tournament").getOne(tournamentId, {
        expand: "registeredUsers, settings, state, registeredUsers.submissions, ",
      });

      if (tournament.host !== userId) {
        throw error(401, "Unauthorized");
      }

      const allReady = tournament.expand.registeredUsers.every((userTournament: UserTournament) => {
        return userTournament.ready === true;
      });

      if (!allReady) {
        throw error(400, "Not all users are ready");
      }

      const [bracket, rounds] = await generateBracket(locals.pb, tournament);

      await locals.pb.collection("tournamentState").update(tournament.expand.state.id, {
        state: "IN_PROGRESS",
        rounds: rounds.map((r) => r.id),
        currentRound: rounds[0].id,
        bracket,
      });

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
    const userTournamentId = data.get("userTournamentId") as string;
    const numberOfSubmissions = parseInt(data.get("numberOfSubmissions") as string);

    try {
      if (numberOfSubmissions === 1) {
        await locals.pb.collection("userTournament").update(userTournamentId, { ready: false });
      }

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
  vote: async ({ locals, request }) => {
    const data = await request.formData();
    const submissionId = data.get("submissionId") as string;
    const matchId = data.get("matchId") as string;
    const user = locals.user;

    try {
      if (!user) throw error(401, "Unauthorized");
      if (!submissionId) throw error(400, "No submission id");

      const match: Match = await locals.pb
        .collection("match")
        .getOne(matchId, { expand: "userVotes1,userVotes2" });
        
      const voted =
        (match?.expand.userVotes1?.some((vote: UserVote) => vote.user === user.id) ?? false) ||
        (match?.expand.userVotes2?.some((vote: UserVote) => vote.user === user.id) ?? false);

      if (voted) throw error(400, "Already voted");

      const userVote = await locals.pb
        .collection("userVote")
        .create({ user: user.id, match: matchId });

      await locals.pb.collection("match").update(
        matchId,
        match.submission1 === submissionId
          ? {
              userVotes1: [...match.userVotes1, userVote.id],
            }
          : {
              userVotes2: [...match.userVotes2, userVote.id],
            }
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      return {
        action: "vote",
        data: {},
        errors: handleError(err, "vote"),
      };
    }
  },
  finilizeMatch: async ({ locals, request }) => {
    const data = await request.formData();
    const tournamentId = data.get("tournamentId") as string;
    const user = locals.user;

    const expand =
      "state, state.rounds, state.rounds.matches, state.rounds.matches, \
        state.rounds.matches.submission1, state.rounds.matches.submission2, \
        state.rounds.matches.userVotes1, state.rounds.matches.userVotes2";

    try {
      // get tournament data
      const tournament: Tournament = serializeNonPOJOs(
        await locals.pb.collection("tournament").getOne(tournamentId, { expand })
      );
      if (!user || user.id !== tournament.host) throw error(401, "Unauthorized");

      const currentRound = tournament.expand.state.expand.rounds.find(
        (round: Round) => round.id === tournament.expand.state.currentRound
      );
      if (!currentRound) throw error(400, "Round not found");

      const currentMatch = currentRound.expand.matches.find(
        (match: Match) => match.id === currentRound.currentMatch
      );
      if (!currentMatch) throw error(400, "Match not found");

      // pick a winner
      let winner = null;
      if (currentMatch.userVotes1.length === currentMatch.userVotes2.length) {
        const randomWinner = Math.floor(Math.random() * 2) + 1;
        winner = randomWinner === 1 ? currentMatch.submission1 : currentMatch.submission2;
      } else {
        winner =
          currentMatch.userVotes1.length > currentMatch.userVotes2.length
            ? currentMatch.submission1
            : currentMatch.submission2;
      }

      const nextRound = tournament.expand.state.expand.rounds.find(
        (round: Round) => round.id === currentRound.nextRound
      );

      // check if next round exists
      if (nextRound) {
        const nextSubmissionMatch = nextRound.expand.matches.find(
          (match: Match) => match.id === currentMatch.nextMatch
        );

        // save winner to its next match
        if (nextSubmissionMatch) {
          await locals.pb
            .collection("match")
            .update(
              currentMatch.nextMatch,
              !nextSubmissionMatch.submission1 ? { submission1: winner } : { submission2: winner }
            );
        }
      }

      // update state of the current match
      await locals.pb.collection("match").update(currentMatch.id, { winner, state: "FINISHED" });

      // get next match
      const nextMatch = getNextNotStartedMatch(currentMatch, currentRound.expand.matches);

      // change currentMatch in round, or change currentRound in tournamentState
      if (nextMatch) {
        await locals.pb.collection("match").update(nextMatch, { state: "IN_PROGRESS" });
        await locals.pb.collection("round").update(currentMatch.round, {
          currentMatch: nextMatch,
        });
      } else {
        // update state of the current round
        await locals.pb.collection("round").update(currentMatch.round, {
          state: "FINISHED",
        });

        // check if there is a next round
        if (currentRound.nextRound) {
          // update state of the next round
          await locals.pb.collection("round").update(currentRound.nextRound, {
            state: "IN_PROGRESS",
          });

          // update currentRound in tournamentState
          await locals.pb.collection("tournamentState").update(tournament.state, {
            currentRound: currentRound.nextRound,
          });
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(serializeNonPOJOs(err));
    }
  },
};
