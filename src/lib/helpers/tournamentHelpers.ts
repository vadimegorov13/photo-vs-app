import type { PocketBase } from "$lib/types/types";

export const createUserTournament = async (
  pb: PocketBase,
  userId: string,
  tournamentId: string
) => {
  const userTournamentData = {
    user: userId,
    tournament: tournamentId,
    submissions: null,
    ready: false,
  };
  return pb.collection("userTournament").create(userTournamentData);
};

export const updateTournamentRegisteredUsers = async (
  pb: PocketBase,
  tournamentId: string,
  registeredUsers: string[],
  userTournamentId: string
) => {
  return pb.collection("tournament").update(tournamentId, {
    registeredUsers: [...registeredUsers, userTournamentId],
  });
};

export const updateUserTournaments = async (
  pb: PocketBase,
  userId: string,
  userTournaments: string[],
  userTournamentId: string
) => {
  return pb.collection("users").update(userId, {
    tournaments: [...userTournaments, userTournamentId],
  });
};
