import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { Reel } from "@/pages/Reels";

interface ReelsCommentsProps {
  reel: Reel;
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (reelId: string, comment: string) => void;
}

export default function ReelsComments({
  reel,
  isOpen,
  onClose,
  onAddComment,
}: ReelsCommentsProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(reel.id, newComment);
      setNewComment("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Комментарии</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={reel.avatar}
              alt={reel.username}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{reel.username}</h3>
              <p className="text-sm text-gray-600">{reel.description}</p>
            </div>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            <p className="text-sm text-gray-500 text-center">
              Комментариев пока нет
            </p>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Добавить комментарий..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            />
            <Button onClick={handleSubmit} size="sm">
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
