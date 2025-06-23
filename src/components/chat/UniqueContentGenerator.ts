interface UniqueContent {
  id: string;
  type: "text" | "image" | "video";
  content: string;
  timestamp: number;
  botId: string;
  hash: string;
}

class UniqueContentGenerator {
  private usedContent: Set<string> = new Set();
  private contentHistory: Map<string, number> = new Map();
  private photoCategories = [
    "food",
    "nature",
    "city",
    "pets",
    "technology",
    "art",
    "sport",
    "travel",
    "cars",
    "music",
    "fashion",
    "architecture",
    "books",
    "coffee",
    "flowers",
    "sunset",
    "ocean",
    "mountains",
    "street",
    "interior",
    "gadgets",
    "gaming",
    "fitness",
    "cooking",
    "makeup",
    "lifestyle",
    "workspace",
    "animals",
  ];

  private videoCategories = [
    "nature",
    "city",
    "food",
    "travel",
    "sport",
    "music",
    "art",
    "technology",
    "lifestyle",
    "pets",
    "fitness",
    "cooking",
    "gaming",
    "fashion",
    "cars",
  ];

  private textTemplates = {
    casual: [
      "кто еще здесь?",
      "привет всем!",
      "как дела?",
      "что нового?",
      "классная погода сегодня",
      "кто слушает радио?",
      "отличная музыка",
      "согласен полностью",
      "точно так же думаю",
      "интересно",
      "круто!",
      "прям в точку",
      "да уж",
      "конечно",
      "абсолютно верно",
      "супер",
      "отлично сказано",
      "мне нравится",
      "хорошая идея",
      "поддерживаю",
      "давайте обсудим",
      "что думаете?",
      "кто со мной?",
      "интересная тема",
      "расскажите больше",
      "а вы как считаете?",
      "полезная информация",
      "спасибо за совет",
      "буду иметь в виду",
      "надо попробовать",
    ],
    energetic: [
      "ух ты!",
      "это же супер!",
      "обожаю такое!",
      "как здорово!",
      "прям мое настроение!",
      "давайте еще обсудим!",
      "это потрясающе!",
      "невероятно круто!",
      "просто восторг!",
      "фантастика!",
      "шикарно!",
      "вау, впечатляет!",
      "это же бомба!",
      "офигенно!",
      "класс!",
      "обалденно!",
      "кайф!",
      "топчик!",
      "зацените это!",
      "мега круто!",
      "просто огонь!",
      "улет!",
      "ребята, это нечто!",
      "я в восторге!",
      "какая красота!",
      "это шедевр!",
      "браво!",
      "аплодирую!",
      "респект!",
    ],
    calm: [
      "интересная точка зрения",
      "стоит подумать",
      "разумно",
      "логично",
      "имеет смысл",
      "взвешенное мнение",
      "справедливо",
      "обдуманно",
      "мудро",
      "практично",
      "рационально",
      "последовательно",
      "грамотно",
      "основательно",
      "продуманно",
      "целесообразно",
      "разборчиво",
      "размеренно",
      "вдумчиво",
      "осмысленно",
      "конструктивно",
      "аналитически",
      "систематично",
      "методично",
      "планомерно",
    ],
    funny: [
      "ха-ха, смешно!",
      "это прям в точку",
      "классно сказано",
      "рассмешил до слез",
      "юмор на высоте",
      "ржу не могу!",
      "умора!",
      "смеюсь в голос!",
      "это анекдот!",
      "прикол!",
      "ахахах!",
      "ору!",
      "жесть какая!",
      "угарно!",
      "ржака!",
      "смешарик!",
      "комик!",
      "балагур!",
      "весельчак!",
      "шутник!",
      "а вы хороши!",
      "остроумно!",
      "изящно!",
      "тонко подмечено!",
      "с юмором у вас все в порядке!",
      "талант!",
      "мастерски!",
    ],
    formal: [
      "благодарю за информацию",
      "принимаю к сведению",
      "согласен с вами",
      "поддерживаю данную точку зрения",
      "весьма познавательно",
      "ценная информация",
      "полезные сведения",
      "конструктивно",
      "профессионально",
      "компетентно",
      "квалифицированно",
      "грамотно",
      "добротно",
      "качественно",
      "основательно",
      "детально",
    ],
  };

