import { RefObject } from "react";

interface ChatMessage {
  id: string;
  userName: string;
  message: string;
  timestamp: Date;
  avatar: string;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  messagesEndRef: RefObject<HTMLDivElement>;
  currentUser: string;
}

const ChatMessages = ({
  messages,
  messagesEndRef,
  currentUser,
}: ChatMessagesProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((message) => {
          const isOwn = message.userName === currentUser;

          return (
            <div
              key={message.id}
              className={`flex gap-3 ${isOwn ? "justify-end" : "justify-start"}`}
            >
              {!isOwn && (
                <img
                  src={message.avatar}
                  alt={message.userName}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                />
              )}

              <div
                className={`max-w-[70%] md:max-w-md ${isOwn ? "order-first" : ""}`}
              >
                {!isOwn && (
                  <div className="text-sm text-purple-200 mb-1 font-medium">
                    {message.userName}
                  </div>
                )}

                <div
                  className={`rounded-2xl px-4 py-2 md:px-4 md:py-3 ${
                    isOwn
                      ? "bg-purple-600 text-white ml-auto"
                      : "bg-white/10 backdrop-blur-sm text-white"
                  }`}
                >
                  <p className="text-sm md:text-base break-words">
                    {message.message}
                  </p>
                  <div
                    className={`text-xs mt-1 ${
                      isOwn ? "text-purple-200" : "text-gray-300"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>

              {isOwn && (
                <img
                  src={message.avatar}
                  alt={message.userName}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
