import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import EmojiPicker from "./EmojiPicker";
import MediaUpload from "./MediaUpload";
import VoiceRecorder from "./VoiceRecorder";
import VideoRecorder from "./VideoRecorder";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onMediaSend: (file: File, type: "image" | "video") => void;
  onVoiceSend: (audioBlob: Blob, duration: number) => void;
  onVideoSend: (videoBlob: Blob, duration: number, thumbnail: string) => void;
  isLoggedIn: boolean;
  onLogin: (name: string) => void;
  userName: string;
  replyTo?: {
    id: string;
    userName: string;
    message: string;
  } | null;
  onCancelReply?: () => void;
}

const ChatInput = ({
  value,
  onChange,
  onSend,
  onMediaSend,
  onVoiceSend,
  onVideoSend,
  isLoggedIn,
  onLogin,
  userName,
  replyTo,
  onCancelReply,
}: ChatInputProps) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleInputFocus = () => {
    if (!isLoggedIn) {
      setShowLoginForm(true);
    }
  };

  const handleLogin = () => {
    if (nameInput.trim()) {
      onLogin(nameInput.trim());
      setShowLoginForm(false);
      setNameInput("");
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    onChange(value + emoji);
    setShowEmojiPicker(false);
  };

  const handleMediaSelect = (file: File, type: "image" | "video") => {
    onMediaSend(file, type);
  };

  const handleVideoSend = (
    videoBlob: Blob,
    duration: number,
    thumbnail: string,
  ) => {
    onVideoSend(videoBlob, duration, thumbnail);
  };

  if (showLoginForm) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-purple-200/50 p-4 z-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              🎵 Присоединяйтесь к чату!
            </h3>
            <p className="text-sm text-gray-600">
              Введите ваше имя для участия в общении
            </p>
          </div>

          <div className="flex gap-3">
            <Input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Ваше имя..."
              className="flex-1"
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              autoFocus
            />
            <Button
              onClick={handleLogin}
              disabled={!nameInput.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Icon name="LogIn" size={16} className="mr-2" />
              Войти
            </Button>
            <Button variant="outline" onClick={() => setShowLoginForm(false)}>
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 backdrop-blur-sm border-t border-purple-200/50 p-4 z-40">
      <div className="max-w-4xl mx-auto">
        {replyTo && (
          <div className="mb-3 p-3 bg-white/10 rounded-lg flex items-center justify-between">
            <div className="flex-1">
              <div className="text-sm text-purple-300 font-medium">
                Ответ для {replyTo.userName}
              </div>
              <div className="text-xs text-gray-300 truncate max-w-md">
                {replyTo.message}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancelReply}
              className="text-white hover:bg-white/10"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        )}

        <div className="flex gap-2 items-center relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="h-12 px-3 text-white hover:text-purple-600 hover:bg-purple-50"
            title="Эмодзи"
          >
            <Icon name="Smile" size={20} />
          </Button>

          <MediaUpload onFileSelect={handleMediaSelect} />

          <VoiceRecorder onVoiceSend={onVoiceSend} />

          <VideoRecorder onVideoSend={handleVideoSend} />

          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleInputFocus}
            placeholder={
              isLoggedIn
                ? "Написать сообщение..."
                : "Нажмите для входа в чат..."
            }
            className="flex-1 h-12"
            onKeyPress={(e) => e.key === "Enter" && onSend()}
          />

          <Button
            onClick={onSend}
            disabled={!value.trim() || !isLoggedIn}
            size="lg"
            className="h-12 px-6 bg-purple-600 hover:bg-purple-700"
          >
            <Icon name="Send" size={16} />
          </Button>

          {showEmojiPicker && (
            <EmojiPicker
              onEmojiSelect={handleEmojiSelect}
              onClose={() => setShowEmojiPicker(false)}
            />
          )}
        </div>

        {isLoggedIn && (
          <div className="text-xs text-white mt-2 text-center">
            Вы вошли как <span className="font-medium">{userName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
