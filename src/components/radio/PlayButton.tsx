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
        className={`relative w-20 h-20 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl ${
          isPlaying
            ? "bg-gradient-to-br from-purple-500 via-pink-500 to-violet-600 animate-pulse"
            : "bg-white hover:bg-gray-50"
        }`}
      >
        {/* Анимированный градиент для активного состояния */}
        {isPlaying && (
          <>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-pulse opacity-80" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-500 animate-ping opacity-60" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 animate-bounce opacity-40" />
          </>
        )}

        {/* Иконка */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <Icon
            name={isPlaying ? "Pause" : "Play"}
            size={28}
            className={`transition-colors duration-200 ${
              isPlaying ? "text-white" : "text-purple-600"
            }`}
          />
        </div>

        {/* Пульсирующий эффект для активного состояния */}
        {isPlaying && (
          <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 animate-ping" />
        )}
      </button>

      {/* Дополнительная пульсация вокруг кнопки */}
      {isPlaying && (
        <>
          <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse" />
          <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-violet-500/10 to-indigo-500/10 animate-ping" />
        </>
      )}
    </div>
  );
};

export default PlayButton;
