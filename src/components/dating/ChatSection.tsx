import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Message, Profile } from "@/types/dating";
import Icon from "@/components/ui/icon";
import ProfileCard from "./ProfileCard";
import { useEffect, useRef } from "react";
import OnlineCounter from "./chat/OnlineCounter";
import MessageList from "./chat/MessageList";
import FlyingHearts from "./chat/FlyingHearts";
import GenderFilter from "./chat/GenderFilter";
import BotMessageGenerator from "./chat/BotMessageGenerator";

interface ChatSectionProps {
  messages: Message[];
  activeTab: string;
  selectedChat: string | null;
  onTabChange: (tab: string) => void;
  onChatSelect: (userName: string) => void;
  profiles: Profile[];
  onLike: (profileId: string) => void;
  currentUserId?: string;
  onAddMessage: (message: Message) => void;
  genderFilter: "all" | "male" | "female";
  onGenderFilterChange: (filter: "all" | "male" | "female") => void;
  onViewProfile: (profile: Profile) => void;
  onCreateProfile: () => void;
}

const ChatSection = ({
  messages,
  activeTab,
  selectedChat,
  onTabChange,
  onChatSelect,
  profiles,
  onLike,
  currentUserId,
  onAddMessage,
  genderFilter,
  onGenderFilterChange,
  onViewProfile,
  onCreateProfile,
}: ChatSectionProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const createHeartsRef = useRef<(element: HTMLElement) => void>();

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleCreateHearts = () => {
    if (createHeartsRef.current && buttonRef.current) {
      createHeartsRef.current(buttonRef.current);
    }
  };

  const generalMessages = messages.filter((msg) => msg.chatType === "general");
  const privateMessages = messages.filter(
    (msg) =>
      msg.chatType === "private" &&
      (msg.chatType === selectedChat || msg.userName === selectedChat),
  );

  return (
    <div className="flex-1 flex flex-col min-h-0 h-full">
      <BotMessageGenerator
        isActive={activeTab === "general"}
        onMessageGenerated={onAddMessage}
      />

      <FlyingHearts
        onCreateHearts={(callback) => {
          createHeartsRef.current = callback;
        }}
      />

      <Tabs
        value={activeTab}
        onValueChange={onTabChange}
        className="flex-1 flex flex-col min-h-0 h-full"
      >
        <TabsList className="bg-white/90 p-1 m-2 md:m-4 mb-2 shadow-sm relative flex-wrap md:flex-nowrap flex-shrink-0">
          <div className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:flex">
            <OnlineCounter />
          </div>
          <TabsTrigger value="general" className="flex-1 text-xs md:text-sm">
            Общий чат
          </TabsTrigger>
          <TabsTrigger value="profiles" className="flex-1 text-xs md:text-sm">
            Анкеты
          </TabsTrigger>
          {selectedChat && (
            <TabsTrigger value="private" className="flex-1 text-xs md:text-sm">
              Личные
            </TabsTrigger>
          )}
        </TabsList>

        <div className="md:hidden flex justify-center pb-2 flex-shrink-0">
          <OnlineCounter />
        </div>

        <TabsContent value="general" className="flex-1 min-h-0 h-full">
          <div
            ref={messagesContainerRef}
            className="h-full overflow-y-auto px-2 md:px-6 pb-4"
            style={{
              height: "calc(100vh - 240px)",
              minHeight: "400px",
              maxHeight: "calc(100vh - 200px)",
            }}
          >
            <MessageList
              messages={generalMessages}
              onUserClick={onChatSelect}
            />
          </div>
        </TabsContent>

        <TabsContent value="profiles" className="flex-1 min-h-0 h-full">
          <div
            className="h-full overflow-y-auto p-2 md:p-6"
            style={{
              height: "calc(100vh - 240px)",
              minHeight: "400px",
              maxHeight: "calc(100vh - 200px)",
            }}
          >
            <div className="mb-4 relative">
              <Button
                ref={buttonRef}
                onClick={() => {
                  handleCreateHearts();
                  onCreateProfile();
                }}
                onMouseEnter={handleCreateHearts}
                className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:via-rose-600 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить анкету
              </Button>
            </div>

            <GenderFilter
              selectedFilter={genderFilter}
              onFilterChange={onGenderFilterChange}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {profiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onLike={onLike}
                  onViewProfile={onViewProfile}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        {selectedChat && (
          <TabsContent value="private" className="flex-1 min-h-0 h-full">
            <div
              className="h-full overflow-y-auto px-2 md:px-6 pb-4"
              style={{
                height: "calc(100vh - 240px)",
                minHeight: "400px",
                maxHeight: "calc(100vh - 200px)",
              }}
            >
              <MessageList
                messages={privateMessages}
                onUserClick={onChatSelect}
                backgroundColor="bg-blue-50"
                userIconColor="bg-blue-500"
                userNameColor="text-blue-700"
              />
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ChatSection;
