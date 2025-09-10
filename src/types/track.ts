export interface Track {
  id: string;
  title: string;
  artist?: string;
  cover: string;
  plays: string;
  addedAt: number;
  likes: number;
  isLiked?: boolean;
  audioFile?: string;
  isGold?: boolean;
}