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
  ];

  constructor() {
    this.loadHistory();
  }

  // Генерация уникального хеша для контента
  private generateHash(content: string, type: string, botId: string): string {
    return btoa(`${type}_${botId}_${content}_${Date.now()}`).replace(
      /[^a-zA-Z0-9]/g,
      "",
    );
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
    const templates = this.getTemplatesByStyle(style);
    const maxAttempts = 50;

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
    const uniqueId = Math.random().toString(36).substr(2, 9);

    const imageUrl = this.generateImageUrl(
      category,
      timestamp,
      uniqueId,
      botId,
    );
    const message = this.generateImageMessage(category);
    const hash = this.generateHash(imageUrl, "image", botId);

    if (this.isUnique(hash)) {
      this.addToHistory(hash);
      return { url: imageUrl, message };
    }

    return null;
  }

  // Генерация уникального видео
  generateUniqueVideo(botId: string): { url: string; message: string } | null {
    const timestamp = Date.now();
    const uniqueId = Math.random().toString(36).substr(2, 9);

    const videoUrl = `https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4?bot=${botId}&t=${timestamp}&id=${uniqueId}&r=${Math.random()}`;
    const messages = [
      "смотрите что снял",
      "интересное видео получилось",
      "делюсь моментом",
      "классный ролик",
      "вот такие дела",
      "записал для вас",
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];
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
    const messages: Record<string, string[]> = {
      food: ["приготовил обед", "вкусная еда", "мой кулинарный шедевр"],
      nature: ["красивый вид", "на прогулке", "природа восхищает"],
      city: [
        "городские пейзажи",
        "архитектура впечатляет",
        "прогулка по центру",
      ],
      pets: ["мой питомец", "милашка", "лучший друг"],
      technology: [
        "новые технологии",
        "интересное устройство",
        "прогресс не стоит",
      ],
      art: ["произведение искусства", "творчество вдохновляет", "красота"],
      sport: ["тренировка", "спорт это жизнь", "активный день"],
      travel: ["путешествие", "новые места", "исследую мир"],
    };

    const categoryMessages = messages[category] || messages.nature;
    return categoryMessages[
      Math.floor(Math.random() * categoryMessages.length)
    ];
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

  // Добавление персонализации
  private addPersonalization(template: string, style: string): string {
    const personalTouches = [
      "кстати",
      "между прочим",
      "вообще-то",
      "как всегда",
    ];

    if (Math.random() < 0.3) {
      const touch =
        personalTouches[Math.floor(Math.random() * personalTouches.length)];
      return `${touch}, ${template}`;
    }

    return template;
  }

  // Сохранение истории
  private saveHistory(): void {
    try {
      localStorage.setItem(
        "unique-bot-content",
        JSON.stringify([...this.usedContent]),
      );
    } catch (error) {
      console.error("Ошибка сохранения истории:", error);
    }
  }

  // Загрузка истории
  private loadHistory(): void {
    try {
      const stored = localStorage.getItem("unique-bot-content");
      if (stored) {
        this.usedContent = new Set(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Ошибка загрузки истории:", error);
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
