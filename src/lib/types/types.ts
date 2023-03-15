type Basics = {
  id: string;
  created: string;
  updated: string;
};

export type Tournament = Basics & {
  title: string;
  description: string;
  maxPlayers: number;
  maxSubmissions: number;
  organizer: User;
  registeredUsers: User[];
  rounds: Round[];
  submissions: Submission[];
  status: string;
  joinCode: string;
};

export type Round = Basics & {
  order: number;
  tournament: Tournament;
  matches: Match[];
  status: string;
};

export type Match = Basics & {
  round: Round;
  submission1: Submission;
  submission2: Submission;
  winner: Submission;
  status: string;
  userVotes1: Vote[];
  userVotes2: Vote[];
};

export type Submission = Basics & {
  title: string;
  tournament: Tournament;
  user: User;
  imageUrl: string;
};

export type User = Basics & {
  username: string;
  email: string;
  avatar: string;
  verified: boolean;
  tournaments: Tournament[];
  submissions: Submission[];
  votes: Vote[];
};

export type Vote = Basics & {
  user: User;
  tournament: Tournament;
  submission: Submission;
};
