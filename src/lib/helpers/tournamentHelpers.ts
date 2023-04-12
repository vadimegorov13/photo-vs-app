import type { Match, PocketBaseClient, Round, Tournament, User } from "$lib/types";
import { serializeNonPOJOs } from "./helpers";

const createUserTournament = async (
  pb: PocketBaseClient,
  userId: string,
  tournamentId: string,
  host = false
) => {
  const userTournamentData = {
    user: userId,
    tournament: tournamentId,
    submissions: [],
    ready: host,
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
  registeredUsers: string[],
  host = false
) => {
  const userTournament = await createUserTournament(pb, user.id, tournamentId, host);

  await updateTournamentRegisteredUsers(pb, tournamentId, registeredUsers, userTournament.id);

  await updateUserTournaments(pb, user.id, user.tournaments, userTournament.id);
};

type MatchGen = {
  id: number;
  round: number;
  left: number | { submission: number };
  right?: number | { submission: number };
  nextMatch?: number;
  nextRound?: number;
};

type ExtendedRound = Round & {
  tempId: string;
  nextRoundId: number;
  matchIds: string[];
  currentMatch: string;
};

type ExtendedMatch = Match & { tempId: string; nextMatchId: number };

const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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

const addNextFields = (matches: MatchGen[]): MatchGen[] => {
  const matchesWithNext: MatchGen[] = matches.map((match) => ({ ...match }));

  for (let i = 0; i < matchesWithNext.length; i++) {
    const currentMatch = matchesWithNext[i];

    for (let j = 0; j < matchesWithNext.length; j++) {
      const nextMatch = matchesWithNext[j];

      if (nextMatch.round === currentMatch.round + 1) {
        if (nextMatch.left === currentMatch.id || nextMatch.right === currentMatch.id) {
          currentMatch.nextMatch = nextMatch.id;
          currentMatch.nextRound = nextMatch.round; // Add the nextRound field
          break;
        }
      }
    }
  }

  return matchesWithNext;
};

const getArrBracket = (
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
      getArrBracket(numberOfParticipants, arr[i] as number[], depth + 1, complements);
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

  return addNextFields([...otherMatches, lastMatch]);
};

const updateMatches = async (pb: PocketBaseClient, matches: ExtendedMatch[]): Promise<Match[]> => {
  // Create a map to store the temporary ids as keys and actual ids as values
  const tempIdToActualIdMap = new Map();
  const resultMatches: Match[] = [];

  // Populate the map with tempId and actual id pairs
  matches.forEach((match) => {
    tempIdToActualIdMap.set(match.tempId, match.id);
  });

  // Assign nextMatch field using the map
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].nextMatchId !== undefined) {
      const nextMatch = tempIdToActualIdMap.get(matches[i].nextMatchId);
      const result = await pb.collection("match").update(matches[i].id, {
        nextMatch,
      });

      resultMatches.push(serializeNonPOJOs(result));
    }
  }

  return resultMatches;
};

const updateRounds = async (pb: PocketBaseClient, rounds: ExtendedRound[]): Promise<Round[]> => {
  // Create a map to store the temporary ids as keys and actual ids as values
  const tempIdToActualIdMap = new Map();
  const resultRounds: Round[] = [];

  // Populate the map with tempId and actual id pairs
  rounds.forEach((round) => {
    tempIdToActualIdMap.set(round.tempId, round.id);
  });

  // Assign nextRound field using the map
  for (let i = 0; i < rounds.length; i++) {
    const round = rounds[i];
    if (round.nextRoundId <= tempIdToActualIdMap.size) {
      const updateData = {
        nextRound: tempIdToActualIdMap.get(round.nextRoundId),
        matches: round.matches,
        currentMatch: round.matches[0],
      };

      const result = await pb.collection("round").update(round.id, updateData);
      resultRounds.push(serializeNonPOJOs(result));
    } else {
      const result = await pb
        .collection("round")
        .update(round.id, { matches: round.matches, currentMatch: round.matches[0] });
      resultRounds.push(serializeNonPOJOs(result));
    }
  }

  return resultRounds;
};

export const generateBracket = async (
  pb: PocketBaseClient,
  tournament: Tournament
): Promise<[MatchGen[], Round[]]> => {
  const submissions = shuffleArray(
    tournament.expand.registeredUsers.flatMap((ut) => ut.expand.submissions)
  );
  const numSubmissions = submissions.length;
  const numRounds = Math.ceil(Math.log2(numSubmissions));

  const arr = [1, 2];
  getArrBracket(numSubmissions, arr);
  const generatedMatches = generateMatches(arr, numRounds, 0);
  const rounds: ExtendedRound[] = [];
  const matches: ExtendedMatch[] = [];

  for (let round = 1; round <= numRounds; round++) {
    const matchIds: string[] = [];
    // Create round
    const roundResult = await pb.collection("round").create({
      tournament: tournament.id,
      state: round === 1 ? "IN_PROGRESS" : "NOT_STARTED",
    });

    // Create matches
    for (let i = 0; i < generatedMatches.length; i++) {
      if (generatedMatches[i].round === round) {
        // Get submissions for the match

        const submission1 =
          submissions.length !== 0 && typeof generatedMatches[i].left !== "number"
            ? submissions.pop()?.id
            : "";
        const submission2 =
          submissions.length !== 0 && typeof generatedMatches[i].right !== "number"
            ? submissions.pop()?.id
            : "";

        // Create match
        const matchResult = await pb.collection("match").create({
          round: roundResult.id,
          submission1: submission1,
          submission2: submission2,
          state: i === 0 ? "IN_PROGRESS" : "NOT_STARTED",
        });

        // Get ids of the matches in the round
        matchIds.push(serializeNonPOJOs(matchResult).id);

        // Save match for the update
        matches.push({
          ...serializeNonPOJOs(matchResult),
          tempId: generatedMatches[i].id,
          nextMatchId: generatedMatches[i].nextMatch,
        });
      }
    }

    // Save round for the update
    rounds.push({
      ...serializeNonPOJOs(roundResult),
      tempId: round,
      nextRoundId: round + 1,
      matches: matchIds,
      currentMatch: matchIds[0],
    });
  }
  // Update matches and rounds
  await updateMatches(pb, matches);
  const updatedRounds = await updateRounds(pb, rounds);

  return [generatedMatches, updatedRounds];
};

export const getNextNotStartedMatch = (currentMatch: Match, matches: Match[]) => {
  // Find the index of the current match
  const currentIndex = matches.findIndex((match) => match.id === currentMatch.id);

  // Iterate over the matches array starting from the current match index
  for (let i = currentIndex; i < matches.length; i++) {
    // Check if the match has a "NOT_STARTED" state
    if (matches[i].state === "NOT_STARTED") {
      // Return the first match with a "NOT_STARTED" state
      return matches[i].id;
    }
  }

  // If no match with a "NOT_STARTED" state is found, return null
  return null;
};
