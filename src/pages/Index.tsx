import RadioPlayer from "@/components/RadioPlayer";
import AdBanner from "@/components/AdBanner";
import { MonetizationPanel } from "@/components/MonetizationPanel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { PremiumModal } from "@/components/PremiumModal";

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
            <p className="text-xl md:text-2xl font-light bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              На Radio Noumi для вас играет музыка Поп, Jazz, Казахская,
              Китайская, Английская, Русская Народная
            </p>
          </div>

          <SupportButton />
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <PremiumButton />
            <CharityButton />
          </div>

          {/* Монетизация */}
          <div className="space-y-6 mt-8">
            <AdBanner />
            <div className="max-w-md mx-auto">
              <MonetizationPanel />
            </div>
          </div>
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
    <div className="relative inline-block">
      <Button
        onClick={() => navigate("/donate")}
        className="relative bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden"
      >
        {/* Падающие монеты */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="coin coin-1">💰</div>
          <div className="coin coin-2">🪙</div>
          <div className="coin coin-3">💰</div>
          <div className="coin coin-4">🪙</div>
          <div className="coin coin-5">💰</div>
        </div>

        <Icon name="Heart" className="mr-2 relative z-10" size={20} />
        <span className="relative z-10">Поддержать радио</span>
      </Button>

      <style jsx>{`
        .coin {
          position: absolute;
          font-size: 12px;
          opacity: 0.7;
          pointer-events: none;
          animation: coinFall 3s linear infinite;
        }

        .coin-1 {
          left: 10%;
          animation-delay: 0s;
        }
        .coin-2 {
          left: 30%;
          animation-delay: 0.6s;
        }
        .coin-3 {
          left: 50%;
          animation-delay: 1.2s;
        }
        .coin-4 {
          left: 70%;
          animation-delay: 1.8s;
        }
        .coin-5 {
          left: 90%;
          animation-delay: 2.4s;
        }

        @keyframes coinFall {
          0% {
            top: -20px;
            opacity: 0;
            transform: rotate(0deg) scale(0.5);
          }
          10% {
            opacity: 0.7;
            transform: rotate(30deg) scale(1);
          }
          90% {
            opacity: 0.7;
            transform: rotate(330deg) scale(1);
          }
          100% {
            top: 60px;
            opacity: 0;
            transform: rotate(360deg) scale(0.5);
          }
        }
      `}</style>
    </div>
  );
};

const PremiumButton = () => {
  const [showPremium, setShowPremium] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowPremium(true)}
        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
      >
        <Icon name="Crown" className="mr-2" size={20} />
        Premium
      </Button>

      <PremiumModal open={showPremium} onOpenChange={setShowPremium} />
    </>
  );
};

const CharityButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/charity")}
      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
    >
      <Icon name="Heart" className="mr-2" size={20} />
      Фонд радио
    </Button>
  );
};

export default Index;
