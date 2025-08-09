import React, { useState, useEffect } from 'react';

interface AdLink {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
}

const AdsBanner = () => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const adLinks: AdLink[] = [
    {
      id: 1,
      title: "🎵 Spotify Premium",
      description: "3 месяца бесплатно для новых пользователей",
      url: "#",
      category: "Музыка"
    },
    {
      id: 2,
      title: "🎧 Apple AirPods Pro",
      description: "Скидка 25% на наушники с шумоподавлением",
      url: "#",
      category: "Техника"
    },
    {
      id: 3,
      title: "🎪 Яндекс.Музыка",
      description: "Полугодовая подписка по цене 3 месяцев",
      url: "#",
      category: "Музыка"
    },
    {
      id: 4,
      title: "🎸 Школа музыки онлайн",
      description: "Научитесь играть за 30 дней. Первый урок бесплатно",
      url: "#",
      category: "Обучение"
    },
    {
      id: 5,
      title: "🎤 Микрофон Blue Yeti",
      description: "Профессиональная запись. Специальная цена",
      url: "#",
      category: "Техника"
    },
    {
      id: 6,
      title: "🎹 FL Studio",
      description: "Лицензионная версия со скидкой 40%",
      url: "#",
      category: "ПО"
    },
    {
      id: 7,
      title: "🎵 SoundCloud Pro",
      description: "Загружайте треки без ограничений. Месяц бесплатно",
      url: "#",
      category: "Музыка"
    },
    {
      id: 8,
      title: "🎧 Sony WH-1000XM5",
      description: "Лучшие наушники года с активным шумоподавлением",
      url: "#",
      category: "Техника"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPosition(prev => {
        const nextPosition = prev + 1;
        // Когда все элементы прошли, возвращаемся к началу
        return nextPosition >= adLinks.length ? 0 : nextPosition;
      });
    }, 4000); // Смена каждые 4 секунды для читаемости

    return () => clearInterval(interval);
  }, [adLinks.length]);

  return (
    <div className="w-[235px] h-[300px] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-lg border border-gray-700 overflow-hidden relative shadow-xl">
      {/* Заголовок рекламного блока */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-white font-semibold text-sm">
        📢 Специальные предложения
      </div>
      
      {/* Контейнер для анимированных ссылок */}
      <div className="relative h-[268px] overflow-hidden">
        <div 
          className="absolute w-full transition-transform duration-1000 ease-out"
          style={{
            transform: `translateY(${-currentPosition * 60}px)`
          }}
        >
          {/* Дублируем массив для бесшовной анимации */}
          {[...adLinks, ...adLinks].map((ad, index) => (
            <div 
              key={`${ad.id}-${index}`}
              className="h-[60px] px-4 py-2 border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors cursor-pointer group"
              onClick={() => window.open(ad.url, '_blank')}
            >
              <div className="flex flex-col justify-center h-full">
                <div className="text-white font-medium text-sm group-hover:text-purple-300 transition-colors truncate">
                  {ad.title}
                </div>
                <div className="text-gray-400 text-xs mt-1 truncate group-hover:text-gray-300 transition-colors">
                  {ad.description}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Градиент сверху для плавного исчезновения */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-900 to-transparent z-10 pointer-events-none" />
        
        {/* Градиент снизу */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent z-10 pointer-events-none" />
      </div>
      
      {/* Индикатор позиции */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-500">
        {currentPosition + 1} / {adLinks.length}
      </div>
    </div>
  );
};

export default AdsBanner;