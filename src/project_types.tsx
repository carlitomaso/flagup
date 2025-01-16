export type privilege = "Player" | "FlagUp";
export type team = number;

export interface player {
  playercode: string;
  firstname: string;
  lastname: string;
  team: team;
  privilege: privilege;
}
