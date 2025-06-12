import { useState } from "react";
import { Comment, Reel } from "@/pages/Reels";
import { useAuth } from "@/hooks/useAuth";
import Icon from "@/components/ui/icon";

interface ReelsCommentsProps {
  reel: Reel;
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (reelId: string, comment: string) => void;
}

const ReelsComments = ({
  reel,
  isOpen,
  onClose,
  onAddComment,
}: ReelsCommentsProps) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && user) {
      onAddComment(reel.id, newComment.trim());
      setNewComment("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/80 flex items-end justify-center">
      <div className="w-full max-w-md bg-gray-900 rounded-t-2xl p-4 max-h-[70vh] flex flex-col">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">
            Комментарии ({reel.commentsList.length})
          </h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Список комментариев */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-3">
          {reel.commentsList.length === 0 ? (
            <p className="text-white/60 text-center py-8">
              Пока нет комментариев. Будь первым!
            </p>
          ) : (
            reel.commentsList.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <img
                  src={comment.avatar}
                  alt={comment.username}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium text-sm">
                      {comment.username}
                    </span>
                    <span className="text-white/50 text-xs">
                      {Math.floor(
                        (Date.now() - comment.timestamp.getTime()) /
                          (1000 * 60),
                      )}{" "}
                      мин
                    </span>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Форма добавления комментария */}
        {user && (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Добавить комментарий..."
              className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-full text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-white/50 text-white rounded-full transition-colors text-sm font-medium"
            >
              <Icon name="Send" size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReelsComments;
