import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import { Reel } from "@/pages/Reels";
import { useAuth } from "@/hooks/useAuth";

interface UploadReelModalProps {
  onClose: () => void;
  onUpload?: (reel: Reel) => void;
}

const UploadReelModal = ({ onClose, onUpload }: UploadReelModalProps) => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Валидация видео форматов
    const validTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (!validTypes.includes(file.type)) {
      alert("Пожалуйста, выберите видео файл (MP4, WebM, OGG)");
      return;
    }

    // Проверка размера файла (макс 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert("Размер файла не должен превышать 50MB");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !description.trim()) return;

    setIsUploading(true);

    try {
      // Создаем URL для предпросмотра видео
      const videoUrl = URL.createObjectURL(selectedFile);

      const newReel: Reel = {
        id: Date.now().toString(),
        username: user?.username || "Пользователь",
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face`,
        videoUrl,
        description: description.trim(),
        likes: 0,
        comments: 0,
        timestamp: new Date(),
        isLiked: false,
      };

      onUpload?.(newReel);
      onClose();
    } catch (error) {
      alert("Ошибка при загрузке видео");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Загрузить Reel</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Выбор файла */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Выберите видео
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-400 transition-colors flex flex-col items-center gap-2"
              >
                <Icon name="Upload" size={32} className="text-gray-400" />
                <span className="text-gray-600 text-center">
                  {selectedFile ? selectedFile.name : "Выбрать видео"}
                </span>
              </button>
            </div>

            {/* Предпросмотр */}
            {selectedFile && (
              <div className="relative">
                <video
                  src={URL.createObjectURL(selectedFile)}
                  className="w-full h-48 sm:h-64 object-cover rounded-xl"
                  controls
                />
              </div>
            )}

            {/* Описание */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Расскажите о своем видео..."
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={3}
                maxLength={200}
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {description.length}/200
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Отмена
            </button>
            <button
              onClick={handleUpload}
              disabled={!selectedFile || !description.trim() || isUploading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  Загрузка...
                </>
              ) : (
                "Опубликовать"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadReelModal;
