import { useEffect, useState, useRef } from "react";

interface Message {
  id: string;
  userName: string;
  message: string;
  timestamp: Date;
  avatar: string;
  type: "text" | "image" | "video" | "reaction";
  mediaUrl?: string;
  replyTo?: string;
  isTyping?: boolean;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  lastActivity: Date;
  isActive: boolean;
  personality: "friendly" | "casual" | "energetic" | "thoughtful" | "funny";
  interests: string[];
  mood: "happy" | "excited" | "calm" | "curious" | "creative";
}

interface RealisticMessageGeneratorProps {
  onMessageGenerated: (message: Message) => void;
  activeUsers: User[];
  recentMessages: Message[];
}

const RealisticMessageGenerator = ({
  onMessageGenerated,
  activeUsers,
  recentMessages,
}: RealisticMessageGeneratorProps) => {
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [activeTopics, setActiveTopics] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const messageQueue = useRef<{ user: User; message: string; delay: number }[]>(
    [],
  );

  // Реалистичные темы разговоров
  const conversationTopics = {
    weather: [
      "Какая сегодня прекрасная погода!",
      "Дождь на улице, но настроение отличное",
      "Солнце наконец выглянуло ☀️",
      "Снег идёт, красота невероятная",
      "Жара сегодня, но это лучше холода",
    ],
    work: [
      "Только с работы, устал но доволен",
      "Завтра важная встреча, волнуюсь",
      "Получил повышение на работе! 🎉",
      "Коллеги такие классные у меня",
      "Домашний офис - это другой уровень комфорта",
    ],
    hobbies: [
      "Начал читать новую книгу, затягивает",
      "Вчера был в театре, потрясающий спектакль",
      "Готовлю новое блюдо, эксперименты 👨‍🍳",
      "Хожу на йогу, очень расслабляет",
      "Фотографирую закаты, каждый уникален",
    ],
    mood: [
      "Настроение супер сегодня! 😊",
      "Чувствую себя очень продуктивно",
      "День начался отлично",
      "Энергии море, готов горы свернуть",
      "Такое спокойствие на душе",
    ],
    food: [
      "Приготовил борщ, получился идеальный",
      "Заказал пиццу, не могу устоять",
      "Домашние блинчики с утра - счастье",
      "Открыл для себя новое кафе рядом",
      "Готовлю ужин для всей семьи",
    ],
    social: [
      "Встретился со старыми друзьями",
      "Планируем поездку на выходные",
      "Был на дне рождения, весело провели время",
      "Семейный ужин сегодня, собираемся все",
      "Гуляли по центру города, красиво",
    ],
  };

  // Реакции на сообщения других
  const reactions = {
    agreement: [
      "Точно!",
      "Согласен полностью",
      "Да, именно так!",
      "👍",
      "Поддерживаю",
    ],
    excitement: [
      "Вау, круто!",
      "Это потрясающе!",
      "Как здорово!",
      "🔥",
      "Супер!",
    ],
    empathy: [
      "Понимаю тебя",
      "Сочувствую",
      "Держись!",
      "Всё будет хорошо",
      "❤️",
    ],
    curiosity: [
      "А расскажи подробнее?",
      "Интересно!",
      "Как это было?",
      "🤔",
      "А что дальше?",
    ],
    humor: [
      "Ха-ха, смешно! 😄",
      "Ты меня рассмешил",
      "Классная шутка!",
      "😂",
      "Юморист!",
    ],
  };

  // Естественные переходы в разговоре
  const conversationStarters = [
    "Кстати, а вы знали что...",
    "Между прочим,",
    "А я тут недавно...",
    "Говоря об этом,",
    "Это напомнило мне...",
  ];

  // Определяем настроение пользователя по его сообщениям
  const detectMessageMood = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    if (
      lowerMsg.includes("отлично") ||
      lowerMsg.includes("супер") ||
      lowerMsg.includes("круто")
    )
      return "excited";
    if (lowerMsg.includes("спокойно") || lowerMsg.includes("расслаб"))
      return "calm";
    if (
      lowerMsg.includes("интересно") ||
      lowerMsg.includes("как") ||
      lowerMsg.includes("что")
    )
      return "curious";
    if (
      lowerMsg.includes("😊") ||
      lowerMsg.includes("👍") ||
      lowerMsg.includes("🎉")
    )
      return "happy";
    return "neutral";
  };

  // Генерируем реакцию на последнее сообщение
  const generateReaction = (
    lastMessage: Message,
    reactingUser: User,
  ): string | null => {
    if (!lastMessage || lastMessage.userName === reactingUser.name) return null;

    const mood = detectMessageMood(lastMessage.message);
    const userPersonality = reactingUser.personality;

    // Вероятность реагирования зависит от личности
    const reactionChance =
      userPersonality === "friendly"
        ? 0.4
        : userPersonality === "energetic"
          ? 0.5
          : userPersonality === "funny"
            ? 0.3
            : 0.2;

    if (Math.random() > reactionChance) return null;

    // Выбираем тип реакции на основе настроения сообщения
    let reactionType: keyof typeof reactions;

    switch (mood) {
      case "excited":
        reactionType = Math.random() < 0.6 ? "excitement" : "agreement";
        break;
      case "curious":
        reactionType = "curiosity";
        break;
      case "happy":
        reactionType = userPersonality === "funny" ? "humor" : "agreement";
        break;
      default:
        reactionType = "agreement";
    }

    const possibleReactions = reactions[reactionType];
    return possibleReactions[
      Math.floor(Math.random() * possibleReactions.length)
    ];
  };

  // Создаём органичное сообщение на основе контекста
  const generateContextualMessage = (user: User): string => {
    const lastMessages = recentMessages.slice(-3);

    // Если есть недавние сообщения, возможна реакция
    if (lastMessages.length > 0 && Math.random() < 0.3) {
      const reaction = generateReaction(
        lastMessages[lastMessages.length - 1],
        user,
      );
      if (reaction) return reaction;
    }

    // Продолжаем тему разговора
    if (activeTopics.length > 0 && Math.random() < 0.4) {
      const topic =
        activeTopics[Math.floor(Math.random() * activeTopics.length)];
      const topicMessages =
        conversationTopics[topic as keyof typeof conversationTopics];

      if (Math.random() < 0.3) {
        const starter =
          conversationStarters[
            Math.floor(Math.random() * conversationStarters.length)
          ];
        return `${starter} ${topicMessages[Math.floor(Math.random() * topicMessages.length)].toLowerCase()}`;
      }

      return topicMessages[Math.floor(Math.random() * topicMessages.length)];
    }

    // Начинаем новую тему на основе интересов пользователя
    const userInterests = user.interests;
    const availableTopics = Object.keys(conversationTopics);
    const relevantTopic =
      availableTopics.find((topic) => userInterests.includes(topic)) ||
      availableTopics[Math.floor(Math.random() * availableTopics.length)];

    const topicMessages =
      conversationTopics[relevantTopic as keyof typeof conversationTopics];
    const message =
      topicMessages[Math.floor(Math.random() * topicMessages.length)];

    // Обновляем активные темы
    setActiveTopics((prev) => {
      const newTopics = [...prev];
      if (!newTopics.includes(relevantTopic)) {
        newTopics.push(relevantTopic);
        if (newTopics.length > 3) newTopics.shift();
      }
      return newTopics;
    });

    return message;
  };

  // Имитируем набор текста
  const simulateTyping = (user: User, duration: number) => {
    setTypingUsers((prev) => new Set([...prev, user.id]));

    setTimeout(() => {
      setTypingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(user.id);
        return newSet;
      });
    }, duration);
  };

  // Генерируем реалистичное сообщение
  const generateRealisticMessage = () => {
    if (!activeUsers.length) return;

    const user = activeUsers[Math.floor(Math.random() * activeUsers.length)];

    // Проверяем, не набирает ли уже пользователь
    if (typingUsers.has(user.id)) return;

    const message = generateContextualMessage(user);

    // Имитируем время набора (зависит от длины сообщения)
    const typingDuration = Math.min(
      message.length * 50 + Math.random() * 2000,
      5000,
    );

    simulateTyping(user, typingDuration);

    // Отправляем сообщение после "набора"
    setTimeout(() => {
      const newMessage: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userName: user.name,
        message,
        timestamp: new Date(),
        avatar: user.avatar,
        type: "text",
      };

      onMessageGenerated(newMessage);
    }, typingDuration);
  };

  // Основной интервал генерации сообщений
  useEffect(() => {
    const messageInterval = setInterval(
      () => {
        // Вероятность сообщения зависит от количества активных пользователей
        const messageChance = Math.min(activeUsers.length * 0.02, 0.8);

        if (Math.random() < messageChance) {
          generateRealisticMessage();
        }
      },
      3000 + Math.random() * 7000,
    ); // 3-10 секунд между сообщениями

    return () => clearInterval(messageInterval);
  }, [activeUsers, recentMessages, activeTopics]);

  // Периодически обновляем активные темы
  useEffect(() => {
    const topicRefreshInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        setActiveTopics((prev) => {
          if (prev.length > 0) {
            return prev.slice(1); // Убираем старую тему
          }
          return prev;
        });
      }
    }, 60000); // Каждую минуту

    return () => clearInterval(topicRefreshInterval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-10">
      {typingUsers.size > 0 && (
        <div className="bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="flex items-center gap-2 text-white text-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span>
              {typingUsers.size === 1
                ? "Кто-то печатает"
                : `${typingUsers.size} человек печатают`}
              ...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealisticMessageGenerator;
