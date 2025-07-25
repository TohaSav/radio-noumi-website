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
  
  const handleLike = () => {
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
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
        // Случайное увеличение от 15 до 85 каждые 3-7 секунд
        const randomIncrease = Math.floor(Math.random() * 71) + 15; // 15-85
        setLikes((prev) => prev + randomIncrease);
        
        // Активируем анимацию пульса
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
      },
      Math.random() * 4000 + 3000, // 3-7 секунд
    );

    // Дополнительный интервал для более быстрого роста в пиковые часы
    const peakHoursInterval = setInterval(() => {
      const currentHour = new Date().getHours();
      
      // Пиковые часы: 18-23 (вечер) и 9-12 (утро)
      if ((currentHour >= 18 && currentHour <= 23) || (currentHour >= 9 && currentHour <= 12)) {
        const peakIncrease = Math.floor(Math.random() * 150) + 50; // 50-200
        setLikes((prev) => prev + peakIncrease);
        
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
      }
    }, 8000); // Каждые 8 секунд в пиковые часы

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
            className={`flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 transition-all duration-300 hover:bg-white/20 cursor-pointer ${
              pulse ? 'scale-110 shadow-lg shadow-pink-500/50' : 'scale-100'
            }`}
          >
            <Icon 
              name="Heart" 
              size={20} 
              className={`transition-all duration-300 ${
                isLiked ? 'text-red-500' : 'text-pink-400'
              } ${
                pulse ? 'scale-125' : 'scale-100'
              }`} 
            />
            <span className="text-white font-semibold text-sm sm:text-base">
              {formatNumber(likes)}
            </span>
          </button>
        </div>

        <p className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
          Музыка, что вдохновляет жить
        </p>

        <AdBanner />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-32 left-16 w-6 h-6 bg-pink-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
      <div className="absolute top-1/2 right-8 w-3 h-3 bg-indigo-400 rounded-full animate-pulse opacity-50 delay-500"></div>
    </section>
  );
};

export default Hero;