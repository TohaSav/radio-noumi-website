import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

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
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const popularEmojis = [
    "😀",
    "😃",
    "😄",
    "😊",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "🤗",
    "🤔",
    "🤭",
    "🤫",
    "🤥",
    "😶",
    "😐",
    "😑",
    "😬",
    "🙄",
    "😯",
    "👍",
    "👎",
    "👌",
    "🤌",
    "🤏",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "🖕",
    "👇",
    "☝️",
    "👋",
    "🤚",
    "🖐",
    "✋",
    "🖖",
    "👏",
    "🙌",
    "🤲",
    "🤝",
    "🙏",
    "✍️",
    "💪",
    "🦾",
    "🦿",
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "🤎",
    "💔",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "💟",
    "☮️",
    "🔥",
    "⭐",
    "🌟",
    "✨",
    "⚡",
    "☀️",
    "🌙",
    "🌈",
    "🎉",
    "🎊",
  ];

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: messageId,
        user: "Вы",
        message: newMessage,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, message].slice(-50));
      setMessageId((prev) => prev + 1);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

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

    // Инициализируем чат с несколькими сообщениями сразу
    const initializeChat = () => {
      const initialMessages: ChatMessage[] = [];
      let id = 0;

      // Создаем 15 начальных сообщений
      for (let i = 0; i < 15; i++) {
        const randomUser =
          userNames[Math.floor(Math.random() * userNames.length)];
        const randomTopic =
          chatTopics[Math.floor(Math.random() * chatTopics.length)];

        initialMessages.push({
          id: id++,
          user: randomUser,
          message: randomTopic,
          timestamp: new Date(Date.now() - (15 - i) * 60000), // Распределяем по времени
        });
      }

      setMessages(initialMessages);
      setMessageId(id);
    };

    // Инициализируем чат сразу
    initializeChat();

    // Добавляем новые сообщения каждые 3 секунды
    const interval = setInterval(() => {
      addMessage();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напишите сообщение..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="px-3 py-2 text-gray-600 hover:text-purple-600 transition-colors"
              type="button"
            >
              <Icon name="Smile" size={20} />
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2 bg-white border rounded-lg shadow-lg p-3 w-64 max-h-48 overflow-y-auto z-10">
                <div className="grid grid-cols-8 gap-1">
                  {popularEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiSelect(emoji)}
                      className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-100 rounded"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
