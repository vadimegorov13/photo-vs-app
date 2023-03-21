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
  host: User;
  registeredUsers: UserTournament[];
  rounds: Round[];
  status: string;
  joinCode: string;
};

export type UserTournament = Basics & {
  user: User;
  tournament: Tournament;
  submissions: Submission[];
  ready: boolean;
}

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
  user: User
  title: string;
  description: string;
  imageUrl: string;
  comments: UserComment;
};

export type UserComment = Basics & {
  comment: string;
  user: User[]
}

export type User = Basics & {
  username: string;
  email: string;
  avatar: string;
  verified: boolean;
  tournaments: UserTournament[];
  votes: Vote[];
};

export type Vote = Basics & {
  user: User;
  tournament: Tournament;
  submission: Submission;
};
