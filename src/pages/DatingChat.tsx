import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { Profile, User, Like, Message } from "@/types/dating";
import ProfileCard from "@/components/dating/ProfileCard";
import ProfileForm from "@/components/dating/ProfileForm";
import ChatSection from "@/components/dating/ChatSection";
import UserPanel from "@/components/dating/UserPanel";

// Ключи для localStorage
const MESSAGES_STORAGE_KEY = "dating_chat_all_messages";
const PROFILES_STORAGE_KEY = "dating_chat_profiles";

const DatingChat = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showViewProfileModal, setShowViewProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showMobilePanel, setShowMobilePanel] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("general");
  const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female">(
    "all",
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  const [profileForm, setProfileForm] = useState({
    photo: "",
    name: "",
    age: "",
    city: "",
    height: "",
    weight: "",
    lookingFor: "",
    about: "",
  });

  const handleChatSelect = (userName: string) => {};

  const [registerForm, setRegisterForm] = useState({
    login: "",
    email: "",
    password: "",
  });

  // Загрузка сохраненных данных при инициализации
  useEffect(() => {
    // Загрузка сообщений
    const savedMessages = localStorage.getItem(MESSAGES_STORAGE_KEY);
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error("Ошибка загрузки сообщений:", error);
      }
    }

    // Загрузка анкет
    const savedProfiles = localStorage.getItem(PROFILES_STORAGE_KEY);
    if (savedProfiles) {
      try {
        const parsedProfiles = JSON.parse(savedProfiles);
        setProfiles(parsedProfiles);
      } catch (error) {
        console.error("Ошибка загрузки анкет:", error);
        // Если ошибка загрузки, устанавливаем дефолтные анкеты
        setProfiles([
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
        ]);
      }
    } else {
      // Устанавливаем дефолтные анкеты если нет сохраненных
      setProfiles([
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
      ]);
    }
  }, []);

  // Сохранение сообщений в localStorage при каждом изменении
  const saveMessages = (newMessages: Message[]) => {
    try {
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(newMessages));
    } catch (error) {
      console.error("Ошибка сохранения сообщений:", error);
    }
  };

  // Сохранение анкет в localStorage
  const saveProfiles = (newProfiles: Profile[]) => {
    try {
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(newProfiles));
    } catch (error) {
      console.error("Ошибка сохранения анкет:", error);
    }
  };

  // Фоновое радио
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  // Автоматическое добавление анкет каждые 30-90 секунд
  useEffect(() => {
    // Уникальные пулы фотографий для каждого пола
    const malePhotos = [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
      "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=400",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400",
    ];

    const femalePhotos = [
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400",
      "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400",
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=400",
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400",
    ];

    // Отслеживание использованных фотографий
    const usedMalePhotos = new Set<string>();
    const usedFemalePhotos = new Set<string>();

    // Заполняем сеты уже используемыми фотографиями
    profiles.forEach((profile) => {
      if (profile.gender === "male" && malePhotos.includes(profile.photo)) {
        usedMalePhotos.add(profile.photo);
      } else if (
        profile.gender === "female" &&
        femalePhotos.includes(profile.photo)
      ) {
        usedFemalePhotos.add(profile.photo);
      }
    });

    // Функция для получения уникальной фотографии
    const getUniquePhoto = (gender: "male" | "female"): string => {
      const photos = gender === "male" ? malePhotos : femalePhotos;
      const usedPhotos = gender === "male" ? usedMalePhotos : usedFemalePhotos;

      const availablePhotos = photos.filter((photo) => !usedPhotos.has(photo));

      if (availablePhotos.length === 0) {
        // Если все фотографии использованы, сбрасываем сет
        usedPhotos.clear();
        return photos[Math.floor(Math.random() * photos.length)];
      }

      const selectedPhoto =
        availablePhotos[Math.floor(Math.random() * availablePhotos.length)];
      usedPhotos.add(selectedPhoto);
      return selectedPhoto;
    };

    const interval = setInterval(
      () => {
        const generateRandomProfile = (): Profile => {
          const isFemale = Math.random() > 0.4; // больше женских анкет
          const gender = isFemale ? "female" : "male";
          const uniquePhoto = getUniquePhoto(gender);

          const femaleProfiles = [
            {
              name: "Алёна",
              age: 24,
              city: "Москва",
              about:
                "Маркетолог в IT. Обожаю йогу на рассвете и спонтанные путешествия. Ищу мужчину с чувством юмора и добрым сердцем.",
              lookingFor: "Серьезные отношения",
            },
            {
              name: "Виктория",
              age: 27,
              city: "СПб",
              about:
                "Стоматолог с душой художника. Фотографирую закаты, готовлю авторские десерты. Мечтаю о партнере для совместных открытий.",
              lookingFor: "Серьезные отношения",
            },
            {
              name: "Мария",
              age: 23,
              city: "Екатеринбург",
              about:
                "Психолог и любитель книг. Верю в силу позитивного мышления. Ищу надежного спутника жизни.",
              lookingFor: "Серьезные отношения",
            },
          ];

          const maleProfiles = [
            {
              name: "Андрей",
              age: 29,
              city: "Новосибирск",
              about:
                "Инженер-программист. Увлекаюсь альпинизмом и фотографией. Ищу спутницу для активного отдыха.",
              lookingFor: "Дружба и общение",
            },
            {
              name: "Максим",
              age: 31,
              city: "Казань",
              about:
                "Предприниматель в сфере IT. Люблю путешествия и новые впечатления. Ищу вторую половинку.",
              lookingFor: "Серьезные отношения",
            },
          ];

          const profileData = isFemale
            ? femaleProfiles[Math.floor(Math.random() * femaleProfiles.length)]
            : maleProfiles[Math.floor(Math.random() * maleProfiles.length)];

          return {
            id: Date.now().toString(),
            photo: uniquePhoto,
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

        setProfiles((prev) => {
          const newProfiles = [...prev, generateRandomProfile()];
          saveProfiles(newProfiles);
          return newProfiles;
        });
      },
      Math.random() * 60000 + 30000, // от 30 секунд до 1.5 минут
    );

    return () => clearInterval(interval);
  }, []);

  // Автоматические уникальные сообщения
  useEffect(() => {
    const createUniqueMessages = () => {
      const situations = [
        "Только что вернулся из спортзала, кто тоже за ЗОЖ?",
        "Смотрю сериал 'Игра престолов', есть фанаты?",
        "Планирую поездку в Турцию на следующий месяц",
        "Работаю удаленно из кофейни, кто тоже фрилансер?",
        "Иду сегодня в театр на премьеру, кто любит искусство?",
        "Учу итальянский язык, может кто-то поможет с практикой?",
        "Готовлю домашнюю пиццу, поделюсь рецептом!",
        "Гуляю с собакой в парке, отличная погода",
        "Читаю книгу Харуки Мураками, кто тоже любит японскую литературу?",
        "Завтра еду к родителям в деревню на выходные",
        "Записался на курсы фотографии, хочу развиваться",
        "Смотрю закат с крыши, красота неописуемая",
        "Пробую новое хобби - гончарное дело",
        "Иду на концерт любимой группы, кто тоже меломан?",
        "Готовлюсь к марафону, бегаю каждое утро",
        "Изучаю программирование, сложно но интересно",
        "Волонтерю в приюте для животных по выходным",
        "Учусь играть на гитаре, пока получается плохо",
        "Делаю ремонт в квартире, руки уже не чувствую",
        "Открыл для себя медитацию, очень помогает",
        "Хожу на танцы, кто тоже любит двигаться?",
        "Изучаю историю искусств, увлекательная тема",
        "Готовлю ужин для друзей, люблю принимать гостей",
        "Планирую переезд в другой город через полгода",
        "Работаю над стартапом, ищу единомышленников",
      ];

      const emotions = [
        "В отличном настроении сегодня! 😊",
        "Немного грустно, хочется теплого общения",
        "Очень вдохновлен новыми планами! ✨",
        "Устал на работе, но вечер обещает быть интересным",
        "Радуюсь каждому дню, жизнь прекрасна! 🌟",
        "Размышляю о будущем, столько планов...",
        "Счастлив от простых вещей - кофе и хорошая книга",
        "Немного волнуюсь перед важной встречей",
        "Чувствую прилив энергии, готов к переменам! 💪",
      ];

      const questions = [
        "Кто может посоветовать хороший фильм для вечера?",
        "Где лучше всего встретить рассвет в нашем городе?",
        "Какие у вас планы на ближайшие выходные?",
        "Кто знает, где проходят интересные мастер-классы?",
        "Подскажите уютное место для первого свидания?",
        "Кто может рассказать о своем самом ярком путешествии?",
        "Какую музыку слушаете, когда нужно поднять настроение?",
        "Кто увлекается кулинарией? Поделитесь рецептами!",
        "Где лучше всего изучать иностранные языки в городе?",
        "Кто может посоветовать хорошего психолога?",
      ];

      const names = [
        "Анна",
        "Мария",
        "Елена",
        "Екатерина",
        "Наталья",
        "Ольга",
        "Светлана",
        "Александр",
        "Дмитрий",
        "Максим",
        "Сергей",
        "Андрей",
        "Алексей",
        "Артём",
        "Юлия",
        "Дарья",
        "Алина",
        "Виктория",
        "Полина",
        "Кристина",
        "Валерия",
        "Илья",
        "Кирилл",
        "Михаил",
        "Никита",
        "Роман",
        "Егор",
        "Денис",
      ];

      // Создаем уникальное сообщение каждый раз
      const messageTypes = [situations, emotions, questions];
      const selectedType =
        messageTypes[Math.floor(Math.random() * messageTypes.length)];
      const message =
        selectedType[Math.floor(Math.random() * selectedType.length)];
      const name = names[Math.floor(Math.random() * names.length)];

      return { text: message, name };
    };

    const USED_MESSAGES_KEY = "used_unique_messages";
    const MAX_STORED_MESSAGES = 500; // храним последние 500 сообщений

    const getUsedMessages = (): string[] => {
      const stored = localStorage.getItem(USED_MESSAGES_KEY);
      return stored ? JSON.parse(stored) : [];
    };

    const saveUsedMessage = (message: string) => {
      const used = getUsedMessages();
      used.push(message);
      // Оставляем только последние сообщения
      if (used.length > MAX_STORED_MESSAGES) {
        used.splice(0, used.length - MAX_STORED_MESSAGES);
      }
      localStorage.setItem(USED_MESSAGES_KEY, JSON.stringify(used));
    };

    const generateUniqueMessage = () => {
      const usedMessages = getUsedMessages();
      let attempts = 0;
      let messageData;
      let fullMessage;

      do {
        messageData = createUniqueMessages();
        fullMessage = `${messageData.name}: ${messageData.text}`;
        attempts++;
      } while (usedMessages.includes(fullMessage) && attempts < 20);

      // Если не нашли уникальное, добавляем уникальный элемент
      if (attempts >= 20) {
        const timestamp = new Date().toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        });
        messageData.text += ` (${timestamp})`;
        fullMessage = `${messageData.name}: ${messageData.text}`;
      }

      const newMessage: Message = {
        id: `auto_${Date.now()}_${Math.random()}`,
        text: messageData.text,
        userId: `auto_user_${Date.now()}`,
        userName: messageData.name,
        chatType: "general",
        timestamp: new Date(),
      };

      addMessage(newMessage);
      saveUsedMessage(fullMessage);
    };

    const messageInterval = setInterval(
      () => {
        generateUniqueMessage();
      },
      Math.random() * 15000 + 8000, // от 8 до 23 секунд
    );

    return () => clearInterval(messageInterval);
  }, []);

  const handleProfileSubmit = () => {
    if (!currentUser) return;

    const newProfile: Profile = {
      id: Date.now().toString(),
      photo:
        profileForm.photo ||
        "https://images.unsplash.com/photo-1494790108755-2616b612b786",
      name: profileForm.name,
      age: parseInt(profileForm.age),
      city: profileForm.city,
      height: profileForm.height,
      weight: profileForm.weight,
      lookingFor: profileForm.lookingFor,
      about: profileForm.about,
      userId: currentUser.id,
    };

    setProfiles((prev) => {
      const newProfiles = [...prev, newProfile];
      saveProfiles(newProfiles);
      return newProfiles;
    });
    setShowProfileModal(false);
    setProfileForm({
      photo: "",
      name: "",
      age: "",
      city: "",
      height: "",
      weight: "",
      lookingFor: "",
      about: "",
    });
  };

  const handleLike = (profileId: string) => {
    if (!currentUser) return;

    const newLike: Like = {
      id: Date.now().toString(),
      fromUserId: currentUser.id,
      toProfileId: profileId,
    };

    setLikes([...likes, newLike]);
  };

  const addMessage = (message: Message) => {
    setMessages((prev) => {
      const newMessages = [...prev, message];
      saveMessages(newMessages);
      return newMessages;
    });
  };

  const handleRegisterSubmit = () => {
    const newUser: User = {
      id: Date.now().toString(),
      login: registerForm.login,
      email: registerForm.email,
    };

    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setShowRegisterForm(false);
    setRegisterForm({ login: "", email: "", password: "" });
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !currentUser) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageInput,
      userId: currentUser.id,
      userName: currentUser.login,
      chatType: activeTab === "private" ? "private" : "general",
      timestamp: new Date(),
    };

    addMessage(newMessage);
    setMessageInput("");
  };

  const handleInputFocus = () => {
    if (!isLoggedIn) {
      setShowRegisterForm(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 flex flex-col">
      {/* Фоновое радио */}
      <audio ref={audioRef} loop>
        <source src="https://myradio24.org/61673" type="audio/mpeg" />
      </audio>

      {/* Хедер */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-pink-200/50">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-800"
            >
              <Icon name="ArrowLeft" size={16} className="sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Radio Noumi</span>
            </Link>
            <h1 className="text-base sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-1 sm:gap-2">
              <Icon
                name="Heart"
                size={16}
                className="sm:w-5 sm:h-5 lg:w-6 lg:h-6"
              />
              <span className="hidden sm:inline">Чат знакомств</span>
              <span className="sm:hidden">Знакомства</span>
            </h1>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-sm text-gray-600">
            <Icon name="Radio" size={16} />
            <span>Фоновое радио</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Основной чат */}
        <div className="flex-1 flex flex-col min-h-0 order-1">
          <ChatSection
            messages={messages}
            activeTab={activeTab}
            selectedChat={selectedChat}
            onTabChange={setActiveTab}
            onChatSelect={setSelectedChat}
            profiles={profiles.filter(
              (profile) =>
                genderFilter === "all" || profile.gender === genderFilter,
            )}
            onLike={handleLike}
            currentUserId={currentUser?.id}
            onAddMessage={(msg) => setMessages((prev) => [...prev, msg])}
            genderFilter={genderFilter}
            onGenderFilterChange={setGenderFilter}
            onViewProfile={(profile) => {
              setSelectedProfile(profile);
              setShowViewProfileModal(true);
            }}
            onCreateProfile={() => setShowProfileModal(true)}
          />

          {/* Поле ввода */}
          <div className="p-3 sm:p-4 bg-white/90 border-t border-pink-200/50 order-3 lg:order-2">
            <div className="flex gap-2 sm:gap-3 max-w-4xl mx-auto">
              <Input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onFocus={handleInputFocus}
                placeholder={
                  isLoggedIn
                    ? "Написать сообщение..."
                    : "Нажмите для создания анкеты..."
                }
                className="flex-1 text-sm sm:text-base h-10 sm:h-11"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || !isLoggedIn}
                size="sm"
                className="h-10 sm:h-11 px-3 sm:px-4"
              >
                <Icon name="Send" size={16} className="sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Боковая панель - мобильная версия */}
        <div className="lg:hidden bg-white/90 border-t border-pink-200/50 order-2">
          <button
            onClick={() => setShowMobilePanel(!showMobilePanel)}
            className="w-full p-3 flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <Icon name="User" size={16} />
            <span className="text-sm">Личный кабинет</span>
            <Icon
              name={showMobilePanel ? "ChevronUp" : "ChevronDown"}
              size={16}
            />
          </button>

          {showMobilePanel && (
            <div className="max-h-60 overflow-y-auto">
              <UserPanel
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                likes={likes}
                profiles={profiles.filter(
                  (profile) =>
                    genderFilter === "all" || profile.gender === genderFilter,
                )}
                onRegisterClick={() => setShowRegisterForm(true)}
                genderFilter={genderFilter}
                onGenderFilterChange={setGenderFilter}
              />
            </div>
          )}
        </div>

        {/* Боковая панель - десктопная версия */}
        <div className="hidden lg:block lg:w-80 order-2">
          <UserPanel
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            likes={likes}
            profiles={profiles.filter(
              (profile) =>
                genderFilter === "all" || profile.gender === genderFilter,
            )}
            onRegisterClick={() => setShowRegisterForm(true)}
            genderFilter={genderFilter}
            onGenderFilterChange={setGenderFilter}
          />
        </div>
      </div>

      {/* Модальные окна */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto mx-4">
          <DialogHeader>
            <DialogTitle>Создать анкету</DialogTitle>
          </DialogHeader>
          <ProfileForm
            form={profileForm}
            onChange={setProfileForm}
            onSubmit={handleProfileSubmit}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showRegisterForm} onOpenChange={setShowRegisterForm}>
        <DialogContent className="max-w-sm sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Регистрация</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Логин *</label>
              <Input
                type="text"
                placeholder="Ваш логин"
                value={registerForm.login}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, login: e.target.value })
                }
                className="h-10 sm:h-11"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email *</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, email: e.target.value })
                }
                className="h-10 sm:h-11"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Пароль *</label>
              <Input
                type="password"
                placeholder="Пароль"
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, password: e.target.value })
                }
                className="h-10 sm:h-11"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleRegisterSubmit}
                disabled={
                  !registerForm.login ||
                  !registerForm.email ||
                  !registerForm.password
                }
                className="flex-1 h-10 sm:h-11"
              >
                Зарегистрироваться
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRegisterForm(false);
                  setShowProfileModal(true);
                }}
                disabled={!isLoggedIn}
                className="h-10 sm:h-11"
              >
                Анкета
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showViewProfileModal}
        onOpenChange={setShowViewProfileModal}
      >
        <DialogContent className="max-w-sm sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Анкета</DialogTitle>
          </DialogHeader>
          {selectedProfile && (
            <div className="space-y-4">
              <img
                src={selectedProfile.photo}
                alt={selectedProfile.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-bold">
                  {selectedProfile.name}, {selectedProfile.age}
                </h3>
                <p className="text-sm text-gray-600">{selectedProfile.city}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Рост:</span>{" "}
                  {selectedProfile.height}
                </div>
                <div>
                  <span className="font-medium">Вес:</span>{" "}
                  {selectedProfile.weight}
                </div>
              </div>
              <div>
                <span className="font-medium">Ищет:</span>{" "}
                {selectedProfile.lookingFor}
              </div>
              <div>
                <span className="font-medium">О себе:</span>
                <p className="text-sm mt-1">{selectedProfile.about}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatingChat;
