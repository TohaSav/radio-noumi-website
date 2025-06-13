import Icon from "@/components/ui/icon";
import { Story, Comment } from "@/types/story";

interface StoryControlsProps {
  story: Story;
  comments: { [storyId: string]: Comment[] };
  onLike: () => void;
  onEmojiClick: () => void;
  onCommentsClick: () => void;
}

const StoryControls = ({
  story,
  comments,
  onLike,
  onEmojiClick,
  onCommentsClick,
}: StoryControlsProps) => {
  return (
    <div className="absolute bottom-8 left-4 right-4 flex items-center justify-between z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onLike}
          className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
        >
          <Icon name="Heart" size={24} className="text-red-500" />
        </button>

        {story.likes > 0 && (
          <span className="text-white text-sm font-medium">{story.likes}</span>
        )}

        <button
          onClick={onEmojiClick}
          className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
        >
          <Icon name="Smile" size={24} className="text-white" />
        </button>

        <button
          onClick={onCommentsClick}
          className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors relative"
        >
          <Icon name="MessageCircle" size={24} className="text-white" />
          {comments[story.id]?.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              {comments[story.id].length}
            </span>
          )}
        </button>

        <button className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors">
          <Icon name="Send" size={24} className="text-white" />
        </button>
      </div>

      <button className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors">
        <Icon name="Bookmark" size={24} className="text-white" />
      </button>
    </div>
  );
};

export default StoryControls;
