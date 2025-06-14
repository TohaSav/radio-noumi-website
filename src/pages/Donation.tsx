import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";

const Donation = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("100");
  const [autoSupport, setAutoSupport] = useState(false);
  const [isAutoActive, setIsAutoActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoSupport && isAutoActive) {
      interval = setInterval(
        () => {
          // Имитация автоматического доната
          toast.success("Автоматическая поддержка: 1₽ отправлен");
        },
        5 * 60 * 1000,
      ); // 5 минут
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoSupport, isAutoActive]);

  const handleDonate = () => {
    const yoomoneyUrl = `https://yoomoney.ru/to/4100118100096255/${amount}`;
    window.open(yoomoneyUrl, "_blank");
    toast.success(`Переход к оплате ${amount}₽`);
  };

  const handleAutoSupport = () => {
    setAutoSupport(!autoSupport);
    setIsAutoActive(!autoSupport);

    if (!autoSupport) {
      toast.success("Автоматическая поддержка включена! 1₽ каждые 5 минут");
    } else {
      toast.info("Автоматическая поддержка отключена");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Кнопка назад */}
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="text-white/80 hover:text-white mb-8"
        >
          <Icon name="ArrowLeft" className="mr-2" size={20} />
          Назад к радио
        </Button>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-4">
              Поддержать радио Noumi
            </h1>
            <p className="text-xl text-white/80">
              Помогите нам развивать радиостанцию и дарить вам лучшую музыку
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Icon name="CreditCard" className="mr-2" size={24} />
                Пожертвование через ЮMoney
              </CardTitle>
              <CardDescription className="text-white/70">
                Кошелёк:{" "}
                <span className="font-mono font-semibold">
                  4100118100096255
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Сумма пожертвования */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-white">
                  Сумма (₽)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                  placeholder="Введите сумму"
                />
              </div>

              {/* Быстрые суммы */}
              <div className="grid grid-cols-4 gap-2">
                {["50", "100", "200", "500", "1000"].map((sum) => (
                  <Button
                    key={sum}
                    variant="outline"
                    onClick={() => setAmount(sum)}
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    {sum}₽
                  </Button>
                ))}
              </div>

              {/* Автоматическая поддержка */}
              <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                <Switch
                  id="auto-support"
                  checked={autoSupport}
                  onCheckedChange={handleAutoSupport}
                />
                <div className="flex-1">
                  <Label
                    htmlFor="auto-support"
                    className="text-white font-medium"
                  >
                    Помощь раз в месяц
                  </Label>
                  <p className="text-white/70 text-sm">
                    Вы можете каждый месяц нам автоматически жертвовать эту
                    сумму
                  </p>
                </div>
              </div>

              {isAutoActive && (
                <div className="flex items-center justify-center p-3 bg-green-500/20 rounded-lg">
                  <Icon
                    name="CheckCircle"
                    className="mr-2 text-green-400"
                    size={20}
                  />
                  <span className="text-green-400 font-medium">
                    Автоматическая поддержка активна
                  </span>
                </div>
              )}

              {/* Кнопка пожертвования */}
              <Button
                onClick={handleDonate}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Icon name="Heart" className="mr-2" size={20} />
                Поддержать на {amount}₽
              </Button>
            </CardContent>
          </Card>

          {/* Дополнительная информация */}
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Все пожертвования идут на развитие радиостанции и улучшение
              качества вещания
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
