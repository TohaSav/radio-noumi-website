import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import StoryModal from "@/components/StoryModal";
import UploadStoryModal from "@/components/UploadStoryModal";
import Icon from "@/components/ui/icon";
import { saveStoriesToStorage, loadStoriesFromStorage } from "@/utils/story";

interface Story {
  id: string;
  media: { url: string; type: "image" | "video" }[];
  author: string;
  timestamp: number;
  likes: number;
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

  // Загружаем истории из localStorage при инициализации
  useEffect(() => {
    const savedStories = loadStoriesFromStorage();
    setStories(savedStories);
  }, []);

  // Сохраняем истории в localStorage при изменении
  useEffect(() => {
    if (stories.length > 0) {
      saveStoriesToStorage(stories);
    }
  }, [stories]);

  const handleAddStory = () => {
    setIsUploadModalOpen(true);
  };

  const handleUpload = async (files: File[], author: string) => {
    const mediaFiles = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video/")
        ? ("video" as const)
        : ("image" as const),
    }));

    const newStory: Story = {
      id: `story-${Date.now()}`,
      media: mediaFiles,
      author,
      timestamp: Date.now(),
      likes: 0,
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

  const handleLikeStory = (storyId: string) => {
    setStories((prev) =>
      prev.map((story) => {
        if (story.id === storyId) {
          return { ...story, likes: story.likes + 1 };
        }
        return story;
      }),
    );
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
      <div className="w-full px-4 py-4 bg-transparent">
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
                      {story.media[0]?.type === "video" ? (
                        <video
                          src={story.media[0].url}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={story.media[0]?.url}
                          alt={story.author}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Индикатор множественных файлов */}
                {story.media.length > 1 && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {story.media.length}
                    </span>
                  </div>
                )}

                {/* Индикатор видео */}
                {story.media[0]?.type === "video" && (
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
          onLikeStory={handleLikeStory}
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
