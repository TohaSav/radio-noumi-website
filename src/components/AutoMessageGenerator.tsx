import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface ReviewMessage {
  id: string;
  phoneNumber: string;
  message: string;
  language: string;
  timestamp: Date;
}

const AutoMessageGenerator = () => {
  const [isActive, setIsActive] = useState(false);
  const [sentMessages, setSentMessages] = useState<ReviewMessage[]>([]);
  const [nextMessageTime, setNextMessageTime] = useState<Date | null>(null);

  // Генерация уникальных номеров телефонов
  const generateUniquePhoneNumber = (usedNumbers: string[]): string => {
    const operators = [
      "904",
      "905",
      "906",
      "908",
      "909",
      "950",
      "951",
      "952",
      "953",
      "960",
      "961",
      "962",
      "963",
      "964",
      "965",
      "966",
      "967",
      "968",
      "969",
    ];
    let phoneNumber: string;

    do {
      const operator = operators[Math.floor(Math.random() * operators.length)];
      const part1 = Math.floor(Math.random() * 900) + 100;
      const part2 = Math.floor(Math.random() * 90) + 10;
      const part3 = Math.floor(Math.random() * 90) + 10;
      phoneNumber = `+7 ${operator} ${part1}-${part2}-${part3}`;
    } while (usedNumbers.includes(phoneNumber));

    return phoneNumber;
  };

  // Отзывы на разных языках
  const generateUniqueReview = (
    usedReviews: string[],
  ): { message: string; language: string } => {
    const reviews = [
      // Русские отзывы
      {
        message:
          "Потрясающая радиостанция! Radio Noumi играет именно то, что нужно моей душе 🎵",
        language: "Русский",
      },
      {
        message:
          "Слушаю Radio Noumi уже полгода - качество звука превосходное, музыка всегда в тему!",
        language: "Русский",
      },
      {
        message:
          "Radio Noumi - мой спутник каждый день. Отличный выбор треков! 👍",
        language: "Русский",
      },
      {
        message:
          "Благодарю команду Radio Noumi за прекрасную музыку и качественное вещание",
        language: "Русский",
      },
      {
        message:
          "Radio Noumi - это лучшее что случилось с моими наушниками! Музыка огонь 🔥",
        language: "Русский",
      },

      // Английские отзывы
      {
        message:
          "Amazing radio station! Radio Noumi has the best music selection 🎶",
        language: "English",
      },
      {
        message: "Love Radio Noumi! Great sound quality and fantastic playlist",
        language: "English",
      },
      {
        message: "Radio Noumi is my daily companion. Excellent music taste! 👌",
        language: "English",
      },
      {
        message:
          "Thanks Radio Noumi team for wonderful music and quality broadcasting",
        language: "English",
      },
      {
        message:
          "Radio Noumi rocks! The best radio station I've ever listened to 🎵",
        language: "English",
      },

      // Французские отзывы
      {
        message:
          "Radio Noumi c'est magnifique! Excellente sélection musicale 🎵",
        language: "Français",
      },
      {
        message:
          "J'adore Radio Noumi! Qualité sonore parfaite et playlist fantastique",
        language: "Français",
      },
      {
        message:
          "Radio Noumi est ma station préférée. Musique exceptionnelle! 👍",
        language: "Français",
      },

      // Немецкие отзывы
      {
        message:
          "Radio Noumi ist fantastisch! Tolle Musikauswahl und perfekte Qualität 🎶",
        language: "Deutsch",
      },
      {
        message:
          "Ich liebe Radio Noumi! Beste Radiostation mit großartiger Musik",
        language: "Deutsch",
      },

      // Испанские отзывы
      {
        message: "¡Radio Noumi es increíble! Excelente selección musical 🎵",
        language: "Español",
      },
      {
        message:
          "Me encanta Radio Noumi! Calidad de sonido perfecta y gran música",
        language: "Español",
      },

      // Итальянские отзывы
      {
        message: "Radio Noumi è fantastica! Selezione musicale eccellente 🎶",
        language: "Italiano",
      },
      {
        message:
          "Amo Radio Noumi! Qualità del suono perfetta e playlist meravigliosa",
        language: "Italiano",
      },
    ];

    let availableReviews = reviews.filter(
      (review) => !usedReviews.includes(review.message),
    );

    if (availableReviews.length === 0) {
      // Если все отзывы использованы, создаем новые комбинации
      const emotions = ["🎵", "🎶", "🔥", "👍", "👌", "❤️", "🌟", "✨"];
      const baseReview = reviews[Math.floor(Math.random() * reviews.length)];
      const emotion = emotions[Math.floor(Math.random() * emotions.length)];
      return {
        message: baseReview.message + " " + emotion,
        language: baseReview.language,
      };
    }

    return availableReviews[
      Math.floor(Math.random() * availableReviews.length)
    ];
  };

  // Проверка времени (Уральское время UTC+5)
  const isAllowedTime = (): boolean => {
    const now = new Date();
    const uralTime = new Date(now.getTime() + 5 * 60 * 60 * 1000); // UTC+5
    const hour = uralTime.getHours();
    return hour >= 9 && hour < 23; // Разрешено с 09:00 до 23:00
  };

  // Отправка сообщения в WhatsApp
  const sendWhatsAppMessage = (phoneNumber: string, message: string) => {
    const targetNumber = "+79049808275";
    const encodedMessage = encodeURIComponent(
      `Отзыв от ${phoneNumber}:\n\n${message}`,
    );
    const whatsappUrl = `https://wa.me/${targetNumber.replace(/[^\d]/g, "")}?text=${encodedMessage}`;

    // Открываем WhatsApp в новой вкладке
    window.open(whatsappUrl, "_blank");
  };

  // Генерация и отправка сообщения
  const generateAndSendMessage = () => {
    if (!isAllowedTime()) {
      console.log(
        "Сообщения не отправляются в ночное время (23:00 - 09:00 Уральского времени)",
      );
      return;
    }

    const usedNumbers = sentMessages.map((msg) => msg.phoneNumber);
    const usedReviews = sentMessages.map((msg) => msg.message);

    const phoneNumber = generateUniquePhoneNumber(usedNumbers);
    const review = generateUniqueReview(usedReviews);

    const newMessage: ReviewMessage = {
      id: Date.now().toString(),
      phoneNumber,
      message: review.message,
      language: review.language,
      timestamp: new Date(),
    };

    setSentMessages((prev) => [...prev, newMessage]);
    sendWhatsAppMessage(phoneNumber, review.message);
  };

  // Основной таймер
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(
      () => {
        generateAndSendMessage();
        // Следующее сообщение через 10 минут
        setNextMessageTime(new Date(Date.now() + 10 * 60 * 1000));
      },
      10 * 60 * 1000,
    ); // 10 минут

    // Первое сообщение сразу при запуске
    if (sentMessages.length === 0) {
      generateAndSendMessage();
      setNextMessageTime(new Date(Date.now() + 10 * 60 * 1000));
    }

    return () => clearInterval(interval);
  }, [isActive, sentMessages.length]);

  // Таймер обновления времени до следующего сообщения
  useEffect(() => {
    const timer = setInterval(() => {
      if (nextMessageTime) {
        setNextMessageTime(new Date(nextMessageTime.getTime()));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextMessageTime]);

  const formatTimeUntilNext = (): string => {
    if (!nextMessageTime) return "—";
    const now = new Date();
    const diff = nextMessageTime.getTime() - now.getTime();
    if (diff <= 0) return "Отправляется...";

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Icon name="MessageSquare" size={24} />
          Автоотправка отзывов Radio Noumi
        </h3>
        <Button
          onClick={() => setIsActive(!isActive)}
          variant={isActive ? "destructive" : "default"}
          className="flex items-center gap-2"
        >
          <Icon name={isActive ? "Square" : "Play"} size={16} />
          {isActive ? "Остановить" : "Запустить"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-sm text-white/70">Статус</div>
          <div className="text-lg font-semibold text-white">
            {isActive ? "Активно" : "Остановлено"}
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-sm text-white/70">Отправлено</div>
          <div className="text-lg font-semibold text-white">
            {sentMessages.length}
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-sm text-white/70">До следующего</div>
          <div className="text-lg font-semibold text-white">
            {formatTimeUntilNext()}
          </div>
        </div>
      </div>

      {!isAllowedTime() && (
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 text-yellow-200">
            <Icon name="Clock" size={16} />
            <span className="text-sm">
              Сообщения не отправляются с 23:00 до 09:00 по Уральскому времени
            </span>
          </div>
        </div>
      )}

      <div className="max-h-60 overflow-y-auto">
        <h4 className="text-lg font-semibold text-white mb-2">
          Последние отправленные отзывы:
        </h4>
        {sentMessages
          .slice(-5)
          .reverse()
          .map((msg) => (
            <div key={msg.id} className="bg-white/5 rounded-lg p-3 mb-2">
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm text-white/70">{msg.phoneNumber}</span>
                <span className="text-xs text-white/50">{msg.language}</span>
              </div>
              <div className="text-sm text-white">{msg.message}</div>
              <div className="text-xs text-white/50 mt-1">
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
      </div>
    </Card>
  );
};

export default AutoMessageGenerator;
