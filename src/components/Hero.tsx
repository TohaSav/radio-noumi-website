import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import EmbeddedRadioPlayer from "@/components/EmbeddedRadioPlayer";
import { useState, useEffect } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(258569850);
  const [pulse, setPulse] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [likeTexts, setLikeTexts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showTopChart, setShowTopChart] = useState(false);

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
  
  const handleLike = (e: React.MouseEvent) => {
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
      
      // Создаем сердечки от места клика
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const newHearts = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: centerX + (Math.random() - 0.5) * 100,
        y: centerY + (Math.random() - 0.5) * 50,
      }));
      
      setHearts(prev => [...prev, ...newHearts]);
      
      // Удаляем сердечки через 2 секунды
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => !newHearts.includes(heart)));
      }, 2000);
    }
  };

  // Функция для сокращения чисел
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  // Функция для определения размера сердечка в зависимости от длины текста
  const getHeartSize = (text: string) => {
    const length = text.length;
    if (length <= 3) return { container: 'w-24 h-24', heart: 'text-6xl', text: 'text-xs' };
    if (length <= 5) return { container: 'w-28 h-28', heart: 'text-7xl', text: 'text-sm' };
    if (length <= 7) return { container: 'w-32 h-32', heart: 'text-8xl', text: 'text-base' };
    return { container: 'w-36 h-36', heart: 'text-9xl', text: 'text-lg' };
  };

  useEffect(() => {
    // Более частое и реалистичное увеличение лайков
    const likesInterval = setInterval(
      () => {
        // Увеличенное случайное увеличение от 200 до 500
        const randomIncrease = Math.floor(Math.random() * 301) + 200; // 200-500
        setLikes((prev) => prev + randomIncrease);
        
        // Активируем анимацию пульса
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
      },
      Math.random() * 1000 + 500, // 0.5-1.5 секунды (быстрее!)
    );

    // Дополнительный интервал для более быстрого роста в пиковые часы
    const peakHoursInterval = setInterval(() => {
      const currentHour = new Date().getHours();
      
      // Пиковые часы: 18-23 (вечер) и 9-12 (утро)
      if ((currentHour >= 18 && currentHour <= 23) || (currentHour >= 9 && currentHour <= 12)) {
        const peakIncrease = Math.floor(Math.random() * 500) + 300; // 300-800 (ещё больше!)
        setLikes((prev) => prev + peakIncrease);
        
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
      }
    }, 1500); // Каждые 1.5 секунды в пиковые часы (быстрее!)

    // Интервал для летящих текстов "Like"
    const likeTextInterval = setInterval(() => {
      const newLikeText = {
        id: Date.now() + Math.random(),
        x: Math.random() * 60 + 20, // 20-80% от ширины
        y: 50, // Начинаем с середины
      };
      
      setLikeTexts((prev) => [...prev, newLikeText]);
      
      // Удаляем текст через 3 секунды (время анимации)
      setTimeout(() => {
        setLikeTexts((prev) => prev.filter((text) => text.id !== newLikeText.id));
      }, 3000);
    }, 1500); // Каждые 1.5 секунды

    return () => {
      clearInterval(likesInterval);
      clearInterval(peakHoursInterval);
      clearInterval(likeTextInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-start justify-center text-center px-4 pt-4">



      {/* Hero Content */}
      <div className="max-w-4xl mx-auto space-y-4">
        <EmbeddedRadioPlayer streamUrl="https://myradio24.org/61673" />

        {/* Лайки с сердечком */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="relative">
            <button 
              onClick={handleLike}
              className={`relative flex items-center justify-center w-12 h-12 transition-all duration-300 hover:scale-110 cursor-pointer ${
                pulse ? 'scale-125' : 'scale-100'
              }`}
            >
              {/* Сердечко фон */}
              <div className={`text-3xl transition-all duration-300 ${
                isLiked ? 'text-red-600' : 'text-red-500'
              } ${
                pulse ? 'animate-pulse' : ''
              }`}>
                ♡
              </div>
            </button>
            
            {/* Летящие тексты "Like" */}
            {likeTexts.map((likeText) => (
              <div
                key={likeText.id}
                className="fixed pointer-events-none text-white/70 text-xs font-medium animate-like-float z-50"
                style={{
                  left: `calc(50vw + ${likeText.x - 50}px)`,
                  top: '50vh',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                Like
              </div>
            ))}
          </div>
          
          {/* Цифра под сердечком */}
          <span className="text-white/90 font-medium text-sm drop-shadow-sm">
            {formatNumber(likes)}
          </span>
        </div>

        <p className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
          Музыка, что вдохновляет жить
        </p>
      </div>

      {/* Floating Hearts Animation */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-50 text-red-500 animate-float-up-heart"
          style={{
            left: heart.x,
            top: heart.y,
            fontSize: '20px',
            animation: 'floatUpHeart 2s ease-out forwards',
          }}
        >
          ❤️
        </div>
      ))}

      {/* Кнопка Топ Чарт */}
      <button
        onClick={() => setShowTopChart(true)}
        className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg z-20"
      >
        🎵 Топ Чарт
      </button>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-32 left-16 w-6 h-6 bg-pink-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
      <div className="absolute top-1/2 right-8 w-3 h-3 bg-indigo-400 rounded-full animate-pulse opacity-50 delay-500"></div>
      
      <style jsx>{`
        @keyframes floatUpHeart {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-50px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
          }
        }
      `}</style>

      {/* Модальное окно Топ Чарт */}
      {showTopChart && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] relative border border-purple-500/30">
            {/* Заголовок */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                🎵 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Топ Чарт Radio Noumi</span>
              </h2>
              <button
                onClick={() => setShowTopChart(false)}
                className="text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Список песен */}
            <div className="overflow-y-auto max-h-[60vh] custom-scrollbar">
              <div className="space-y-2">
                {topChartSongs.map((song, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium truncate group-hover:text-purple-300 transition-colors">
                        {song}
                      </div>
                    </div>
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon name="Play" size={16} className="text-purple-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Подвал */}
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <p className="text-white/60 text-sm">
                🔥 Самые популярные треки Radio Noumi
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;