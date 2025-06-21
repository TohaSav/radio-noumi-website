export interface Track {
  id: string;
  title: string;
  cover: string;
  plays: string;
  addedAt: number;
  likes: number;
  isLiked?: boolean;
  audioFile?: string;
}
