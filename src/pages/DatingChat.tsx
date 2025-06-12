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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  const handleSelectChat = (username: string) => {
    setSelectedChat(username);
    setActiveTab("private");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              💕 Чат знакомств
            </h1>
            <p className="text-gray-600">Найдите свою вторую половинку</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onLike={handleLike}
              />
            ))}
          </div>

          <ChatSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedChat={selectedChat}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            messages={messages}
            onSendMessage={handleSendMessage}
            onShowProfile={() => setShowProfileModal(true)}
            onSelectChat={handleSelectChat}
          />
        </div>

        <div className="space-y-6">
          <UserPanel
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            likes={likes}
            onShowRegister={() => setShowRegisterModal(true)}
          />
        </div>
      </div>

      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Создание анкеты</DialogTitle>
          </DialogHeader>
          <ProfileForm
            formData={profileForm}
            onFormChange={setProfileForm}
            onSubmit={handleProfileSubmit}
          />
        </DialogContent>
      </Dialog>

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
