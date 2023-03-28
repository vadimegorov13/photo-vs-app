import type { PocketBase, User } from "$lib/types";

export const createUserTournament = async (
  pb: PocketBase,
  userId: string,
  tournamentId: string
) => {
  const userTournamentData = {
    user: userId,
    tournament: tournamentId,
    submissions: [],
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

export const registerUserForTournament = async (
  pb: PocketBase,
  user: User,
  tournamentId: string,
  registeredUsers: string[]
) => {
  const userTournament = await createUserTournament(pb, user.id, tournamentId);

  await updateTournamentRegisteredUsers(pb, tournamentId, registeredUsers, userTournament.id);

  await updateUserTournaments(pb, user.id, user.tournaments, userTournament.id);
};
