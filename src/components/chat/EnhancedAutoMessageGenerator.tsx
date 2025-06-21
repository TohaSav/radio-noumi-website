import { useEffect, useState } from "react";

interface Message {
  id: string;
  userName: string;
  message: string;
  timestamp: Date;
  avatar: string;
  type: "text" | "image" | "video";
  mediaUrl?: string;
}

interface EnhancedAutoMessageGeneratorProps {
  onMessageGenerated: (message: Message) => void;
  activeUsers: Array<{ id: string; name: string; avatar: string }>;
}

const EnhancedAutoMessageGenerator = ({
  onMessageGenerated,
  activeUsers,
}: EnhancedAutoMessageGeneratorProps) => {
  const [usedContent, setUsedContent] = useState<Set<string>>(new Set());
  const [messageHistory, setMessageHistory] = useState<string[]>([]);

  const conversationStarters = [
    "Всем привет! Как дела?",
    "Отличная музыка сегодня",
    "Кто тут новенький?",
    "Прекрасный день!",
    "Как настроение у всех?",
    "Всем позитива!",
    "Отличная погода сегодня",
    "Кто слушает радио?",
    "Хорошего дня всем!",
  ];

  const reactionMessages = [
    "Согласен!",
    "Точно!",
    "Да, классно!",
    "👍",
    "Отлично сказано!",
    "Поддерживаю",
    "Именно так",
    "Круто!",
    "🔥",
    "Супер!",
  ];

  const lifeMessages = [
    "Только что с работы",
    "Готовлю ужин",
    "Гуляю с собакой",
    "Читаю книгу",
    "Смотрю фильм",
    "Встретился с друзьями",
    "Занимаюсь спортом",
    "Убираюсь дома",
    "Готовлю завтрак",
    "Еду на дачу",
    "Покупаю продукты",
    "Играю в игры",
  ];

  const photoCategories = {
    food: {
      urls: [
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
      ],
      messages: ["Мой обед", "Приготовил ужин", "Завтрак готов", "Перекус"],
    },
    nature: {
      urls: [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1418065460487-3956ef138ddb?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      ],
      messages: [
        "На прогулке",
        "Красивый вид",
        "Отдых на природе",
        "Прогулка в парке",
      ],
    },
    home: {
      urls: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400&fit=crop",
      ],
      messages: ["Дома уютно", "Мой дом", "Релакс дома", "Домашний уют"],
    },
  };

  const videoUrls = [
    "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  ];

  const generateUniqueContent = () => {
    const contentKey = `${Date.now()}_${Math.random()}`;
    const messageType = Math.random();

    if (!activeUsers.length) return null;

    const user = activeUsers[Math.floor(Math.random() * activeUsers.length)];
    const isReaction = messageHistory.length > 0 && Math.random() < 0.3;

    if (messageType < 0.15) {
      // Видео сообщение (15%)
      const videoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
      const uniqueVideoUrl = `${videoUrl}?t=${Date.now()}`;

      if (usedContent.has(uniqueVideoUrl)) return null;

      return {
        id: contentKey,
        userName: user.name,
        message: "Посмотрите это видео!",
        timestamp: new Date(),
        avatar: user.avatar,
        type: "video" as const,
        mediaUrl: uniqueVideoUrl,
      };
    } else if (messageType < 0.4) {
      // Фото сообщение (25%)
      const categories = Object.keys(photoCategories);
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const categoryData =
        photoCategories[category as keyof typeof photoCategories];

      const photoUrl =
        categoryData.urls[Math.floor(Math.random() * categoryData.urls.length)];
      const uniquePhotoUrl = `${photoUrl}&sig=${Date.now()}`;

      if (usedContent.has(uniquePhotoUrl)) return null;

      return {
        id: contentKey,
        userName: user.name,
        message:
          categoryData.messages[
            Math.floor(Math.random() * categoryData.messages.length)
          ],
        timestamp: new Date(),
        avatar: user.avatar,
        type: "image" as const,
        mediaUrl: uniquePhotoUrl,
      };
    } else {
      // Текстовое сообщение (60%)
      let messageText = "";

      if (isReaction) {
        messageText =
          reactionMessages[Math.floor(Math.random() * reactionMessages.length)];
      } else {
        const messagePool =
          Math.random() < 0.5 ? conversationStarters : lifeMessages;
        messageText =
          messagePool[Math.floor(Math.random() * messagePool.length)];

        // Добавляем эмодзи
        if (Math.random() < 0.4) {
          const emojis = ["😊", "🎵", "✨", "👍", "🔥", "💪", "🌟", "❤️"];
          messageText +=
            " " + emojis[Math.floor(Math.random() * emojis.length)];
        }
      }

      const uniqueText = `${messageText}_${user.name}`;
      if (usedContent.has(uniqueText)) return null;

      return {
        id: contentKey,
        userName: user.name,
        message: messageText,
        timestamp: new Date(),
        avatar: user.avatar,
        type: "text" as const,
      };
    }
  };

  useEffect(() => {
    // Загружаем историю использованного контента
    const stored = localStorage.getItem("used-chat-content");
    if (stored) {
      setUsedContent(new Set(JSON.parse(stored)));
    }

    const interval = setInterval(
      () => {
        const message = generateUniqueContent();
        if (message) {
          onMessageGenerated(message);

          // Обновляем историю
          setUsedContent((prev) => {
            const newSet = new Set([
              ...prev,
              message.mediaUrl || `${message.message}_${message.userName}`,
            ]);
            // Ограничиваем размер истории
            if (newSet.size > 1000) {
              const array = Array.from(newSet);
              return new Set(array.slice(500));
            }
            return newSet;
          });

          setMessageHistory((prev) => [...prev.slice(-10), message.message]);
        }
      },
      3000 + Math.random() * 12000,
    ); // 3-15 секунд

    return () => clearInterval(interval);
  }, [activeUsers, messageHistory]);

  // Сохраняем историю контента
  useEffect(() => {
    if (usedContent.size > 0) {
      localStorage.setItem(
        "used-chat-content",
        JSON.stringify([...usedContent]),
      );
    }
  }, [usedContent]);

  return null;
};

export default EnhancedAutoMessageGenerator;
