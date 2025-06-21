import { useState } from "react";
import { Button } from "@/components/ui/button";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
}

const EmojiPicker = ({ onEmojiSelect, onClose }: EmojiPickerProps) => {
  const emojiCategories = {
    smileys: [
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "😂",
      "🤣",
      "😊",
      "😇",
      "🙂",
      "🙃",
      "😉",
      "😌",
      "😍",
      "🥰",
      "😘",
      "😗",
      "😙",
      "😚",
      "😋",
      "😛",
      "😝",
      "😜",
      "🤪",
      "🤨",
      "🧐",
      "🤓",
      "😎",
      "🤩",
      "🥳",
    ],
    gestures: [
      "👍",
      "👎",
      "👌",
      "✌️",
      "🤞",
      "🤟",
      "🤘",
      "🤙",
      "👈",
      "👉",
      "👆",
      "🖕",
      "👇",
      "☝️",
      "👋",
      "🤚",
      "🖐️",
      "✋",
      "🖖",
      "👏",
      "🙌",
      "🤲",
      "🤝",
      "🙏",
    ],
    hearts: [
      "❤️",
      "🧡",
      "💛",
      "💚",
      "💙",
      "💜",
      "🖤",
      "🤍",
      "🤎",
      "💔",
      "❣️",
      "💕",
      "💞",
      "💓",
      "💗",
      "💖",
      "💘",
      "💝",
      "💟",
    ],
    animals: [
      "🐶",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🦊",
      "🐻",
      "🐼",
      "🐨",
      "🐯",
      "🦁",
      "🐮",
      "🐷",
      "🐸",
      "🐵",
      "🙈",
      "🙉",
      "🙊",
      "🐒",
      "🐔",
      "🐧",
      "🐦",
      "🐤",
      "🐣",
      "🐥",
    ],
    food: [
      "🍎",
      "🍊",
      "🍋",
      "🍌",
      "🍉",
      "🍇",
      "🍓",
      "🍈",
      "🍒",
      "🍑",
      "🥭",
      "🍍",
      "🥥",
      "🥝",
      "🍅",
      "🍆",
      "🥑",
      "🥦",
      "🥬",
      "🥒",
      "🌶️",
      "🌽",
      "🥕",
      "🧄",
      "🧅",
    ],
    activity: [
      "⚽",
      "🏀",
      "🏈",
      "⚾",
      "🥎",
      "🎾",
      "🏐",
      "🏉",
      "🥏",
      "🎱",
      "🪀",
      "🏓",
      "🏸",
      "🏒",
      "🏑",
      "🥍",
      "🏏",
      "🪃",
      "🥅",
      "⛳",
      "🪁",
      "🏹",
      "🎣",
      "🤿",
      "🥊",
    ],
  };

  const [activeCategory, setActiveCategory] =
    useState<keyof typeof emojiCategories>("smileys");

  const categoryNames = {
    smileys: "😀",
    gestures: "👍",
    hearts: "❤️",
    animals: "🐶",
    food: "🍎",
    activity: "⚽",
  };

  return (
    <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border p-3 w-80 z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-700">Выберите эмодзи</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ×
        </Button>
      </div>

      <div className="flex gap-1 mb-3">
        {Object.entries(categoryNames).map(([key, icon]) => (
          <Button
            key={key}
            variant={activeCategory === key ? "default" : "ghost"}
            size="sm"
            onClick={() =>
              setActiveCategory(key as keyof typeof emojiCategories)
            }
            className="text-lg p-1 h-8 w-8"
          >
            {icon}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
        {emojiCategories[activeCategory].map((emoji, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => onEmojiSelect(emoji)}
            className="text-lg p-1 h-8 w-8 hover:bg-purple-100"
          >
            {emoji}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
