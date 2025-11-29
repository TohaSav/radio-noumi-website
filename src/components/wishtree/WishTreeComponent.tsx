import Icon from "@/components/ui/icon";
import { Wish } from "@/pages/WishTree";

interface WishTreeComponentProps {
  wishes: Wish[];
  onAddWish: (position: { x: number; y: number }) => void;
}

const WishTreeComponent = ({ wishes, onAddWish }: WishTreeComponentProps) => {
  // Позиции для кнопок + на ёлке (ветки)
  const branchPositions = [
    { x: 50, y: 20 },  // Верхушка
    { x: 35, y: 30 },  // Левая верхняя
    { x: 65, y: 30 },  // Правая верхняя
    { x: 30, y: 42 },  // Левая средняя-верхняя
    { x: 50, y: 42 },  // Центр средняя-верхняя
    { x: 70, y: 42 },  // Правая средняя-верхняя
    { x: 25, y: 54 },  // Левая средняя
    { x: 45, y: 54 },  // Центр-лево средняя
    { x: 55, y: 54 },  // Центр-право средняя
    { x: 75, y: 54 },  // Правая средняя
    { x: 20, y: 66 },  // Левая нижняя
    { x: 35, y: 66 },  // Левая-центр нижняя
    { x: 50, y: 66 },  // Центр нижняя
    { x: 65, y: 66 },  // Правая-центр нижняя
    { x: 80, y: 66 },  // Правая нижняя
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative w-full aspect-[3/4] max-h-[80vh] mx-auto">
        {/* Ёлка SVG */}
        <svg
          viewBox="0 0 300 400"
          className="w-full h-full drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 0 40px rgba(34, 197, 94, 0.5))' }}
        >
          {/* Звезда на верхушке */}
          <path
            d="M 150 10 L 155 25 L 170 25 L 158 35 L 163 50 L 150 40 L 137 50 L 142 35 L 130 25 L 145 25 Z"
            fill="#fbbf24"
            stroke="#f59e0b"
            strokeWidth="1"
            className="animate-pulse"
          />

          {/* Ствол */}
          <rect x="135" y="350" width="30" height="50" fill="#78350f" />

          {/* Ёлка (треугольники) */}
          <path
            d="M 150 40 L 80 130 L 105 130 L 60 200 L 90 200 L 50 270 L 90 270 L 60 340 L 240 340 L 210 270 L 250 270 L 210 200 L 240 200 L 195 130 L 220 130 Z"
            fill="#16a34a"
            stroke="#15803d"
            strokeWidth="2"
          />

          {/* Гирлянды */}
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={80 + (i % 5) * 35}
              cy={130 + Math.floor(i / 5) * 70}
              r="4"
              fill={['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899'][i % 5]}
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </svg>

        {/* Кнопки + на ветках */}
        {branchPositions.map((pos, index) => {
          const hasWish = wishes.some(w => w.position.x === pos.x && w.position.y === pos.y);
          
          return (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              {hasWish ? (
                // Показываем ёлочный шарик если желание уже есть
                <div className="relative group">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-2 border-yellow-400 shadow-lg animate-pulse cursor-pointer">
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-yellow-600"></div>
                  </div>
                  {/* Подсказка с именем */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {wishes.find(w => w.position.x === pos.x && w.position.y === pos.y)?.name}
                  </div>
                </div>
              ) : (
                // Показываем кнопку +
                <button
                  onClick={() => onAddWish(pos)}
                  className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all shadow-lg hover:shadow-white/50"
                >
                  <Icon name="Plus" size={20} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Информация о желаниях */}
      <div className="mt-8 text-center">
        <p className="text-white/80 text-lg">
          🎁 Повешено желаний: <span className="font-bold text-2xl text-yellow-300">{wishes.length}</span>
        </p>
      </div>
    </div>
  );
};

export default WishTreeComponent;
