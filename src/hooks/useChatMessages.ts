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
    // Очищаем все существующие сообщения - чат начинается пустым
    localStorage.removeItem("chat-messages");
    setMessages([]);
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

        // Убираем пользователя из всех реакций
        Object.keys(reactions).forEach((existingEmoji) => {
          const userIndex = reactions[existingEmoji].indexOf(userName);
          if (userIndex > -1) {
            reactions[existingEmoji].splice(userIndex, 1);
            if (reactions[existingEmoji].length === 0) {
              delete reactions[existingEmoji];
            }
          }
        });

        // Добавляем новую реакцию
        const hadThisReaction = msg.reactions?.[emoji]?.includes(userName);
        if (!hadThisReaction) {
          if (!reactions[emoji]) {
            reactions[emoji] = [];
          }
          reactions[emoji].push(userName);
        }

        return { ...msg, reactions };
      }),
    );
  };

  return {
    messages,
    addMessage,
    deleteMessage,
    addReaction,
    setMessages,
  };
};
