import Icon from "@/components/ui/icon";
import { Message } from "@/types/dating";

interface MessageListProps {
  messages: Message[];
  onUserClick: (userName: string) => void;
  backgroundColor?: string;
  userIconColor?: string;
  userNameColor?: string;
}

export default function MessageList({
  messages,
  onUserClick,
  backgroundColor = "bg-gray-50",
  userIconColor = "bg-pink-500",
  userNameColor = "text-pink-700",
}: MessageListProps) {
  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <div key={message.id} className={`p-3 ${backgroundColor} rounded-lg`}>
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 ${userIconColor} rounded-full flex items-center justify-center flex-shrink-0`}
            >
              <Icon name="User" size={12} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <button
                  onClick={() => onUserClick(message.userName)}
                  className={`font-semibold text-sm ${userNameColor} hover:underline`}
                >
                  {message.userName}
                </button>
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-800 break-words">
                {message.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
