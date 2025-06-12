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
  ]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
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
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>Radio Noumi</span>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <Icon name="Heart" size={24} />
              Чат знакомств
            </h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
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
            profiles={profiles}
            onLike={handleLike}
            currentUserId={currentUser?.id}
            onAddMessage={(msg) => setMessages((prev) => [...prev, msg])}
          />

          {/* Поле ввода */}
          <div className="p-4 bg-white/90 border-t border-pink-200/50">
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
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || !isLoggedIn}
              >
                <Icon name="Send" size={16} />
              </Button>
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
