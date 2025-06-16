import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

interface PremiumModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PremiumModal = ({ open, onOpenChange }: PremiumModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "monthly",
      name: "Месячная подписка",
      price: "199₽",
      period: "месяц",
      features: [
        "Без рекламы",
        "Высокое качество звука",
        "Запросы треков",
        "Уведомления о любимых песнях",
      ],
    },
    {
      id: "yearly",
      name: "Годовая подписка",
      price: "1990₽",
      period: "год",
      discount: "2 месяца в подарок!",
      features: [
        "Все преимущества месячной",
        "Персональные плейлисты",
        "Приоритетная поддержка",
        "Эксклюзивный контент",
      ],
    },
  ];

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    // Интеграция с платежной системой
    toast.success("Переход к оплате подписки...");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-slate-800/95 backdrop-blur-lg border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Noumi Premium
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Получите максимум от радио Noumi без ограничений
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`bg-white/10 backdrop-blur-lg border-2 transition-all cursor-pointer ${
                selectedPlan === plan.id
                  ? "border-purple-500 shadow-lg shadow-purple-500/25"
                  : "border-white/20 hover:border-white/40"
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white">
                    {plan.name}
                  </h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-purple-400">
                      {plan.price}
                    </span>
                    <span className="text-white/60">/{plan.period}</span>
                  </div>
                  {plan.discount && (
                    <div className="mt-1 text-sm text-green-400 font-medium">
                      {plan.discount}
                    </div>
                  )}
                </div>

                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-white/80">
                      <Icon
                        name="CheckCircle"
                        className="mr-2 text-green-400"
                        size={16}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  Выбрать план
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
