import Icon from "@/components/ui/icon";
import { Story } from "@/types/story";
import { formatTime } from "@/utils/story";

interface StoryHeaderProps {
  story: Story;
  currentMediaIndex: number;
  onClose: () => void;
}

const StoryHeader = ({
  story,
  currentMediaIndex,
  onClose,
}: StoryHeaderProps) => {
  return (
    <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full p-0.5">
          <div className="w-full h-full bg-black rounded-full p-0.5">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={story.media[0]?.url}
                alt={story.author}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{story.author}</p>
          <p className="text-white/70 text-xs">{formatTime(story.timestamp)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {story.media.length > 1 && (
          <div className="text-white/70 text-xs">
            {currentMediaIndex + 1}/{story.media.length}
          </div>
        )}
        <button className="text-white/70 hover:text-white transition-colors">
          <Icon name="MoreHorizontal" size={20} />
        </button>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
    </div>
  );
};

export default StoryHeader;
