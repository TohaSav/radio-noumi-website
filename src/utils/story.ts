export const formatTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) return `${hours}ч`;
  if (minutes > 0) return `${minutes}м`;
  return "только что";
};

export const emojis = ["❤️", "😍", "😂", "😮", "😢", "👏", "🔥", "💯"];

// Функции для работы с localStorage
const STORIES_STORAGE_KEY = "user-stories";

export const saveStoriesToStorage = (stories: any[]) => {
  try {
    // Создаем копию историй с сериализуемыми данными
    const storiesForStorage = stories.map((story) => ({
      ...story,
      // URL.createObjectURL создает blob URLs которые не сохраняются
      // Для демо версии просто сохраняем структуру
      media: story.media.map((m: any) => ({
        ...m,
        // В реальном приложении здесь была бы загрузка на сервер
      })),
    }));
    localStorage.setItem(
      STORIES_STORAGE_KEY,
      JSON.stringify(storiesForStorage),
    );
  } catch (error) {
    console.error("Ошибка сохранения историй:", error);
  }
};

export const loadStoriesFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORIES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Ошибка загрузки историй:", error);
    return [];
  }
};

export const clearStoriesFromStorage = () => {
  try {
    localStorage.removeItem(STORIES_STORAGE_KEY);
  } catch (error) {
    console.error("Ошибка очистки историй:", error);
  }
};