  private imageMessages = {
    food: [
      "вкуснота!",
      "аппетитно выглядит",
      "слюнки текут",
      "ням-ням",
      "готовлю такое же",
    ],
    nature: [
      "красота!",
      "какой вид!",
      "обожаю природу",
      "breathtaking",
      "умиротворяет",
    ],
    city: [
      "городские джунгли",
      "люблю такие виды",
      "архитектура супер",
      "мегаполис",
      "урбанистика",
    ],
    pets: [
      "милашка!",
      "такой хорошенький",
      "обожаю животных",
      "лапочка",
      "хочу такого",
    ],
    technology: [
      "крутая штука",
      "прогресс не стоит",
      "технологии будущего",
      "инновации",
      "хай-тек",
    ],
    art: [
      "произведение искусства",
      "талантливо",
      "креативно",
      "вдохновляет",
      "эстетика",
    ],
    sport: [
      "мотивирует",
      "спорт - это жизнь",
      "здоровый образ жизни",
      "сила духа",
      "достижения",
    ],
    travel: [
      "хочу туда",
      "путешествия - это жизнь",
      "следующий пункт",
      "вдохновляет",
      "мечта",
    ],
  };

  private videoMessages = [
    "смотрите что снял",
    "интересное видео получилось",
    "делюсь роликом",
    "посмотрите этот момент",
    "запечатлел красоту",
    "видео дня",
    "крутые кадры",
    "атмосферное видео",
    "живые эмоции в кадре",
    "короткий ролик",
    "динамичное видео",
    "в движении",
    "life in motion",
    "момент жизни",
    "spontaneous",
    "реальная жизнь",
    "без фильтров",
    "как это было",
    "behind the scenes",
    "процесс в действии",
  ];

  constructor() {
    this.loadHistory();
  }

  // Генерация уникального хеша для контента
  private generateHash(content: string, type: string, botId: string): string {
    const fullContent = `${type}_${botId}_${content}_${Date.now()}`;
    // Простая хеш-функция для UTF-8 строк
    let hash = 0;
    for (let i = 0; i < fullContent.length; i++) {
      const char = fullContent.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Преобразуем в 32-битное целое
    }
    return Math.abs(hash).toString(16);
  }

  // Проверка уникальности
  private isUnique(hash: string): boolean {
    return !this.usedContent.has(hash);
  }

  // Добавление в историю
  private addToHistory(hash: string): void {
    this.usedContent.add(hash);
    this.saveHistory();
  }

  // Генерация уникального текстового сообщения
  generateUniqueText(botId: string, style: string): string | null {
    const templates =
      this.textTemplates[style as keyof typeof this.textTemplates] ||
      this.textTemplates.casual;
    const maxAttempts = 100;

    for (let i = 0; i < maxAttempts; i++) {
      const template = templates[Math.floor(Math.random() * templates.length)];
      const variation = this.addPersonalization(template, style);
      const hash = this.generateHash(variation, "text", botId);

      if (this.isUnique(hash)) {
        this.addToHistory(hash);
        return variation;
      }
    }

    return null;
  }

  // Генерация уникального изображения
  generateUniqueImage(botId: string): { url: string; message: string } | null {
    const category =
      this.photoCategories[
        Math.floor(Math.random() * this.photoCategories.length)
      ];
    const timestamp = Date.now();
    const uniqueId = Math.random().toString(36).substr(2, 12);
    const randomSeed = Math.floor(Math.random() * 10000);

    const imageUrl = `https://picsum.photos/400/300?random=${uniqueId}&t=${timestamp}&bot=${botId}&seed=${randomSeed}&category=${category}`;
    const messages =
      this.imageMessages[category as keyof typeof this.imageMessages] ||
      this.imageMessages.nature;
    const message = messages[Math.floor(Math.random() * messages.length)];
    const hash = this.generateHash(imageUrl, "image", botId);

    if (this.isUnique(hash)) {
      this.addToHistory(hash);
      return { url: imageUrl, message };
    }

    return null;
  }

