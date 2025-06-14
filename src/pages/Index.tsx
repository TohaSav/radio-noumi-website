import RadioPlayer from "@/components/RadioPlayer";
import AdBanner from "@/components/AdBanner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Основной контент */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pb-32">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent animate-pulse bg-[length:200%_200%] animate-[gradient_3s_ease-in-out_infinite]">
              Noumi
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light">
              Слушайте музыку в прямом эфире
            </p>
          </div>

          <SupportButton />
          <AdBanner />
        </div>
      </div>

      {/* Фиксированный плеер внизу */}
      <RadioPlayer streamUrl="https://myradio24.org/61673" />
    </div>
  );
};

const SupportButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/donate")}
      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105"
    >
      <Icon name="Heart" className="mr-2" size={20} />
      Поддержать радио
    </Button>
  );
};

export default Index;
