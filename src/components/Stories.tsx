import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import StoryModal from "@/components/StoryModal";
import UploadStoryModal from "@/components/UploadStoryModal";
import Icon from "@/components/ui/icon";

interface Story {
  id: string;
  image: string;
  author: string;
  timestamp: number;
  type: "image" | "video";
}

const Stories = () => {
  const { isAdmin } = useAuth();
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(
    null,
  );
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Пустой массив историй - все фотки удалены
  const [stories, setStories] = useState<Story[]>([]);

  const handleAddStory = () => {
    setIsUploadModalOpen(true);
  };

  const handleUpload = async (file: File, author: string) => {
    // Создание URL для предварительного просмотра
    const fileUrl = URL.createObjectURL(file);

    const newStory: Story = {
      id: `story-${Date.now()}`,
      image: fileUrl,
      author,
      timestamp: Date.now(),
      type: file.type.startsWith("video/") ? "video" : "image",
    };

    setStories((prev) => [newStory, ...prev]);
  };

  const openStory = (index: number) => {
    setSelectedStoryIndex(index);
  };

  const closeStoryModal = () => {
    setSelectedStoryIndex(null);
  };

  return (
    <>
      <div className="w-full px-4 py-4">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
          {/* Кнопка добавления истории (только для админа) */}
          {isAdmin && (
            <button
              onClick={handleAddStory}
              className="flex-shrink-0 flex flex-col items-center gap-2 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center relative">
                <Icon name="Plus" size={24} className="text-white" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Icon name="Plus" size={12} className="text-white" />
                </div>
              </div>
              <span className="text-xs text-white/70 group-hover:text-white transition-colors">
                Добавить
              </span>
            </button>
          )}

          {/* Истории */}
          {stories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => openStory(index)}
              className="flex-shrink-0 flex flex-col items-center gap-2 group"
            >
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                <div className="w-full h-full rounded-full border-2 border-gray-900 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.author}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <span className="text-xs text-white/70 group-hover:text-white transition-colors max-w-[60px] truncate">
                {story.author}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Модальное окно просмотра историй */}
      {selectedStoryIndex !== null && (
        <StoryModal
          isOpen={selectedStoryIndex !== null}
          onClose={closeStoryModal}
          stories={stories}
          initialStoryIndex={selectedStoryIndex}
        />
      )}

      {/* Модальное окно загрузки */}
      <UploadStoryModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </>
  );
};

export default Stories;
