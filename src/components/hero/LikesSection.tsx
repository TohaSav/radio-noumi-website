import { useState, useEffect } from "react";

interface LikesSectionProps {
  likes: number;
  setLikes: (value: number | ((prev: number) => number)) => void;
  isLiked: boolean;
  setIsLiked: (value: boolean) => void;
  pulse: boolean;
  setPulse: (value: boolean) => void;
  hearts: { id: number; x: number; y: number }[];
  setHearts: (value: { id: number; x: number; y: number }[] | ((prev: { id: number; x: number; y: number }[]) => { id: number; x: number; y: number }[])) => void;
}

const LikesSection = ({ 
  likes, 
  setLikes, 
  isLiked, 
  setIsLiked, 
  pulse, 
  setPulse, 
  hearts, 
  setHearts 
}: LikesSectionProps) => {
  const [likeTexts, setLikeTexts] = useState<{ id: number; x: number; y: number }[]>([]);

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
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + "B";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  useEffect(() => {
    // Более частое и реалистичное увеличение лайков
    const likesInterval = setInterval(
      () => {
        // Увеличение лайков от 200 до 500 каждую минуту
        const randomIncrease = Math.floor(Math.random() * 301) + 200; // 200-500
        setLikes((prev) => prev + randomIncrease);
        
        // Активируем анимацию пульса
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
      },
      30000, // Каждые 30 секунд (быстрее!)
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
    }, 800); // Каждые 0.8 секунды в пиковые часы (очень быстро!)

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
  }, [setLikes, setPulse]);

  return (
    <>
      {/* Лайки с сердечком */}
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="relative">
          <button 
            onClick={handleLike}
            className={`relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40 ${
              pulse ? 'scale-125 shadow-lg shadow-emerald-500/30' : 'scale-100'
            }`}
          >
            {/* Сердечко фон */}
            <div className={`text-3xl transition-all duration-300 ${
              isLiked ? 'text-emerald-500' : 'text-emerald-400'
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
              className="fixed pointer-events-none text-emerald-400/80 text-xs font-semibold animate-like-float z-50"
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
        <span className="text-emerald-300 font-semibold text-sm drop-shadow-lg">
          {formatNumber(likes)}
        </span>
      </div>

      {/* Floating Hearts Animation */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-50 text-emerald-400 animate-float-up-heart"
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
    </>
  );
};

export default LikesSection;