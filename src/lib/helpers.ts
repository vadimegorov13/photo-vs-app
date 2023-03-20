import { error } from "@sveltejs/kit";
import type { Tournament } from "./types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serializeNonPOJOs = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const validateTournamnet = (tournament: Tournament) => {
  if (tournament.registeredUsers.length / tournament.maxPlayers === 1) {
    throw error(409, "The tournament is already full");
  }
  if (tournament.status !== "pending") {
    throw error(409, "You can't join the tournament because it has already started");
  }
};
