import { useState, useEffect } from "react";
import { ChatMessage } from "@/types/chat";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  getDemoMessages,
} from "@/utils/chatHelpers";

export const useChatMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // Загружаем сохранённые сообщения при инициализации
    const savedMessages = loadFromLocalStorage<ChatMessage[]>(
      "chat-messages",
      [],
    );
    // Гарантируем, что messages всегда массив
    setMessages(Array.isArray(savedMessages) ? savedMessages : []);
  }, []);

  // Сохранение сообщений
  useEffect(() => {
    if (messages.length > 0) {
      saveToLocalStorage("chat-messages", messages);
    }
  }, [messages]);

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const deleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  };

  const addReaction = (messageId: string, emoji: string, userName: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== messageId) return msg;

        const reactions = { ...msg.reactions };

        // Убираем пользователя из всех других реакций (один пользователь - одна реакция)
        Object.keys(reactions).forEach((existingEmoji) => {
          if (existingEmoji !== emoji) {
            const userIndex = reactions[existingEmoji].indexOf(userName);
            if (userIndex > -1) {
              reactions[existingEmoji].splice(userIndex, 1);
              if (reactions[existingEmoji].length === 0) {
                delete reactions[existingEmoji];
              }
            }
          }
        });

        // Добавляем/убираем текущую реакцию
        const hadThisReaction = msg.reactions?.[emoji]?.includes(userName);
        if (hadThisReaction) {
          // Убираем реакцию
          const userIndex = reactions[emoji].indexOf(userName);
          reactions[emoji].splice(userIndex, 1);
          if (reactions[emoji].length === 0) {
            delete reactions[emoji];
          }
        } else {
          // Добавляем реакцию
          if (!reactions[emoji]) {
            reactions[emoji] = [];
          }
          reactions[emoji].push(userName);
        }

        return { ...msg, reactions };
      }),
    );
  };

  const getRecentMessages = (count: number = 10): ChatMessage[] => {
    return messages.slice(-count);
  };

  return {
    messages,
    addMessage,
    deleteMessage,
    addReaction,
    setMessages,
    getRecentMessages,
  };
};
