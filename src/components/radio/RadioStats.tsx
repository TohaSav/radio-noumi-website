import Icon from "@/components/ui/icon";

interface RadioStatsProps {
  listeners: number;
  likes: number;
  dislikes: number;
  userLiked: boolean | null;
  onLike: () => void;
  onDislike: () => void;
}

const RadioStats = ({
  listeners,
  likes,
  dislikes,
  userLiked,
  onLike,
  onDislike,
}: RadioStatsProps) => {
  return (
    <>
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-2 text-purple-200 px-4 py-2 rounded-full bg-white/10">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>{listeners.toLocaleString()} слушают сейчас</span>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onLike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            userLiked === true
              ? "bg-red-500 text-white"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <Icon name="Heart" size={20} />
          <span>{likes.toLocaleString()}</span>
        </button>

        <button
          onClick={onDislike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            userLiked === false
              ? "bg-gray-600 text-white"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <Icon name="HeartCrack" size={20} />
          <span>{dislikes.toLocaleString()}</span>
        </button>
      </div>
    </>
  );
};

export default RadioStats;
