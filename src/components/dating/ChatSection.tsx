import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { Message, User } from "@/types/dating";

interface ChatSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedChat: string | null;
  messageInput: string;
  setMessageInput: (message: string) => void;
  isLoggedIn: boolean;
  currentUser: User | null;
  messages: Message[];
  onSendMessage: () => void;
  onShowProfile: () => void;
  onSelectChat: (username: string) => void;
}

const ChatSection = ({
  activeTab,
  setActiveTab,
  selectedChat,
  messageInput,
  setMessageInput,
  isLoggedIn,
  currentUser,
  messages,
  onSendMessage,
  onShowProfile,
  onSelectChat,
}: ChatSectionProps) => {
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
    <Card className="p-6 h-[600px] flex flex-col">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="general">Общий чат</TabsTrigger>
          {selectedChat && (
            <TabsTrigger value="private">Личные с {selectedChat}</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="general" className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto border rounded-lg p-4 bg-white mb-4">
            {getPublicMessages().map((msg) => (
              <div key={msg.id} className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <button
                    onClick={() => onSelectChat(msg.from)}
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
          <TabsContent value="private" className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto border rounded-lg p-4 bg-white mb-4">
              {getPrivateMessages(selectedChat).map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-3 ${msg.from === currentUser?.login ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg max-w-xs ${
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

      <div className="flex gap-2">
        <Input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder={
            isLoggedIn
              ? "Напишите сообщение..."
              : "Нажмите для создания анкеты..."
          }
          onFocus={() => !isLoggedIn && onShowProfile()}
          className="flex-1"
          onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
        />
        <Button
          onClick={onSendMessage}
          disabled={!messageInput.trim()}
          className="bg-pink-500 hover:bg-pink-600"
        >
          <Icon name="Send" size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default ChatSection;
