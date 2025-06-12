export interface AudioData {
  bassLevel: number;
  midLevel: number;
  trebleLevel: number;
  overall: number;
}

export type MusicType = "club" | "bass" | "slow" | "normal";

export interface RadioPlayerProps {
  streamUrl: string;
  likes?: number;
  dislikes?: number;
  listeners?: number;
}
