import { Message } from "@/types/dating";
import Icon from "@/components/ui/icon";

interface MessageListProps {
  messages: Message[];
  onUserClick: (userName: string) => void;
  backgroundColor?: string;
  userIconColor?: string;
  userNameColor?: string;
}

const MessageList = ({
  messages,
  onUserClick,
  backgroundColor = "bg-white/80",
  userIconColor = "bg-pink-500",
  userNameColor = "text-pink-600",
}: MessageListProps) => {
  return (
    <div className="space-y-3 md:space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`${backgroundColor} p-3 md:p-4 rounded-lg shadow-sm`}
        >
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div
              className={`w-6 h-6 md:w-8 md:h-8 ${userIconColor} rounded-full flex items-center justify-center`}
            >
              <Icon
                name="User"
                size={12}
                className="md:w-3.5 md:h-3.5 text-white"
              />
            </div>
            <button
              onClick={() => onUserClick(msg.userName)}
              className={`font-semibold ${userNameColor} hover:underline text-sm md:text-base`}
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
  );
};

export default MessageList;
