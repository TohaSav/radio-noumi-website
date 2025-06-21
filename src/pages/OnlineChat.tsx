import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import OnlineUsers from "@/components/chat/OnlineUsers";
import ChatRegistration from "@/components/chat/ChatRegistration";
import HiddenRadio from "@/components/HiddenRadio";
import UserManager from "@/components/chat/UserManager";
import EnhancedAutoMessageGenerator from "@/components/chat/EnhancedAutoMessageGenerator";
import { useRadioStats } from "@/hooks/useRadioStats";

interface ChatMessage {
  id: string;
  userName: string;
  message: string;
  timestamp: Date;
  avatar: string;
  type?: "text" | "image" | "video";
  mediaUrl?: string;
}

const OnlineChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState<string[]>([]);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [activeUsers, setActiveUsers] = useState<
    Array<{ id: string; name: string; avatar: string }>
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const radioStats = useRadioStats();

  // Инициализация с демо данными
  useEffect(() => {
    const demoMessages: ChatMessage[] = [
      {
        id: "1",
        userName: "Алекс",
        message: "Привет всем! Как дела?",
        timestamp: new Date(Date.now() - 300000),
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: "2",
        userName: "Мария",
        message: "Отлично! Слушаю новый альбом 🎵",
        timestamp: new Date(Date.now() - 180000),
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: "3",
        userName: "Дмитрий",
        message: "Кто нибудь знает когда будет концерт?",
        timestamp: new Date(Date.now() - 60000),
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
    ];
    setMessages(demoMessages);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !isLoggedIn) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userName: userName,
      message: messageInput.trim(),
      timestamp: new Date(),
      avatar: userAvatar,
      type: "text",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");
  };

  const handleAutoMessage = (autoMessage: any) => {
    const newMessage: ChatMessage = {
      id: autoMessage.id,
      userName: autoMessage.userName,
      message: autoMessage.message,
      timestamp: autoMessage.timestamp,
      avatar: autoMessage.avatar,
      type: autoMessage.type,
      mediaUrl: autoMessage.mediaUrl,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleUsersUpdate = (
    users: Array<{ id: string; name: string; avatar: string }>,
  ) => {
    setActiveUsers(users);
  };

  const handleMediaSend = (file: File, type: "image" | "video") => {
    if (!isLoggedIn) return;

    // Создаем URL для предпросмотра файла
    const mediaUrl = URL.createObjectURL(file);

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userName: userName,
      message: "",
      timestamp: new Date(),
      avatar: userAvatar,
      type: type,
      mediaUrl: mediaUrl,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  const handleRegister = (userData: { name: string; avatar: string }) => {
    setUserName(userData.name);
    setUserAvatar(userData.avatar);
    setIsLoggedIn(true);
    setRegisteredUsers((prev) => [...prev, userData.name]);
  };

  // Загружаем сохраненные сообщения
  useEffect(() => {
    const savedMessages = localStorage.getItem("chat-messages");
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setMessages(parsed);
    } else {
      // Только если нет сохраненных сообщений, добавляем демо
      const demoMessages: ChatMessage[] = [
        {
          id: "1",
          userName: "Алекс",
          message: "Привет всем! Как дела?",
          timestamp: new Date(Date.now() - 300000),
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        },
      ];
      setMessages(demoMessages);
    }
  }, []);

  // Сохраняем сообщения
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chat-messages", JSON.stringify(messages));
    }
  }, [messages]);

  if (!isLoggedIn) {
    return (
      <ChatRegistration
        onRegister={handleRegister}
        existingUsers={registeredUsers}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-white hover:text-purple-200 transition-colors"
            >
              <Icon name="ArrowLeft" size={20} />
            </Link>
            <div>
              <h1 className="text-white text-xl font-bold">Онлайн чат</h1>
              <p className="text-purple-200 text-sm">
                {radioStats.listeners} в сети
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-purple-200 text-sm">Участники</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserPanel(!showUserPanel)}
              className="text-white hover:bg-white/10"
            >
              <Icon name="Users" size={16} className="mr-2" />
              Участники
            </Button>
          </div>

          <Button
            className="md:hidden text-white hover:bg-white/10"
            variant="ghost"
            size="sm"
            onClick={() => setShowUserPanel(!showUserPanel)}
          >
            <Icon name="Menu" size={16} />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <ChatMessages
            messages={messages}
            messagesEndRef={messagesEndRef}
            currentUser={userName}
          />
        </div>

        {/* Users Panel - Desktop */}
        {showUserPanel && (
          <div className="hidden md:block w-80 bg-white/5 backdrop-blur-sm border-l border-white/20">
            <OnlineUsers count={47} showList />
          </div>
        )}
      </div>

      {/* Mobile Users Panel */}
      {showUserPanel && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50 flex">
          <div className="ml-auto w-80 max-w-[80vw] bg-white/10 backdrop-blur-md h-full">
            <div className="p-4 border-b border-white/20 flex justify-between items-center">
              <h3 className="text-white font-medium">Участники</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUserPanel(false)}
                className="text-white hover:bg-white/10"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <OnlineUsers count={47} showList />
          </div>
          <div className="flex-1" onClick={() => setShowUserPanel(false)} />
        </div>
      )}

      {/* Chat Input */}
      <ChatInput
        value={messageInput}
        onChange={setMessageInput}
        onSend={handleSendMessage}
        onMediaSend={handleMediaSend}
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        userName={userName}
      />
      <HiddenRadio streamUrl="https://radio.noumi.fm/stream" />
    </div>
  );
};

export default OnlineChat;
