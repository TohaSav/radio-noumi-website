import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const Features = () => {
  const features = [
    {
      icon: "Headphones",
      title: "Высокое качество звука",
      description:
        "Кристально чистый звук 320 kbps для лучшего музыкального опыта",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "Globe",
      title: "Мировые хиты",
      description: "Лучшая музыка со всех континентов в одном месте",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "Zap",
      title: "Без рекламы",
      description: "Чистая музыка без надоедливых рекламных пауз",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-20 px-4 mb-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎯 Почему выбирают Radio Noumi?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Мы создали идеальное радио для настоящих ценителей музыки
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-4"
            >
              <div
                className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
              >
                <Icon
                  name={feature.icon as any}
                  className="w-10 h-10 text-white"
                />
              </div>

              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                {feature.title}
              </h3>

              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>

              {/* Анимированные блики */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300 delay-100" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              🚀 Готовы погрузиться в мир музыки?
            </h3>
            <p className="text-white/80 mb-6 text-lg">
              Включите Radio Noumi прямо сейчас и откройте для себя новые
              горизонты звука
            </p>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110">
              <Icon name="Play" className="mr-2" size={20} />
              🎵 Начать слушать
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
