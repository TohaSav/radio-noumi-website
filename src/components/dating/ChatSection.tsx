import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Message } from "@/types/dating";

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
    <div className="flex-1 flex flex-col bg-white">
      <Tabs
        value={activeTab}
        onValueChange={onTabChange}
        className="flex-1 flex flex-col"
      >
        <TabsList className="bg-gray-100 p-1 m-4 mb-2">
          <TabsTrigger value="general" className="flex-1">
            Общий чат
          </TabsTrigger>
          {selectedChat && (
            <TabsTrigger value="private" className="flex-1">
              Личные с {selectedChat}
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent
          value="general"
          className="flex-1 overflow-y-auto px-4 pb-4"
        >
          <div className="space-y-3">
            {generalMessages.map((msg) => (
              <div key={msg.id} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <button
                    onClick={() => onChatSelect(msg.userName)}
                    className="font-medium text-blue-600 hover:underline text-sm"
                  >
                    {msg.userName}
                  </button>
                  <span className="text-xs text-gray-500">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-800 text-sm">{msg.text}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        {selectedChat && (
          <TabsContent
            value="private"
            className="flex-1 overflow-y-auto px-4 pb-4"
          >
            <div className="space-y-3">
              {privateMessages.map((msg) => (
                <div key={msg.id} className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-blue-800 text-sm">
                      {msg.userName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm">{msg.text}</p>
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
