import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Comment } from "@/types/story";

interface CommentsSectionProps {
  isVisible: boolean;
  comments: Comment[];
  onClose: () => void;
  onAddComment: (text: string) => void;
}

const CommentsSection = ({
  isVisible,
  comments,
  onClose,
  onAddComment,
}: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment.trim());
    setNewComment("");
  };

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/95 backdrop-blur-sm z-30 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="text-white font-semibold">Комментарии</h3>
        <button onClick={onClose} className="text-white/70 hover:text-white">
          <Icon name="X" size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="mb-3">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full flex items-center justify-center text-xs text-white font-bold">
                  {comment.author[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium text-sm">
                      {comment.author}
                    </span>
                    <span className="text-white/50 text-xs">
                      {Math.floor((Date.now() - comment.timestamp) / 60000)}м
                    </span>
                  </div>
                  <p className="text-white/90 text-sm">{comment.text}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/50">Пока нет комментариев</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Добавить комментарий..."
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
          />
          <Button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            size="sm"
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
