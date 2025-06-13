import { useEffect, useState } from "react";
import { Message } from "@/types/dating";

const USED_MESSAGES_KEY = "dating_chat_used_messages";

interface BotMessageGeneratorProps {
  isActive: boolean;
  onMessageGenerated: (message: Message) => void;
}

const BotMessageGenerator = ({
  isActive,
  onMessageGenerated,
}: BotMessageGeneratorProps) => {
  const [usedMessages, setUsedMessages] = useState<Set<string>>(new Set());

  const femaleNames = [
    "Анна",
    "Мария",
    "Елена",
    "Екатерина",
    "Наталья",
    "Ольга",
    "Татьяна",
    "Светлана",
    "Ирина",
    "Юлия",
    "Дарья",
    "Алина",
    "Виктория",
    "Полина",
    "Кристина",
    "Валерия",
    "София",
    "Милана",
    "Карина",
    "Диана",
  ];

  const maleNames = [
    "Александр",
    "Дмитрий",
    "Максим",
    "Сергей",
    "Андрей",
    "Алексей",
    "Артём",
    "Илья",
    "Кирилл",
    "Михаил",
    "Никита",
    "Матвей",
    "Роман",
    "Егор",
    "Арсений",
    "Иван",
    "Денис",
    "Тимур",
    "Владислав",
    "Павел",
  ];

  const messageTemplates = [
    "Привет всем! Как дела? 😊",
    "Кто тут новенький?",
    "Отличная погода сегодня!",
    "Ищу интересных людей для общения",
    "Всем хорошего дня! ☀️",
    "Кто любит путешествовать?",
    "Может кто-то хочет прогуляться?",
    "Ищу единомышленников",
    "Привет! Расскажите о себе",
    "Как провели выходные?",
    "Кто увлекается спортом?",
    "Давайте знакомиться! 💫",
    "Отличное настроение сегодня!",
    "Ищу серьезные отношения",
    "Кто любит кино?",
    "Прекрасный вечер для знакомств",
    "Всем привет из Москвы!",
    "Кто за активный отдых?",
    "Ищу девушку/парня для общения",
    "Как ваши планы на вечер?",
    "Кто любит музыку?",
    "Давайте дружить! 🤝",
    "Отличный день для новых знакомств",
    "Кто тут из Питера?",
    "Ищу интересную компанию",
    "Всем удачного дня!",
    "Кто увлекается фотографией?",
    "Может встретимся?",
    "Хорошего всем настроения! 🌟",
    "Ищу вторую половинку",
  ];

  const cities = [
    "Москва",
    "СПб",
    "Екатеринбург",
    "Новосибирск",
    "Казань",
    "Краснодар",
  ];

  useEffect(() => {
    const savedUsedMessages = localStorage.getItem(USED_MESSAGES_KEY);
    if (savedUsedMessages) {
      try {
        const parsedMessages = JSON.parse(savedUsedMessages);
        setUsedMessages(new Set(parsedMessages));
      } catch (error) {
        console.error("Ошибка загрузки использованных сообщений:", error);
      }
    }
  }, []);

  const saveUsedMessages = (messages: Set<string>) => {
    try {
      localStorage.setItem(USED_MESSAGES_KEY, JSON.stringify([...messages]));
    } catch (error) {
      console.error("Ошибка сохранения использованных сообщений:", error);
    }
  };

  const generateUniqueMessage = () => {
    let attempts = 0;
    let message = "";
    let fullMessage = "";

    do {
      const names = Math.random() > 0.5 ? femaleNames : maleNames;
      const name = names[Math.floor(Math.random() * names.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const template =
        messageTemplates[Math.floor(Math.random() * messageTemplates.length)];

      const variations = [
        template,
        `${template} Кто из ${city}?`,
        `${template} 💕`,
        `${name} здесь! ${template}`,
        `${template} Жду ответа!`,
      ];

      message = variations[Math.floor(Math.random() * variations.length)];
      fullMessage = `${name}:${message}`;
      attempts++;
    } while (usedMessages.has(fullMessage) && attempts < 50);

    if (attempts >= 50) {
      message = `${messageTemplates[Math.floor(Math.random() * messageTemplates.length)]} (${Date.now()})`;
      fullMessage = `${femaleNames[0]}:${message}`;
    }

    const newUsedMessages = new Set([...usedMessages, fullMessage]);
    setUsedMessages(newUsedMessages);
    saveUsedMessages(newUsedMessages);
    return { name: fullMessage.split(":")[0], text: message };
  };

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(
      () => {
        const { name, text } = generateUniqueMessage();
        const newMessage: Message = {
          id: `bot_${Date.now()}_${Math.random()}`,
          text,
          userId: `bot_${name}`,
          userName: name,
          chatType: "general",
          timestamp: new Date(),
        };
        onMessageGenerated(newMessage);
      },
      5000 + Math.random() * 10000,
    );

    return () => clearInterval(interval);
  }, [isActive, onMessageGenerated]);

  return null;
};

export default BotMessageGenerator;
