import RadioPlayer from "@/components/RadioPlayer";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import Features from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Плавающие музыкальные ноты */}
        <div className="absolute top-20 left-1/4 text-2xl opacity-30 animate-bounce delay-300">
          🎵
        </div>
        <div className="absolute top-40 right-1/4 text-3xl opacity-20 animate-bounce delay-700">
          🎶
        </div>
        <div className="absolute bottom-40 left-1/3 text-2xl opacity-25 animate-bounce delay-1000">
          🎵
        </div>
      </div>

      <div className="relative z-10">
        <Hero />
        <StatsSection />
        <Features />
      </div>

      <RadioPlayer streamUrl="https://myradio24.org/61673" />
    </div>
  );
};

export default Index;
