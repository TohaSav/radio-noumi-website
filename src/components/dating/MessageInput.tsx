import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onFocus: () => void;
  isLoggedIn: boolean;
  disabled?: boolean;
}

export default function MessageInput({
  value,
  onChange,
  onSend,
  onFocus,
  isLoggedIn,
  disabled,
}: MessageInputProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full p-3 sm:p-4 bg-white/95 backdrop-blur-sm border-t border-pink-200/50 z-10">
      <div className="w-full max-w-none mx-0">
        <div className="flex gap-2 sm:gap-3 w-full">
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            placeholder={
              isLoggedIn
                ? "Написать сообщение..."
                : "Нажмите для создания анкеты..."
            }
            className="flex-1 w-full text-sm sm:text-base h-10 sm:h-11"
            onKeyPress={(e) => e.key === "Enter" && onSend()}
          />
          <Button
            onClick={onSend}
            disabled={!value.trim() || !isLoggedIn || disabled}
            size="sm"
            className="h-10 sm:h-11 px-3 sm:px-4 flex-shrink-0"
          >
            <Icon name="Send" size={16} className="sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
