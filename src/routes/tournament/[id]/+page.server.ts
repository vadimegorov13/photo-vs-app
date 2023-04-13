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
        state.rounds.matches.userVotes1, state.rounds.matches.userVotes2, \
        state.currentRound.currentMatch",
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
      console.log(serializeNonPOJOs(err));
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
      console.log(serializeNonPOJOs(err));
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
        round: 1,
        match: 1,
        votes: 0,
      });

      return {
        action: "tournament",
        success: true,
        message: "Started tournament",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(serializeNonPOJOs(err));
    }
  },
  ready: async ({ locals, request }) => {
    const data = await request.formData();
    const userTournamentId = data.get("userTournamentId") as string;

    try {
      const userTournament = await locals.pb.collection("userTournament").getOne(userTournamentId);

      if (userTournament.submissions.length === 0) {
        throw error(400, "Please make at least one submission");
      }
      await locals.pb.collection("userTournament").update(userTournamentId, { ready: true });

      return {
        action: "tournament",
        success: true,
        message: "Ready",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(serializeNonPOJOs(err));
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
      console.log(serializeNonPOJOs(err));
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
      console.log(serializeNonPOJOs(err));
    }
  },
  deleteSubmission: async ({ locals, request }) => {
    const data = await request.formData();
    const id = data.get("id") as string;
    const userTournamentId = data.get("userTournamentId") as string;
    const numberOfSubmissions = parseInt(data.get("numberOfSubmissions") as string);
    const tournamentId = data.get("tournamentId") as string;
    const userId = locals.user?.id;

    try {
      const tournament: Tournament = serializeNonPOJOs(
        await locals.pb.collection("tournament").getOne(tournamentId)
      );

      if (numberOfSubmissions === 1 && tournament.host !== userId) {
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
      console.log(serializeNonPOJOs(err));
    }
  },
  editSubmission: async ({ locals, request }) => {
    const data = await request.formData();
    const id = data.get("id") as string;
    const title = data.get("title") as string;
    const description = data.get("description") as string;

    try {
      const submissionData = new FormData();
      submissionData.append("title", title);
      submissionData.append("description", description);
      submissionSchema.parse(Object.fromEntries(data));

      await locals.pb.collection("submission").update(id, submissionData);

      return {
        action: "submission",
        success: true,
        message: "Submission updated successfully",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(serializeNonPOJOs(err));
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

      const match: Match = await locals.pb.collection("match").getOne(matchId, {
        expand: "userVotes1, userVotes2, round, round.tournament, round.tournament.state",
      });

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

      await locals.pb
        .collection("tournamentState")
        .update(match.expand.round.expand.tournament.state, {
          votes: match.expand.round.expand.tournament.expand.state.votes + 1,
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(serializeNonPOJOs(err));
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

      // MAIN LOGIC OF THE TOURNAMENT

      // update state of the current match
      await locals.pb.collection("match").update(currentMatch.id, { winner, state: "FINISHED" });

      // update match counter in tournamentState
      await locals.pb.collection("tournamentState").update(tournament.state, {
        match: tournament.expand.state.match + 1,
        votes: 0,
      });

      // get next match of the round
      const nextMatch = getNextNotStartedMatch(currentMatch, currentRound.expand.matches);
      if (nextMatch) {
        // update state of the next match and set it as current match of the round
        await locals.pb.collection("match").update(nextMatch, { state: "IN_PROGRESS" });
        await locals.pb.collection("round").update(currentRound.id, {
          currentMatch: nextMatch,
        });
      }

      // get next round of the tournament to set the winner of the current match
      const nextRound = tournament.expand.state.expand.rounds.find(
        (round: Round) => round.id === currentRound.nextRound
      );
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

      // if the round is over and there is a next round
      if (!nextMatch && nextRound) {
        // update state of the current round
        await locals.pb.collection("round").update(currentRound.id, {
          state: "FINISHED",
        });

        // update state of the next round
        await locals.pb.collection("round").update(nextRound.id, {
          state: "IN_PROGRESS",
        });

        // updte state of the next match
        await locals.pb
          .collection("match")
          .update(nextRound.currentMatch, { state: "IN_PROGRESS" });

        // update currentRound in tournamentState
        await locals.pb.collection("tournamentState").update(tournament.state, {
          currentRound: nextRound.id,
          round: tournament.expand.state.round + 1,
          votes: 0,
        });
      }

      if (!nextMatch && !nextRound) {
        await locals.pb.collection("round").update(currentRound.id, {
          state: "FINISHED",
        });
        // update state of the tournament
        await locals.pb.collection("tournamentState").update(tournament.state, {
          state: "FINISHED",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(serializeNonPOJOs(err));
    }
  },
};
