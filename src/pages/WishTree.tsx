import { useState } from "react";
import Icon from "@/components/ui/icon";
import WishTreeComponent from "@/components/wishtree/WishTreeComponent";
import AddWishModal from "@/components/wishtree/AddWishModal";
import InfoModal from "@/components/wishtree/InfoModal";
import { useNavigate } from "react-router-dom";

export interface Wish {
  id: string;
  name: string;
  address: string;
  phone: string;
  wish: string;
  position: { x: number; y: number };
}

const WishTree = () => {
  const navigate = useNavigate();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<{ x: number; y: number } | null>(null);

  const handleAddWish = (position: { x: number; y: number }) => {
    setSelectedPosition(position);
    setShowAddModal(true);
  };

  const handleSubmitWish = (wishData: Omit<Wish, 'id' | 'position'>) => {
    if (selectedPosition) {
      const newWish: Wish = {
        id: Date.now().toString(),
        ...wishData,
        position: selectedPosition
      };
      setWishes([...wishes, newWish]);
      setShowAddModal(false);
      setSelectedPosition(null);
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

          <div className="w-24"></div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="relative z-10 pt-24 pb-12 px-4">
        <WishTreeComponent wishes={wishes} onAddWish={handleAddWish} />
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
