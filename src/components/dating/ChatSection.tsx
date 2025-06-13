import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Message, Profile } from "@/types/dating";
import Icon from "@/components/ui/icon";
import ProfileCard from "./ProfileCard";
import { useState, useEffect, useRef } from "react";

// Ключи для localStorage
const STORAGE_KEY = "dating_chat_messages";
const USED_MESSAGES_KEY = "dating_chat_used_messages";

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
  genderFilter: "all" | "male" | "female";
  onGenderFilterChange: (filter: "all" | "male" | "female") => void;
  onViewProfile: (profile: Profile) => void;
  onCreateProfile: () => void;
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
  genderFilter,
  onGenderFilterChange,
  onViewProfile,
  onCreateProfile,
}: ChatSectionProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [onlineCount, setOnlineCount] = useState(1500000);
  const [usedMessages, setUsedMessages] = useState<Set<string>>(new Set());

  // Автоматический скролл к последним сообщениям
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Загрузка сохраненных использованных сообщений при инициализации
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

  // Сохранение использованных сообщений в localStorage
  const saveUsedMessages = (messages: Set<string>) => {
    try {
      localStorage.setItem(USED_MESSAGES_KEY, JSON.stringify([...messages]));
    } catch (error) {
      console.error("Ошибка сохранения использованных сообщений:", error);
    }
  };

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

    const newUsedMessages = new Set([...usedMessages, fullMessage]);
    setUsedMessages(newUsedMessages);
    saveUsedMessages(newUsedMessages);
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
    <div className="flex-1 flex flex-col min-h-0 h-full">
      <Tabs
        value={activeTab}
        onValueChange={onTabChange}
        className="flex-1 flex flex-col min-h-0 h-full"
      >
        <TabsList className="bg-white/90 p-1 m-2 md:m-4 mb-2 shadow-sm relative flex-wrap md:flex-nowrap flex-shrink-0">
          <div className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 text-xs text-green-600 font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>{onlineCount.toLocaleString()}</span>
          </div>
          <TabsTrigger value="general" className="flex-1 text-xs md:text-sm">
            Общий чат
          </TabsTrigger>
          <TabsTrigger value="profiles" className="flex-1 text-xs md:text-sm">
            Анкеты
          </TabsTrigger>
          {selectedChat && (
            <TabsTrigger value="private" className="flex-1 text-xs md:text-sm">
              Личные
            </TabsTrigger>
          )}
        </TabsList>

        {/* Мобильный счетчик онлайн */}
        <div className="md:hidden flex items-center justify-center gap-2 text-xs text-green-600 font-medium pb-2 flex-shrink-0">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span>{onlineCount.toLocaleString()} онлайн</span>
        </div>

        <TabsContent value="general" className="flex-1 min-h-0 h-full">
          <div
            ref={messagesContainerRef}
            className="h-full overflow-y-auto px-2 md:px-6 pb-4 space-y-3 md:space-y-4"
            style={{
              height: "calc(100vh - 240px)",
              minHeight: "400px",
              maxHeight: "calc(100vh - 200px)",
            }}
          >
            {generalMessages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white/80 p-3 md:p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <Icon
                      name="User"
                      size={12}
                      className="md:w-3.5 md:h-3.5 text-white"
                    />
                  </div>
                  <button
                    onClick={() => onChatSelect(msg.userName)}
                    className="font-semibold text-pink-600 hover:underline text-sm md:text-base"
                  >
                    {msg.userName}
                  </button>
                  <span className="text-xs text-gray-500">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-800 text-sm md:text-base">{msg.text}</p>
              </div>
            ))}
          </div>
          </div>
        </TabsContent>

        <TabsContent
          value="profiles"
          className="flex-1 min-h-0 h-full"
        >
          <div 
            className="h-full overflow-y-auto p-2 md:p-6"
            style={{ 
              height: 'calc(100vh - 240px)', 
              minHeight: '400px',
              maxHeight: 'calc(100vh - 200px)'
            }}
          >
          {/* Кнопка создания анкеты */}
          <div className="mb-4">
            <Button
              onClick={onCreateProfile}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить анкету
            </Button>
          </div>

          {/* Фильтр по полу */}
          <div className="flex gap-2 mb-4 bg-white/90 p-2 rounded-lg shadow-sm">
            <button
              onClick={() => onGenderFilterChange("all")}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                genderFilter === "all"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Все
            </button>
            <button
              onClick={() => onGenderFilterChange("male")}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                genderFilter === "male"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Мужчины
            </button>
            <button
              onClick={() => onGenderFilterChange("female")}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                genderFilter === "female"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Женщины
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onLike={onLike}
                onViewProfile={onViewProfile}
                currentUserId={currentUserId}
              />
            ))}
          </div>
          </div>
        </TabsContent>

        {selectedChat && (
          <TabsContent
            value="private"
            className="flex-1 min-h-0 h-full"
          >
            <div 
              className="h-full overflow-y-auto px-2 md:px-6 pb-4 space-y-3 md:space-y-4"
              style={{ 
                height: 'calc(100vh - 240px)', 
                minHeight: '400px',
                maxHeight: 'calc(100vh - 200px)'
              }}
            >
              {privateMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-blue-50 p-3 md:p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-2 md:gap-3 mb-2">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Icon
                        name="User"
                        size={12}
                        className="md:w-3.5 md:h-3.5 text-white"
                      />
                    </div>
                    <span className="font-semibold text-blue-700 text-sm md:text-base">
                      {msg.userName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm md:text-base">
                    {msg.text}
                  </p>
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
