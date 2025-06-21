import { RefObject, useState } from "react";
import Icon from "@/components/ui/icon";
import MessageActions from "./MessageActions";
import EmojiReactions from "./EmojiReactions";
import VoiceMessage from "./VoiceMessage";
import VideoMessage from "./VideoMessage";

interface ChatMessage {
  id: string;
  userName: string;
  message: string;
  timestamp: Date;
  avatar: string;
  type?: "text" | "image" | "video" | "voice" | "square-video";
  mediaUrl?: string;
  voiceDuration?: number;
  videoDuration?: number;
  videoThumbnail?: string;
  replyTo?: {
    id: string;
    userName: string;
    message: string;
  };
  reactions?: { [emoji: string]: string[] };
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  messagesEndRef: RefObject<HTMLDivElement>;
  currentUser: string;
  onReply: (message: ChatMessage) => void;
  onDelete: (messageId: string) => void;
  onReaction: (messageId: string, emoji: string) => void;
}

const ChatMessages = ({
  messages,
  messagesEndRef,
  currentUser,
  onReply,
  onDelete,
  onReaction,
}: ChatMessagesProps) => {
  const [activeMessageMenu, setActiveMessageMenu] = useState<string | null>(
    null,
  );
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleMessageClick = (message: ChatMessage) => {
    setActiveMessageMenu(activeMessageMenu === message.id ? null : message.id);
  };

  const renderMessageContent = (message: ChatMessage, isOwn: boolean) => {
    switch (message.type) {
      case "voice":
        return (
          <VoiceMessage
            audioUrl={message.mediaUrl!}
            duration={message.voiceDuration || 0}
          />
        );
      case "square-video":
        return (
          <VideoMessage
            videoUrl={message.mediaUrl!}
            duration={message.videoDuration || 0}
            thumbnail={message.videoThumbnail}
          />
        );
      case "image":
        return (
          <div className="max-w-xs">
            <img
              src={message.mediaUrl}
              alt="Изображение"
              className="rounded-lg max-w-full h-auto"
              loading="lazy"
            />
            {message.message && (
              <p className="text-sm md:text-base break-words mt-2">
                {message.message}
              </p>
            )}
          </div>
        );
      case "video":
        return (
          <div className="max-w-xs">
            <video
              src={message.mediaUrl}
              controls
              className="rounded-lg max-w-full h-auto"
              preload="metadata"
            >
              Ваш браузер не поддерживает видео
            </video>
            {message.message && (
              <p className="text-sm md:text-base break-words mt-2">
                {message.message}
              </p>
            )}
          </div>
        );
      default:
        return (
          <p className="text-sm md:text-base break-words">{message.message}</p>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((message) => {
          const isOwn = message.userName === currentUser;

          return (
            <div
              key={message.id}
              className={`flex gap-3 ${isOwn ? "justify-end" : "justify-start"} relative`}
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

                <div className="relative">
                  {message.replyTo && (
                    <div className="mb-2 p-2 bg-white/5 rounded-lg border-l-2 border-purple-400">
                      <div className="text-xs text-purple-300 font-medium">
                        {message.replyTo.userName}
                      </div>
                      <div className="text-xs text-gray-300 truncate max-w-48">
                        {message.replyTo.message}
                      </div>
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-4 py-2 md:px-4 md:py-3 cursor-pointer hover:shadow-lg transition-all ${
                      isOwn
                        ? "bg-purple-600 text-white ml-auto"
                        : "bg-white/10 backdrop-blur-sm text-white"
                    }`}
                    onClick={() => handleMessageClick(message)}
                  >
                    {renderMessageContent(message, isOwn)}
                    <div
                      className={`text-xs mt-1 ${
                        isOwn ? "text-purple-200" : "text-gray-300"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </div>
                  </div>

                  {message.reactions &&
                    Object.keys(message.reactions).length > 0 && (
                      <EmojiReactions
                        reactions={message.reactions}
                        currentUser={currentUser}
                        onToggleReaction={(emoji) =>
                          onReaction(message.id, emoji)
                        }
                      />
                    )}

                  {activeMessageMenu === message.id && (
                    <MessageActions
                      message={message}
                      isOwn={isOwn}
                      onReply={() => {
                        onReply(message);
                        setActiveMessageMenu(null);
                      }}
                      onDelete={() => {
                        onDelete(message.id);
                        setActiveMessageMenu(null);
                      }}
                      onReaction={(emoji) => {
                        onReaction(message.id, emoji);
                        setActiveMessageMenu(null);
                      }}
                      onClose={() => setActiveMessageMenu(null)}
                    />
                  )}
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
