import { useState, useEffect } from "react";
import { Profile, Message, Like, User } from "@/types/dating";
import { useLocalStorage } from "./useLocalStorage";

const MESSAGES_STORAGE_KEY = "dating_chat_all_messages";
const PROFILES_STORAGE_KEY = "dating_chat_profiles";

export function useDatingData() {
  const [messages, setMessages] = useLocalStorage<Message[]>(
    MESSAGES_STORAGE_KEY,
    [],
  );
  const [profiles, setProfiles] = useLocalStorage<Profile[]>(
    PROFILES_STORAGE_KEY,
    [],
  );
  const [likes, setLikes] = useState<Like[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Инициализация дефолтных профилей
  useEffect(() => {
    if (profiles.length === 0) {
      const defaultProfiles: Profile[] = [
        {
          id: "1",
          photo:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
          name: "Анна",
          age: 25,
          city: "Москва",
          height: "165 см",
          weight: "55 кг",
          lookingFor: "Серьезные отношения",
          about: "Люблю путешествовать и читать книги. Работаю дизайнером.",
          userId: "user1",
          gender: "female",
        },
        {
          id: "2",
          photo:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          name: "Дмитрий",
          age: 28,
          city: "СПб",
          height: "180 см",
          weight: "75 кг",
          lookingFor: "Дружба и общение",
          about: "Программист, увлекаюсь спортом и кино.",
          userId: "user2",
          gender: "male",
        },
      ];
      setProfiles(defaultProfiles);
    }
  }, [profiles.length, setProfiles]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const addProfile = (profile: Profile) => {
    setProfiles((prev) => [...prev, profile]);
  };

  const addLike = (like: Like) => {
    setLikes((prev) => [...prev, like]);
  };

  return {
    messages,
    profiles,
    likes,
    currentUser,
    isLoggedIn,
    setCurrentUser,
    setIsLoggedIn,
    addMessage,
    addProfile,
    addLike,
    setProfiles,
  };
}
