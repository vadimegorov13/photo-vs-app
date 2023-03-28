import type { Tournament, User } from "$lib/types";
import { error } from "@sveltejs/kit";

export const validateTournamentEntry = (tournament: Tournament, user: User) => {
  if (tournament.registeredUsers.length / tournament.expand.settings.maxPlayers === 1) {
    throw error(409, "The tournament is full");
  }
  if (tournament.expand.state.tournamentState !== "pending") {
    throw error(409, "The tournament has already started");
  }

  const hasMatchingObject = tournament.registeredUsers.some((ru1) =>
    user.tournaments.some((ru2) => ru1 === ru2)
  );

  if (hasMatchingObject) {
    throw error(409, "You are already registered for this tournament");
  }
};
