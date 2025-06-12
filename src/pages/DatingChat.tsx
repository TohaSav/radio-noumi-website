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

// Ключ для localStorage
const MESSAGES_STORAGE_KEY = "dating_chat_all_messages";

const DatingChat = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
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

  // Загрузка сохраненных сообщений при инициализации
  useEffect(() => {
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
  }, []);

  // Сохранение сообщений в localStorage при каждом изменении
  const saveMessages = (newMessages: Message[]) => {
    try {
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(newMessages));
    } catch (error) {
      console.error("Ошибка сохранения сообщений:", error);
    }
  };

  // Фоновое радио
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  // Автоматическое добавление анкет каждые 5 минут
  useEffect(() => {
    const interval = setInterval(
      () => {
        const generateRandomProfile = (): Profile => {
          const isFemale = Math.random() > 0.5;
          const femaleNames = [
            "Анна",
            "Мария",
            "Елена",
            "Екатерина",
            "Наталья",
            "Ольга",
            "Татьяна",
            "Светлана",
          ];
          const maleNames = [
            "Александр",
            "Дмитрий",
            "Максим",
            "Сергей",
            "Андрей",
            "Алексей",
            "Артём",
            "Илья",
          ];
          const cities = [
            "Москва",
            "СПб",
            "Екатеринбург",
            "Новосибирск",
            "Казань",
            "Краснодар",
          ];
          const lookingForOptions = [
            "Серьезные отношения",
            "Дружба и общение",
            "Совместный досуг",
            "Спутник жизни",
          ];

          const name = isFemale
            ? femaleNames[Math.floor(Math.random() * femaleNames.length)]
            : maleNames[Math.floor(Math.random() * maleNames.length)];

          const femalePhotos = [
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
          ];

          const malePhotos = [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
          ];

          return {
            id: `auto_${Date.now()}_${Math.random()}`,
            photo: isFemale
              ? femalePhotos[Math.floor(Math.random() * femalePhotos.length)]
              : malePhotos[Math.floor(Math.random() * malePhotos.length)],
            name,
            age: 18 + Math.floor(Math.random() * 32),
            city: cities[Math.floor(Math.random() * cities.length)],
            height: isFemale
              ? `${155 + Math.floor(Math.random() * 20)} см`
              : `${170 + Math.floor(Math.random() * 25)} см`,
            weight: isFemale
              ? `${45 + Math.floor(Math.random() * 25)} кг`
              : `${65 + Math.floor(Math.random() * 35)} кг`,
            lookingFor:
              lookingForOptions[
                Math.floor(Math.random() * lookingForOptions.length)
              ],
            about: `Привет! Меня зовут ${name}, живу в городе ${cities[Math.floor(Math.random() * cities.length)]}.`,
            userId: `auto_user_${Date.now()}`,
            gender: isFemale ? "female" : "male",
          };
        };

        setProfiles((prev) => [...prev, generateRandomProfile()]);
      },
      5 * 60 * 1000,
    ); // 5 минут

    return () => clearInterval(interval);
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
        <div className="container mx-auto px-2 md:px-4 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              to="/"
              className="flex items-center gap-1 md:gap-2 text-gray-600 hover:text-gray-800"
            >
              <Icon name="ArrowLeft" size={16} className="md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Radio Noumi</span>
            </Link>
            <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-1 md:gap-2">
              <Icon name="Heart" size={18} className="md:w-6 md:h-6" />
              <span className="hidden sm:inline">Чат знакомств</span>
              <span className="sm:hidden">Знакомства</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-3 text-sm text-gray-600">
            <Icon name="Radio" size={16} />
            <span>Фоновое радио</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Основной чат */}
        <div className="flex-1 flex flex-col min-h-0">
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
          />

          {/* Поле ввода */}
          <div className="p-2 md:p-4 bg-white/90 border-t border-pink-200/50">
            <div className="flex gap-2 md:gap-3 max-w-4xl mx-auto">
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
                className="flex-1 text-sm md:text-base"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || !isLoggedIn}
                size={window.innerWidth < 768 ? "sm" : "default"}
              >
                <Icon name="Send" size={14} className="md:w-4 md:h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Боковая панель - скрыта на мобильных */}
        <div className="hidden md:block">
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
        <DialogContent className="max-w-md max-h-[90vh] overflow-hidden">
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
        <DialogContent className="max-w-md">
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
                className="flex-1"
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
