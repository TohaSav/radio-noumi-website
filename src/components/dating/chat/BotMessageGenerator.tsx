import { useEffect } from "react";
import { Message } from "@/types/dating";

interface BotMessageGeneratorProps {
  isActive: boolean;
  onMessageGenerated: (message: Message) => void;
}

export default function BotMessageGenerator({
  isActive,
  onMessageGenerated,
}: BotMessageGeneratorProps) {
  useEffect(() => {
    if (!isActive) return;

    const messages = [
      "Всем привет! 👋",
      "Отличная музыка сегодня! 🎵",
      "Как дела, друзья?",
      "Хорошего настроения всем! ✨",
      "Кто слушает радио? 📻",
    ];

    const names = ["Алексей", "Мария", "Дмитрий", "Анна", "Максим", "Елена"];

    const interval = setInterval(
      () => {
        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];
        const randomName = names[Math.floor(Math.random() * names.length)];

        const message: Message = {
          id: `bot-${Date.now()}`,
          text: randomMessage,
          userName: randomName,
          timestamp: new Date(),
          chatType: "general",
        };

        onMessageGenerated(message);
      },
      5000 + Math.random() * 10000,
    );

    return () => clearInterval(interval);
  }, [isActive, onMessageGenerated]);

  return null;
}
