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
    setShowRegisterForm(false);
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-red-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            💕 Чат знакомств
          </h1>
          <p className="text-gray-600">Найдите свою вторую половинку</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="max-h-96 overflow-y-auto">
              {profiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onLike={handleLike}
                />
              ))}
              {profiles.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Icon
                    name="Heart"
                    size={48}
                    className="mx-auto mb-4 text-pink-300"
                  />
                  <p>Пока нет анкет. Станьте первым!</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
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

          <div className="lg:col-span-1">
            <UserPanel
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              likes={likes}
              onShowRegister={() => setShowRegisterForm(true)}
              registerForm={registerForm}
              onRegisterFormChange={setRegisterForm}
              onRegister={handleRegister}
              showRegisterForm={showRegisterForm}
              setShowRegisterForm={setShowRegisterForm}
            />
          </div>
        </div>
      </div>

      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="max-w-sm aspect-[9/16] max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-center text-pink-600">
              💕 Создание анкеты
            </DialogTitle>
          </DialogHeader>
          <ProfileForm
            formData={profileForm}
            onFormChange={setProfileForm}
            onSubmit={handleProfileSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatingChat;
