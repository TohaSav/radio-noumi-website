import React, { useState, useEffect, useRef } from "react";
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

const DatingChat = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [usedMessages, setUsedMessages] = useState<Set<string>>(new Set());
  const [usedProfiles, setUsedProfiles] = useState<Set<string>>(new Set());
  const [profiles, setProfiles] = useState<Profile[]>([
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
    },
    {
      id: "3",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      name: "Елена",
      age: 23,
      city: "Екатеринбург",
      height: "170 см",
      weight: "58 кг",
      lookingFor: "Романтические отношения",
      about: "Студентка медицинского, обожаю животных и природу.",
      userId: "user3",
    },
    {
      id: "4",
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      name: "Алексей",
      age: 32,
      city: "Новосибирск",
      height: "175 см",
      weight: "80 кг",
      lookingFor: "Серьезные отношения",
      about: "Инженер, люблю готовить и играть на гитаре.",
      userId: "user4",
    },
    {
      id: "5",
      photo:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
      name: "Мария",
      age: 26,
      city: "Казань",
      height: "162 см",
      weight: "52 кг",
      lookingFor: "Дружба и общение",
      about: "Учитель английского, путешествую и изучаю языки.",
      userId: "user5",
    },
    {
      id: "6",
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      name: "Артём",
      age: 29,
      city: "Ростов-на-Дону",
      height: "183 см",
      weight: "78 кг",
      lookingFor: "Романтические отношения",
      about: "Фотограф, обожаю закаты и горы.",
      userId: "user6",
    },
  ]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg1",
      text: "Привет всем! Кто тут новенький? 😊",
      userId: "user1",
      userName: "Анна",
      chatType: "general",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "msg2",
      text: "Всем доброго времени суток! Как дела?",
      userId: "user2",
      userName: "Дмитрий",
      chatType: "general",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: "msg3",
      text: "Отличная погода сегодня! Кто-нибудь хочет прогуляться?",
      userId: "user3",
      userName: "Елена",
      chatType: "general",
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: "msg4",
      text: "А я вот вчера в кино ходил, классный фильм посмотрел!",
      userId: "user4",
      userName: "Алексей",
      chatType: "general",
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: "msg5",
      text: "Кто-нибудь изучает иностранные языки? Можем практиковаться вместе 📚",
      userId: "user5",
      userName: "Мария",
      chatType: "general",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("general");
  const audioRef = useRef<HTMLAudioElement>(null);

  // Массивы для генерации уникальных данных
  const messageTemplates = [
    "Привет всем! Кто тут новенький? 😊",
    "Всем доброго времени суток! Как дела?",
    "Отличная погода сегодня! Кто-нибудь хочет прогуляться?",
    "А я вот вчера в кино ходил, классный фильм посмотрел!",
    "Кто-нибудь изучает иностранные языки? Можем практиковаться вместе 📚",
    "Какие планы на выходные? 🌟",
    "Кто любит готовить? Поделитесь рецептами! 👨‍🍳",
    "Сегодня такой красивый закат! 🌅",
    "Кто-нибудь играет на музыкальных инструментах? 🎸",
    "Ищу компанию для похода в театр 🎭",
    "Кто занимается спортом? Давайте знакомиться! 💪",
    "Обожаю читать книги, кто тоже любит литературу? 📖",
    "Планирую путешествие, кто был в интересных местах? ✈️",
    "Кто любит фотографировать? Поделимся опытом! 📸",
    "Сегодня попробовал новое кафе, очень понравилось! ☕",
  ];

  const nameTemplates = [
    "Анна",
    "Дмитрий",
    "Елена",
    "Алексей",
    "Мария",
    "Артём",
    "Ольга",
    "Иван",
    "Екатерина",
    "Максим",
    "Татьяна",
    "Сергей",
    "Наталья",
    "Павел",
    "Юлия",
    "Андрей",
    "Светлана",
    "Роман",
    "Ирина",
    "Денис",
    "Виктория",
    "Михаил",
  ];

  const cityTemplates = [
    "Москва",
    "СПб",
    "Екатеринбург",
    "Новосибирск",
    "Казань",
    "Ростов-на-Дону",
    "Краснодар",
    "Воронеж",
    "Самара",
    "Омск",
    "Челябинск",
    "Уфа",
    "Пермь",
  ];

  const lookingForTemplates = [
    "Серьезные отношения",
    "Дружба и общение",
    "Романтические отношения",
    "Совместные увлечения",
    "Путешествия вдвоем",
    "Спортивный партнер",
  ];

  const aboutTemplates = [
    "Люблю путешествовать и читать книги. Работаю дизайнером.",
    "Программист, увлекаюсь спортом и кино.",
    "Студентка медицинского, обожаю животных и природу.",
    "Инженер, люблю готовить и играть на гитаре.",
    "Учитель английского, путешествую и изучаю языки.",
    "Фотограф, обожаю закаты и горы.",
    "Работаю в IT, увлекаюсь танцами и йогой.",
    "Психолог, люблю театр и классическую музыку.",
    "Журналист, интересуюсь историей и археологией.",
    "Врач, занимаюсь волонтерством и рисованием.",
  ];

  const photoTemplates = [
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
  ];

  // Функция для получения уникального элемента из массива
  const getUniqueItem = (array: string[], usedSet: Set<string>): string => {
    const availableItems = array.filter((item) => !usedSet.has(item));
    if (availableItems.length === 0) {
      // Если все элементы использованы, очищаем историю
      usedSet.clear();
      return array[Math.floor(Math.random() * array.length)];
    }
    const randomItem =
      availableItems[Math.floor(Math.random() * availableItems.length)];
    usedSet.add(randomItem);
    return randomItem;
  };

  // Функция для создания уникального профиля
  const createUniqueProfile = (): Profile => {
    const name = getUniqueItem(nameTemplates, usedProfiles);
    const profileId = `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return {
      id: profileId,
      photo: photoTemplates[Math.floor(Math.random() * photoTemplates.length)],
      name,
      age: Math.floor(Math.random() * (35 - 18) + 18),
      city: cityTemplates[Math.floor(Math.random() * cityTemplates.length)],
      height: `${Math.floor(Math.random() * (190 - 155) + 155)} см`,
      weight: `${Math.floor(Math.random() * (85 - 45) + 45)} кг`,
      lookingFor:
        lookingForTemplates[
          Math.floor(Math.random() * lookingForTemplates.length)
        ],
      about: aboutTemplates[Math.floor(Math.random() * aboutTemplates.length)],
      userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  };

  // Функция для создания уникального сообщения
  const createUniqueMessage = (): Message => {
    const messageText = getUniqueItem(messageTemplates, usedMessages);
    const userName =
      nameTemplates[Math.floor(Math.random() * nameTemplates.length)];

    return {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text: messageText,
      userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userName,
      chatType: "general",
      timestamp: new Date(),
    };
  };

  // Автоматическое добавление профилей каждые 10 минут
  useEffect(() => {
    const addProfileInterval = setInterval(
      () => {
        const newProfile = createUniqueProfile();
        setProfiles((prev) => [...prev, newProfile]);
      },
      10 * 60 * 1000,
    ); // 10 минут

    return () => clearInterval(addProfileInterval);
  }, []);

  // Автоматическое добавление сообщений каждые 2-5 минут
  useEffect(() => {
    const addMessageInterval = setInterval(
      () => {
        const newMessage = createUniqueMessage();
        setMessages((prev) => [...prev, newMessage]);
      },
      Math.random() * (5 - 2) * 60 * 1000 + 2 * 60 * 1000,
    ); // 2-5 минут

    return () => clearInterval(addMessageInterval);
  }, []);

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

  const [registerForm, setRegisterForm] = useState({
    login: "",
    email: "",
    password: "",
  });

  // Фоновое радио
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }
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

    setProfiles([...profiles, newProfile]);
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

    setMessages([...messages, newMessage]);
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
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>Radio Noumi</span>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2 animate-fade-in">
              <Icon name="Heart" size={24} />
              Чат знакомств
            </h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 bg-white/60 px-3 py-2 rounded-full shadow-sm">
            <Icon name="Radio" size={16} />
            <span>Фоновое радио</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Основной чат */}
        <div className="flex-1 flex flex-col">
          <ChatSection
            messages={messages}
            activeTab={activeTab}
            selectedChat={selectedChat}
            onTabChange={setActiveTab}
            onChatSelect={setSelectedChat}
          />

          {/* Поле ввода */}
          <div className="p-4 bg-gradient-to-r from-white to-pink-50/50 border-t border-pink-200/50 backdrop-blur-sm">
            <div className="flex gap-3 max-w-4xl mx-auto">
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
                className="flex-1 border-pink-200 focus:border-pink-400 focus:ring-pink-400/20 bg-white/90 placeholder:text-pink-400/70 transition-all duration-300"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || !isLoggedIn}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>

          {/* Профили */}
          <div className="p-6 bg-gradient-to-br from-pink-50/80 to-purple-50/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Анкеты участников 💕
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {profiles.map((profile, index) => (
                  <div
                    key={profile.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProfileCard
                      profile={profile}
                      onLike={handleLike}
                      currentUserId={currentUser?.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Боковая панель */}
        <UserPanel
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          likes={likes}
          profiles={profiles}
          onRegisterClick={() => setShowRegisterForm(true)}
        />
      </div>

      {/* Модальные окна */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="User" size={20} />
              Создать анкету
            </DialogTitle>
          </DialogHeader>
          <ProfileForm
            form={profileForm}
            onChange={setProfileForm}
            onSubmit={handleProfileSubmit}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showRegisterForm} onOpenChange={setShowRegisterForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="UserPlus" size={20} />
              Регистрация
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Логин *
              </label>
              <Input
                type="text"
                placeholder="Ваш логин"
                value={registerForm.login}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, login: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email *
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, email: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Пароль *
              </label>
              <Input
                type="password"
                placeholder="Пароль"
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, password: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleRegisterSubmit}
                disabled={
                  !registerForm.login ||
                  !registerForm.email ||
                  !registerForm.password
                }
                className="flex-1 bg-pink-500 hover:bg-pink-600"
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
              >
                Анкета
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatingChat;
