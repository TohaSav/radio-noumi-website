import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import RadioPlayer from "@/components/RadioPlayer";
import AutoMessageGenerator from "@/components/chat/AutoMessageGenerator";

interface Message {
  id: string;
  text: string;
  user: string;
  timestamp: Date;
  type: "text" | "emoji" | "file";
  fileUrl?: string;
  fileName?: string;
}

const OnlineChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Привет всем! 🎵",
      user: "Диджей Макс",
      timestamp: new Date(Date.now() - 300000),
      type: "text",
    },
    {
      id: "2",
      text: "Кто слушает радио? 🎧",
      user: "Анна_2024",
      timestamp: new Date(Date.now() - 180000),
      type: "text",
    },
    {
      id: "3",
      text: "🔥🔥🔥",
      user: "МузыкаЖизнь",
      timestamp: new Date(Date.now() - 60000),
      type: "emoji",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [userName] = useState(
    `Пользователь${Math.floor(Math.random() * 1000)}`,
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const emojis = [
    "😊",
    "😂",
    "❤️",
    "🔥",
    "👍",
    "🎵",
    "🎧",
    "🎤",
    "✨",
    "🌟",
    "💫",
    "🎉",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        user: userName,
        timestamp: new Date(),
        type: "text",
      };
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    }
  };

  const sendEmoji = (emoji: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text: emoji,
      user: userName,
      timestamp: new Date(),
      type: "emoji",
    };
    setMessages((prev) => [...prev, message]);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const message: Message = {
        id: Date.now().toString(),
        text: `Файл: ${file.name}`,
        user: userName,
        timestamp: new Date(),
        type: "file",
        fileUrl,
        fileName: file.name,
      };
      setMessages((prev) => [...prev, message]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <div className="bg-black/30 backdrop-blur-sm border-b border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-white hover:text-white/80 transition-colors"
              >
                <Icon name="ArrowLeft" size={24} />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-white">Онлайн Чат</h1>
                <p className="text-white/70 text-sm">
                  Общайся с другими слушателями
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Icon name="Users" size={16} />
              <span>онлайн: {Math.floor(Math.random() * 50) + 20}</span>
            </div>
          </div>
        </div>

        {/* Background Radio Player */}
        <div className="hidden">
          <RadioPlayer />
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <span className="font-medium">{message.user}</span>
                    <span>{formatTime(message.timestamp)}</span>
                  </div>
                  <div
                    className={`inline-block max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                      message.user === userName
                        ? "bg-blue-600 text-white ml-auto"
                        : "bg-white/10 text-white backdrop-blur-sm"
                    }`}
                  >
                    {message.type === "file" ? (
                      <div className="flex items-center gap-2">
                        <Icon name="Paperclip" size={16} />
                        <span className="text-sm">{message.fileName}</span>
                      </div>
                    ) : (
                      <p
                        className={
                          message.type === "emoji" ? "text-2xl" : "text-sm"
                        }
                      >
                        {message.text}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="bg-black/30 backdrop-blur-sm border-t border-white/20 p-4">
            <div className="grid grid-cols-6 gap-2 max-w-xs">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => sendEmoji(emoji)}
                  className="text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-black/30 backdrop-blur-sm border-t border-white/20 p-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Icon name="Smile" size={20} />
            </Button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
            />

            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Icon name="Paperclip" size={20} />
            </Button>

            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Напишите сообщение..."
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />

            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </div>

      <AutoMessageGenerator
        onMessageGenerated={(message) =>
          setMessages((prev) => [...prev, message])
        }
      />
    </div>
  );
};

export default OnlineChat;
