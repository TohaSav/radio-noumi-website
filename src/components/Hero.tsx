import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import AdBanner from "@/components/AdBanner";
import { useState, useEffect } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(12750000);
  const [pulse, setPulse] = useState(false);
  
  const handleLike = () => {
    setLikes(prev => prev + 1);
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
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
    // Увеличение лайков каждые 5 минут на 20
    const likesInterval = setInterval(
      () => {
        setLikes((prev) => prev + 20);
        
        // Активируем анимацию пульса
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
      },
      5 * 60 * 1000,
    );

    return () => {
      clearInterval(likesInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4">
      {/* Navigation Menu */}
      <div className="absolute top-6 left-6 z-10">
        <Button
          onClick={() => navigate("/chat")}
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
        >
          <Icon name="MessageCircle" size={16} className="mr-2" />
          Онлайн чат
        </Button>
      </div>

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-bold animate-pulse">
            Noumi
          </span>
        </h1>

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
              className={`text-pink-400 transition-all duration-300 ${
                pulse ? 'scale-125 text-pink-300' : 'scale-100'
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