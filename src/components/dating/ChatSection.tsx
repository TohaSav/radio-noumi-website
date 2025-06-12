import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Message, Profile } from "@/types/dating";
import Icon from "@/components/ui/icon";
import ProfileCard from "./ProfileCard";
import { useState, useEffect } from "react";

interface ChatSectionProps {
  messages: Message[];
  activeTab: string;
  selectedChat: string | null;
  onTabChange: (tab: string) => void;
  onChatSelect: (userName: string) => void;
  profiles: Profile[];
  onLike: (profileId: string) => void;
  currentUserId?: string;
  onAddMessage: (message: Message) => void;
}

const ChatSection = ({
  messages,
  activeTab,
  selectedChat,
  onTabChange,
  onChatSelect,
  profiles,
  onLike,
  currentUserId,
  onAddMessage,
}: ChatSectionProps) => {
  const [onlineCount, setOnlineCount] = useState(1500000);
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

      // Добавляем вариации к базовому сообщению
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
      // Если не смогли найти уникальное, создаем с timestamp
      message = `${messageTemplates[Math.floor(Math.random() * messageTemplates.length)]} (${Date.now()})`;
      fullMessage = `${femaleNames[0]}:${message}`;
    }

    setUsedMessages((prev) => new Set([...prev, fullMessage]));
    return { name: fullMessage.split(":")[0], text: message };
  };

  // Счетчик онлайн пользователей
  useEffect(() => {
    const interval = setInterval(
      () => {
        setOnlineCount((prev) => {
          // Более динамичные изменения в широком диапазоне
          const changePercent = (Math.random() - 0.5) * 0.02; // от -1% до +1%
          const change = Math.floor(prev * changePercent);
          const randomBoost = Math.floor(Math.random() * 2000) - 1000; // дополнительный случайный сдвиг
          const newCount = prev + change + randomBoost;
          return Math.max(1500, Math.min(1800000, newCount)); // диапазон 1500-1800000
        });
      },
      1500 + Math.random() * 3000, // каждые 1.5-4.5 секунды
    );

    return () => clearInterval(interval);
  }, []);

  // Генерация сообщений от ботов
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (activeTab === "general") {
          const { name, text } = generateUniqueMessage();
          const newMessage: Message = {
            id: `bot_${Date.now()}_${Math.random()}`,
            text,
            userId: `bot_${name}`,
            userName: name,
            chatType: "general",
            timestamp: new Date(),
          };
          onAddMessage(newMessage);
        }
      },
      5000 + Math.random() * 10000,
    ); // каждые 5-15 секунд

    return () => clearInterval(interval);
  }, [activeTab, onAddMessage]);

  const generalMessages = messages.filter((msg) => msg.chatType === "general");
  const privateMessages = messages.filter(
    (msg) =>
      msg.chatType === "private" &&
      (msg.chatType === selectedChat || msg.userName === selectedChat),
  );

  return (
    <div className="flex-1 flex flex-col">
      <Tabs
        value={activeTab}
        onValueChange={onTabChange}
        className="flex-1 flex flex-col"
      >
        <TabsList className="bg-white/90 p-1 m-4 mb-2 shadow-sm relative">
          <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-2 text-xs text-green-600 font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>{onlineCount.toLocaleString()}</span>
          </div>
          <TabsTrigger value="general" className="flex-1">
            Общий чат
          </TabsTrigger>
          <TabsTrigger value="profiles" className="flex-1">
            Анкеты
          </TabsTrigger>
          {selectedChat && (
            <TabsTrigger value="private" className="flex-1">
              Личные с {selectedChat}
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent
          value="general"
          className="flex-1 overflow-y-auto px-6 pb-4"
        >
          <div className="space-y-4">
            {generalMessages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white/80 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <Icon name="User" size={14} className="text-white" />
                  </div>
                  <button
                    onClick={() => onChatSelect(msg.userName)}
                    className="font-semibold text-pink-600 hover:underline"
                  >
                    {msg.userName}
                  </button>
                  <span className="text-xs text-gray-500">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-800">{msg.text}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profiles" className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onLike={onLike}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        </TabsContent>

        {selectedChat && (
          <TabsContent
            value="private"
            className="flex-1 overflow-y-auto px-6 pb-4"
          >
            <div className="space-y-4">
              {privateMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-blue-50 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Icon name="User" size={14} className="text-white" />
                    </div>
                    <span className="font-semibold text-blue-700">
                      {msg.userName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-800">{msg.text}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ChatSection;
