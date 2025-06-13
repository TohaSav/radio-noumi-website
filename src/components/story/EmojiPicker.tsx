import { emojis } from "@/utils/story";

interface EmojiPickerProps {
  isVisible: boolean;
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPicker = ({ isVisible, onEmojiSelect }: EmojiPickerProps) => {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-24 left-4 right-4 bg-black/90 rounded-2xl p-4 z-30 backdrop-blur-sm">
      <div className="grid grid-cols-4 gap-3">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onEmojiSelect(emoji)}
            className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl hover:bg-white/20 transition-colors hover:scale-110"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
