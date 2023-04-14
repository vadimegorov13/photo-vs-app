export type PocketBaseClient = import("pocketbase").default;

export type BaseFields = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
};

export type Tournament = BaseFields & {
  title: string;
  description: string;
  joinCode: string;
  host: string;
  registeredUsers: string[];
  settings: string;
  state: string;

  expand: {
    host: User;
    registeredUsers: UserTournament[];
    settings: TournamentSettings;
    state: TournamentState;
  };
};

export type TournamentState = BaseFields & {
  tournament: string;
  rounds: string[];
  currentRound: string;
  state: string;
  round: number;
  match: number;
  votes: number;
  usersReady: number;

  expand: {
    tournament: Tournament;
    rounds: Round[];
    currentRound: Round;
  };
};

export type TournamentSettings = BaseFields & {
  tournament: string;
  maxPlayers: number;
  maxSubmissions: number;
  voteTime: number;
  type: string;
  auto: boolean;

  expand: {
    tournament: Tournament;
  };
};

export type UserTournament = BaseFields & {
  user: string;
  tournament: string;
  submissions: string[];
  ready: boolean;

  expand: {
    user: User;
    tournament: Tournament;
    submissions: Submission[];
  };
};

export type Round = BaseFields & {
  tournament: string;
  nextRound: string;
  matches: string[];
  currentMatch: string;
  state: string;

  expand: {
    tournament: Tournament;
    nextRound: Round;
    matches: Match[];
    currentMatch: Match;
  };
};

export type Match = BaseFields & {
  round: string;
  nextMatch: string;
  submission1: string;
  submission2: string;
  winner: string;
  userVotes1: string[];
  userVotes2: string[];
  state: string;

  expand: {
    round: Round;
    nextMatch: Match;
    submission1: Submission;
    submission2: Submission;
    winner: Submission;
    userVotes1: UserVote[];
    userVotes2: UserVote[];
  };
};

export type Submission = BaseFields & {
  userTournament: string;
  title: string;
  description: string;
  image: string;
  comments: string[];

  expand: {
    userTournament: UserTournament;
    comments: UserComment[];
  };
};

export type User = BaseFields & {
  username: string;
  email: string;
  emailVisibility: boolean;
  verified: boolean;
  avatar: string;
  tournaments: string[];
  name?: string;

  expand: {
    tournaments: UserTournament[];
  };
};

export type UserComment = BaseFields & {
  author: string;
  text: string;
  submission: string;

  expand: {
    author: User;
    submission: Submission;
  };
};

export type UserVote = BaseFields & {
  user: string;
  match: string;

  expand: {
    user: User;
    match: Match;
  };
};
