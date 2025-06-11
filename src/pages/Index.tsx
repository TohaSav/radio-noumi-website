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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stories */}
        <Stories />

        {/* Главный плеер */}
        <RadioPlayer
          streamUrl="https://myradio24.org/61673"
          likes={stats.likes}
          dislikes={stats.dislikes}
          listeners={stats.listeners}
        />

        {/* Живой чат */}
        <LiveChat activeUsers={stats.listeners} />

        {/* Кнопка заказа */}
        <OrderButton />

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Левая колонка - Топ чарт */}
          <div className="lg:col-span-1">
            <TopChart />
          </div>

          {/* Правая колонка - Новинки */}
          <div className="lg:col-span-1">
            <NewReleases />
          </div>
        </div>

        {/* Футер */}
        <div className="text-center text-white/70 mt-12">
          <p>&copy; 2024 Radio Noumi. Твоя музыка, твое настроение</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
