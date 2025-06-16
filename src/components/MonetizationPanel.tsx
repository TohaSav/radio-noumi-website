import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { PremiumModal } from "./PremiumModal";

export const MonetizationPanel = () => {
  const [showPremium, setShowPremium] = useState(false);
  const [earnings, setEarnings] = useState({
    ads: 0,
    premium: 0,
    donations: 0,
  });

  useEffect(() => {
    // Симуляция заработка в реальном времени
    const interval = setInterval(() => {
      setEarnings((prev) => ({
        ads: prev.ads + Math.floor(Math.random() * 5) + 1,
        premium: prev.premium + Math.floor(Math.random() * 50) + 10,
        donations: prev.donations + Math.floor(Math.random() * 100) + 25,
      }));
    }, 30000); // Каждые 30 секунд

    return () => clearInterval(interval);
  }, []);

  const totalEarnings = earnings.ads + earnings.premium + earnings.donations;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm flex items-center">
              <Icon
                name="DollarSign"
                className="mr-1 text-green-400"
                size={16}
              />
              Реклама
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {earnings.ads}₽
            </div>
            <p className="text-white/60 text-xs">За сегодня</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm flex items-center">
              <Icon name="Crown" className="mr-1 text-purple-400" size={16} />
              Подписки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">
              {earnings.premium}₽
            </div>
            <p className="text-white/60 text-xs">За сегодня</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm flex items-center">
              <Icon name="Heart" className="mr-1 text-pink-400" size={16} />
              Донаты
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-400">
              {earnings.donations}₽
            </div>
            <p className="text-white/60 text-xs">За сегодня</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-purple-500/30 flex items-center justify-center min-h-[120px]">
        <CardContent className="p-3 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <h3 className="text-base font-semibold text-white mb-1">
              Общий доход сегодня
            </h3>
          </div>
        </CardContent>
      </Card>

      <PremiumModal open={showPremium} onOpenChange={setShowPremium} />
    </>
  );
};
