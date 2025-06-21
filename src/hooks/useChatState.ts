import { useState, useEffect } from "react";
import { ChatMessage, UserData } from "@/types/chat";
import { loadFromLocalStorage, saveToLocalStorage } from "@/utils/chatHelpers";

export const useChatState = () => {
  const [messageInput, setMessageInput] = useState("");
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState<string[]>([]);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);

  // Восстановление данных пользователя
  useEffect(() => {
    const savedUserData = loadFromLocalStorage<UserData>("chatUserData");
    if (savedUserData) {
      setUserName(savedUserData.name);
      setUserAvatar(savedUserData.avatar);
      setIsLoggedIn(true);
    }
  }, []);

  const handleRegister = (userData: UserData) => {
    setUserName(userData.name);
    setUserAvatar(userData.avatar);
    setIsLoggedIn(true);
    saveToLocalStorage("chatUserData", userData);
    setRegisteredUsers((prev) => [...prev, userData.name]);
  };

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  return {
    messageInput,
    setMessageInput,
    userName,
    userAvatar,
    isLoggedIn,
    registeredUsers,
    showUserPanel,
    setShowUserPanel,
    replyTo,
    setReplyTo,
    handleRegister,
    handleLogin,
  };
};
