import { AudioData, MusicType } from "@/types/radio";

interface AudioVisualizerProps {
  audioData: AudioData;
  isPlaying: boolean;
  musicType: MusicType;
  pulseIntensity: number;
}

const AudioVisualizer = ({
  audioData,
  isPlaying,
  musicType,
  pulseIntensity,
}: AudioVisualizerProps) => {
  const getVisualizerBars = () => {
    const intensity = pulseIntensity;

    return Array.from({ length: 12 }, (_, i) => {
      const baseHeight = 20;
      const maxHeight =
        musicType === "club" ? 80 : musicType === "bass" ? 60 : 40;
      const randomFactor = Math.random() * intensity;

      return baseHeight + (maxHeight - baseHeight) * randomFactor;
    });
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="flex items-end space-x-1 h-16 p-3 rounded-lg bg-black/20">
        {getVisualizerBars().map((height, i) => (
          <div
            key={i}
            className="w-2 bg-purple-500 rounded-full transition-all duration-100"
            style={{
              height: isPlaying ? `${height}px` : "8px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioVisualizer;
