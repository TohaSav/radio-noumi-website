import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Wish } from "@/pages/WishTree";

interface AddWishModalProps {
  onClose: () => void;
  onSubmit: (wishData: Omit<Wish, 'id' | 'position'>) => void;
}

const AddWishModal = ({ onClose, onSubmit }: AddWishModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    wish: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name && formData.address && formData.phone && formData.wish) {
      onSubmit(formData);
      setFormData({ name: "", address: "", phone: "", wish: "" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl border-2 border-white/20 shadow-2xl max-w-lg w-full p-8 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>

        {/* Заголовок */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🎄 Загадайте желание
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Имя *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Введите ваше имя"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Адрес *
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Введите ваш адрес"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Телефон *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="+7 (999) 123-45-67"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Ваше желание *
            </label>
            <textarea
              required
              value={formData.wish}
              onChange={(e) => setFormData({ ...formData, wish: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Напишите ваше желание..."
            />
          </div>

          {/* Кнопки */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-blue-500/50"
            >
              Повесить на ёлку
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWishModal;
