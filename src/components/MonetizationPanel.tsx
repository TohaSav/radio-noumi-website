import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const MonetizationPanel = () => {
  return (
    <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Coins" className="text-green-400" size={28} />
          <h3 className="text-2xl font-bold text-white">Монетизация</h3>
        </div>
        <p className="text-green-200/80">Поддержите развитие Radio Noumi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center space-y-3">
          <Icon name="Coffee" className="text-amber-400 mx-auto" size={32} />
          <h4 className="font-semibold text-white">Поддержка</h4>
          <p className="text-sm text-white/70">Поддержите нас донатом</p>
          <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full">
            ☕ Донат
          </Button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center space-y-3">
          <Icon name="Crown" className="text-purple-400 mx-auto" size={32} />
          <h4 className="font-semibold text-white">Premium</h4>
          <p className="text-sm text-white/70">Без рекламы и эксклюзив</p>
          <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-full">
            👑 Premium
          </Button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center space-y-3">
          <Icon name="Share2" className="text-blue-400 mx-auto" size={32} />
          <h4 className="font-semibold text-white">Поделиться</h4>
          <p className="text-sm text-white/70">Расскажите друзьям</p>
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full">
            📢 Поделиться
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MonetizationPanel;
