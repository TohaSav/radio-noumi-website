import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Message, Profile } from "@/types/dating";
import Icon from "@/components/ui/icon";
import ProfileCard from "./ProfileCard";

interface ChatSectionProps {
  messages: Message[];
  activeTab: string;
  selectedChat: string | null;
  onTabChange: (tab: string) => void;
  onChatSelect: (userName: string) => void;
  profiles: Profile[];
  onLike: (profileId: string) => void;
  currentUserId?: string;
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
}: ChatSectionProps) => {
  const generalMessages = messages.filter((msg) => msg.chatType === "general");
  const privateMessages = messages.filter(
    (msg) =>
      msg.chatType === "private" &&
      (msg.chatType === selectedChat || msg.userName === selectedChat),
  );

  return (
    <div className="flex-1 flex flex-col">
      <Tabs
        value={activeTab}
        onValueChange={onTabChange}
        className="flex-1 flex flex-col"
      >
        <TabsList className="bg-white/90 p-1 m-4 mb-2 shadow-sm">
          <TabsTrigger value="general" className="flex-1">
            Общий чат
          </TabsTrigger>
          <TabsTrigger value="profiles" className="flex-1">
            Анкеты
          </TabsTrigger>
          {selectedChat && (
            <TabsTrigger value="private" className="flex-1">
              Личные с {selectedChat}
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent
          value="general"
          className="flex-1 overflow-y-auto px-6 pb-4"
        >
          <div className="space-y-4">
            {generalMessages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white/80 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <Icon name="User" size={14} className="text-white" />
                  </div>
                  <button
                    onClick={() => onChatSelect(msg.userName)}
                    className="font-semibold text-pink-600 hover:underline"
                  >
                    {msg.userName}
                  </button>
                  <span className="text-xs text-gray-500">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-800">{msg.text}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profiles" className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onLike={onLike}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        </TabsContent>

        {selectedChat && (
          <TabsContent
            value="private"
            className="flex-1 overflow-y-auto px-6 pb-4"
          >
            <div className="space-y-4">
              {privateMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-blue-50 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Icon name="User" size={14} className="text-white" />
                    </div>
                    <span className="font-semibold text-blue-700">
                      {msg.userName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-800">{msg.text}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ChatSection;
