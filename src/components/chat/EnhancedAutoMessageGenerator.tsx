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
  const [messageVariations, setMessageVariations] = useState<
    Map<string, number>
  >(new Map());

  // Расширенные шаблоны сообщений для большей живости
  const messageTemplates = {
    greetings: [
      "Всем привет! 👋",
      "Добро пожаловать в чат!",
      "Хорошего всем дня! ☀️",
      "Приветики! 😊",
      "Салют всем! 🤘",
      "Привет, народ! 🙋‍♂️",
      "Здравствуйте, друзья!",
      "Доброе утро! ☕",
      "Добрый вечер! 🌙",
      "Как дела у всех?",
      "Всем отличного настроения! 😄",
      "Прекрасного дня! 🌈",
      "Хорошего вечера! ✨",
      "Отличного настроения! 🎉",
      "Рад всех видеть! 👥",
      "Давно всех не видел! 🤗",
      "Ура, наконец зашёл в чат! 🎊",
      "Привет из солнечного города! 🌞",
      "Доброго времени суток! ⏰",
      "Всем большой привет! 👋🏻",
      "Вечер в хату! 🏠",
      "Как жизнь молодая? 😎",
      "Всем мир! ✌️",
    ],
    music: [
      "Отличная музыка сегодня 🎵",
      "Классный трек играет 🎶",
      "Обожаю эту песню! ❤️",
      "Кто знает исполнителя? 🤔",
      "Добавлю в плейлист 📱",
      "Музыка огонь 🔥",
      "Отличный саунд 🎧",
      "Хит сезона! 🏆",
      "Моя любимая композиция 💕",
      "Танцевальное настроение 💃",
      "Музыка поднимает настроение! 🚀",
      "Этот бит просто космос! 🌌",
      "Кто-то включил мою любимую! 😍",
      "Громче звук! 🔊",
      "Эта песня - моя жизнь! 🎤",
      "Напоминает мне лето 🌴",
      "Хочу на концерт! 🎪",
      "Мурашки по коже! 😱",
      "Слушаю на повторе уже час 🔄",
    ],
    life: [
      "Только что с работы 💼",
      "Готовлю ужин 🍳",
      "Читаю интересную книгу 📚",
      "Смотрю новый фильм 🎬",
      "Встретился с друзьями 👫",
      "Гуляю по городу 🚶‍♂️",
      "Занимаюсь спортом 💪",
      "Отдыхаю дома 🏠",
      "Готовлю завтрак ☕",
      "В отпуске наконец! 🏖️",
      "На выходных 🎉",
      "Планирую вечер 📅",
      "Покупаю продукты 🛒",
      "Убираюсь в квартире 🧹",
      "Учу что-то новое 📖",
      "Гуляю с собакой 🐕",
      "Еду к родителям 🚗",
      "Работаю над проектом 💻",
      "Смотрю сериал 📺",
      "Слушаю подкаст 🎙️",
    ],
    reactions: [
      "Согласен! 👍",
      "Точно! ✅",
      "Да, классно! 😎",
      "Поддерживаю 🤝",
      "Отлично сказано! 👏",
      "Именно так 💯",
      "Круто! 🔥",
      "Супер! ⭐",
      "Молодец! 🎯",
      "Браво! 👏👏",
      "Шикарно! ✨",
      "Восхитительно! 😍",
      "Потрясающе! 🤩",
      "Великолепно! 🌟",
      "Прям в точку! 🎯",
      "Не могу не согласиться! 🙌",
      "Это же очевидно! 😂",
      "Ты прав на 100%! 💯",
    ],
    questions: [
      "Кто тут новенький?",
      "Как настроение у всех? 😊",
      "Что слушаете сейчас? 🎵",
      "Откуда вы, друзья? 🌍",
      "Какая погода у вас? ☀️",
      "Планы на вечер есть? 🌃",
      "Любимый жанр музыки? 🎶",
      "Что посоветуете посмотреть? 📺",
      "Кто играет в игры? 🎮",
      "Есть домашние питомцы? 🐱",
      "Кто где работает? 💼",
      "Хобби какие-то есть? 🎨",
      "Кто откуда родом? 🏠",
      "Какие планы на выходные? 🎉",
    ],
    activities: [
      "Иду в спортзал 💪",
      "Готовлю что-то вкусное 👨‍🍳",
      "Читаю новости 📰",
      "Смотрю сериал на Netflix 📺",
      "Слушаю новый подкаст 🎙️",
      "Убираюсь в квартире 🧽",
      "Работаю над проектом 💻",
      "Изучаю новый язык 🌍",
      "Гуляю с собакой в парке 🐕",
      "Встречаюсь с семьей 👨‍👩‍👧‍👦",
      "Планирую отпуск 🏖️",
      "Готовлюсь ко сну 😴",
      "Пью кофе и думаю ☕",
      "Фотографирую закат 📸",
      "Читаю книгу 📚",
    ],
    conversation: [
      "А вы как думаете?",
      "У меня тоже так было",
      "Интересная тема!",
      "Расскажите больше",
      "А что если...",
      "Кстати, вспомнил",
      "Согласен с предыдущим",
      "Хорошая мысль",
      "Никогда не думал об этом",
      "Точно подмечено",
      "А я вот заметил...",
      "Кто-то ещё так считает?",
      "Поделитесь опытом",
      "Интересно было бы узнать",
    ],
    emotions: [
      "Отличное настроение! 😊",
      "Немного устал сегодня 😅",
      "Такой продуктивный день! 💪",
      "Грустно что-то 😔",
      "Радуюсь каждой минуте! 🌟",
      "Вдохновлен новыми идеями! 💡",
      "Расслабляюсь после работы 😌",
      "Энергии море! ⚡",
      "Думаю о важном 🤔",
      "Счастлив просто так! 😄",
    ],
  };

  const emojis = [
    "😊",
    "🎵",
    "✨",
    "👍",
    "🔥",
    "💪",
    "🌟",
    "❤️",
    "🎉",
    "😄",
    "🎶",
    "🌈",
    "☀️",
    "🎸",
    "🎤",
    "🎧",
    "📱",
    "💫",
    "🚀",
    "🎭",
  ];

  // Уникальные категории фото с большим разнообразием
  const photoCategories = {
    food: {
      baseUrls: [
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
        "https://images.unsplash.com/photo-1548940740-204726a19be3",
      ],
      messages: [
        "Мой обед готов",
        "Приготовил ужин",
        "Завтрак на столе",
        "Перекус",
        "Попробовал новый рецепт",
        "Домашняя выпечка",
        "Ммм, вкусно",
        "Готовлю с любовью",
        "Кулинарные эксперименты",
      ],
    },
    nature: {
      baseUrls: [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        "https://images.unsplash.com/photo-1418065460487-3956ef138ddb",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      ],
      messages: [
        "На прогулке",
        "Красивый вид",
        "Отдых на природе",
        "В парке",
        "Свежий воздух",
        "Любуюсь пейзажем",
        "Вечерняя прогулка",
      ],
    },
    pets: {
      baseUrls: [
        "https://images.unsplash.com/photo-1574158622682-e40e69881006",
        "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e",
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      ],
      messages: ["Мой питомец", "Пушистый друг", "Играем вместе", "Милашка"],
    },
    city: {
      baseUrls: [
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390",
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
        "https://images.unsplash.com/photo-1514565131-fce0801e5785",
      ],
      messages: [
        "Городские виды",
        "Прогулка по центру",
        "Красивая архитектура",
      ],
    },
  };

  // Уникальные видео с динамическими параметрами
  const generateUniqueVideo = () => {
    const videoTypes = [
      "SampleVideo_1280x720_1mb",
      "SampleVideo_640x360_1mb",
      "SampleVideo_1280x720_2mb",
    ];
    const videoType = videoTypes[Math.floor(Math.random() * videoTypes.length)];
    const timestamp = Date.now();
    const randomParam = Math.floor(Math.random() * 10000);

    return {
      url: `https://sample-videos.com/zip/10/mp4/${videoType}.mp4?t=${timestamp}&r=${randomParam}`,
      message: [
        "Посмотрите это видео!",
        "Интересное видео",
        "Классный ролик",
        "Смотрите что нашел",
        "Забавное видео",
        "Рекомендую посмотреть",
      ][Math.floor(Math.random() * 6)],
    };
  };

  const generateUniqueMessage = () => {
    // Используем зарегистрированных ботов как настоящих пользователей
    const availableBots = activeUsers.filter((user) => user.isActive);

    if (availableBots.length === 0) return null;

    const user =
      availableBots[Math.floor(Math.random() * availableBots.length)];
    const messageType = Math.random();
    const timestamp = Date.now();
    const uniqueId = Math.random().toString(36).substr(2, 9);

    // 20% - видео, 30% - фото, 50% - текст
    if (messageType < 0.2) {
      // Уникальное видео сообщение
      const videoId = `${timestamp}_${user.id}_${uniqueId}`;
      const videoUrl = `https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4?id=${videoId}&t=${timestamp}&u=${user.id}`;

      const videoMessages = [
        "Посмотрите что снял!",
        "Интересное видео сегодня",
        "Делюсь моментом",
        "Классный ролик получился",
        "Смотрите что происходит",
        "Забавное видео",
        "Решил поделиться",
        "Вот такие дела",
        "Интересный момент",
        "Рекомендую посмотреть",
      ];

      const contentKey = `video_${videoId}`;
      if (usedContent.has(contentKey)) return null;

      return {
        id: `msg_${timestamp}_${uniqueId}`,
        userName: user.name,
        message:
          videoMessages[Math.floor(Math.random() * videoMessages.length)],
        timestamp: new Date(),
        avatar: user.avatar,
        type: "video" as const,
        mediaUrl: videoUrl,
        contentKey,
      };
    } else if (messageType < 0.5) {
      // Уникальное фото сообщение
      const categories = Object.keys(photoCategories);
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const categoryData =
        photoCategories[category as keyof typeof photoCategories];

      const baseUrl =
        categoryData.baseUrls[
          Math.floor(Math.random() * categoryData.baseUrls.length)
        ];
      const photoId = `${timestamp}_${user.id}_${uniqueId}`;
      const uniqueUrl = `${baseUrl}?w=400&h=400&fit=crop&id=${photoId}&t=${timestamp}&u=${user.id}&r=${Math.random()}`;

      const message =
        categoryData.messages[
          Math.floor(Math.random() * categoryData.messages.length)
        ];

      const contentKey = `photo_${category}_${photoId}`;
      if (usedContent.has(contentKey)) return null;

      return {
        id: `msg_${timestamp}_${uniqueId}`,
        userName: user.name,
        message: message,
        timestamp: new Date(),
        avatar: user.avatar,
        type: "image" as const,
        mediaUrl: uniqueUrl,
        contentKey,
      };
    } else {
      // Живое текстовое сообщение
      const templateCategories = Object.keys(messageTemplates);
      const category =
        templateCategories[
          Math.floor(Math.random() * templateCategories.length)
        ];
      const templates =
        messageTemplates[category as keyof typeof messageTemplates];

      let baseMessage = templates[Math.floor(Math.random() * templates.length)];

      // Персонализация сообщения под конкретного пользователя
      const messageKey = `${category}_${baseMessage}_${user.name}`;
      const variation = messageVariations.get(messageKey) || 0;

      // Добавляем живости через вариации
      if (variation > 0 && Math.random() < 0.4) {
        const personalTouches = [
          "у меня",
          "кстати",
          "сегодня",
          "вообще-то",
          "между прочим",
          "как всегда",
        ];
        const touch =
          personalTouches[Math.floor(Math.random() * personalTouches.length)];
        baseMessage = `${touch}, ${baseMessage.toLowerCase()}`;
      }

      // Добавляем эмоджи для живости
      if (Math.random() < 0.6) {
        baseMessage += ` ${emojis[Math.floor(Math.random() * emojis.length)]}`;
      }

      const contentKey = `text_${messageKey}_${variation}`;
      if (usedContent.has(contentKey)) return null;

      setMessageVariations(
        (prev) => new Map(prev.set(messageKey, variation + 1)),
      );

      return {
        id: `msg_${timestamp}_${uniqueId}`,
        userName: user.name,
        message: baseMessage,
        timestamp: new Date(),
        avatar: user.avatar,
        type: "text" as const,
        contentKey,
      };
    }
  };

  useEffect(() => {
    // Загружаем историю контента
    const stored = localStorage.getItem("unique-chat-content");
    if (stored) {
      try {
        setUsedContent(new Set(JSON.parse(stored)));
      } catch (error) {
        console.error("Ошибка загрузки контента:", error);
      }
    }

    const messageInterval = setInterval(
      () => {
        const message = generateUniqueMessage();
        if (message) {
          onMessageGenerated(message);

          // Обновляем историю использованного контента
          setUsedContent((prev) => {
            const newSet = new Set([...prev, message.contentKey]);

            // Ограничиваем размер истории (сохраняем последние 3000 записей)
            if (newSet.size > 3000) {
              const array = Array.from(newSet);
              return new Set(array.slice(-2000));
            }

            return newSet;
          });
        }
      },
      1200 + Math.random() * 3000, // 1.2-4.2 секунд между сообщениями
    );

    return () => clearInterval(messageInterval);
  }, [activeUsers]);

  // Сохраняем историю контента
  useEffect(() => {
    if (usedContent.size > 0) {
      try {
        localStorage.setItem(
          "unique-chat-content",
          JSON.stringify([...usedContent]),
        );
      } catch (error) {
        console.error("Ошибка сохранения контента:", error);
      }
    }
  }, [usedContent]);

  return null;
};

export default EnhancedAutoMessageGenerator;
