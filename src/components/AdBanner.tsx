import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const AdBanner = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-6 text-center space-y-4">
      <div className="flex items-center justify-center space-x-2">
        <Icon name="Star" className="text-yellow-400" size={24} />
        <h3 className="text-xl font-bold text-white">Реклама</h3>
        <Icon name="Star" className="text-yellow-400" size={24} />
      </div>

      <div className="space-y-3">
        <p className="text-lg text-yellow-100">🎵 Ваша реклама здесь! 🎵</p>
        <p className="text-sm text-yellow-200/80">
          Разместите рекламу на Radio Noumi и достигните тысяч слушателей
        </p>

        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full px-6 py-2 transition-all duration-300 transform hover:scale-105">
          <Icon name="Mail" className="mr-2" size={16} />
          Связаться с нами
        </Button>
      </div>
    </div>
  );
};

export default AdBanner;