  // Генерация уникального видео
  generateUniqueVideo(botId: string): { url: string; message: string } | null {
    const category =
      this.videoCategories[
        Math.floor(Math.random() * this.videoCategories.length)
      ];
    const timestamp = Date.now();
    const uniqueId = Math.random().toString(36).substr(2, 12);
    const randomSeed = Math.floor(Math.random() * 10000);

    const videoUrl = `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4?bot=${botId}&t=${timestamp}&id=${uniqueId}&seed=${randomSeed}&cat=${category}`;
    const message =
      this.videoMessages[Math.floor(Math.random() * this.videoMessages.length)];
    const hash = this.generateHash(videoUrl, "video", botId);

    if (this.isUnique(hash)) {
      this.addToHistory(hash);
      return { url: videoUrl, message };
    }

    return null;
  }

  // Генерация контекстного ответа
  generateContextualReply(
    originalMessage: string,
    botStyle: string,
  ): string | null {
    const context = this.analyzeMessageContext(originalMessage);
    const replyTemplates = this.getReplyTemplates(context, botStyle);

    if (replyTemplates.length === 0) return null;

    const maxAttempts = 20;
    for (let i = 0; i < maxAttempts; i++) {
      const template =
        replyTemplates[Math.floor(Math.random() * replyTemplates.length)];
      const reply = this.personalizeReply(template, originalMessage, botStyle);
      const hash = this.generateHash(
        reply + originalMessage,
        "reply",
        botStyle,
      );

      if (this.isUnique(hash)) {
        this.addToHistory(hash);
        return reply;
      }
    }

    return null;
  }

  // Анализ контекста сообщения
  private analyzeMessageContext(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("привет") || lowerMessage.includes("здравствуй"))
      return "greeting";
    if (lowerMessage.includes("музык") || lowerMessage.includes("песн"))
      return "music";
    if (lowerMessage.includes("еда") || lowerMessage.includes("готов"))
      return "food";
    if (lowerMessage.includes("работ") || lowerMessage.includes("учеб"))
      return "work";
    if (lowerMessage.includes("спорт") || lowerMessage.includes("трениров"))
      return "sport";
    if (lowerMessage.includes("фильм") || lowerMessage.includes("кино"))
      return "movies";
    if (lowerMessage.includes("погод")) return "weather";
    if (lowerMessage.includes("устал") || lowerMessage.includes("устала"))
      return "tired";
    if (lowerMessage.includes("весел") || lowerMessage.includes("радост"))
      return "happy";
    if (lowerMessage.includes("грустн") || lowerMessage.includes("печаль"))
      return "sad";

