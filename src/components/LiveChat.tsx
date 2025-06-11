import { useState, useEffect, useRef } from "react";

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  timestamp: Date;
}

interface LiveChatProps {
  activeUsers: number;
}

const LiveChat = ({ activeUsers }: LiveChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageId, setMessageId] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);

  const userNames = [
    "Анна",
    "Максим",
    "Дарья",
    "Алексей",
    "София",
    "Дмитрий",
    "Мария",
    "Артем",
    "Елена",
    "Никита",
    "Ольга",
    "Сергей",
    "Виктория",
    "Андрей",
    "Кристина",
    "Иван",
    "Наталья",
    "Михаил",
    "Екатерина",
    "Павел",
    "Юлия",
    "Роман",
    "Анастасия",
    "Игорь",
  ];

  const chatTopics = [
    "Классная музыка сегодня!",
    "А что за трек сейчас играет?",
    "Привет всем!",
    "Отличный плейлист 👌",
    "Давно слушаю это радио",
    "Кто тут из Москвы?",
    "Супер звук!",
    "А есть запись вчерашнего эфира?",
    "Люблю эту станцию ❤️",
    "Какое настроение у музыки!",
    "Спасибо за хорошую музыку",
    "Кто еще не спит?",
    "Отличный вечер для музыки",
    "А что будет дальше?",
    "Круто звучит!",
    "Привет из Питера!",
    "Уже час слушаю",
    "Музыка огонь 🔥",
    "Всем хорошего дня!",
    "А диджей сегодня кто?",
    "Классный бит!",
    "Давно искал такую музыку",
    "Всем привет из чата!",
    "Какая атмосфера...",
    "Музыкальное настроение на весь день",
  ];

  useEffect(() => {
    const addMessage = () => {
      const randomUser =
        userNames[Math.floor(Math.random() * userNames.length)];
      const randomTopic =
        chatTopics[Math.floor(Math.random() * chatTopics.length)];

      const newMessage: ChatMessage = {
        id: messageId,
        user: randomUser,
        message: randomTopic,
        timestamp: new Date(),
      };

      setMessages((prev) => {
        const updated = [...prev, newMessage].slice(-50); // Храним только последние 50 сообщений
        return updated;
      });

      setMessageId((prev) => prev + 1);
    };

    // Добавляем сообщение каждые 3 секунды
    const interval = setInterval(() => {
      addMessage();
    }, 3000);

    // Добавляем первые несколько сообщений
    setTimeout(() => addMessage(), 1000);
    setTimeout(() => addMessage(), 3000);
    setTimeout(() => addMessage(), 5000);

    return () => clearInterval(interval);
  }, [messageId]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
        <h3 className="font-semibold">Живой чат</h3>
        <p className="text-sm opacity-90">
          {Math.floor(activeUsers / 1000)}k активных слушателей
        </p>
      </div>

      <div ref={chatRef} className="h-80 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="animate-fade-in">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {msg.user[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-800">
                    {msg.user}
                  </span>
                  <span className="text-xs text-gray-500">
                    {msg.timestamp.toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-gray-50">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Напишите сообщение..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled
          />
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            disabled
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
