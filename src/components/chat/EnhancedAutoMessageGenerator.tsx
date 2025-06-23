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
          timestamp: new Date(),
          avatar: bot.avatar,
          type: "text",
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
          timestamp: new Date(),
          avatar: bot.avatar,
          type: "image",
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
          timestamp: new Date(),
          avatar: bot.avatar,
          type: "video",
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
    // Очень частая генерация сообщений - каждые 2-8 секунд
    const messageInterval = setInterval(
      () => {
        const message = generateUniqueMessage();
        if (message) {
          onMessageGenerated(message);
        }
      },
      2000 + Math.random() * 6000,
    );

    // Частые реакции - каждые 3-10 секунд
    const reactionInterval = setInterval(
      () => {
        generateReaction();
      },
      3000 + Math.random() * 7000,
    );

    // Очень частое появление новых ботов - каждые 5-15 секунд
    const botRegistrationInterval = setInterval(
      () => {
        const inactiveBots = activeBots.filter((bot) => !bot.isActive);
        if (inactiveBots.length > 0 && Math.random() < 0.8) {
          const randomBot =
            inactiveBots[Math.floor(Math.random() * inactiveBots.length)];
          randomBot.isActive = true;
          randomBot.lastActivity = Date.now();
        }
      },
      5000 + Math.random() * 10000,
    );

    return () => {
      clearInterval(messageInterval);
      clearInterval(reactionInterval);
      clearInterval(botRegistrationInterval);
    };
  }, [recentMessages]);

  return null;
};

export default EnhancedAutoMessageGenerator;
