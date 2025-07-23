import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import ChatMessage from "@/components/chat/ChatMessage";
import EmojiPicker from "@/components/chat/EmojiPicker";

interface Message {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
  type: 'text' | 'image';
  imageUrl?: string;
  isOwnMessage?: boolean;
}

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Добро пожаловать в чат Радио Noumi! 🎵',
      author: 'Система',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [userName] = useState(`Слушатель${Math.floor(Math.random() * 1000)}`);
  const [onlineCount, setOnlineCount] = useState(3150084);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Функция для форматирования числа в сокращенный вид
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Обновление счетчика онлайн пользователей (синхронно с радио)
  useEffect(() => {
    const updateOnlineCount = () => {
      setOnlineCount((current) => {
        // Реалистичные изменения: ±0.5-2% от текущего значения
        const changePercent = Math.random() * 0.035 - 0.0175;
        const change = Math.floor(current * changePercent);
        let newValue = current + change;
        
        // Ограничиваем значение разумными пределами
        newValue = Math.max(3150084, Math.min(96350521, newValue));
        
        return newValue;
      });
    };

    // Первое обновление через 30 секунд
    const initialTimeout = setTimeout(updateOnlineCount, 30000);

    // Затем обновления каждые 3-7 минут
    const interval = setInterval(
      updateOnlineCount,
      Math.random() * 240000 + 180000,
    );

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Система автоматических сообщений от виртуальных пользователей
  useEffect(() => {
    const userNames = [
      'МузыкальныйФан', 'Анна_2024', 'Дмитрий_Москва', 'СветланаК', 'Алексей99',
      'MusicLover', 'Елена_СПб', 'Михаил_Радио', 'Наташа_Минск', 'Владимир_Екб',
      'Ольга_Music', 'Сергей_Казань', 'Мария_Киев', 'АндрейМ', 'Юлия_Самара',
      'НиколайБ', 'Кристина_НН', 'Максим_Омск', 'Ирина_Уфа', 'Роман_Тула'
    ];

    const messageTemplates = [
      'Эта песня просто огонь! 🔥',
      'Обожаю это радио ❤️',
      'Отличная музыка для работы 👍',
      'Кто знает название этого трека?',
      'Уже час слушаю, не могу оторваться!',
      'Супер подборка сегодня!',
      'Привет всем в чате! 👋',
      'Эта мелодия напоминает мне детство...',
      'Радио Noumi - лучшее! 🎵',
      'Кто еще из Москвы слушает?',
      'Добавьте больше рока, пожалуйста!',
      'Идеально для утренней пробежки 🏃‍♂️',
      'Эту песню искал уже месяц!',
      'Спасибо за отличное настроение! 😊',
      'Слушаю на работе, коллеги завидуют 😄',
      'Можно больше классики?',
      'Этот исполнитель мой любимый!',
      'Радио играет уже 3 часа подряд 🎧',
      'Отличный звук, качество супер!',
      'Всем хорошего дня! ☀️',
      'Эта композиция - шедевр!',
      'Слушаю из Германии, привет! 🇩🇪',
      'Ностальгия... помню эту песню',
      'Включил на всю квартиру 🔊',
      'Жена тоже подсела на это радио 👫',
      'Лучшая станция в интернете!',
      'Эмоции зашкаливают от этого трека! 🎶',
      'Кто-нибудь знает исполнителя?',
      'Уже добавил в плейлист Spotify',
      'Дети танцуют под эту музыку 💃',
      'Радио спасает от грусти',
      'Коллекционирую такую музыку',
      'Играет в машине на максимум! 🚗',
      'Соседи стучат в стену 😅',
      'Концерт этого артиста был бы крут!',
      'Всегда мечтал услышать это в эфире',
      'Радио работает без рекламы, класс!',
      'Слушаю в наушниках на работе',
      'Эта песня - мой будильник 🔔',
      'Включил папе, ему тоже нравится',
      'Музыка объединяет людей! 🤝',
      'Такого качества звука не ожидал',
      'Можно список треков на сегодня?',
      'Записываю эфир на диск 💿',
      'Случайно нашел радио, не жалею!',
      'Уже рассказал всем друзьям',
      'Слушаю каждый день в 18:00',
      'Этот DJ знает толк в музыке!',
      'Хочу такую же подборку дома',
      'Музыка для души, спасибо! 💝'
    ];

    const reactions = [
      '😍', '🔥', '💯', '👏', '🎵', '❤️', '🎶', '✨', '💫', '🌟',
      '👍', '🙌', '💪', '😊', '🤩', '😎', '💖', '🎉', '🥳', '☀️'
    ];

    const usedMessages = new Set<string>();

    const generateUniqueMessage = (): string => {
      let attempts = 0;
      let message: string;
      
      do {
        const baseMessage = messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
        const shouldAddReaction = Math.random() < 0.3;
        const shouldModify = Math.random() < 0.4;
        
        message = baseMessage;
        
        if (shouldModify) {
          // Добавляем небольшие вариации
          const modifications = [
            () => message + '!!!',
            () => message + ' 😊',
            () => message.replace('!', '!!!'),
            () => message + ' Согласен!',
            () => '+1 ' + message,
            () => message + ' 💯',
            () => 'Да! ' + message,
            () => message + ' Круто!',
          ];
          const modification = modifications[Math.floor(Math.random() * modifications.length)];
          message = modification();
        }
        
        if (shouldAddReaction) {
          const reaction = reactions[Math.floor(Math.random() * reactions.length)];
          message += ' ' + reaction;
        }
        
        attempts++;
      } while (usedMessages.has(message) && attempts < 20);
      
      if (attempts >= 20) {
        // Если не удалось найти уникальное сообщение, создаем с timestamp
        message = messageTemplates[Math.floor(Math.random() * messageTemplates.length)] + ' ' + Date.now().toString().slice(-3);
      }
      
      usedMessages.add(message);
      return message;
    };

    const addBotMessage = () => {
      const randomUser = userNames[Math.floor(Math.random() * userNames.length)];
      const messageText = generateUniqueMessage();
      
      const botMessage: Message = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        text: messageText,
        author: randomUser,
        timestamp: new Date(),
        type: 'text',
        isOwnMessage: false
      };

      setMessages(prev => [...prev, botMessage]);
    };

    // Первое сообщение через 10-30 секунд
    const firstTimeout = setTimeout(addBotMessage, Math.random() * 20000 + 10000);

    // Последующие сообщения каждые 30-120 секунд
    const interval = setInterval(() => {
      addBotMessage();
    }, Math.random() * 90000 + 30000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      author: userName,
      timestamp: new Date(),
      type: 'text',
      isOwnMessage: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        const message: Message = {
          id: Date.now().toString(),
          text: 'Изображение',
          author: userName,
          timestamp: new Date(),
          type: 'image',
          imageUrl,
          isOwnMessage: true
        };
        setMessages(prev => [...prev, message]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
          >
            <Icon name="ArrowLeft" size={20} />
            <span className="hidden sm:inline">Назад к радио</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">Онлайн чат</h1>
            <p className="text-sm text-gray-400">Радио Noumi</p>
          </div>

          <div className="text-sm text-green-400 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="flex flex-col items-end">
              <span className="font-medium">{formatNumber(onlineCount)}</span>
              <span className="text-xs text-gray-400">онлайн</span>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-black/30 backdrop-blur-md border-t border-white/10 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Image Upload */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-shrink-0 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-gray-300 hover:text-white"
            >
              <Icon name="Image" size={18} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Message Input */}
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Написать сообщение..."
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 max-h-32"
                rows={1}
                style={{ minHeight: '48px' }}
              />
              
              {/* Emoji Button */}
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
              >
                <Icon name="Smile" size={18} className="text-gray-400 hover:text-white" />
              </button>

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div className="absolute bottom-full right-0 mb-2">
                  <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                </div>
              )}
            </div>

            {/* Send Button */}
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all text-white"
            >
              <Icon name="Send" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;