import Icon from "@/components/ui/icon";

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const PlayButton = ({ isPlaying, onToggle }: PlayButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className={`group relative bg-gradient-to-br from-white to-gray-100 text-purple-900 p-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
        isPlaying
          ? "animate-pulse hover:from-purple-50 hover:to-white shadow-purple-500/25"
          : "hover:from-purple-50 hover:to-white hover:shadow-purple-500/25"
      }`}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Icon
        name={isPlaying ? "Pause" : "Play"}
        size={32}
        className="relative z-10 transition-transform duration-200 group-hover:scale-110"
      />

      {/* Анимированное свечение при воспроизведении */}
      {isPlaying && (
        <>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/30 to-violet-500/30 animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-500/20 animate-ping" />
        </>
      )}
    </button>
  );
};

export default PlayButton;
