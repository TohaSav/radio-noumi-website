import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const RadioBackground = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!photo || !description.trim()) {
      alert("Пожалуйста, загрузите фото и добавьте описание");
      return;
    }

    // Здесь будет логика отправки заявки
    alert("Заявка отправлена! Люди смогут увидеть её и помочь вам.");
    setPhoto(null);
    setPhotoPreview(null);
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Кнопка назад */}
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="mb-6 text-white hover:bg-white/10"
        >
          <Icon name="ArrowLeft" className="mr-2" size={20} />
          Назад
        </Button>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white">
              Фон радио
            </CardTitle>
            <CardDescription className="text-gray-300">
              Подайте заявку на помощь - загрузите фото и опишите вашу ситуацию
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Загрузка фото */}
            <div className="space-y-2">
              <Label htmlFor="photo" className="text-white font-medium">
                Фото (360x220 пикселей)
              </Label>
              <div className="border-2 border-dashed border-white/30 rounded-lg p-4 text-center">
                {photoPreview ? (
                  <div className="space-y-4">
                    <img
                      src={photoPreview}
                      alt="Предварительный просмотр"
                      className="mx-auto rounded-lg"
                      style={{
                        width: "360px",
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />
                    <Button
                      onClick={() => {
                        setPhoto(null);
                        setPhotoPreview(null);
                      }}
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      Удалить фото
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Icon
                      name="Upload"
                      className="mx-auto text-white/60"
                      size={48}
                    />
                    <p className="text-white/60">Нажмите для загрузки фото</p>
                    <p className="text-xs text-white/40">
                      Рекомендуемый размер: 360x220 пикселей
                    </p>
                  </div>
                )}
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Описание */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white font-medium">
                Описание ситуации
              </Label>
              <Textarea
                id="description"
                placeholder="Расскажите о вашей ситуации и как люди могут вам помочь..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-32 bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-white/50"
                rows={6}
              />
            </div>

            {/* Кнопка отправки */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Icon name="Send" className="mr-2" size={20} />
              Отправить заявку на помощь
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RadioBackground;
