import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4">
      {/* Navigation */}
      <div className="absolute top-6 left-6 z-20">
        <Button
          onClick={() => navigate("/poems")}
          variant="outline"
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        >
          <Icon name="BookOpen" size={16} className="mr-2" />
          Стихи
        </Button>
      </div>

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          Космическое
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
            Радио
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
          Музыка из глубин космоса прямо в ваши наушники
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-3 text-lg font-semibold shadow-2xl"
          >
            <Icon name="Play" size={20} className="mr-2" />
            Начать слушать
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-3 text-lg font-semibold backdrop-blur-sm"
          >
            <Icon name="Headphones" size={20} className="mr-2" />О проекте
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-32 left-16 w-6 h-6 bg-pink-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
      <div className="absolute top-1/2 right-8 w-3 h-3 bg-indigo-400 rounded-full animate-pulse opacity-50 delay-500"></div>
    </section>
  );
};

export default Hero;
