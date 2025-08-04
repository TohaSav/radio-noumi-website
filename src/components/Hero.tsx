import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import AdBanner from "@/components/AdBanner";
import EmbeddedRadioPlayer from "@/components/EmbeddedRadioPlayer";
import { useState, useEffect } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(12750000);
  const [pulse, setPulse] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  
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

  useEffect(() => {
    // Более частое и реалистичное увеличение лайков
    const likesInterval = setInterval(
      () => {
        // Случайное увеличение от 50 до 200 каждые 1-3 секунды
        const randomIncrease = Math.floor(Math.random() * 151) + 50; // 50-200
        setLikes((prev) => prev + randomIncrease);
        
        // Активируем анимацию пульса
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
      },
      Math.random() * 2000 + 1000, // 1-3 секунды
    );

    // Дополнительный интервал для более быстрого роста в пиковые часы
    const peakHoursInterval = setInterval(() => {
      const currentHour = new Date().getHours();
      
      // Пиковые часы: 18-23 (вечер) и 9-12 (утро)
      if ((currentHour >= 18 && currentHour <= 23) || (currentHour >= 9 && currentHour <= 12)) {
        const peakIncrease = Math.floor(Math.random() * 300) + 100; // 100-400
        setLikes((prev) => prev + peakIncrease);
        
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
      }
    }, 3000); // Каждые 3 секунды в пиковые часы

    return () => {
      clearInterval(likesInterval);
      clearInterval(peakHoursInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-start justify-center text-center px-4 pt-4">
      {/* Navigation Menu */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => navigate("/chat")}
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all duration-200"
        >
          <Icon name="MessageCircle" size={16} />
          Онлайн чат
        </button>
      </div>


      {/* Hero Content */}
      <div className="max-w-4xl mx-auto space-y-4">
        <EmbeddedRadioPlayer streamUrl="https://myradio24.org/61673" />

        {/* Лайки с сердечком */}
        <div className="flex items-center justify-center">
          <button 
            onClick={handleLike}
            className={`relative flex items-center justify-center w-28 h-28 transition-all duration-300 hover:scale-105 cursor-pointer ${
              pulse ? 'scale-110' : 'scale-100'
            }`}
          >
            {/* Сердечко фон */}
            <div className={`absolute inset-0 text-8xl transition-all duration-300 ${
              isLiked ? 'text-red-500' : 'text-pink-400'
            } ${
              pulse ? 'animate-pulse' : ''
            }`}>
              ❤️
            </div>
            
            {/* Цифра внутри сердечка */}
            <span className="absolute inset-0 z-10 text-white font-bold text-sm leading-none drop-shadow-lg flex items-center justify-center">
              {formatNumber(likes)}
            </span>
          </button>
        </div>

        <p className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
          Музыка, что вдохновляет жить
        </p>

        <AdBanner />
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
    </section>
  );
};

export default Hero;