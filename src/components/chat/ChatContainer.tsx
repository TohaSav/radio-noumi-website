import { useRef, useEffect } from "react";
import { ChatMessage, OnlineUser } from "@/types/chat";
import { createMessage, getWelcomeMessages } from "@/utils/chatHelpers";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatSidebar from "@/components/chat/ChatSidebar";

interface ChatContainerProps {
  messages: ChatMessage[];
  messageInput: string;
  userName: string;
  userAvatar: string;
  activeUsers: OnlineUser[];
  replyTo: ChatMessage | null;
  showUserPanel: boolean;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onMediaSend: (file: File, type: "image" | "video") => void;
  onVoiceSend: (audioBlob: Blob, duration: number) => void;
  onVideoSend?: (videoBlob: Blob, duration: number, thumbnail: string) => void;
  onReply: (message: ChatMessage) => void;
  onDeleteMessage: (messageId: string) => void;
  onReaction: (messageId: string, emoji: string) => void;
  onCancelReply: () => void;
  onToggleUserPanel: () => void;
  onAddMessage: (message: ChatMessage) => void;
}

const ChatContainer = ({
  messages,
  messageInput,
  userName,
  userAvatar,
  activeUsers,
  replyTo,
  showUserPanel,
  onMessageChange,
  onSendMessage,
  onMediaSend,
  onVoiceSend,
  onVideoSend,
  onReply,
  onDeleteMessage,
  onReaction,
  onCancelReply,
  onToggleUserPanel,
  onAddMessage,
}: ChatContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Автоматическая генерация приветственных сообщений
  useEffect(() => {
    if (activeUsers.length === 0) return;

    const welcomeInterval = setInterval(
      () => {
        if (Math.random() < 0.6) {
          const randomUser =
            activeUsers[Math.floor(Math.random() * activeUsers.length)];
          const welcomeMessages = getWelcomeMessages();
          const randomMessage =
            welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

          const newMessage = createMessage(
            randomUser.name,
            randomUser.avatar,
            randomMessage,
          );

          onAddMessage(newMessage);
        }
      },
      8000 + Math.random() * 12000,
    );

    return () => clearInterval(welcomeInterval);
  }, [activeUsers, onAddMessage]);

  const handleLogin = (name: string) => {
    // Обработчик для совместимости с ChatInput
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      <ChatHeader
        activeUsers={activeUsers}
        showUserPanel={showUserPanel}
        onToggleUserPanel={onToggleUserPanel}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col min-h-0">
          <ChatMessages
            messages={messages}
            messagesEndRef={messagesEndRef}
            currentUser={userName}
            onReply={onReply}
            onDelete={onDeleteMessage}
            onReaction={onReaction}
          />
        </div>

        <ChatSidebar
          activeUsers={activeUsers}
          showUserPanel={showUserPanel}
          onClose={() => onToggleUserPanel()}
        />
      </div>

      <ChatInput
        value={messageInput}
        onChange={onMessageChange}
        onSend={onSendMessage}
        onMediaSend={onMediaSend}
        onVoiceSend={onVoiceSend}
        onVideoSend={onVideoSend}
        isLoggedIn={true}
        onLogin={handleLogin}
        userName={userName}
        replyTo={replyTo}
        onCancelReply={onCancelReply}
      />
    </div>
  );
};

export default ChatContainer;
