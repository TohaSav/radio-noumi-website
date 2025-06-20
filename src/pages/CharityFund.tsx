import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

interface CharityCase {
  id: number;
  name: string;
  photo: string;
  description: string;
  needed: string;
}

const CharityFund = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo: null as File | null,
  });

  // Примеры существующих случаев
  const charityCases: CharityCase[] = [
    {
      id: 1,
      name: "Анна Петрова",
      photo:
        "https://images.unsplash.com/photo-1494790108755-2616c14e6244?w=360&h=220&fit=crop&crop=face",
      description: "Нужна помощь в оплате лечения после операции",
      needed: "Медицинская помощь",
    },
    {
      id: 2,
      name: "Иван Сидоров",
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=360&h=220&fit=crop&crop=face",
      description: "Семья осталась без дома после пожара",
      needed: "Жилье и предметы первой необходимости",
    },
    {
      id: 3,
      name: "Мария Козлова",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=360&h=220&fit=crop&crop=face",
      description: "Нужна помощь в покупке инвалидной коляски",
      needed: "Медицинское оборудование",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log("Заявка отправлена:", formData);
    alert("Заявка успешно отправлена! Мы рассмотрим её в ближайшее время.");
    setFormData({ name: "", description: "", photo: null });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="mb-6 text-white hover:text-purple-300"
          >
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            Назад на главную
          </Button>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Фонд радио Noumi
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Помогаем людям в трудную минуту. Каждый может подать заявку на
            помощь или поддержать тех, кто в ней нуждается.
          </p>
        </div>

        {/* Форма подачи заявки */}
        <Card className="max-w-2xl mx-auto mb-16 bg-white/10 backdrop-blur-lg border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Icon name="PlusCircle" className="mr-2" size={24} />
              Подать заявку на помощь
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white">
                  Ваше имя
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Введите ваше имя"
                  className="bg-white/20 border-purple-500/30 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <Label htmlFor="photo" className="text-white">
                  Фото (360x220px)
                </Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="bg-white/20 border-purple-500/30 text-white file:bg-purple-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">
                  Опишите вашу ситуацию
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Расскажите подробно о том, в чем вам нужна помощь..."
                  className="bg-white/20 border-purple-500/30 text-white placeholder:text-gray-400 min-h-32"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Icon name="Send" className="mr-2" size={20} />
                Отправить заявку
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Список случаев */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Люди, которым нужна помощь
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {charityCases.map((case_) => (
              <Card
                key={case_.id}
                className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img
                      src={case_.photo}
                      alt={case_.name}
                      className="w-full h-[220px] object-cover rounded-lg"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {case_.name}
                  </h3>

                  <div className="bg-purple-500/20 rounded-lg p-3 mb-4">
                    <p className="text-purple-300 font-medium text-sm">
                      {case_.needed}
                    </p>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {case_.description}
                  </p>

                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-pink-500/25 transition-all duration-300">
                    <Icon name="Heart" className="mr-2" size={16} />
                    Помочь
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityFund;
