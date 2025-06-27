import { ChatMessage, OnlineUser } from "@/types/chat";

export const createMessage = (
  userName: string,
  avatar: string,
  message: string,
  type: "text" | "image" | "video" | "voice" | "square-video" = "text",
  replyTo?: ChatMessage | null,
  mediaUrl?: string,
  duration?: number,
): ChatMessage => {
  return {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    userName,
    message,
    timestamp: new Date(),
    avatar,
    type,
    mediaUrl,
    voiceDuration: type === "voice" ? duration : undefined,
    videoDuration: type === "square-video" ? duration : undefined,
    replyTo: replyTo
      ? {
          id: replyTo.id,
          userName: replyTo.userName,
          message: replyTo.message,
        }
      : undefined,
    reactions: {},
  };
};

export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn("Failed to save to localStorage:", error);
  }
};

export const loadFromLocalStorage = <T>(
  key: string,
  defaultValue?: T,
): T | undefined => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn("Failed to load from localStorage:", error);
    return defaultValue;
  }
};

export const getDemoMessages = (): ChatMessage[] => {
  return [
    createMessage(
      "Система",
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=150&h=150&fit=crop&crop=face",
      "Добро пожаловать в чат радио Noumi! 🎵",
      "text",
    ),
  ];
};

export const getWelcomeMessages = (): string[] => {
  return [
    "Привет всем! 👋",
    "Отличная музыка играет! 🎵",
    "Как дела, народ? 😊",
    "Супер трек! 🔥",
    "Всем хорошего настроения! ✨",
  ];
};
