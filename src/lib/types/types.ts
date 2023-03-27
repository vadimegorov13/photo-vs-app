export type PocketBase = import("pocketbase").default;

type Basics = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
};

export type Tournament = Basics & {
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

export type TournamentState = Basics & {
  tournament: string;
  rounds: string[];
  currentRound: string;
  tournamentState: string;
  matchState: string;
  roundState: string;

  expand: {
    tournament: Tournament;
    rounds: Round[];
    currentRound: Round;
  };
};

export type TournamentSettings = Basics & {
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

export type UserTournament = Basics & {
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

export type Round = Basics & {
  tournament: string;
  matches: string[];
  currentMatch: string;

  expand: {
    tournament: Tournament;
    matches: Match[];
    currentMatch: Match;
  };
};

export type Match = Basics & {
  round: Round;
  submission1: string;
  submission2: string;
  winner: string;
  userVotes1: string[];
  userVotes2: string[];

  expand: {
    round: Round;
    submission1: Submission;
    submission2: Submission;
    winner: Submission;
    userVotes1: UserVote[];
    userVotes2: UserVote[];
  };
};

export type Submission = Basics & {
  user: string;
  userTournament: string;
  title: string;
  description: string;
  image: string;
  comments: string[];

  expand: {
    user: User;
    userTournament: UserTournament;
    comments: UserComment[];
  };
};

export type User = Basics & {
  username: string;
  email: string;
  emailVisibility: boolean;
  verified: boolean;
  avatar: string;
  tournaments: string[];

  expand: {
    tournaments: UserTournament[];
  };
};

export type UserComment = Basics & {
  author: string;
  text: string;
  submission: string;

  expand: {
    author: User;
    submission: Submission;
  };
};

export type UserVote = Basics & {
  user: string;
  match: string;

  expand: {
    user: User;
    match: Match;
  };
};
