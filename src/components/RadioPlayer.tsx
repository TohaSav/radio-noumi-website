import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface RadioPlayerProps {
  streamUrl: string;
  likes: number;
  dislikes: number;
  listeners: number;
}

interface Firework {
  id: number;
  x: number;
  y: number;
}

interface HeartEmoji {
  id: number;
  x: number;
  y: number;
}

const RadioPlayer = ({
  streamUrl,
  likes,
  dislikes,
  listeners,
}: RadioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [userLiked, setUserLiked] = useState<boolean | null>(null);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [heartEmojis, setHeartEmojis] = useState<HeartEmoji[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const createFirework = (x: number, y: number) => {
    const newFirework: Firework = {
      id: Date.now() + Math.random(),
      x,
      y,
    };
    setFireworks((prev) => [...prev, newFirework]);

    setTimeout(() => {
      setFireworks((prev) => prev.filter((fw) => fw.id !== newFirework.id));
    }, 1500);
  };

  const createHeartEmoji = (x: number, y: number) => {
    const newHeart: HeartEmoji = {
      id: Date.now() + Math.random(),
      x,
      y,
    };
    setHeartEmojis((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setHeartEmojis((prev) =>
        prev.filter((heart) => heart.id !== newHeart.id),
      );
    }, 2000);
  };

  const handlePlayerClick = (e: React.MouseEvent) => {
    if (playerRef.current) {
      const rect = playerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      createFirework(x, y);
      createHeartEmoji(x, y);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    setUserLiked(userLiked === true ? null : true);
  };

  const handleDislike = () => {
    setUserLiked(userLiked === false ? null : false);
  };

  return (
    <div
      ref={playerRef}
      onClick={handlePlayerClick}
      className="relative bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 shadow-2xl cursor-pointer overflow-hidden"
    >
      <audio ref={audioRef} src={streamUrl} />

      {/* Фейерверки */}
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="absolute pointer-events-none"
          style={{
            left: firework.x,
            top: firework.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="firework">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="firework-particle"
                style={
                  {
                    "--angle": `${i * 45}deg`,
                    "--color": `hsl(${Math.random() * 360}, 70%, 60%)`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
      ))}

      {/* Сердечки-эмодзи */}
      {heartEmojis.map((heart) => (
        <div
          key={heart.id}
          className="absolute pointer-events-none text-4xl animate-heart-float"
          style={{
            left: heart.x,
            top: heart.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          💕
        </div>
      ))}

      {/* Логотип и название */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 font-montserrat">
          Radio Noumi
        </h1>
        <p className="text-purple-200">Твоя музыка, твое настроение</p>
      </div>

      {/* Визуализация */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-3 bg-purple-400 rounded-full transition-all duration-300 ${
                isPlaying ? "animate-pulse" : ""
              }`}
              style={{
                height: isPlaying ? `${Math.random() * 40 + 20}px` : "20px",
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Основные контролы */}
      <div className="flex items-center justify-center space-x-6 mb-8">
        <button
          onClick={togglePlay}
          className="bg-white text-purple-900 p-4 rounded-full hover:bg-purple-100 transition-colors shadow-lg"
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={32} />
        </button>
      </div>

      {/* Громкость */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <Icon name="Volume2" size={20} className="text-white" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-32 accent-purple-400"
        />
      </div>

      {/* Счетчик слушателей */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center space-x-3 text-purple-200">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-lg">
            <span className="font-bold text-white">
              {listeners.toLocaleString()}
            </span>{" "}
            слушают
          </span>
        </div>
      </div>

      {/* Лайки и дизлайки */}
      <div className="flex justify-center space-x-8">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
            userLiked === true
              ? "bg-red-500 text-white"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          <Icon
            name="Heart"
            size={20}
            className={userLiked === true ? "fill-current" : ""}
          />
          <span>{likes.toLocaleString()}</span>
        </button>

        <button
          onClick={handleDislike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
            userLiked === false
              ? "bg-gray-500 text-white"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          <Icon
            name="HeartCrack"
            size={20}
            className={userLiked === false ? "fill-current" : ""}
          />
          <span>{dislikes.toLocaleString()}</span>
        </button>
      </div>
    </div>
  );
};

export default RadioPlayer;
