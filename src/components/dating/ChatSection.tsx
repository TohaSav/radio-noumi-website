import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Message } from "@/types/dating";
import { Icon } from "@/components/ui/icon";

interface ChatSectionProps {
  messages: Message[];
  activeTab: string;
  selectedChat: string | null;
  onTabChange: (tab: string) => void;
  onChatSelect: (userName: string) => void;
}

const ChatSection = ({
  messages,
  activeTab,
  selectedChat,
  onTabChange,
  onChatSelect,
}: ChatSectionProps) => {
  const generalMessages = messages.filter((msg) => msg.chatType === "general");
  const privateMessages = messages.filter(
    (msg) =>
      msg.chatType === "private" &&
      (msg.chatType === selectedChat || msg.userName === selectedChat),
  );

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-white to-pink-50/30">
      <Tabs
        value={activeTab}
        onValueChange={onTabChange}
        className="flex-1 flex flex-col"
      >
        <TabsList className="bg-gradient-to-r from-pink-100 to-purple-100 p-1 m-4 mb-2 shadow-sm border border-pink-200/50">
          <TabsTrigger
            value="general"
            className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300"
          >
            Общий чат
          </TabsTrigger>
          {selectedChat && (
            <TabsTrigger
              value="private"
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300"
            >
              Личные с {selectedChat}
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent
          value="general"
          className="flex-1 overflow-y-auto px-6 pb-4"
        >
          <div className="space-y-4">
            {generalMessages.map((msg, index) => (
              <div
                key={msg.id}
                className="group bg-gradient-to-r from-white to-pink-50/50 p-4 rounded-2xl shadow-sm hover:shadow-md border border-pink-200/30 transform hover:scale-[1.02] transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Icon name="User" size={14} className="text-white" />
                  </div>
                  <button
                    onClick={() => onChatSelect(msg.userName)}
                    className="font-semibold text-pink-600 hover:text-purple-600 transition-colors duration-200 hover:underline"
                  >
                    {msg.userName}
                  </button>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-800 leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>

        {selectedChat && (
          <TabsContent
            value="private"
            className="flex-1 overflow-y-auto px-6 pb-4"
          >
            <div className="space-y-4">
              {privateMessages.map((msg, index) => (
                <div
                  key={msg.id}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl shadow-sm border border-blue-200/50 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                      <Icon name="User" size={14} className="text-white" />
                    </div>
                    <span className="font-semibold text-blue-700">
                      {msg.userName}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-800 leading-relaxed">{msg.text}</p>
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
