import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
      chatType: selectedChat || "general",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex">
      {/* Основной чат */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-sm border-b p-4">
          <h1 className="text-2xl font-bold text-pink-600">💕 Чат знакомств</h1>
        </div>

        <ChatSection
          messages={messages}
          activeTab={activeTab}
          selectedChat={selectedChat}
          onTabChange={setActiveTab}
          onChatSelect={setSelectedChat}
        />

        <div className="p-4 bg-white border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onFocus={() => !isLoggedIn && setShowRegisterForm(true)}
              placeholder="Написать сообщение..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  setShowRegisterForm(true);
                } else {
                  setShowProfileModal(true);
                }
              }}
              className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            >
              Отправить
            </button>
          </div>
        </div>

        {/* Профили */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* Модальные окна */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
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
            <input
              type="text"
              placeholder="Логин"
              value={registerForm.login}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, login: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, email: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="password"
              placeholder="Пароль"
              value={registerForm.password}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, password: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
            <button
              onClick={handleRegisterSubmit}
              className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
            >
              Зарегистрироваться
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatingChat;
