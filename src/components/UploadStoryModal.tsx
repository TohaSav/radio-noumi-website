import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface UploadStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, author: string) => void;
}

const UploadStoryModal = ({
  isOpen,
  onClose,
  onUpload,
}: UploadStoryModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [author, setAuthor] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Проверка типа файла
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/webm",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert(
        "Поддерживаются только изображения (JPEG, PNG, GIF) и видео (MP4, WebM)",
      );
      return;
    }

    // Проверка размера (макс 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert("Файл слишком большой. Максимальный размер: 50MB");
      return;
    }

    setSelectedFile(file);

    // Создание превью
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !author.trim()) return;

    setIsUploading(true);
    try {
      await onUpload(selectedFile, author.trim());
      handleClose();
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setAuthor("");
    setPreview(null);
    setIsUploading(false);
    onClose();
  };

  const isVideo = selectedFile?.type.startsWith("video/");

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Plus" size={20} />
            Добавить историю
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Выбор файла */}
          <div>
            <Label htmlFor="file-upload" className="text-sm font-medium">
              Фото или видео
            </Label>
            <div className="mt-2">
              <input
                id="file-upload"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-400 transition-colors"
              >
                {preview ? (
                  <div className="relative w-full h-full">
                    {isVideo ? (
                      <video
                        src={preview}
                        className="w-full h-full object-cover rounded-lg"
                        controls
                      />
                    ) : (
                      <img
                        src={preview}
                        alt="Превью"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <Icon
                      name="Upload"
                      size={24}
                      className="mx-auto mb-2 text-gray-400"
                    />
                    <p className="text-sm text-gray-500">
                      Нажмите для выбора фото или видео
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Имя автора */}
          <div>
            <Label htmlFor="author" className="text-sm font-medium">
              Автор истории
            </Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Введите имя автора"
              className="mt-2"
            />
          </div>

          {/* Кнопки */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isUploading}
            >
              Отмена
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || !author.trim() || isUploading}
              className="flex-1"
            >
              {isUploading ? (
                <>
                  <Icon
                    name="Loader2"
                    size={16}
                    className="mr-2 animate-spin"
                  />
                  Загрузка...
                </>
              ) : (
                <>
                  <Icon name="Upload" size={16} className="mr-2" />
                  Добавить
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadStoryModal;
