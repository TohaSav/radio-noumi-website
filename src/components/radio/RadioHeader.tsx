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
    <div className="text-center mb-8">
      <h1
        className="text-5xl font-bold text-white mb-3 font-montserrat drop-shadow-lg"
        style={{
          textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
        }}
      >
        Radio Noumi
      </h1>
      <p className="text-purple-200 text-lg">Твоя музыка, твое настроение</p>
      <div className="mt-2 text-sm text-purple-300">
        Режим: {getMusicTypeLabel()}
      </div>
    </div>
  );
};

export default RadioHeader;
