import { useEffect } from "react";
import { useRadioStats } from "@/hooks/useRadioStats";
import { useCapacitor } from "@/hooks/useCapacitor";
import MobileLayout from "@/components/MobileLayout";
import RadioPlayer from "@/components/RadioPlayer";
import LiveChat from "@/components/LiveChat";
import TopChart from "@/components/TopChart";
import NewReleases from "@/components/NewReleases";
import OrderButton from "@/components/OrderButton";
import Stories from "@/components/Stories";

const Index = () => {
  const stats = useRadioStats();
  const { initializeApp } = useCapacitor();

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Заголовок */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Radio Noumi</h1>
            <p className="text-white/70">Твоя музыка, твое настроение</p>
          </div>

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
          <div className="grid grid-cols-1 gap-6">
            {/* Топ чарт */}
            <TopChart />

            {/* Новинки */}
            <NewReleases />
          </div>

          {/* Футер */}
          <div className="text-center text-white/70 mt-8 pb-4">
            <p>&copy; 2024 Radio Noumi. Твоя музыка, твое настроение</p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
