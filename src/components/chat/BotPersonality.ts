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
    reactionChance: 0.4,
    replyChance: 0.3,
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
    reactionChance: 0.5,
    replyChance: 0.4,
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
    reactionChance: 0.3,
    replyChance: 0.5,
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
    topicPreferences: ["юмор", "развлечения", "мемы"],
    emojis: ["😂", "🤣", "😄", "😆", "🎭"],
    reactionChance: 0.6,
    replyChance: 0.4,
  },
  {
    id: "viktor",
    name: "Виктор",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    style: "formal",
    responsePatterns: [
      "благодарю за информацию",
      "принимаю к сведению",
      "согласен с вами",
      "поддерживаю данную точку зрения",
      "весьма познавательно",
    ],
    topicPreferences: ["бизнес", "новости", "аналитика"],
    emojis: ["👔", "📊", "💼", "📈", "⭐"],
    reactionChance: 0.2,
    replyChance: 0.3,
  },
  {
    id: "olga",
    name: "Ольга",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    style: "energetic",
    responsePatterns: [
      "вау, круто!",
      "это потрясающе!",
      "невероятно!",
      "просто восторг!",
      "фантастика!",
    ],
    topicPreferences: ["мода", "красота", "lifestyle"],
    emojis: ["💄", "👗", "✨", "🌺", "💅"],
    reactionChance: 0.5,
    replyChance: 0.3,
  },
  {
    id: "sergey",
    name: "Сергей",
    avatar:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    style: "casual",
    responsePatterns: ["норм", "ок", "понятно", "согласен", "да, так и есть"],
    topicPreferences: ["игры", "технологии", "авто"],
    emojis: ["🎮", "🚗", "⚡", "🔥", "💯"],
    reactionChance: 0.4,
    replyChance: 0.2,
  },
  {
    id: "elena",
    name: "Елена",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    style: "calm",
    responsePatterns: [
      "мудрые слова",
      "очень верно",
      "глубокая мысль",
      "стоит запомнить",
      "жизненно",
    ],
    topicPreferences: ["психология", "саморазвитие", "медитация"],
    emojis: ["🧘", "🌸", "🕯️", "💭", "🌿"],
    reactionChance: 0.3,
    replyChance: 0.4,
  },
  {
    id: "pavel",
    name: "Павел",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    style: "energetic",
    responsePatterns: [
      "офигенно!",
      "это бомба!",
      "крутяк!",
      "зачетно!",
      "топчик!",
    ],
    topicPreferences: ["спорт", "экстрим", "приключения"],
    emojis: ["🏂", "🏄", "🎿", "🚀", "⚡"],
    reactionChance: 0.5,
    replyChance: 0.3,
  },
  {
    id: "nastya",
    name: "Настя",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
    style: "funny",
    responsePatterns: [
      "ору!",
      "ржу не могу!",
      "угарно!",
      "прикол!",
      "смешарик!",
    ],
    topicPreferences: ["мемы", "тренды", "социальные сети"],
    emojis: ["😂", "🤪", "😜", "🙃", "😎"],
    reactionChance: 0.6,
    replyChance: 0.4,
  },
  {
    id: "roman",
    name: "Роман",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    style: "casual",
    responsePatterns: [
      "интересно",
      "надо подумать",
      "может быть",
      "возможно",
      "не исключено",
    ],
    topicPreferences: ["философия", "история", "культура"],
    emojis: ["🤔", "📖", "🎭", "🏛️", "🎨"],
    reactionChance: 0.3,
    replyChance: 0.4,
  },
  {
    id: "kira",
    name: "Кира",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face",
    style: "energetic",
    responsePatterns: [
      "обожаю!",
      "это мое!",
      "прям в сердечко!",
      "душевно!",
      "трогательно!",
    ],
    topicPreferences: ["музыка", "танцы", "творчество"],
    emojis: ["🎵", "💃", "🎤", "🎨", "❤️"],
    reactionChance: 0.5,
    replyChance: 0.4,
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
