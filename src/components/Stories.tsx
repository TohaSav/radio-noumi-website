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
  reactions?: { [emoji: string]: number };
}

const Stories = () => {
  const { isAdmin } = useAuth();
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(
    null,
  );
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Пустой массив историй - все фотки удалены
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedEmojis, setSelectedEmojis] = useState<{
    [storyId: string]: string[];
  }>({});

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

  const handleAddReaction = (storyId: string, emoji: string) => {
    setStories((prev) =>
      prev.map((story) => {
        if (story.id === storyId) {
          const reactions = { ...story.reactions };
          reactions[emoji] = (reactions[emoji] || 0) + 1;
          return { ...story, reactions };
        }
        return story;
      }),
    );

    // Добавляем эмодзи в список выбранных для анимации
    setSelectedEmojis((prev) => ({
      ...prev,
      [storyId]: [...(prev[storyId] || []), emoji],
    }));

    // Убираем эмодзи через 2 секунды
    setTimeout(() => {
      setSelectedEmojis((prev) => ({
        ...prev,
        [storyId]: (prev[storyId] || []).filter((_, index) => index !== 0),
      }));
    }, 2000);
  };

  const handleDeleteStory = (storyId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем открытие истории при клике на удаление
    setStories((prev) => prev.filter((story) => story.id !== storyId));
  };

  const openStory = (index: number) => {
    setSelectedStoryIndex(index);
  };

  const closeStoryModal = () => {
    setSelectedStoryIndex(null);
  };

  return (
    <>
      <div className="w-full px-4 py-4 bg-black">
        <div className="flex items-start gap-4 overflow-x-auto scrollbar-hide pb-2">
          {/* Кнопка добавления истории (только для админа) */}
          {isAdmin && (
            <button
              onClick={handleAddStory}
              className="flex-shrink-0 flex flex-col items-center gap-2 group"
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700">
                  <Icon name="Plus" size={24} className="text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black">
                  <Icon name="Plus" size={14} className="text-white" />
                </div>
              </div>
              <span className="text-xs text-white max-w-[64px] truncate">
                Ваша история
              </span>
            </button>
          )}

          {/* Истории */}
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="flex-shrink-0 flex flex-col items-center gap-2 relative"
            >
              <button
                onClick={() => openStory(index)}
                className="group relative"
              >
                {/* Градиентное кольцо для непросмотренных */}
                <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 animate-pulse">
                  <div className="w-full h-full rounded-full bg-black p-0.5">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      {story.type === "video" ? (
                        <video
                          src={story.image}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={story.image}
                          alt={story.author}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Индикатор видео */}
                {story.type === "video" && (
                  <div className="absolute bottom-2 right-2 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center">
                    <Icon name="Play" size={10} className="text-white" />
                  </div>
                )}

                {/* Анимированные эмодзи */}
                {selectedEmojis[story.id]?.map((emoji, emojiIndex) => (
                  <div
                    key={emojiIndex}
                    className="absolute animate-bounce text-lg pointer-events-none"
                    style={{
                      top: `${20 + emojiIndex * 10}%`,
                      left: `${50 + (emojiIndex % 2 === 0 ? 10 : -10)}%`,
                      animationDelay: `${emojiIndex * 0.2}s`,
                      animationDuration: "2s",
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </button>

              {/* Кнопка удаления (только для админа) */}
              {isAdmin && (
                <button
                  onClick={(e) => handleDeleteStory(story.id, e)}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                >
                  <Icon name="X" size={14} className="text-white" />
                </button>
              )}

              <span className="text-xs text-white max-w-[64px] truncate">
                {story.author}
              </span>
            </div>
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
          onAddReaction={handleAddReaction}
          selectedEmojis={selectedEmojis}
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
