import { FloatingEmoji as FloatingEmojiType } from "@/types/story";

interface FloatingEmojiProps {
  emojis: FloatingEmojiType[];
}

const FloatingEmoji = ({ emojis }: FloatingEmojiProps) => {
  return (
    <>
      {emojis.map(({ id, emoji, x, y }) => (
        <div
          key={id}
          className="absolute pointer-events-none text-3xl z-10"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            animation: "float-up 3s ease-out forwards",
          }}
        >
          {emoji}
        </div>
      ))}
    </>
  );
};

export default FloatingEmoji;
