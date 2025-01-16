export type privilege = "Player" | "FlagUp";
export type team = number;
export type position = "QB" | "WR" | "DB";

export interface player {
  playercode: string;
  firstname: string;
  lastname: string;
  team: team;
  privilege: privilege;
  position: position;
}

export type stats =
  | "Touchdown"
  | "TouchdownPass"
  | "FlagPull"
  | "Interception"
  | "Block"
  | "Catch";

export interface statistic {
  gameid: string;
  playercode: string;
  team: team;
  amount: number;
}

export interface game {
  gameid: string;
  teams: [team, team];
  winner: team | null;
  startTime: Date;
}
