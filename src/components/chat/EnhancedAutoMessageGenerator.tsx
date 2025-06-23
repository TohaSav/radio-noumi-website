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
    const uniqueId = Math.random().toString(36).substr(2, 9);

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
          timestamp: new Date(),
          avatar: bot.avatar,
          type: "text",
          replyTo: {
            id: messageToReply.id,
            userName: messageToReply.userName,
            message: messageToReply.message,
          },
        };
      }
    }

    // 15% видео, 25% фото, 60% текст
    if (messageType < 0.15) {
      const videoContent = contentGenerator.current.generateUniqueVideo(bot.id);
      if (videoContent) {
        return {
          id: `msg_${timestamp}_${uniqueId}`,
          userName: bot.name,
          message: videoContent.message,
          timestamp: new Date(),
          avatar: bot.avatar,
          type: "video",
          mediaUrl: videoContent.url,
        };
      }
    } else if (messageType < 0.4) {
      const imageContent = contentGenerator.current.generateUniqueImage(bot.id);
      if (imageContent) {
        return {
          id: `msg_${timestamp}_${uniqueId}`,
          userName: bot.name,
          message: imageContent.message,
          timestamp: new Date(),
          avatar: bot.avatar,
          type: "image",
          mediaUrl: imageContent.url,
        };
      }
    } else {
      const textContent = contentGenerator.current.generateUniqueText(
        bot.id,
        bot.style,
      );
      if (textContent) {
        return {
          id: `msg_${timestamp}_${uniqueId}`,
          userName: bot.name,
          message: textContent,
          timestamp: new Date(),
          avatar: bot.avatar,
          type: "text",
        };
      }
    }

    return null;
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
    // Генерация сообщений
    const messageInterval = setInterval(
      () => {
        const message = generateUniqueMessage();
        if (message) {
          onMessageGenerated(message);
        }
      },
      2000 + Math.random() * 4000,
    ); // 2-6 секунд

    // Добавление реакций
    const reactionInterval = setInterval(
      () => {
        addRandomReaction();
      },
      3000 + Math.random() * 7000,
    ); // 3-10 секунд

    // Очистка истории периодически
    const cleanupInterval = setInterval(() => {
      contentGenerator.current.cleanHistory();
    }, 300000); // каждые 5 минут

    return () => {
      clearInterval(messageInterval);
      clearInterval(reactionInterval);
      clearInterval(cleanupInterval);
    };
  }, [recentMessages, activeBots]);

  return null;
};

export default EnhancedAutoMessageGenerator;
