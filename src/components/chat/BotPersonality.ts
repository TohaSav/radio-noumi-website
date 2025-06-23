interface BotPersonality {
  id: string;
  name: string;
  avatar: string;
  style: "casual" | "formal" | "energetic" | "calm" | "funny";
  responsePatterns: string[];
  topicPreferences: string[];
  emojis: string[];
  reactionChance: number;
  replyChance: number;
}

export const BOT_PERSONALITIES: BotPersonality[] = [
  {
    id: "alex",
    name: "Алексей",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    style: "casual",
    responsePatterns: [
      "согласен с тобой",
      "да, точно",
      "я тоже так думаю",
      "полностью поддерживаю",
      "хорошая мысль",
    ],
    topicPreferences: ["спорт", "музыка", "технологии"],
    emojis: ["👍", "😊", "🔥", "💪", "🎵"],
    reactionChance: 0.3,
    replyChance: 0.2,
  },
  {
    id: "maria",
    name: "Мария",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    style: "energetic",
    responsePatterns: [
      "это же супер!",
      "обожаю такое!",
      "как здорово!",
      "прям мое настроение!",
      "давайте еще обсудим",
    ],
    topicPreferences: ["путешествия", "еда", "искусство"],
    emojis: ["✨", "🎉", "😍", "🌟", "💫"],
    reactionChance: 0.4,
    replyChance: 0.3,
  },
  {
    id: "dmitry",
    name: "Дмитрий",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    style: "calm",
    responsePatterns: [
      "интересная точка зрения",
      "стоит подумать",
      "разумно",
      "логично",
      "имеет смысл",
    ],
    topicPreferences: ["наука", "книги", "философия"],
    emojis: ["🤔", "📚", "💡", "🎯", "⚡"],
    reactionChance: 0.2,
    replyChance: 0.4,
  },
  {
    id: "anna",
    name: "Анна",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    style: "funny",
    responsePatterns: [
      "ха-ха, смешно!",
      "это прям в точку",
      "классно сказано",
      "рассмешил до слез",
      "юмор на высоте",
    ],
    topicPreferences: ["юмор", "фильмы", "игры"],
    emojis: ["😂", "🤣", "😄", "🎭", "🎪"],
    reactionChance: 0.5,
    replyChance: 0.25,
  },
  {
    id: "sergey",
    name: "Сергей",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    style: "formal",
    responsePatterns: [
      "благодарю за информацию",
      "весьма познавательно",
      "интересное наблюдение",
      "стоящая идея",
      "ценное замечание",
    ],
    topicPreferences: ["работа", "новости", "образование"],
    emojis: ["👔", "📊", "💼", "🎓", "📈"],
    reactionChance: 0.15,
    replyChance: 0.35,
  },
];

export const getRandomBot = (): BotPersonality => {
  return BOT_PERSONALITIES[
    Math.floor(Math.random() * BOT_PERSONALITIES.length)
  ];
};

export const getBotById = (id: string): BotPersonality | undefined => {
  return BOT_PERSONALITIES.find((bot) => bot.id === id);
};
