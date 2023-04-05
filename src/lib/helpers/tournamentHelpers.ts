import type { Match, PocketBaseClient, Round, Tournament, User } from "$lib/types";
import { serializeNonPOJOs } from "./helpers";

const createUserTournament = async (pb: PocketBaseClient, userId: string, tournamentId: string) => {
  const userTournamentData = {
    user: userId,
    tournament: tournamentId,
    submissions: [],
    ready: false,
  };
  return pb.collection("userTournament").create(userTournamentData);
};

const updateTournamentRegisteredUsers = async (
  pb: PocketBaseClient,
  tournamentId: string,
  registeredUsers: string[],
  userTournamentId: string
) => {
  return pb.collection("tournament").update(tournamentId, {
    registeredUsers: [...registeredUsers, userTournamentId],
  });
};

const updateUserTournaments = async (
  pb: PocketBaseClient,
  userId: string,
  userTournaments: string[],
  userTournamentId: string
) => {
  return pb.collection("users").update(userId, {
    tournaments: [...userTournaments, userTournamentId],
  });
};

export const registerUserForTournament = async (
  pb: PocketBaseClient,
  user: User,
  tournamentId: string,
  registeredUsers: string[]
) => {
  const userTournament = await createUserTournament(pb, user.id, tournamentId);

  await updateTournamentRegisteredUsers(pb, tournamentId, registeredUsers, userTournament.id);

  await updateUserTournaments(pb, user.id, user.tournaments, userTournament.id);
};

type MatchGen = {
  id: number;
  round: number;
  left: number | { submission: number };
  right?: number | { submission: number };
};

const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getBracket = (
  numberOfParticipants: number,
  arr: (number | number[])[] = [1, 2] as (number | number[])[],
  depth = 0,
  complements: number[] = []
): void => {
  if (complements.length <= depth) {
    complements.push(2 ** (depth + 2) + 1);
  }
  const complement = complements[depth];
  for (let i = 0; i < 2; i++) {
    if (complement - (arr[i] as number) <= numberOfParticipants) {
      arr[i] = [arr[i] as number, complement - (arr[i] as number)];
      getBracket(numberOfParticipants, arr[i] as number[], depth + 1, complements);
    }
  }
};

const extractMatches = (
  arr: (number | number[])[],
  round: number,
  matchId: number
): [MatchGen[], number] => {
  let matches: MatchGen[] = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (Array.isArray(element)) {
      const [subMatches, newMatchId] = extractMatches(element, round - 1, matchId);
      matches = matches.concat(subMatches);
      matchId = newMatchId;
      if (element.length === 2) {
        const left =
          typeof element[0] === "number"
            ? { submission: element[0] }
            : round > 2
            ? matchId - countRightSubmissions(element[1], round)
            : matchId - 2;
        const right = typeof element[1] === "number" ? { submission: element[1] } : matchId - 1;
        matches.push({ id: matchId, round, left, right });
        matchId++;
      }
    }
  }

  return [matches, matchId];
};

const generateMatches = (
  arr: (number | number[])[],
  round: number,
  matchId: number
): MatchGen[] => {
  const [otherMatches, newMatchId] = extractMatches(arr, round - 1, matchId);
  matchId = newMatchId;
  const left =
    typeof arr[1] === "number"
      ? { submission: arr[1] }
      : round > 2
      ? matchId - countRightSubmissions(arr[1], round)
      : matchId - 2;
  const right = typeof arr[0] === "number" ? { submission: arr[0] } : matchId - 1;

  const lastMatch: MatchGen = { id: matchId, round: round, left, right };

  return [...otherMatches, lastMatch];
};

const countRightSubmissions = (arr: number | number[], round: number): number => {
  let count = 0;

  if (round === 1 || typeof arr === "number") {
    return 1;
  }

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (Array.isArray(element)) {
      count += countRightSubmissions(element, round - 1);
    } else {
      count++;
    }
  }

  return count;
};

export const generateBracket = async (
  pb: PocketBaseClient,
  tournament: Tournament
): Promise<MatchGen[]> => {
  const submissions = shuffleArray(
    tournament.expand.registeredUsers.flatMap((ut) => ut.expand.submissions)
  );
  const numSubmissions = submissions.length;
  const numRounds = Math.ceil(Math.log2(numSubmissions));

  const arr = [1, 2];
  getBracket(numSubmissions, arr);

  const generatedMatches = generateMatches(arr, numRounds, 0);

  const rounds: Round[] = [];
  const matches: Match[] = [];

  for (let round = 1; round <= numRounds; round++) {
    // Create round
    const roundDetails = {
      tournament: tournament.id,
    };
    console.log("creating round", roundDetails);
    const roundResult = await pb.collection("round").create(roundDetails);
    rounds.push(serializeNonPOJOs(roundResult));

    const matchesId: string[] = [];

    console.log("Creating matches");
    for (let i = 0; i < generatedMatches.length; i++) {
      if (generatedMatches[i].round === round) {
        // Create match
        const submission1 = submissions.length !== 0 ? submissions.pop()?.id : "";
        const submission2 = submissions.length !== 0 ? submissions.pop()?.id : "";

        console.log("submission1", submission1);
        console.log("submission2", submission2);

        const matchDetails = {
          round: roundResult.id,
          submission1: submission1,
          submission2: submission2,
        };

        console.log("creating match", matchDetails);
        const matchResult = await pb.collection("match").create(matchDetails);

        matchesId.push(serializeNonPOJOs(matchResult).id);
        matches.push(serializeNonPOJOs(matchResult));
      }
    }

    // Update round with matches
    const updatedRound = await pb.collection("round").update(roundResult.id, {
      matches: matchesId,
      currentMatch: matchesId[0],
    });

    rounds.push(serializeNonPOJOs(updatedRound));
  }

  // Update tournament state
  await pb.collection("tournamentState").update(tournament.state, {
    rounds: rounds.map((r) => r.id),
    currentRound: rounds[0].id,
  });

  console.log("rounds", rounds);
  console.log("matches", matches);

  return generatedMatches;
};
