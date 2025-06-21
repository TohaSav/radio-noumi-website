import { ChatMessage, OnlineUser } from "@/types/chat";

export const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const createMessage = (
  userName: string,
  userAvatar: string,
  message: string,
  type: ChatMessage["type"] = "text",
  replyTo?: ChatMessage | null,
  mediaUrl?: string,
  voiceDuration?: number,
): ChatMessage => {
  return {
    id: generateId(),
    userName,
    message: message.trim(),
    timestamp: new Date(),
    avatar: userAvatar,
    type,
    mediaUrl,
    voiceDuration,
    replyTo: replyTo
      ? {
          id: replyTo.id,
          userName: replyTo.userName,
          message: replyTo.message,
        }
      : undefined,
  };
};

export const createUser = (name: string, avatar: string): OnlineUser => {
  return {
    id: `user_${Date.now()}`,
    name,
    avatar,
    joinedAt: new Date(),
    lastActivity: new Date(),
    isActive: true,
  };
};

export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Ошибка сохранения в localStorage (${key}):`, error);
  }
};

export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Ошибка загрузки из localStorage (${key}):`, error);
    localStorage.removeItem(key);
    return null;
  }
};

export const getWelcomeMessages = (): string[] => [
  "Привет всем! 👋",
  "Добро пожаловать в чат!",
  "Хорошего дня всем! ☀️",
  "Как дела у всех?",
  "Отличное настроение сегодня! 😊",
  "Всем привет из Москвы! 🏙️",
  "Рад быть здесь! ✨",
  "Давно не заходил в чат 😄",
];

export const getDemoMessages = (): ChatMessage[] => [
  {
    id: "1",
    userName: "Алекс",
    message: "Привет всем! Как дела?",
    timestamp: new Date(Date.now() - 300000),
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    userName: "Мария",
    message: "Отлично! Слушаю новый альбом 🎵",
    timestamp: new Date(Date.now() - 180000),
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    userName: "Дмитрий",
    message: "Кто нибудь знает когда будет концерт?",
    timestamp: new Date(Date.now() - 60000),
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
];
