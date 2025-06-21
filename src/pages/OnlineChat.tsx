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

  // Проверка сохраненных данных пользователя при загрузке
  useEffect(() => {
    const savedUserData = localStorage.getItem("chatUserData");
    if (savedUserData) {
      try {
        const userData = JSON.parse(savedUserData);
        setUserName(userData.name);
        setUserAvatar(userData.avatar);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Ошибка загрузки данных пользователя:", error);
        localStorage.removeItem("chatUserData");
      }
    }
  }, []);

  // Инициализация пользователей и сообщений
  useEffect(() => {
    const loadInitialData = () => {
      // Загружаем сохраненных пользователей
      const saved = localStorage.getItem("chat-users");
      let existingUsers = [];
      if (saved) {
        existingUsers = JSON.parse(saved).map((u: any) => ({
          ...u,
          joinedAt: new Date(u.joinedAt),
          lastActivity: new Date(u.lastActivity),
        }));
      }

      // Если пользователь залогинен, добавляем его в активные пользователи
      if (isLoggedIn && userName && userAvatar) {
        const currentUser = {
          id: `current_user_${Date.now()}`,
          name: userName,
          avatar: userAvatar,
        };

        // Проверяем, есть ли уже этот пользователь в списке
        const userExists = existingUsers.some((u: any) => u.name === userName);
        if (!userExists) {
          const updatedUsers = [
            ...existingUsers,
            {
              ...currentUser,
              joinedAt: new Date(),
              lastActivity: new Date(),
              isActive: true,
            },
          ];
          localStorage.setItem("chat-users", JSON.stringify(updatedUsers));
          setActiveUsers(updatedUsers);
        } else {
          setActiveUsers(existingUsers);
        }
      } else {
        setActiveUsers(existingUsers);
      }
    };

    loadInitialData();
  }, [isLoggedIn, userName, userAvatar]);

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

    // Инициализируем активных пользователей на основе демо сообщений
    const initialUsers = demoMessages.map((msg, index) => ({
      id: `demo_${index}`,
      name: msg.userName,
      avatar: msg.avatar,
    }));
    setActiveUsers(initialUsers);
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

  const handleUsersUpdate = (updatedUsers: any[]) => {
    // Убеждаемся, что текущий пользователь всегда в списке
    if (isLoggedIn && userName) {
      const currentUserExists = updatedUsers.some((u) => u.name === userName);
      if (!currentUserExists) {
        const currentUser = {
          id: `current_user_${Date.now()}`,
          name: userName,
          avatar: userAvatar,
          joinedAt: new Date(),
          lastActivity: new Date(),
          isActive: true,
        };
        updatedUsers.unshift(currentUser);
      }
    }
    setActiveUsers(updatedUsers);
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

    // Сохраняем данные пользователя
    localStorage.setItem("chatUserData", JSON.stringify(userData));

    // Добавляем пользователя в список активных
    const newUser = {
      id: `current_user_${Date.now()}`,
      name: userData.name,
      avatar: userData.avatar,
      joinedAt: new Date(),
      lastActivity: new Date(),
      isActive: true,
    };

    // Обновляем список пользователей в localStorage
    const existing = localStorage.getItem("chat-users");
    let users = existing ? JSON.parse(existing) : [];

    // Проверяем, нет ли уже такого пользователя
    const userExists = users.some((u: any) => u.name === userData.name);
    if (!userExists) {
      users.push(newUser);
      localStorage.setItem("chat-users", JSON.stringify(users));
      setActiveUsers(users);
    }

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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <OnlineUsers count={activeUsers.length} />
              <div className="text-white/60 text-sm">
                📻 {radioStats.listeners} слушателей
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUserPanel(!showUserPanel)}
                className="text-white hover:bg-white/10"
              >
                <Icon name="Users" size={16} />
              </Button>
              <Link to="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  <Icon name="Home" size={16} />
                </Button>
              </Link>
            </div>
          </div>
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
            <OnlineUsers
              count={activeUsers.length}
              users={activeUsers}
              showList={showUserPanel}
            />
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
            <OnlineUsers
              count={activeUsers.length}
              users={activeUsers}
              showList={showUserPanel}
            />
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
