export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: number;
}

export interface Story {
  id: string;
  media: { url: string; type: "image" | "video" }[];
  author: string;
  timestamp: number;
  likes: number;
  reactions?: { [emoji: string]: number };
  comments?: Comment[];
}

export interface FloatingEmoji {
  id: string;
  emoji: string;
  x: number;
  y: number;
}
