import { ChatMessage, OnlineUser } from "@/types/chat";

// Предустановленные аватарки для пользователей
const avatarPool = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
];

const russianNames = [
  "Алексей",
  "Мария",
  "Дмитрий",
  "Анна",
  "Михаил",
  "Елена",
  "Сергей",
  "Ольга",
  "Андрей",
  "Татьяна",
  "Владимир",
  "Наталья",
  "Максим",
  "Екатерина",
  "Александр",
  "Юлия",
  "Антон",
  "Светлана",
  "Николай",
  "Ирина",
  "Денис",
  "Галина",
  "Роман",
  "Валентина",
];

export const getRandomAvatar = (): string => {
  return avatarPool[Math.floor(Math.random() * avatarPool.length)];
};

export const getRandomName = (): string => {
  return russianNames[Math.floor(Math.random() * russianNames.length)];
};

export const createMessage = (
  userName: string,
  userAvatar: string,
  message: string,
  type: "text" | "image" | "video" | "voice" = "text",
  replyTo?: { id: string; userName: string; message: string },
  mediaUrl?: string,
  voiceDuration?: number,
): ChatMessage => {
  return {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userName,
    message,
    timestamp: new Date(),
    avatar: userAvatar || getRandomAvatar(),
    type,
    mediaUrl,
    voiceDuration,
    replyTo,
    reactions: {},
  };
};

export const createUser = (name: string, avatar?: string): OnlineUser => {
  return {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    avatar: avatar || getRandomAvatar(),
    joinedAt: new Date(),
    lastActivity: new Date(),
  };
};

export const getDemoMessages = (): ChatMessage[] => {
  const demoUsers = [
    { name: "Алексей", avatar: getRandomAvatar() },
    { name: "Мария", avatar: getRandomAvatar() },
    { name: "Дмитрий", avatar: getRandomAvatar() },
  ];

  return [
    createMessage(
      demoUsers[0].name,
      demoUsers[0].avatar,
      "Привет всем! Как дела?",
    ),
    createMessage(
      demoUsers[1].name,
      demoUsers[1].avatar,
      "Отлично! А у вас как?",
    ),
    createMessage(
      demoUsers[2].name,
      demoUsers[2].avatar,
      "Всё хорошо, спасибо!",
    ),
  ];
};

export const getWelcomeMessages = (): ChatMessage[] => {
  const welcomeMessages = [
    "Добро пожаловать в чат! 👋",
    "Здесь вы можете общаться с другими пользователями",
    "Приятного общения! 😊",
  ];

  return welcomeMessages.map((msg, index) =>
    createMessage(
      "Система",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&h=150&fit=crop&crop=face",
      msg,
    ),
  );
};

export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Ошибка сохранения в localStorage:", error);
  }
};

export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Ошибка загрузки из localStorage:", error);
    return null;
  }
};
