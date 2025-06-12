import { MusicType } from "@/types/radio";

interface RadioHeaderProps {
  musicType: MusicType;
}

const RadioHeader = ({ musicType }: RadioHeaderProps) => {
  const getMusicTypeLabel = () => {
    switch (musicType) {
      case "club":
        return "🎵 Клубная";
      case "bass":
        return "🎶 С басами";
      case "slow":
        return "🎼 Медленная";
      default:
        return "🎵 Обычная";
    }
  };

  return (
    <div className="text-center mb-8 animate-fade-in">
      <h1
        className="text-6xl font-bold text-white mb-4 font-montserrat drop-shadow-2xl animate-scale-in"
        style={{
          background:
            "linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #3b82f6 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow:
            "0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(168, 85, 247, 0.3)",
          animation: "glow 2s ease-in-out infinite alternate",
        }}
      >
        Radio Noumi
      </h1>
      <p
        className="text-purple-200 text-xl mb-2 animate-fade-in"
        style={{ animationDelay: "0.3s" }}
      >
        Твоя музыка, твое настроение
      </p>
      <div
        className="mt-3 text-base text-purple-300 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 inline-block animate-slide-in-right"
        style={{
          animationDelay: "0.6s",
          boxShadow: "0 8px 32px rgba(168, 85, 247, 0.2)",
        }}
      >
        Режим: {getMusicTypeLabel()}
      </div>
    </div>
  );
};

export default RadioHeader;
