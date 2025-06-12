export interface AudioData {
  bassLevel: number;
  midLevel: number;
  trebleLevel: number;
  overall: number;
}

export interface Firework {
  id: number;
  x: number;
  y: number;
}

export interface HeartEmoji {
  id: number;
  x: number;
  y: number;
}

export type MusicType = "club" | "bass" | "slow" | "normal";

export interface RadioPlayerProps {
  streamUrl: string;
}
