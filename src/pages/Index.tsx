import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useRadioStats } from "@/hooks/useRadioStats";
import RadioPlayer from "@/components/RadioPlayer";
import TopChart from "@/components/TopChart";
import NewReleases from "@/components/NewReleases";
import OrderButton from "@/components/OrderButton";
import Stories from "@/components/Stories";
import ReelsButton from "@/components/ReelsButton";

const Index = () => {
  const stats = useRadioStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 through-pink-800 to-orange-900 relative overflow-hidden">
      {/* Многослойные фоновые эффекты */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-400/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-rose-400/20 via-transparent to-transparent" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIzIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      <div className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        <div className="absolute top-4 left-4 z-20">
          <ReelsButton />
        </div>

        <div className="flex items-center justify-center gap-4">
          <RadioPlayer streamUrl="https://myradio24.org/61673" />
          <div className="absolute top-4 right-4 z-20">
            <Link
              to="/dating"
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Icon name="Heart" size={18} />
              <span className="font-medium">Знакомства</span>
            </Link>
          </div>
        </div>
        {/* Заголовок с улучшенной типографикой */}
        <div className="text-center mb-10">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-yellow-300 via-pink-300 through-purple-300 to-cyan-300 bg-clip-text text-transparent mb-6 drop-shadow-2xl filter brightness-110">
            Radio Noumi
          </h1>
          <p className="text-2xl text-white font-medium drop-shadow-lg backdrop-blur-sm bg-black/20 px-6 py-3 rounded-full">
            Твоя музыка, твое настроение
          </p>
          <div className="mt-6 flex justify-center">
            <div className="h-2 w-32 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full shadow-lg shadow-pink-500/50" />
          </div>
        </div>

        {/* Stories с улучшенной анимацией */}
        <div className="transform hover:scale-[1.02] transition-transform duration-300">
          <Stories />
        </div>

        {/* Кнопка заказа */}
        <div className="flex justify-center">
          <OrderButton />
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8"></div>

        {/* Дополнительная информация */}
        <div className="bg-gradient-to-r from-purple-600/40 via-pink-600/40 to-orange-600/40 backdrop-blur-lg rounded-3xl p-10 border border-white/25 text-center shadow-2xl shadow-pink-500/30">
          <h3 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
            Слушай лучшую музыку
          </h3>
          <p className="text-white/90 text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Наслаждайся качественным звуком, интерактивными эффектами и огромной
            библиотекой треков. Радио Noumi - это новый уровень музыкального
            опыта.
          </p>
        </div>

        {/* Футер */}
        <div className="text-center text-white/80 mt-16 pb-8">
          <p className="text-base drop-shadow-md">
            &copy; 2024 Radio Noumi. Твоя музыка, твое настроение
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
