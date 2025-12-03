import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import WishTreeComponent from "@/components/wishtree/WishTreeComponent";
import AddWishModal from "@/components/wishtree/AddWishModal";
import InfoModal from "@/components/wishtree/InfoModal";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export interface Wish {
  id: string;
  name: string;
  address: string;
  phone: string;
  wish: string;
  position: { x: number; y: number };
}

const API_URL = 'https://functions.poehali.dev/2a670543-b845-4d66-ba79-3530a25cbf2e';

const WishTree = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch wishes');
      const data = await response.json();
      setWishes(data.wishes || []);
    } catch (error) {
      console.error('Error fetching wishes:', error);
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить желания",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddWish = (position: { x: number; y: number }) => {
    const positionTaken = wishes.some(w => w.position.x === position.x && w.position.y === position.y);
    if (positionTaken) {
      toast({
        title: "Место занято",
        description: "На этом месте уже есть желание",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedPosition(position);
    setShowAddModal(true);
  };

  const handleSubmitWish = async (wishData: Omit<Wish, 'id' | 'position'>) => {
    if (!selectedPosition) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...wishData,
          position: selectedPosition
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add wish');
      }

      const data = await response.json();
      setWishes([...wishes, data.wish]);
      setShowAddModal(false);
      setSelectedPosition(null);
      
      toast({
        title: "Желание добавлено! 🎄",
        description: "Ваше желание теперь висит на ёлке"
      });
    } catch (error) {
      console.error('Error adding wish:', error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось добавить желание",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-green-950 to-emerald-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent"></div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white animate-snowfall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 100}px`,
              fontSize: `${Math.random() * 12 + 8}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 5 + 10}s`,
              opacity: Math.random() * 0.6 + 0.4
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-30">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <filter id="garland-glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M 0,30 Q 50,10 100,30 T 200,30 T 300,30 T 400,30 T 500,30 T 600,30 T 700,30 T 800,30 T 900,30 T 1000,30 T 1100,30 T 1200,30 T 1300,30 T 1400,30 T 1500,30 T 1600,30 T 1700,30 T 1800,30 T 1900,30 T 2000,30" 
            stroke="#0f4c29" strokeWidth="2" fill="none"/>
          {[...Array(40)].map((_, i) => {
            const colors = ['#ef4444', '#fbbf24', '#3b82f6', '#a855f7', '#10b981', '#ec4899', '#f97316'];
            const x = i * 50 + 25;
            const y = i % 2 === 0 ? 20 : 40;
            return (
              <g key={`garland-${i}`}>
                <circle cx={x} cy={y} r="8" fill={colors[i % colors.length]} 
                  className="animate-twinkle" filter="url(#garland-glow)"
                  style={{ animationDelay: `${i * 0.1}s` }}/>
                <circle cx={x} cy={y - 3} r="3" fill="white" opacity="0.7"/>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-30">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <path d="M 0,10 Q 50,30 100,10 T 200,10 T 300,10 T 400,10 T 500,10 T 600,10 T 700,10 T 800,10 T 900,10 T 1000,10 T 1100,10 T 1200,10 T 1300,10 T 1400,10 T 1500,10 T 1600,10 T 1700,10 T 1800,10 T 1900,10 T 2000,10" 
            stroke="#0f4c29" strokeWidth="2" fill="none"/>
          {[...Array(40)].map((_, i) => {
            const colors = ['#10b981', '#ec4899', '#ef4444', '#fbbf24', '#3b82f6', '#a855f7', '#f97316'];
            const x = i * 50 + 25;
            const y = i % 2 === 0 ? 20 : 5;
            return (
              <g key={`garland-bottom-${i}`}>
                <circle cx={x} cy={y} r="8" fill={colors[i % colors.length]} 
                  className="animate-twinkle" filter="url(#garland-glow)"
                  style={{ animationDelay: `${i * 0.1 + 0.5}s` }}/>
                <circle cx={x} cy={y - 3} r="3" fill="white" opacity="0.7"/>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-yellow-400/5 via-transparent to-transparent">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(255,215,0,0.1)_20px,rgba(255,215,0,0.1)_40px)] animate-shimmer"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-yellow-400/5 via-transparent to-transparent">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(255,215,0,0.1)_20px,rgba(255,215,0,0.1)_40px)] animate-shimmer"></div>
        </div>
      </div>

      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between p-3 sm:p-4 max-w-7xl mx-auto gap-2">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 sm:gap-2 text-white hover:text-yellow-300 transition-all duration-300 hover:scale-110 flex-shrink-0 group"
          >
            <Icon name="ArrowLeft" size={20} className="sm:w-6 sm:h-6 group-hover:animate-pulse" />
            <span className="font-semibold text-sm sm:text-base hidden xs:inline">Главная</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <h1 className="text-white font-bold text-sm sm:text-lg md:text-2xl flex items-center gap-1 sm:gap-2 truncate drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
              🎄 <span className="hidden sm:inline bg-gradient-to-r from-yellow-200 via-red-200 to-green-200 bg-clip-text text-transparent">Ёлка желаний Десертный дворик</span><span className="sm:hidden bg-gradient-to-r from-yellow-200 via-red-200 to-green-200 bg-clip-text text-transparent">Ёлка желаний</span>
            </h1>
            <button
              onClick={() => setShowInfoModal(true)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 border-2 border-white/50 flex items-center justify-center text-white hover:scale-110 hover:rotate-12 transition-all duration-300 flex-shrink-0 shadow-lg hover:shadow-yellow-400/50"
            >
              <Icon name="Info" size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>

          <div className="hidden sm:block w-24 md:w-32"></div>
        </div>
      </div>

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-8 md:pb-12 px-2 sm:px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="text-6xl animate-bounce">🎄</div>
            <div className="text-white text-base sm:text-xl font-semibold animate-pulse">Загружаем новогоднее чудо...</div>
          </div>
        ) : (
          <WishTreeComponent wishes={wishes} onAddWish={handleAddWish} canAddWish={true} />
        )}
      </div>

      {showAddModal && (
        <AddWishModal
          onClose={() => {
            setShowAddModal(false);
            setSelectedPosition(null);
          }}
          onSubmit={handleSubmitWish}
        />
      )}

      {showInfoModal && (
        <InfoModal onClose={() => setShowInfoModal(false)} />
      )}

      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) translateX(50px) rotate(360deg);
          }
        }
        .animate-snowfall {
          animation: snowfall linear infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }
        .animate-twinkle {
          animation: twinkle 1.5s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WishTree;
