import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  id: string;
  userName: string;
  message: string;
  timestamp: Date;
  avatar: string;
  type?: "text" | "image" | "video";
  mediaUrl?: string;
  replyTo?: {
    id: string;
    userName: string;
    message: string;
  };
  reactions?: { [emoji: string]: string[] };
}

interface MessageActionsProps {
  message: ChatMessage;
  isOwn: boolean;
  onReply: () => void;
  onDelete: () => void;
  onReaction: (emoji: string) => void;
  onClose: () => void;
}

const MessageActions = ({
  message,
  isOwn,
  onReply,
  onDelete,
  onReaction,
  onClose,
}: MessageActionsProps) => {
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);

  const popularEmojis = ["❤️", "😂", "👍", "👎", "😮", "😢", "🔥", "👏"];

  const handleEmojiClick = (emoji: string) => {
    onReaction(emoji);
    setShowEmojiPanel(false);
  };

  return (
    <div className="absolute top-full left-0 z-10 bg-white/90 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl p-2 mt-1">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onReply}
          className="h-8 px-2 text-gray-700 hover:bg-purple-100"
          title="Ответить"
        >
          <Icon name="Reply" size={14} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowEmojiPanel(!showEmojiPanel)}
          className="h-8 px-2 text-gray-700 hover:bg-purple-100"
          title="Реакция"
        >
          <Icon name="Smile" size={14} />
        </Button>

        {isOwn && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-8 px-2 text-red-600 hover:bg-red-100"
            title="Удалить"
          >
            <Icon name="Trash2" size={14} />
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 px-2 text-gray-700 hover:bg-gray-100"
        >
          <Icon name="X" size={14} />
        </Button>
      </div>

      {showEmojiPanel && (
        <div className="mt-2 p-2 bg-white rounded border-t border-gray-200">
          <div className="grid grid-cols-4 gap-1">
            {popularEmojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiClick(emoji)}
                className="p-1 hover:bg-purple-100 rounded text-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageActions;
