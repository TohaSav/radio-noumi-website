import { useEffect } from "react";
import { Profile, Message } from "@/types/dating";

interface AutoGenerationProps {
  profiles: Profile[];
  onAddProfile: (profile: Profile) => void;
  onAddMessage: (message: Message) => void;
}

export function useAutoGeneration({
  profiles,
  onAddProfile,
  onAddMessage,
}: AutoGenerationProps) {
  // Автоматическое добавление профилей
  useEffect(() => {
    const malePhotos = [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400",
    ];

    const femalePhotos = [
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    ];

    const generateRandomProfile = (): Profile => {
      const isFemale = Math.random() > 0.4;
      const gender = isFemale ? "female" : "male";
      const photos = isFemale ? femalePhotos : malePhotos;

      const femaleProfiles = [
        {
          name: "Алёна",
          age: 24,
          city: "Москва",
          about: "Маркетолог в IT",
          lookingFor: "Серьезные отношения",
        },
        {
          name: "Виктория",
          age: 27,
          city: "СПб",
          about: "Стоматолог с душой художника",
          lookingFor: "Серьезные отношения",
        },
      ];

      const maleProfiles = [
        {
          name: "Андрей",
          age: 29,
          city: "Новосибирск",
          about: "Инженер-программист",
          lookingFor: "Дружба и общение",
        },
        {
          name: "Максим",
          age: 31,
          city: "Казань",
          about: "Предприниматель в сфере IT",
          lookingFor: "Серьезные отношения",
        },
      ];

      const profileData = isFemale
        ? femaleProfiles[Math.floor(Math.random() * femaleProfiles.length)]
        : maleProfiles[Math.floor(Math.random() * maleProfiles.length)];

      return {
        id: Date.now().toString(),
        photo: photos[Math.floor(Math.random() * photos.length)],
        name: profileData.name,
        age: profileData.age,
        city: profileData.city,
        height: isFemale
          ? `${155 + Math.floor(Math.random() * 20)} см`
          : `${170 + Math.floor(Math.random() * 25)} см`,
        weight: isFemale
          ? `${45 + Math.floor(Math.random() * 25)} кг`
          : `${65 + Math.floor(Math.random() * 35)} кг`,
        lookingFor: profileData.lookingFor,
        about: profileData.about,
        userId: `user_${Date.now()}`,
        gender: gender,
      };
    };

    const profileInterval = setInterval(
      () => {
        onAddProfile(generateRandomProfile());
      },
      Math.random() * 60000 + 30000,
    );

    return () => clearInterval(profileInterval);
  }, [onAddProfile]);

  // Автоматические сообщения
  useEffect(() => {
    const messages = [
      "Только что вернулся из спортзала, кто тоже за ЗОЖ?",
      "Смотрю сериал 'Игра престолов', есть фанаты?",
      "Планирую поездку в Турцию на следующий месяц",
    ];

    const names = ["Анна", "Мария", "Александр", "Дмитрий", "Максим"];

    const generateMessage = () => {
      const message = messages[Math.floor(Math.random() * messages.length)];
      const name = names[Math.floor(Math.random() * names.length)];

      const newMessage: Message = {
        id: `auto_${Date.now()}_${Math.random()}`,
        text: message,
        userId: `auto_user_${Date.now()}`,
        userName: name,
        chatType: "general",
        timestamp: new Date(),
      };

      onAddMessage(newMessage);
    };

    const messageInterval = setInterval(
      generateMessage,
      Math.random() * 15000 + 8000,
    );
    return () => clearInterval(messageInterval);
  }, [onAddMessage]);
}
