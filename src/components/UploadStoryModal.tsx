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
  onUpload: (files: File[], author: string) => void;
}

const UploadStoryModal = ({
  isOpen,
  onClose,
  onUpload,
}: UploadStoryModalProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [author, setAuthor] = useState("");
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Проверка типа файлов
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/webm",
    ];

    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        alert(`Файл ${file.name} не поддерживается`);
        return false;
      }
      if (file.size > 50 * 1024 * 1024) {
        alert(`Файл ${file.name} слишком большой (макс 50MB)`);
        return false;
      }
      return true;
    });

    setSelectedFiles((prev) => [...prev, ...validFiles]);

    // Создание превью для новых файлов
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !author.trim()) return;

    setIsUploading(true);
    try {
      await onUpload(selectedFiles, author.trim());
      handleClose();
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedFiles([]);
    setAuthor("");
    setPreviews([]);
    setIsUploading(false);
    onClose();
  };

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
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-400 transition-colors"
              >
                <div className="text-center">
                  <Icon
                    name="Upload"
                    size={24}
                    className="mx-auto mb-2 text-gray-400"
                  />
                  <p className="text-sm text-gray-500">
                    Выберите фото и видео (можно несколько)
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Превью выбранных файлов */}
          {selectedFiles.length > 0 && (
            <div>
              <Label className="text-sm font-medium">
                Выбрано файлов: {selectedFiles.length}
              </Label>
              <div className="mt-2 grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    {selectedFiles[index]?.type.startsWith("video/") ? (
                      <video
                        src={preview}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src={preview}
                        alt={`Превью ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    )}
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="X" size={12} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

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
              disabled={
                selectedFiles.length === 0 || !author.trim() || isUploading
              }
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
