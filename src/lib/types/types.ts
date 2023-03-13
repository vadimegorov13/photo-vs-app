type Basics = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Tournament = Basics & {
  title: string;
  description: string;
  maxPlayers: number;
  maxSubmissions: number;
  organizerId: string;
  registeredUsers: User[];
  rounds: Round[];
  submissions: Submission[];
  status: string;
};

export type Round = Basics & {
  order: number;
  tournamentId: string;
  tournament: Tournament;
  matches: Match[];
  status: string;
};

export type Match = Basics & {
  roundId: string;
  round: Round;
  userId1: string;
  user1: User;
  userId2: string;
  user2: User;
  submissionId1: string;
  submission1: Submission;
  submissionId2: string;
  submission2: Submission;
  winnerId: string;
  winner: User;
  status: string;
};

export type Submission = Basics & {
  title: string;
  tournamentId: string;
  tournament: Tournament;
  userId: string;
  user: User;
  imageUrl: string;
  votes: number;
  userVotes: Vote[];
};

export type User = Basics & {
  username: string;
  email: string;
  submissions: Submission[];
  votes: Vote[];
  tournaments: Tournament[];
};

export type Vote = Basics & {
  userId: string;
  tournamentId: string;
  submissionId: string;
  user: User;
  tournament: Tournament;
  submission: Submission;
};
