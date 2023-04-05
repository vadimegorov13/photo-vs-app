import type { PocketBaseClient, Tournament, User } from "$lib/types";

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

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function divide(
  numberOfParticipants: number,
  arr: (number | number[])[] = [1, 2] as (number | number[])[],
  depth = 0,
  complements: number[] = []
): void {
  if (complements.length <= depth) {
    complements.push(2 ** (depth + 2) + 1);
  }
  const complement = complements[depth];
  for (let i = 0; i < 2; i++) {
    if (complement - (arr[i] as number) <= numberOfParticipants) {
      arr[i] = [arr[i] as number, complement - (arr[i] as number)];
      divide(numberOfParticipants, arr[i] as number[], depth + 1, complements);
    }
  }
}

type Match2 = {
  id: number;
  round: number;
  left: number | { submission: number };
  right?: number | { submission: number };
};

export function generateBracket(tournament: Tournament): void {
  const submissions = shuffleArray(
    tournament.expand.registeredUsers.flatMap((ut) => ut.expand.submissions)
  );
  // const numSubmissions = 16;
  // const powerOfTwo = Math.pow(2, Math.ceil(Math.log2(numSubmissions))) === numSubmissions;
  const numSubmissions = submissions.length;
  const numRounds = Math.ceil(Math.log2(numSubmissions));
  // const closestPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(numSubmissions)));

  const arr = [1, 2];
  divide(numSubmissions, arr);
  console.log(JSON.stringify(arr));

  let matchId = 0;

  function rightSubmissions(arr: (number | number[])[], round: number): number {
    let count = 0;

    if (round === 1) {
      return 1;
    }

    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (Array.isArray(element)) {
        count += rightSubmissions(element, round - 1);
      } else {
        count++;
      }
    }

    return count;
  }

  function extractMatches(arr: (number | number[])[], round: number): Match2[] {
    let matches: Match2[] = [];

    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (Array.isArray(element)) {
        matches = matches.concat(extractMatches(element, round - 1));
        if (element.length === 2) {
          if (matchId === 10) {
            console.log("element", JSON.stringify(element[0]));
            console.log(round);
          }
          const left =
            typeof element[0] === "number"
              ? { submission: element[0] }
              : round > 2
              ? matchId - rightSubmissions(element[0], round)
              : matchId - 2;
          const right = typeof element[1] === "number" ? { submission: element[1] } : matchId - 1;
          matches.push({ id: matchId, round, left, right });
          matchId++;
        }
      }
    }

    return matches;
  }

  function generateMatches(arr: (number | number[])[], round: number): Match2[] {
    const otherMatches = extractMatches(arr, round - 1);
    const left =
      typeof arr[1] === "number"
        ? { submission: arr[1] }
        : round > 2
        ? matchId - rightSubmissions(arr[1], round)
        : matchId - 2;
    const right = typeof arr[0] === "number" ? { submission: arr[0] } : matchId - 1;

    const lastMatch: Match2 = { id: matchId, round: round, left, right };

    return [...otherMatches, lastMatch];
  }

  console.log(generateMatches(arr, numRounds));
}
