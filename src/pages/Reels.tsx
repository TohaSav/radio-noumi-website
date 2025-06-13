import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import ReelsViewer from "@/components/ReelsViewer";
import ReelsNavigation from "@/components/ReelsNavigation";

export interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: Date;
}

export interface Reel {
  id: string;
  username: string;
  avatar: string;
  videoUrl: string;
  description: string;
  likes: number;
  comments: number;
  timestamp: Date;
  isLiked: boolean;
  commentsList: Comment[];
}

// Демо данные для Reels
const generateDemoReels = (): Reel[] => [
  {
    id: "1",
    username: "dj_mike_beats",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    videoUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
    description: "🎵 Новый трек в эфире! Качаем вместе 🔥",
    likes: 234,
    comments: 45,
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    isLiked: false,
    commentsList: [],
  },
  {
    id: "2",
    username: "music_lover_anna",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b829?w=100&h=100&fit=crop&crop=face",
    videoUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
    description: "Танцуем под Radio Noumi! 💃",
    likes: 189,
    comments: 32,
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    isLiked: true,
    commentsList: [],
  },
  {
    id: "3",
    username: "radio_fan_alex",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    videoUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=600&fit=crop",
    description: "Лучшая радиостанция! 📻✨",
    likes: 156,
    comments: 28,
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    isLiked: false,
    commentsList: [],
  },
];

const Reels = () => {
  const { isAdmin } = useAuth();
  const [reels, setReels] = useState<Reel[]>(generateDemoReels());
  const [currentIndex, setCurrentIndex] = useState(0);

  // Автоматическое добавление новых Reels каждые 30 секунд
  const [usedVideoIds, setUsedVideoIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const addNewReel = () => {
      const usernames = [
        "beat_master_99",
        "vinyl_collector",
        "bass_hunter",
        "melody_queen",
        "rhythm_rider",
        "sound_wizard",
        "track_hunter",
        "mix_master",
        "dj_night_owl",
        "radio_addict",
        "music_vibes_pro",
        "electronic_soul",
        "beat_explorer",
        "synth_master",
        "groove_finder",
        "tempo_rider",
        "audio_wizard",
        "frequency_hunter",
      ];

      const descriptions = [
        "🎶 Этот трек просто огонь!",
        "💫 Radio Noumi - лучшее!",
        "🔥 Качаем всю ночь!",
        "✨ Музыка для души",
        "🎵 Новинка в ротации",
        "💃 Невозможно не танцевать!",
        "🎧 Слушаю уже час подряд",
        "🚀 Космическая подборка!",
        "🌟 Лучший саундтрек дня",
        "🎨 Музыкальное искусство",
        "⚡ Энергия на максимум!",
        "🌈 Позитивные вибрации",
      ];

      // Генерируем уникальный ID для видео
      let videoId: string;
      let attempts = 0;
      do {
        videoId = (
          1500000000000 + Math.floor(Math.random() * 500000000)
        ).toString();
        attempts++;
      } while (usedVideoIds.has(videoId) && attempts < 50);

      // Если не удалось найти уникальный ID, очищаем часть использованных
      if (usedVideoIds.has(videoId)) {
        const oldIds = Array.from(usedVideoIds).slice(
          0,
          Math.floor(usedVideoIds.size / 2),
        );
        setUsedVideoIds((prev) => {
          const newSet = new Set(prev);
          oldIds.forEach((id) => newSet.delete(id));
          return newSet;
        });
      }

      const newReel: Reel = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        username: usernames[Math.floor(Math.random() * usernames.length)],
        avatar: `https://images.unsplash.com/photo-${videoId}?w=100&h=100&fit=crop&crop=face`,
        videoUrl: `https://images.unsplash.com/photo-${videoId}?w=400&h=600&fit=crop`,
        description:
          descriptions[Math.floor(Math.random() * descriptions.length)],
        likes: Math.floor(Math.random() * 500) + 50,
        comments: Math.floor(Math.random() * 80) + 10,
        timestamp: new Date(),
        isLiked: false,
        commentsList: [],
      };

      setUsedVideoIds((prev) => new Set(prev).add(videoId));
      setReels((prev) => [newReel, ...prev]);
    };

    const interval = setInterval(addNewReel, 30000); // 30 секунд
    return () => clearInterval(interval);
  }, [usedVideoIds]);

  // Имитация активности пользователей
  useEffect(() => {
    const simulateActivity = () => {
      setReels((prev) =>
        prev.map((reel) => {
          const shouldUpdate = Math.random() < 0.3; // 30% шанс обновления
          if (!shouldUpdate) return reel;

          const likeChange =
            Math.random() < 0.7 ? Math.floor(Math.random() * 3) + 1 : 0;
          const commentChange = Math.random() < 0.4 ? 1 : 0;

          return {
            ...reel,
            likes: reel.likes + likeChange,
            comments: reel.comments + commentChange,
          };
        }),
      );
    };

    const activityInterval = setInterval(simulateActivity, 30000); // каждые 30 сек
    return () => clearInterval(activityInterval);
  }, []);

  const handleDeleteReel = (reelId: string) => {
    if (isAdmin) {
      setReels((prev) => prev.filter((reel) => reel.id !== reelId));
      if (currentIndex >= reels.length - 1) {
        setCurrentIndex(Math.max(0, currentIndex - 1));
      }
    }
  };

  const handleLikeReel = (reelId: string) => {
    setReels((prev) =>
      prev.map((reel) =>
        reel.id === reelId
          ? {
              ...reel,
              isLiked: !reel.isLiked,
              likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1,
            }
          : reel,
      ),
    );
  };

  const handleAddComment = (reelId: string, comment: string) => {
    const { user } = useAuth();
    if (!user) return;

    const newComment = {
      id: Date.now().toString(),
      username: user.username,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face`,
      text: comment,
      timestamp: new Date(),
    };

    setReels((prev) =>
      prev.map((reel) =>
        reel.id === reelId
          ? {
              ...reel,
              commentsList: [newComment, ...reel.commentsList],
              comments: reel.comments + 1,
            }
          : reel,
      ),
    );
  };

  const handleAddReel = (newReel: Reel) => {
    setReels((prev) => [newReel, ...prev]);
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen bg-black">
      <ReelsNavigation onAddReel={handleAddReel} />
      <ReelsViewer
        reels={reels}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
        onDeleteReel={handleDeleteReel}
        onLikeReel={handleLikeReel}
        onAddComment={handleAddComment}
        canDelete={isAdmin}
      />
    </div>
  );
};

export default Reels;
