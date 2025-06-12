import Icon from "@/components/ui/icon";

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const PlayButton = ({ isPlaying, onToggle }: PlayButtonProps) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`relative w-32 h-32 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl ${
          isPlaying
            ? "bg-gradient-to-br from-purple-500 via-pink-500 to-violet-600"
            : "bg-white hover:bg-gray-50"
        }`}
      >
        {/* Пульсирующие кольца от краев кнопки наружу */}
        {isPlaying && (
          <>
            <div className="absolute -inset-1 rounded-full border-2 border-purple-400/50 animate-ping" />
            <div className="absolute -inset-3 rounded-full border-2 border-pink-400/30 animate-pulse" />
            <div
              className="absolute -inset-5 rounded-full border border-violet-400/20 animate-ping"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute -inset-7 rounded-full border border-indigo-400/15 animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </>
        )}

        {/* Иконка */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <Icon
            name={isPlaying ? "Pause" : "Play"}
            size={36}
            className={`transition-colors duration-200 ${
              isPlaying ? "text-white" : "text-purple-600"
            }`}
          />
        </div>
      </button>
    </div>
  );
};

export default PlayButton;
