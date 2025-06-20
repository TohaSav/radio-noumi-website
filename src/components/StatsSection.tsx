import Icon from "@/components/ui/icon";

const StatsSection = () => {
  const stats = [
    {
      icon: "Radio",
      value: "24/7",
      label: "Эфир без перерыва",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "Users",
      value: "1,247",
      label: "Активных слушателей",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: "Globe",
      value: "15+",
      label: "Стран мира",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "Music",
      value: "∞",
      label: "Треков в библиотеке",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          🌟 Radio Noumi в цифрах
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-6 text-center hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon name={stat.icon as any} className="w-8 h-8 text-white" />
              </div>

              <div className="text-3xl font-bold text-white mb-2 group-hover:animate-pulse">
                {stat.value}
              </div>

              <div className="text-white/70 text-sm">{stat.label}</div>

              {/* Анимированные частицы при ховере */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
