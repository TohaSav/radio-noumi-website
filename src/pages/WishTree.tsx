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

  // Загрузка всех желаний при монтировании
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
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-950 relative overflow-hidden">
      {/* Снежинки на фоне */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-70 animate-snow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 100}px`,
              fontSize: `${Math.random() * 10 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 5}s`
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      {/* Светящиеся орбы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Навигация */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors"
          >
            <Icon name="ArrowLeft" size={24} />
            <span className="font-medium">Главная</span>
          </button>

          <div className="flex items-center gap-3">
            <h1 className="text-white font-bold text-xl flex items-center gap-2">
              🎄 Ёлка желаний Десертный дворик
            </h1>
            <button
              onClick={() => setShowInfoModal(true)}
              className="w-8 h-8 rounded-full bg-blue-500/30 border-2 border-blue-400 flex items-center justify-center text-white hover:bg-blue-500/50 transition-colors"
            >
              <Icon name="Info" size={18} />
            </button>
          </div>

          <div className="w-32"></div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="relative z-10 pt-24 pb-12 px-4">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-white text-xl">Загрузка ёлки... 🎄</div>
          </div>
        ) : (
          <WishTreeComponent wishes={wishes} onAddWish={handleAddWish} />
        )}
      </div>

      {/* Модальные окна */}
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
        @keyframes snow {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        .animate-snow {
          animation: snow linear infinite;
        }
      `}</style>
    </div>
  );
};

export default WishTree;