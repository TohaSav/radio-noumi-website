import { useEffect } from "react";
import { useRadioStats } from "@/hooks/useRadioStats";
import RadioPlayer from "@/components/RadioPlayer";
import LiveChat from "@/components/LiveChat";
import TopChart from "@/components/TopChart";
import NewReleases from "@/components/NewReleases";
import OrderButton from "@/components/OrderButton";
import Stories from "@/components/Stories";

const Index = () => {
  const stats = useRadioStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      <div className="container mx-auto px-4 py-8 pb-32 md:pb-8 space-y-8 relative z-10">
        {/* Заголовок с улучшенной типографикой */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-violet-300 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Radio Noumi
          </h1>
          <p className="text-xl text-white/80 font-light">
            Твоя музыка, твое настроение
          </p>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-violet-600 rounded-full" />
          </div>
        </div>

        {/* Stories с улучшенной анимацией */}
        <div className="transform hover:scale-[1.02] transition-transform duration-300">
          <Stories />
        </div>

        {/* Главный плеер */}
        <div className="flex justify-center">
          <RadioPlayer
            streamUrl="https://myradio24.org/61673"
            likes={stats.likes}
            dislikes={stats.dislikes}
            listeners={stats.listeners}
          />
        </div>

        {/* Живой чат */}
        <div className="transform hover:scale-[1.01] transition-transform duration-300">
          <LiveChat activeUsers={stats.listeners} />
        </div>

        {/* Кнопка заказа */}
        <div className="flex justify-center">
          <OrderButton />
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Топ чарт */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <TopChart />
          </div>

          {/* Новинки */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <NewReleases />
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="bg-gradient-to-r from-purple-900/30 to-violet-900/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Слушай лучшую музыку
          </h3>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Наслаждайся качественным звуком, интерактивными эффектами и огромной
            библиотекой треков. Радио Noumi - это новый уровень музыкального
            опыта.
          </p>
        </div>

        {/* Футер */}
        <div className="text-center text-white/60 mt-12 pb-6">
          <p className="text-sm">
            &copy; 2024 Radio Noumi. Твоя музыка, твое настроение
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
