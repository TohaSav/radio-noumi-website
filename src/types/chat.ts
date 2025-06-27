export interface ChatMessage {
  id: string;
  userName: string;
  message: string;
  timestamp: Date;
  avatar: string;
  type?: "text" | "image" | "video" | "voice" | "square-video";
  mediaUrl?: string;
  voiceDuration?: number;
  videoDuration?: number;
  videoThumbnail?: string;
  replyTo?: {
    id: string;
    userName: string;
    message: string;
  };
  reactions?: { [emoji: string]: string[] };
}

export interface OnlineUser {
  id: string;
  name: string;
  avatar: string;
  lastSeen?: Date;
  isActive?: boolean;
}

export interface UserData {
  name: string;
  avatar: string;
  id?: string;
}

export interface BotPersonality {
  id: string;
  name: string;
  avatar: string;
  style: string;
  replyChance: number;
  reactionChance: number;
  emojis: string[];
  isActive?: boolean;
  lastActivity?: number;
}
