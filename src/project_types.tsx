export type privilege = "Player" | "FlagUp";

export interface player {
  playercode: string;
  firstname: string;
  lastname: string;
  privilege: privilege;
}
