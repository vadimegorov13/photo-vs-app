import type { Tournament } from "$lib/types/types";
import { error } from "@sveltejs/kit";

export const validateTournamentEntry = (tournament: Tournament) => {
  if (tournament.registeredUsers.length / tournament.maxPlayers === 1) {
    throw error(409, "The tournament is already full");
  }
  if (tournament.status !== "pending") {
    throw error(409, "You can't join the tournament because it has already started");
  }
};
