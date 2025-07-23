import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Message {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
  type: 'text' | 'image';
  imageUrl?: string;
  isOwnMessage?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isOwn = message.isOwnMessage;
  const isSystem = message.author === 'Система';

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-sm text-gray-300 max-w-md text-center">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs sm:max-w-md lg:max-w-lg ${isOwn ? 'order-2' : 'order-1'}`}>
        {/* Author and time */}
        <div className={`text-xs text-gray-400 mb-1 ${isOwn ? 'text-right' : 'text-left'}`}>
          <span className="font-medium">{message.author}</span>
          <span className="ml-2">
            {format(message.timestamp, 'HH:mm', { locale: ru })}
          </span>
        </div>

        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isOwn
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-sm'
              : 'bg-white/10 backdrop-blur-sm text-white rounded-bl-sm'
          }`}
        >
          {message.type === 'image' && message.imageUrl ? (
            <div className="space-y-2">
              <img
                src={message.imageUrl}
                alt="Загруженное изображение"
                className="max-w-full h-auto rounded-lg"
                style={{ maxHeight: '200px' }}
              />
              {message.text !== 'Изображение' && (
                <p className="text-sm">{message.text}</p>
              )}
            </div>
          ) : (
            <p className="whitespace-pre-wrap break-words">{message.text}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;