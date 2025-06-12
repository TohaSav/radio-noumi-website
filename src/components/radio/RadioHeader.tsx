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
      <h1 className="text-4xl font-bold text-white mb-4">Radio Noumi</h1>
      <p className="text-purple-200 text-lg mb-2">
        Твоя музыка, твое настроение
      </p>
      <div className="mt-2 text-sm text-purple-300">
        Режим: {getMusicTypeLabel()}
      </div>
    </div>
  );
};

export default RadioHeader;
