import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Главный заголовок с анимацией */}
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse bg-[length:200%_200%]">
              Radio Noumi
            </span>
          </h1>

          <div className="relative">
            <p className="text-lg sm:text-xl md:text-2xl font-light text-white/90 leading-relaxed">
              🎵 Поп • Jazz • Казахская • Китайская • Английская • Русская
              Народная 🎶
            </p>

            {/* Анимированные волны звука */}
            <div className="flex justify-center items-center mt-6 space-x-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 30 + 10}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: "1.5s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <SupportButton />
          <PremiumButton />
        </div>

        {/* Статистика в реальном времени */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto">
          <StatCard icon="Users" value="1,247" label="Слушателей" />
          <StatCard icon="Music" value="24/7" label="В эфире" />
          <StatCard icon="Globe" value="15+" label="Стран" />
          <StatCard icon="Heart" value="∞" label="Любви" />
        </div>
      </div>
    </section>
  );
};

const SupportButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <Button
      onClick={handleClick}
      className="relative group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden"
    >
      {clicked && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      <Icon
        name="Heart"
        className="mr-2 relative z-10 group-hover:animate-pulse"
        size={20}
      />
      <span className="relative z-10">💝 Поддержать радио</span>
    </Button>
  );
};

const PremiumButton = () => {
  return (
    <Button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105">
      <Icon name="Crown" className="mr-2 animate-pulse" size={20} />
      👑 Premium подписка
    </Button>
  );
};

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
      <Icon
        name={icon as any}
        className="w-6 h-6 mx-auto mb-2 text-purple-300"
      />
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  );
};

export default Hero;