    return "general";
  }

  // Получение шаблонов ответов по контексту
  private getReplyTemplates(context: string, style: string): string[] {
    const templates: Record<string, string[]> = {
      greeting: ["привет и тебе!", "здравствуй!", "хорошего дня!"],
      music: ["отличная музыка", "классный вкус", "я тоже люблю"],
      food: ["выглядит вкусно", "аппетитно", "поделись рецептом"],
      work: ["понимаю тебя", "удачи в делах", "держись"],
      sport: ["молодец", "так держать", "отличная мотивация"],
      movies: ["хороший фильм", "интересный выбор", "стоит посмотреть"],
      weather: ["да, погода сегодня", "согласен насчет погоды"],
      tired: ["отдохни", "не переутомляйся", "бери перерыв"],
      happy: ["здорово", "отлично", "радуюсь за тебя"],
      sad: ["все будет хорошо", "держись", "не грусти"],
      general: ["интересно", "понятно", "согласен"],
    };

    return templates[context] || templates.general;
  }

  // Персонализация ответа
  private personalizeReply(
    template: string,
    originalMessage: string,
    style: string,
  ): string {
    const personalizations = {
      casual: ["кстати", "да", "ну"],
      formal: ["действительно", "безусловно"],
      energetic: ["точно!", "супер!", "классно!"],
      calm: ["думаю", "полагаю"],
      funny: ["ха-ха", "смешно", "прикольно"],
    };

    const personalization =
      personalizations[style as keyof typeof personalizations];
    if (personalization && Math.random() < 0.3) {
      const prefix =
        personalization[Math.floor(Math.random() * personalization.length)];
      return `${prefix}, ${template}`;
    }

    return template;
  }

  // Генерация URL изображения
  private generateImageUrl(
    category: string,
    timestamp: number,
    uniqueId: string,
    botId: string,
  ): string {
    const baseUrls: Record<string, string[]> = {
      food: [
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
      ],
      nature: [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        "https://images.unsplash.com/photo-1418065460487-3956ef138ddb",
      ],
      city: [
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390",
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
      ],
      pets: [
        "https://images.unsplash.com/photo-1574158622682-e40e69881006",
        "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e",
      ],
      technology: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      ],
      art: [
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
      ],
      sport: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643",
      ],
      travel: [
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      ],
    };

    const urls = baseUrls[category] || baseUrls.nature;
    const baseUrl = urls[Math.floor(Math.random() * urls.length)];

    return `${baseUrl}?w=400&h=400&fit=crop&bot=${botId}&t=${timestamp}&id=${uniqueId}&cat=${category}&r=${Math.random()}`;
  }

  // Генерация сообщения для изображения
  private generateImageMessage(category: string): string {
    const messages =
      this.imageMessages[category as keyof typeof this.imageMessages] ||
      this.imageMessages.nature;
    return messages[Math.floor(Math.random() * messages.length)];
  }

  // Получение шаблонов по стилю
  private getTemplatesByStyle(style: string): string[] {
    const styleTemplates: Record<string, string[]> = {
      casual: [
        "что нового?",
        "как дела?",
        "привет всем",
        "отличный день",
        "хорошее настроение",
        "все супер",
        "классная погода",
      ],
      formal: [
        "доброго времени суток",
        "хорошего дня",
        "приятного вечера",
        "благодарю за внимание",
        "интересная беседа",
      ],
      energetic: [
        "отличное настроение!",
        "супер день!",
        "все просто класс!",
        "энергии море!",
        "позитив зашкаливает!",
        "жизнь прекрасна!",
      ],
      calm: [
        "спокойный вечер",
        "размышляю о жизни",
        "тихий момент",
        "приятная атмосфера",
        "мирное настроение",
      ],
      funny: [
        "смешная история",
        "анекдот дня",
        "юмор поднимает настроение",
        "смех продлевает жизнь",
        "веселые моменты",
      ],
    };

    return styleTemplates[style] || styleTemplates.casual;
  }

  // Персонализация сообщения
  private addPersonalization(template: string, style: string): string {
    const variations = [
      template,
      `${template} 😊`,
      `${template}!`,
      `${template} 👍`,
      `${template} ✨`,
      `а ${template}`,
      `${template}, согласны?`,
      `${template} 💫`,
      `${template} 🔥`,
      `реально ${template}`,
    ];

    return variations[Math.floor(Math.random() * variations.length)];
  }

  // Сохранение истории
  private saveHistory(): void {
    try {
      const historyArray = Array.from(this.usedContent);
      localStorage.setItem("chatContentHistory", JSON.stringify(historyArray));
    } catch (error) {
      console.warn("Не удалось сохранить историю контента:", error);
    }
  }

  // Загрузка истории
  private loadHistory(): void {
    try {
      const saved = localStorage.getItem("chatContentHistory");
      if (saved) {
        const historyArray = JSON.parse(saved);
        this.usedContent = new Set(historyArray);
      }
    } catch (error) {
      console.warn("Не удалось загрузить историю контента:", error);
    }
  }

  // Очистка старой истории (вызывается периодически)
  cleanHistory(): void {
    if (this.usedContent.size > 5000) {
      const array = Array.from(this.usedContent);
      this.usedContent = new Set(array.slice(-3000));
      this.saveHistory();
    }
  }
}

export default UniqueContentGenerator;
