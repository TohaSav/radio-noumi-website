import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoggedIn: boolean;
  onLogin: (name: string) => void;
  userName: string;
}

const ChatInput = ({
  value,
  onChange,
  onSend,
  isLoggedIn,
  onLogin,
  userName,
}: ChatInputProps) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [nameInput, setNameInput] = useState("");

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
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-purple-200/50 p-4 z-40">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3 items-center">
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
        </div>

        {isLoggedIn && (
          <div className="text-xs text-gray-600 mt-2 text-center">
            Вы вошли как <span className="font-medium">{userName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
