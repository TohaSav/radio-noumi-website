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
              Адрес (Город, Индекс, Улица, Номер квартиры или номер частного дома) *
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
              Выберите подарок *
            </label>
            <select
              required
              value={formData.wish}
              onChange={(e) => setFormData({ ...formData, wish: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.5rem'
              }}
            >
              <option value="" className="bg-slate-900 text-white">Выберите артикул подарка...</option>
              <option value="Артикул SVI_456321478986" className="bg-slate-900 text-white">Артикул SVI_456321478986</option>
              <option value="Артикул SVI_456321478983" className="bg-slate-900 text-white">Артикул SVI_456321478983</option>
              <option value="Артикул ААА_456321479066" className="bg-slate-900 text-white">Артикул ААА_456321479066</option>
              <option value="Артикул ААА_456321479065" className="bg-slate-900 text-white">Артикул ААА_456321479065</option>
              <option value="Артикул ААА_456321479067" className="bg-slate-900 text-white">Артикул ААА_456321479067</option>
              <option value="Артикул SVI_456321478980" className="bg-slate-900 text-white">Артикул SVI_456321478980</option>
              <option value="Артикул ААА_456321479059" className="bg-slate-900 text-white">Артикул ААА_456321479059</option>
              <option value="Артикул ААА_456321479052" className="bg-slate-900 text-white">Артикул ААА_456321479052</option>
              <option value="Артикул ААА_456321479070" className="bg-slate-900 text-white">Артикул ААА_456321479070</option>
              <option value="Артикул SVI_456321479035" className="bg-slate-900 text-white">Артикул SVI_456321479035</option>
              <option value="Артикул SVI_456321478984" className="bg-slate-900 text-white">Артикул SVI_456321478984</option>
              <option value="Артикул ААА_456321479128" className="bg-slate-900 text-white">Артикул ААА_456321479128</option>
              <option value="Артикул ААА_456321479126" className="bg-slate-900 text-white">Артикул ААА_456321479126</option>
              <option value="Артикул ААА_456321479125" className="bg-slate-900 text-white">Артикул ААА_456321479125</option>
              <option value="Артикул ААА_456321479124" className="bg-slate-900 text-white">Артикул ААА_456321479124</option>
              <option value="Артикул ААА_456321479115" className="bg-slate-900 text-white">Артикул ААА_456321479115</option>
              <option value="Артикул ААА_456321479116" className="bg-slate-900 text-white">Артикул ААА_456321479116</option>
              <option value="Артикул ААА_456321479076" className="bg-slate-900 text-white">Артикул ААА_456321479076</option>
              <option value="Артикул SVI_456321479007" className="bg-slate-900 text-white">Артикул SVI_456321479007</option>
              <option value="Артикул SVI_456321479006" className="bg-slate-900 text-white">Артикул SVI_456321479006</option>
              <option value="Артикул SVI_456321478994" className="bg-slate-900 text-white">Артикул SVI_456321478994</option>
              <option value="Артикул SVI_456321479008" className="bg-slate-900 text-white">Артикул SVI_456321479008</option>
              <option value="Артикул ААА_456321479127" className="bg-slate-900 text-white">Артикул ААА_456321479127</option>
              <option value="Артикул ААА_456321479119" className="bg-slate-900 text-white">Артикул ААА_456321479119</option>
              <option value="Артикул ААА_456321479118" className="bg-slate-900 text-white">Артикул ААА_456321479118</option>
              <option value="Артикул ААА_456321479074" className="bg-slate-900 text-white">Артикул ААА_456321479074</option>
              <option value="Артикул ААА_456321479073" className="bg-slate-900 text-white">Артикул ААА_456321479073</option>
              <option value="Артикул ААА_456321479072" className="bg-slate-900 text-white">Артикул ААА_456321479072</option>
              <option value="Артикул ААА_456321479071" className="bg-slate-900 text-white">Артикул ААА_456321479071</option>
              <option value="Артикул ААА_456321479062" className="bg-slate-900 text-white">Артикул ААА_456321479062</option>
              <option value="Артикул ААА_456321479060" className="bg-slate-900 text-white">Артикул ААА_456321479060</option>
              <option value="Артикул ААА_456321479056" className="bg-slate-900 text-white">Артикул ААА_456321479056</option>
              <option value="Артикул SVI_456321478985" className="bg-slate-900 text-white">Артикул SVI_456321478985</option>
              <option value="Артикул ААА_456321479055" className="bg-slate-900 text-white">Артикул ААА_456321479055</option>
              <option value="Артикул ААА_456321479054" className="bg-slate-900 text-white">Артикул ААА_456321479054</option>
              <option value="Артикул SVI_456321479034" className="bg-slate-900 text-white">Артикул SVI_456321479034</option>
              <option value="Артикул SVI_456321479032" className="bg-slate-900 text-white">Артикул SVI_456321479032</option>
              <option value="Артикул SVI_456321479030" className="bg-slate-900 text-white">Артикул SVI_456321479030</option>
              <option value="Артикул SVI_456321479029" className="bg-slate-900 text-white">Артикул SVI_456321479029</option>
              <option value="Артикул SVI_456321478982" className="bg-slate-900 text-white">Артикул SVI_456321478982</option>
              <option value="Артикул SVI_456321478975" className="bg-slate-900 text-white">Артикул SVI_456321478975</option>
              <option value="Артикул SVI_456321478974" className="bg-slate-900 text-white">Артикул SVI_456321478974</option>
              <option value="Артикул SVI_456321478972" className="bg-slate-900 text-white">Артикул SVI_456321478972</option>
              <option value="Артикул SVI_456321478965" className="bg-slate-900 text-white">Артикул SVI_456321478965</option>
              <option value="Артикул SVI_456321478962" className="bg-slate-900 text-white">Артикул SVI_456321478962</option>
            </select>
            <p className="text-white/60 text-sm mt-2">
              *Все Артикулы вы можете найти на сайте{' '}
              <a 
                href="https://desertdvorik.ru" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                desertdvorik.ru
              </a>
            </p>
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