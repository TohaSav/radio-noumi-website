import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface MediaUploadProps {
  onFileSelect: (file: File, type: "image" | "video") => void;
}

const MediaUpload = ({ onFileSelect }: MediaUploadProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file, "image");
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file, "video");
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => imageInputRef.current?.click()}
        className="h-12 px-3 text-white hover:text-purple-600 hover:bg-purple-50"
        title="Загрузить фото"
      >
        <Icon name="Image" size={20} />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => videoInputRef.current?.click()}
        className="h-12 px-3 text-white hover:text-purple-600 hover:bg-purple-50"
        title="Загрузить видео"
      >
        <Icon name="Video" size={20} />
      </Button>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        className="hidden"
      />
    </>
  );
};

export default MediaUpload;
