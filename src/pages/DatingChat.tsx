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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex flex-col">
      {/* Фоновое радио */}
      <audio ref={audioRef} loop>
        <source src="https://myradio24.org/61673" type="audio/mpeg" />
      </audio>

      {/* Хедер */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>Radio Noumi</span>
            </Link>
            <h1 className="text-xl font-bold text-pink-600 flex items-center gap-2">
              <Icon name="Heart" size={24} />
              Чат знакомств
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
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
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
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
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || !isLoggedIn}
                className="bg-pink-500 hover:bg-pink-600"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>

          {/* Профили */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onLike={handleLike}
                currentUserId={currentUser?.id}
              />
            ))}
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
