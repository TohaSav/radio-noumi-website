import { useEffect, useState, useRef } from "react";
import { BOT_PERSONALITIES, getRandomBot } from "./BotPersonality";
import UniqueContentGenerator from "./UniqueContentGenerator";

interface Message {
  id: string;
  userName: string;
  message: string;
  timestamp: Date;
  avatar: string;
  type: "text" | "image" | "video";
  mediaUrl?: string;
  replyTo?: {
    id: string;
    userName: string;
    message: string;
  };
}

interface EnhancedAutoMessageGeneratorProps {
  onMessageGenerated: (message: Message) => void;
  onReactionAdded: (messageId: string, emoji: string, userName: string) => void;
  activeUsers: Array<{ id: string; name: string; avatar: string }>;
  recentMessages: Message[];
}

const EnhancedAutoMessageGenerator = ({
  onMessageGenerated,
  onReactionAdded,
  activeUsers,
  recentMessages,
}: EnhancedAutoMessageGeneratorProps) => {
  const contentGenerator = useRef(new UniqueContentGenerator());
  const intervalRefs = useRef<NodeJS.Timeout[]>([]);
  const [activeBots] = useState(() =>
    BOT_PERSONALITIES.map((bot) => ({
      ...bot,
      isActive: true,
      lastActivity: Date.now(),
    })),
  );

  // Генерация уникального сообщения
  const generateUniqueMessage = (): Message | null => {
    const availableBots = activeBots.filter((bot) => bot.isActive);
    if (availableBots.length === 0) return null;

    const bot = availableBots[Math.floor(Math.random() * availableBots.length)];
    const messageType = Math.random();
    const timestamp = Date.now();
    const uniqueId = Math.random().toString(36).substring(2, 9);

    // Проверяем, нужно ли ответить на недавнее сообщение
    if (recentMessages.length > 0 && Math.random() < bot.replyChance) {
      const messageToReply = recentMessages[recentMessages.length - 1];
      const reply = contentGenerator.current.generateContextualReply(
        messageToReply.message,
        bot.style,
      );

      if (reply) {
        return {
          id: `msg_${timestamp}_${uniqueId}`,
          userName: bot.name,
          message: reply,
          timestamp: new Date(timestamp),
          avatar: bot.avatar,
          type: "text" as const,
          replyTo: {
            id: messageToReply.id,
            userName: messageToReply.userName,
            message: messageToReply.message,
          },
        };
      }
    }

    // Генерация разных типов сообщений с более высокой вероятностью медиа
    if (messageType < 0.4) {
      // 40% - обычные текстовые сообщения
      const textContent = contentGenerator.current.generateUniqueText(
        bot.id,
        bot.style,
      );
      if (textContent) {
        return {
          id: `msg_${timestamp}_${uniqueId}`,
          userName: bot.name,
          message: textContent,
          timestamp: new Date(timestamp),
          avatar: bot.avatar,
          type: "text" as const,
        };
      }
    } else if (messageType < 0.7) {
      // 30% - изображения
      const imageContent = contentGenerator.current.generateUniqueImage(bot.id);
      if (imageContent) {
        return {
          id: `msg_${timestamp}_${uniqueId}`,
          userName: bot.name,
          message: imageContent.message,
          timestamp: new Date(timestamp),
          avatar: bot.avatar,
          type: "image" as const,
          mediaUrl: imageContent.url,
        };
      }
    } else {
      // 30% - видео
      const videoContent = contentGenerator.current.generateUniqueVideo(bot.id);
      if (videoContent) {
        return {
          id: `msg_${timestamp}_${uniqueId}`,
          userName: bot.name,
          message: videoContent.message,
          timestamp: new Date(timestamp),
          avatar: bot.avatar,
          type: "video" as const,
          mediaUrl: videoContent.url,
        };
      }
    }

    return null;
  };

  // Генерация реакций на сообщения
  const generateReaction = () => {
    if (recentMessages.length === 0) return;

    const availableBots = activeBots.filter((bot) => bot.isActive);
    if (availableBots.length === 0) return;

    const bot = availableBots[Math.floor(Math.random() * availableBots.length)];
    const recentMessage =
      recentMessages[
        Math.floor(Math.random() * Math.min(recentMessages.length, 5))
      ];

    if (Math.random() < bot.reactionChance) {
      const emoji = bot.emojis[Math.floor(Math.random() * bot.emojis.length)];
      onReactionAdded(recentMessage.id, emoji, bot.name);
    }
  };

  // Добавление реакций на сообщения
  const addRandomReaction = () => {
    if (recentMessages.length === 0) return;

    const bot = activeBots[Math.floor(Math.random() * activeBots.length)];
    if (Math.random() > bot.reactionChance) return;

    const messageToReact =
      recentMessages[
        Math.floor(Math.random() * Math.min(recentMessages.length, 5))
      ];
    const emoji = bot.emojis[Math.floor(Math.random() * bot.emojis.length)];

    onReactionAdded(messageToReact.id, emoji, bot.name);
  };

  useEffect(() => {
    // Очистка предыдущих интервалов
    intervalRefs.current.forEach(clearInterval);
    intervalRefs.current = [];

    // Генерация сообщений каждые 3-8 секунд
    const messageInterval = setInterval(
      () => {
        const message = generateUniqueMessage();
        if (message) {
          onMessageGenerated(message);
        }
      },
      3000 + Math.random() * 5000,
    );
    intervalRefs.current.push(messageInterval);

    // Реакции каждые 5-12 секунд
    const reactionInterval = setInterval(
      () => {
        generateReaction();
      },
      5000 + Math.random() * 7000,
    );
    intervalRefs.current.push(reactionInterval);

    return () => {
      intervalRefs.current.forEach(clearInterval);
      intervalRefs.current = [];
    };
  }, [recentMessages.length]); // Зависимость только от длины массива

  return null;
};

export default EnhancedAutoMessageGenerator;
