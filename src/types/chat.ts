export interface ChatMessage {
  id: string;
  userName: string;
  message: string;
  timestamp: Date;
  avatar: string;
  type?: "text" | "image" | "video" | "voice";
  mediaUrl?: string;
  voiceDuration?: number;
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
  joinedAt?: Date;
  lastActivity?: Date;
  isActive?: boolean;
}

export interface UserData {
  name: string;
  avatar: string;
}

export type MessageType = "text" | "image" | "video" | "voice";

export interface ChatState {
  messages: ChatMessage[];
  messageInput: string;
  userName: string;
  userAvatar: string;
  isLoggedIn: boolean;
  registeredUsers: string[];
  showUserPanel: boolean;
  activeUsers: OnlineUser[];
  replyTo: ChatMessage | null;
}
