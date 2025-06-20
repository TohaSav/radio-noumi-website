import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const AdBanner = () => {
  return (
    <div className="w-full max-w-[450px] h-[130px] mx-auto bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-3 sm:p-4 flex items-center justify-between">
      {/* Левая часть с иконкой */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="bg-yellow-400/20 rounded-full p-2">
          <Icon name="Radio" className="text-yellow-400" size={20} />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base font-bold text-white">Реклама</h3>
          <p className="text-xs text-yellow-200/80 hidden sm:block">
            Ваша реклама здесь!
          </p>
        </div>
      </div>

      {/* Правая часть с кнопкой */}
      <div className="text-center space-y-1">
        <p className="text-xs sm:text-sm text-yellow-100 font-medium">
          🎵 Разместите рекламу
        </p>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm transition-all duration-300 transform hover:scale-105">
          <Icon name="Mail" className="mr-1" size={14} />
          Связаться
        </Button>
      </div>
    </div>
  );
};

export default AdBanner;
