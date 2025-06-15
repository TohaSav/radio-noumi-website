import { useEffect, useState } from "react";

interface Message {
  id: string;
  text: string;
  user: string;
  timestamp: Date;
  type: "text" | "emoji" | "file";
  fileUrl?: string;
  fileName?: string;
}

interface AutoMessageGeneratorProps {
  onMessageGenerated: (message: Message) => void;
}

const AutoMessageGenerator = ({
  onMessageGenerated,
}: AutoMessageGeneratorProps) => {
  const [usedMessages, setUsedMessages] = useState<Set<string>>(new Set());
  const [usedNames, setUsedNames] = useState<Set<string>>(new Set());
  const [usedPhotos, setUsedPhotos] = useState<Set<string>>(new Set());

  const russianNames = [
    "Алексей",
    "Анна",
    "Дмитрий",
    "Екатерина",
    "Максим",
    "Мария",
    "Сергей",
    "Елена",
    "Андрей",
    "Ольга",
    "Артём",
    "Татьяна",
    "Михаил",
    "Наталья",
    "Иван",
    "Светлана",
    "Никита",
    "Юлия",
    "Роман",
    "Ирина",
    "Владимир",
    "Виктория",
    "Денис",
    "Полина",
    "Павел",
    "Кристина",
    "Егор",
    "Валерия",
    "Илья",
    "София",
    "Кирилл",
    "Дарья",
    "Антон",
    "Алина",
    "Александр",
    "Милана",
    "Тимур",
    "Карина",
    "Матвей",
    "Диана",
    "Арсений",
    "Вероника",
    "Данил",
    "Камилла",
    "Богдан",
    "Злата",
    "Глеб",
    "Ева",
  ];

  const homePhotos = [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
    "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
  ];

  const foodPhotos = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400",
    "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400",
  ];

  const walkPhotos = [
    "https://images.unsplash.com/photo-1544511916-0148ccdeb877?w=400",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    "https://images.unsplash.com/photo-1418065460487-3956ef138ddb?w=400",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
  ];

  const selfiePhotos = [
    "https://images.unsplash.com/photo-1494790108755-2616c96c9c4c?w=400",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400",
  ];

  const textMessages = [
    "Привет всем! Как дела?",
    "Отличная погода сегодня",
    "Кто слушает радио?",
    "Всем хорошего дня!",
    "Как провели выходные?",
    "Отличное настроение!",
    "Прекрасный вечер!",
    "Всем привет из дома!",
    "Хорошего настроения!",
    "Давайте общаться!",
    "Кто тут новенький?",
    "Всем удачного дня!",
    "Отличная музыка играет",
    "Как ваши дела?",
    "Всем доброго времени!",
    "Прекрасная атмосфера!",
    "Кто любит музыку?",
    "Всем позитива!",
    "Отличный день сегодня",
    "Как настроение?",
    "Всем отличного вечера!",
  ];

  const generateUniqueName = () => {
    let attempts = 0;
    let name = "";

    do {
      const baseName =
        russianNames[Math.floor(Math.random() * russianNames.length)];
      const suffix = Math.floor(Math.random() * 999) + 1;
      name = Math.random() > 0.5 ? `${baseName}_${suffix}` : baseName;
      attempts++;
    } while (usedNames.has(name) && attempts < 100);

    if (attempts >= 100) {
      name = `Пользователь${Date.now()}`;
    }

    setUsedNames((prev) => new Set([...prev, name]));
    return name;
  };

  const generateUniquePhoto = (photoCategory: string[]) => {
    let attempts = 0;
    let photo = "";

    do {
      photo = photoCategory[Math.floor(Math.random() * photoCategory.length)];
      attempts++;
    } while (usedPhotos.has(photo) && attempts < 50);

    if (attempts >= 50) {
      photo = `${photo}&sig=${Date.now()}`;
    }

    setUsedPhotos((prev) => new Set([...prev, photo]));
    return photo;
  };

  const generateUniqueMessage = () => {
    let attempts = 0;
    let messageText = "";

    do {
      messageText =
        textMessages[Math.floor(Math.random() * textMessages.length)];
      const variation = Math.floor(Math.random() * 3);

      switch (variation) {
        case 0:
          messageText = `${messageText} 😊`;
          break;
        case 1:
          messageText = `${messageText} 🎵`;
          break;
        case 2:
          messageText = `${messageText} ✨`;
          break;
      }

      attempts++;
    } while (usedMessages.has(messageText) && attempts < 100);

    if (attempts >= 100) {
      messageText = `Всем привет! ${Date.now()}`;
    }

    setUsedMessages((prev) => new Set([...prev, messageText]));
    return messageText;
  };

  const generateMessage = () => {
    const messageType = Math.random();
    const userName = generateUniqueName();

    if (messageType < 0.4) {
      // Фото сообщение
      const photoType = Math.random();
      let photoUrl = "";
      let messageText = "";

      if (photoType < 0.25) {
        photoUrl = generateUniquePhoto(homePhotos);
        messageText = [
          "Мой дом",
          "Наша квартира",
          "Дома сегодня",
          "Уютно дома",
        ][Math.floor(Math.random() * 4)];
      } else if (photoType < 0.5) {
        photoUrl = generateUniquePhoto(foodPhotos);
        const meals = ["завтрак", "обед", "ужин", "перекус"];
        const meal = meals[Math.floor(Math.random() * meals.length)];
        messageText = `Мой ${meal} сегодня`;
      } else if (photoType < 0.75) {
        photoUrl = generateUniquePhoto(walkPhotos);
        messageText = [
          "На прогулке",
          "Гуляю сегодня",
          "Отличная прогулка",
          "Прогулка в парке",
        ][Math.floor(Math.random() * 4)];
      } else {
        photoUrl = generateUniquePhoto(selfiePhotos);
        messageText = ["Селфи дня", "Мое фото", "Как дела?", "Привет всем!"][
          Math.floor(Math.random() * 4)
        ];
      }

      return {
        id: `auto_${Date.now()}_${Math.random()}`,
        text: messageText,
        user: userName,
        timestamp: new Date(),
        type: "file" as const,
        fileUrl: photoUrl,
        fileName: "photo.jpg",
      };
    } else {
      // Текстовое сообщение
      return {
        id: `auto_${Date.now()}_${Math.random()}`,
        text: generateUniqueMessage(),
        user: userName,
        timestamp: new Date(),
        type: "text" as const,
      };
    }
  };

  useEffect(() => {
    const loadStoredData = () => {
      const storedMessages = localStorage.getItem("used-messages");
      const storedNames = localStorage.getItem("used-names");
      const storedPhotos = localStorage.getItem("used-photos");

      if (storedMessages) setUsedMessages(new Set(JSON.parse(storedMessages)));
      if (storedNames) setUsedNames(new Set(JSON.parse(storedNames)));
      if (storedPhotos) setUsedPhotos(new Set(JSON.parse(storedPhotos)));
    };

    loadStoredData();

    const interval = setInterval(
      () => {
        const message = generateMessage();
        onMessageGenerated(message);

        // Сохраняем использованные данные
        localStorage.setItem(
          "used-messages",
          JSON.stringify([...usedMessages]),
        );
        localStorage.setItem("used-names", JSON.stringify([...usedNames]));
        localStorage.setItem("used-photos", JSON.stringify([...usedPhotos]));
      },
      3000 + Math.random() * 7000,
    );

    return () => clearInterval(interval);
  }, [onMessageGenerated, usedMessages, usedNames, usedPhotos]);

  return null;
};

export default AutoMessageGenerator;
