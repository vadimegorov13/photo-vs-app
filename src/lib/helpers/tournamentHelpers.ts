import type { PocketBaseClient, User } from "$lib/types";

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
