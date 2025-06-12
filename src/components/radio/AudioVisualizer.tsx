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
    <div className="flex justify-center mb-8">
      <div className="flex items-end space-x-1 h-20">
        {getVisualizerBars().map((height, i) => (
          <div
            key={i}
            className="w-2 rounded-t-full transition-all duration-75 ease-out"
            style={{
              height: isPlaying ? `${height}px` : "20px",
              background: `linear-gradient(to top, 
                rgba(168, 85, 247, ${0.8 + audioData.bassLevel * 0.4}), 
                rgba(59, 130, 246, ${0.6 + audioData.midLevel * 0.4}), 
                rgba(236, 72, 153, ${0.4 + audioData.trebleLevel * 0.6}))`,
              boxShadow: isPlaying
                ? `0 0 ${10 + pulseIntensity * 20}px rgba(168, 85, 247, 0.6)`
                : "none",
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioVisualizer;
