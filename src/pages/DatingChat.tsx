import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Profile, User, Like, Message } from "@/types/dating";
import ProfileCard from "@/components/dating/ProfileCard";
import ChatSection from "@/components/dating/ChatSection";
import UserPanel from "@/components/dating/UserPanel";
import RegisterModal from "@/components/dating/RegisterModal";
import ProfileModal from "@/components/dating/ProfileModal";
import CreateProfileModal from "@/components/dating/CreateProfileModal";
import MessageInput from "@/components/dating/MessageInput";
import { useDatingData } from "@/hooks/useDatingData";
import { useAutoGeneration } from "@/hooks/useAutoGeneration";

const DatingChat = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showViewProfileModal, setShowViewProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showMobilePanel, setShowMobilePanel] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("general");
  const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female">(
    "all",
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    messages,
    profiles,
    likes,
    currentUser,
    isLoggedIn,
    setCurrentUser,
    setIsLoggedIn,
    addMessage,
    addProfile,
    addLike,
  } = useDatingData();

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

  // Используем автогенерацию контента
  useAutoGeneration({
    profiles,
    onAddProfile: addProfile,
    onAddMessage: addMessage,
  });

  // Фоновое радио
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  // Автоматический скролл к последним сообщениям
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

    addProfile(newProfile);
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

    addLike(newLike);
  };

  const handleRegister = (user: User) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setShowRegisterForm(false);
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

  const filteredProfiles = profiles.filter(
    (profile) => genderFilter === "all" || profile.gender === genderFilter,
  );

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
        <div className="flex-1 flex flex-col min-h-0 order-1 relative">
          <div className="flex-1 pb-20 overflow-hidden">
            <ChatSection
              messages={messages}
              activeTab={activeTab}
              selectedChat={selectedChat}
              onTabChange={setActiveTab}
              onChatSelect={setSelectedChat}
              profiles={filteredProfiles}
              onLike={handleLike}
              currentUserId={currentUser?.id}
              onAddMessage={addMessage}
              genderFilter={genderFilter}
              onGenderFilterChange={setGenderFilter}
              onViewProfile={(profile) => {
                setSelectedProfile(profile);
                setShowViewProfileModal(true);
              }}
              onCreateProfile={() => setShowProfileModal(true)}
            />
            <div ref={messagesEndRef} />
          </div>

          <MessageInput
            value={messageInput}
            onChange={setMessageInput}
            onSend={handleSendMessage}
            onFocus={handleInputFocus}
            isLoggedIn={isLoggedIn}
          />
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
                profiles={filteredProfiles}
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
            profiles={filteredProfiles}
            onRegisterClick={() => setShowRegisterForm(true)}
            genderFilter={genderFilter}
            onGenderFilterChange={setGenderFilter}
          />
        </div>
      </div>

      {/* Модальные окна */}
      <CreateProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        form={profileForm}
        onFormChange={setProfileForm}
        onSubmit={handleProfileSubmit}
      />

      <RegisterModal
        isOpen={showRegisterForm}
        onClose={() => setShowRegisterForm(false)}
        onRegister={handleRegister}
        onShowProfile={() => {
          setShowRegisterForm(false);
          setShowProfileModal(true);
        }}
        isLoggedIn={isLoggedIn}
      />

      <ProfileModal
        isOpen={showViewProfileModal}
        onClose={() => setShowViewProfileModal(false)}
        profile={selectedProfile}
      />
    </div>
  );
};

export default DatingChat;
