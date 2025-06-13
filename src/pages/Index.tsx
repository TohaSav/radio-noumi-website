import { useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useRadioStats } from "@/hooks/useRadioStats";
import RadioPlayer from "@/components/RadioPlayer";
import AnimatedTitle from "@/components/AnimatedTitle";

// Lazy loading тяжелых компонентов
const TopChart = lazy(() => import("@/components/TopChart"));
const NewReleases = lazy(() => import("@/components/NewReleases"));
const Stories = lazy(() => import("@/components/Stories"));
const ReelsButton = lazy(() => import("@/components/ReelsButton"));

// Облегченный компонент загрузки
const ComponentLoader = () => (
  <div className="flex justify-center py-4">
    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const stats = useRadioStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative">
      {/* Упрощенный фон для ускорения рендера */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      <div className="container mx-auto px-4 py-8 space-y-8 relative z-10 pb-24">
        <Suspense fallback={<ComponentLoader />}>
          <ReelsButton />
        </Suspense>

        {/* Кнопка знакомств */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20">
          <Link
            to="/dating"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full transition-all duration-200 hover:bg-white/20"
          >
            <Icon name="Heart" size={16} />
            <span className="text-sm font-semibold">Знакомства</span>
          </Link>
        </div>

        {/* Stories с отложенной загрузкой */}
        <Suspense fallback={<ComponentLoader />}>
          <Stories />
        </Suspense>

        {/* AnimatedTitle */}
        <div className="flex justify-center items-center py-8">
          <AnimatedTitle />
        </div>

        <div className="flex items-center justify-center gap-4">
          <RadioPlayer streamUrl="https://myradio24.org/61673" />
        </div>

        {/* Отложенная загрузка остальных компонентов */}
        <Suspense fallback={<ComponentLoader />}>
          <TopChart />
        </Suspense>

        <Suspense fallback={<ComponentLoader />}>
          <NewReleases />
        </Suspense>
      </div>
    </div>
  );
};

export default Index;
