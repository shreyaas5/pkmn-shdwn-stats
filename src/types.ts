export interface FormatRating {
  elo: number;
  gxe: number;
  rpr: number;
  rprd: number;
  w: number;
  l: number;
  coil: null | number;
}

export interface ShowdownUserData {
  username: string;
  userid: string;
  registertime: number;
  group: number;
  ratings: Record<string, FormatRating>;
}

export interface ReplayData {
  id: string;
  uploadtime: number;
  format: string;
  players: string[];
  winner?: string;
}

export interface PlayerAnalytics {
  acePokemon: { name: string; count: number };
  badLuckPokemon: { name: string; count: number };
  averageTurns: number;
  playstyle: 'Hyper Offense' | 'Offensive' | 'Balanced' | 'Defensive' | 'Stall';
  winStreak: number;
  highestWinStreak: number;
  rival: { username: string; count: number };
  historicalElo: number[];
}



export interface LadderRank {
  userid: string;
  username: string;
  elo: number;
  gxe: number;
}

export interface LadderData {
  top100: LadderRank[];
  distance?: number;
}


