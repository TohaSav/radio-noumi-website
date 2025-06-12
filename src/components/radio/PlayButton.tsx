import Icon from "@/components/ui/icon";

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const PlayButton = ({ isPlaying, onToggle }: PlayButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="relative group z-10 transform transition-all duration-300 hover:scale-110 animate-scale-in"
      style={{ animationDelay: "0.9s" }}
    >
      {/* Внешнее свечение */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-300"
        style={{
          background: isPlaying
            ? "radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, rgba(168, 85, 247, 0.6) 50%, transparent 70%)"
            : "radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(59, 130, 246, 0.6) 50%, transparent 70%)",
          transform: "scale(1.5)",
        }}
      />

      {/* Средний слой с пульсацией */}
      <div
        className={`absolute inset-0 rounded-full ${isPlaying ? "animate-pulse" : ""}`}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%)",
          transform: "scale(1.2)",
        }}
      />

      {/* Основная кнопка */}
      <div
        className="relative bg-gradient-to-br from-white to-purple-50 text-purple-900 p-8 rounded-full 
                   transition-all duration-300 shadow-2xl group-hover:shadow-purple-500/30
                   group-hover:from-purple-50 group-hover:to-white border border-white/20"
        style={{
          boxShadow:
            "0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
        }}
      >
        <Icon
          name={isPlaying ? "Pause" : "Play"}
          size={48}
          className="drop-shadow-sm"
        />

        {/* Внутреннее свечение */}
        <div
          className="absolute inset-2 rounded-full opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
          }}
        />
      </div>
    </button>
  );
};

export default PlayButton;
