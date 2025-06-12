import { useEffect, useState } from "react";

interface MusicWavesProps {
  isPlaying: boolean;
  audioData?: {
    bassLevel: number;
    midLevel: number;
    trebleLevel: number;
    overall: number;
  };
}

const MusicWaves = ({ isPlaying, audioData }: MusicWavesProps) => {
  const [waves, setWaves] = useState(
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      intensity: 0,
      delay: i * 0.2,
    })),
  );

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setWaves((prev) =>
          prev.map((wave) => ({
            ...wave,
            intensity: Math.random() * 0.8 + 0.2,
          })),
        );
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  if (!isPlaying) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {waves.map((wave, index) => (
        <div
          key={wave.id}
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse at ${30 + index * 15}% ${20 + index * 10}%, 
              rgba(${index % 2 === 0 ? "139, 69, 19" : "255, 20, 147"}, ${wave.intensity * 0.4}) 0%, 
              transparent 70%)`,
            animation: `musicWave ${2 + index * 0.5}s ease-in-out infinite`,
            animationDelay: `${wave.delay}s`,
          }}
        />
      ))}

      {/* Дополнительные волны с другими цветами */}
      {waves.map((wave, index) => (
        <div
          key={`wave-${wave.id}`}
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at ${70 - index * 12}% ${80 - index * 8}%, 
              rgba(${index % 3 === 0 ? "0, 191, 255" : index % 3 === 1 ? "255, 105, 180" : "50, 205, 50"}, ${wave.intensity * 0.3}) 0%, 
              transparent 60%)`,
            animation: `musicWave ${3 + index * 0.3}s ease-in-out infinite reverse`,
            animationDelay: `${wave.delay * 1.5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default MusicWaves;
