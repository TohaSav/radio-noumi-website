import { useState, useEffect } from 'react';

export const useTopChart = () => {
  const [songLikes, setSongLikes] = useState<{ [key: number]: { likes: number; dislikes: number } }>({});

  // Список песен топ чарта
  const topChartSongs = [
    "Ночь (Альфа ночь)", "Чебер кышно", "Ночь для меня", "Ночной город", "Наше лето",
    "Моја мала", "Русская душа", "Давайте танцевать", "Виталенька мой", "Біз өмір сүреміз",
    "Sola Sin Ti", "Девочка моя", "Виталя твой щит", "Лиловый город", "Бәхетле йөрәк",
    "Бабули", "В тени рассвета", "Уши", "I Want It All", "Сука", "Слёзы", "Открой глаза",
    "Малыш", "Менің Жарығым", "Лето зовёт", "Ледянное сердце", "Ах лето", "Бокал за бокалом",
    "Бокал за Бокалом Danc remix", "Виталя Жұлдыз", "Вы ушли", "Клеопатра", "独特的爱",
    "Я феникс", "Я орел", "Я добился", "Частушки", "Ты Королева Ты звезда", "Тихий Плач",
    "Тиктоник бой", "Танцуя в поисках любви", "Танцую одна", "Танцуй", "Танцпол мой",
    "Счастливое детсво", "Сұлу Патшайым", "Стальной человек", "Спасибо боже",
    "Солнышко и Друзья", "Сломаные крылья", "Сила Внутри", "Русская женщина",
    "Рулетка любовь", "Реальная любовь", "Пустой дом", "Пряничная тучка",
    "Поцелуи в Сумерках", "Песня про Россию", "Песня по друга", "Папа я с тобой",
    "Открытое сердце", "Одиночка шансон", "Ночная жизнь", "Крик ребенка",
    "Курортный роман", "Незмаконец с улице", "Наши Герои", "Наш призидент",
    "Моя королева", "Моя жена", "Моя девочка со мной", "Мой путь", "Мои мамы и жена",
    "Мамина боль", "Лето у Моря", "Королева бала", "Клубничный поцелуй",
    "Зеленоглазый мед", "Вечная память", "Вернись мама", "Великая Россия",
    "Большая,чем дружба", "Queen of Dance (Bass Remix)", "Hot Summer Girls",
    "Game of Life", "Chocolate Lips", "22 июня"
  ];

  // Функция для генерации реалистичных лайков/дизлайков
  const generateSongStats = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const storageKey = `songStats_${currentYear}_${currentMonth}`;
    
    // Проверяем есть ли сохраненные данные для текущего месяца
    const savedStats = localStorage.getItem(storageKey);
    if (savedStats) {
      return JSON.parse(savedStats);
    }

    // Генерируем новые статистики для каждой песни
    const stats: { [key: number]: { likes: number; dislikes: number } } = {};
    topChartSongs.forEach((_, index) => {
      // Популярные песни (топ 20) получают больше взаимодействий
      const isPopular = index < 20;
      const baseRange = isPopular ? [500, 2000] : [50, 500];
      
      const likes = Math.floor(Math.random() * (baseRange[1] - baseRange[0]) + baseRange[0]);
      // Дизлайки обычно 10-30% от лайков
      const dislikeRatio = Math.random() * 0.2 + 0.1; // 10-30%
      const dislikes = Math.floor(likes * dislikeRatio);
      
      stats[index] = { likes, dislikes };
    });

    localStorage.setItem(storageKey, JSON.stringify(stats));
    return stats;
  };

  // Функция для определения лучшего трека (самый популярный)
  const getBestTrack = () => {
    let bestIndex = -1;
    let maxScore = -1;
    
    Object.entries(songLikes).forEach(([index, stats]) => {
      const score = stats.likes - stats.dislikes; // Общий рейтинг
      if (score > maxScore) {
        maxScore = score;
        bestIndex = parseInt(index);
      }
    });
    
    return bestIndex;
  };

  // Функция для определения худшего трека (низкие лайки + много дизлайков)
  const getWorstTrack = () => {
    let worstIndex = -1;
    let minScore = Infinity;
    
    Object.entries(songLikes).forEach(([index, stats]) => {
      if (stats.likes < 10 && stats.dislikes < 5) return; // Игнорируем треки с очень низкой активностью
      
      const ratio = stats.dislikes > 0 ? stats.likes / stats.dislikes : stats.likes;
      const score = ratio + stats.likes * 0.1; // Учитываем соотношение и абсолютное количество лайков
      
      if (score < minScore && stats.dislikes > 0) {
        minScore = score;
        worstIndex = parseInt(index);
      }
    });
    
    return worstIndex;
  };

  // Обработка лайка/дизлайка с ускоренным набором
  const handleSongAction = (songIndex: number, action: 'like' | 'dislike') => {
    setSongLikes(prev => {
      const updated = { ...prev };
      if (!updated[songIndex]) {
        updated[songIndex] = { likes: 0, dislikes: 0 };
      }
      
      // Ускоренный набор лайков/дизлайков
      if (action === 'like') {
        const randomBoost = Math.floor(Math.random() * 3) + 2; // От 2 до 4 лайков за раз
        updated[songIndex].likes += randomBoost;
      } else {
        const randomBoost = Math.floor(Math.random() * 2) + 1; // От 1 до 2 дизлайков за раз
        updated[songIndex].dislikes += randomBoost;
      }

      // Сохраняем в localStorage
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const storageKey = `songStats_${currentYear}_${currentMonth}`;
      localStorage.setItem(storageKey, JSON.stringify(updated));
      
      return updated;
    });
  };

  // Инициализация статистик песен
  useEffect(() => {
    const stats = generateSongStats();
    setSongLikes(stats);
    
    // Автоматическое увеличение лайков/дизлайков (имитация реальной активности)
    const activityInterval = setInterval(() => {
      setSongLikes(prev => {
        const updated = { ...prev };
        
        // Случайно выбираем 1-3 песни для обновления
        const songsToUpdate = Math.floor(Math.random() * 3) + 1;
        const allSongIndexes = Object.keys(topChartSongs).map(Number);
        
        for (let i = 0; i < songsToUpdate; i++) {
          const randomIndex = allSongIndexes[Math.floor(Math.random() * allSongIndexes.length)];
          
          if (!updated[randomIndex]) {
            updated[randomIndex] = { likes: 0, dislikes: 0 };
          }
          
          // Популярные песни (топ 20) получают больше активности
          const isPopular = randomIndex < 20;
          const likeChance = Math.random();
          
          if (likeChance < 0.75) { // 75% шанс на лайк
            const increment = isPopular ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 2) + 1;
            updated[randomIndex].likes += increment;
          } else { // 25% шанс на дизлайк
            const increment = isPopular ? Math.floor(Math.random() * 2) + 1 : 1;
            updated[randomIndex].dislikes += increment;
          }
        }
        
        // Сохраняем обновленную статистику
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const storageKey = `songStats_${currentYear}_${currentMonth}`;
        localStorage.setItem(storageKey, JSON.stringify(updated));
        
        return updated;
      });
    }, 3000); // Каждые 3 секунды для более быстрой динамики

    return () => clearInterval(activityInterval);
  }, []);

  // Получаем индексы лучшего и худшего трека
  const bestTrackIndex = getBestTrack();
  const worstTrackIndex = getWorstTrack();

  return {
    topChartSongs,
    songLikes,
    handleSongAction,
    bestTrackIndex,
    worstTrackIndex
  };
};