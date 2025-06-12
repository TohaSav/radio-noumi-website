import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface Profile {
  id: string;
  photo: string;
  name: string;
  age: number;
  city: string;
  height: number;
  weight: number;
  lookingFor: string;
  about: string;
  timestamp: Date;
}

interface User {
  login: string;
  email: string;
  password: string;
}

interface Like {
  id: string;
  profileId: string;
  likerName: string;
  timestamp: Date;
}

interface Message {
  id: string;
  from: string;
  to?: string;
  content: string;
  timestamp: Date;
  type: "public" | "private";
}

const DatingChat = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("general");

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
      height: parseInt(profileForm.height),
      weight: parseInt(profileForm.weight),
      lookingFor: profileForm.lookingFor,
      about: profileForm.about,
      timestamp: new Date(),
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

  const handleRegister = () => {
    const newUser: User = {
      login: registerForm.login,
      email: registerForm.email,
      password: registerForm.password,
    };

    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setShowRegisterModal(false);
    setRegisterForm({ login: "", email: "", password: "" });
  };

  const handleLike = (profileId: string) => {
    if (!currentUser) return;

    const newLike: Like = {
      id: Date.now().toString(),
      profileId,
      likerName: currentUser.login,
      timestamp: new Date(),
    };

    setLikes([...likes, newLike]);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !currentUser) return;

    if (!isLoggedIn) {
      setShowProfileModal(true);
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      from: currentUser.login,
      to: selectedChat || undefined,
      content: messageInput,
      timestamp: new Date(),
      type: selectedChat ? "private" : "public",
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  const getMyLikes = () => {
    return likes.filter((like) => {
      const profile = profiles.find((p) => p.id === like.profileId);
      return profile && currentUser && profile.name === currentUser.login;
    });
  };

  const getPublicMessages = () => {
    return messages.filter((msg) => msg.type === "public");
  };

  const getPrivateMessages = (chatWith: string) => {
    return messages.filter(
      (msg) =>
        msg.type === "private" &&
        ((msg.from === currentUser?.login && msg.to === chatWith) ||
          (msg.from === chatWith && msg.to === currentUser?.login)),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Основной чат */}
        <div className="lg:col-span-3 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              💕 Чат знакомств
            </h1>
            <p className="text-gray-600">Найдите свою вторую половинку</p>
          </div>

          {/* Анкеты пользователей */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((profile) => (
              <Card
                key={profile.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                    <h3 className="font-semibold">
                      {profile.name}, {profile.age}
                    </h3>
                    <p className="text-sm opacity-90">
                      Ищет: {profile.lookingFor}
                    </p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <p>{profile.city}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(profile.id)}
                      className="text-pink-500 hover:text-pink-600"
                    >
                      <Icon name="Heart" size={20} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Чат сообщений */}
          <Card className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="general">Общий чат</TabsTrigger>
                {selectedChat && (
                  <TabsTrigger value="private">
                    Личные сообщения с {selectedChat}
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <div className="h-64 overflow-y-auto border rounded-lg p-4 bg-white">
                  {getPublicMessages().map((msg) => (
                    <div key={msg.id} className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <button
                          onClick={() => {
                            setSelectedChat(msg.from);
                            setActiveTab("private");
                          }}
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          {msg.from}
                        </button>
                        <span className="text-xs text-gray-500">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{msg.content}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {selectedChat && (
                <TabsContent value="private" className="space-y-4">
                  <div className="h-64 overflow-y-auto border rounded-lg p-4 bg-white">
                    {getPrivateMessages(selectedChat).map((msg) => (
                      <div
                        key={msg.id}
                        className={`mb-3 ${msg.from === currentUser?.login ? "text-right" : "text-left"}`}
                      >
                        <div
                          className={`inline-block p-2 rounded-lg ${
                            msg.from === currentUser?.login
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          <p>{msg.content}</p>
                          <span className="text-xs opacity-70">
                            {msg.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              )}
            </Tabs>

            <div className="flex gap-2 mt-4">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder={
                  isLoggedIn
                    ? "Напишите сообщение..."
                    : "Нажмите для создания анкеты..."
                }
                onFocus={() => !isLoggedIn && setShowProfileModal(true)}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </Card>
        </div>

        {/* Личный кабинет */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Личный кабинет</h2>

            {!isLoggedIn ? (
              <div className="space-y-4">
                <p className="text-gray-600 text-sm">
                  Войдите для доступа к функциям
                </p>
                <Button
                  onClick={() => setShowRegisterModal(true)}
                  className="w-full"
                >
                  Регистрация
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-800">
                    Добро пожаловать!
                  </p>
                  <p className="text-sm text-green-600">{currentUser?.login}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Уведомления о лайках</h3>
                  <div className="space-y-2">
                    {getMyLikes().map((like) => (
                      <div key={like.id} className="p-2 bg-pink-50 rounded-lg">
                        <p className="text-sm">
                          <Icon
                            name="Heart"
                            size={14}
                            className="inline mr-1 text-pink-500"
                          />
                          {like.likerName} оценил вашу анкету
                        </p>
                        <span className="text-xs text-gray-500">
                          {like.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                    {getMyLikes().length === 0 && (
                      <p className="text-sm text-gray-500">
                        Пока нет новых лайков
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Модальное окно создания анкеты */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Создание анкеты</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Фото (URL)</label>
              <Input
                value={profileForm.photo}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, photo: e.target.value })
                }
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Имя</label>
              <Input
                value={profileForm.name}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, name: e.target.value })
                }
                placeholder="Ваше имя"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Возраст</label>
              <Input
                type="number"
                value={profileForm.age}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, age: e.target.value })
                }
                placeholder="25"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Город</label>
              <Input
                value={profileForm.city}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, city: e.target.value })
                }
                placeholder="Москва"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Рост (см)</label>
              <Input
                type="number"
                value={profileForm.height}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, height: e.target.value })
                }
                placeholder="175"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Вес (кг)</label>
              <Input
                type="number"
                value={profileForm.weight}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, weight: e.target.value })
                }
                placeholder="70"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Кого ищете</label>
              <Input
                value={profileForm.lookingFor}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, lookingFor: e.target.value })
                }
                placeholder="Девушку для серьезных отношений"
              />
            </div>
            <div>
              <label className="text-sm font-medium">О себе</label>
              <Textarea
                value={profileForm.about}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, about: e.target.value })
                }
                placeholder="Расскажите о себе..."
                rows={3}
              />
            </div>
            <Button
              onClick={handleProfileSubmit}
              className="w-full"
              disabled={!profileForm.name || !profileForm.age}
            >
              Отправить анкету
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Модальное окно регистрации */}
      <Dialog open={showRegisterModal} onOpenChange={setShowRegisterModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Регистрация</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Логин</label>
              <Input
                value={registerForm.login}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, login: e.target.value })
                }
                placeholder="Ваш логин"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, email: e.target.value })
                }
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Пароль</label>
              <Input
                type="password"
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, password: e.target.value })
                }
                placeholder="Пароль"
              />
            </div>
            <Button
              onClick={handleRegister}
              className="w-full"
              disabled={
                !registerForm.login ||
                !registerForm.email ||
                !registerForm.password
              }
            >
              Зарегистрироваться
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatingChat;
