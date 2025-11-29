import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface Wish {
  id: string;
  name: string;
  address: string;
  phone: string;
  wish: string;
  position: { x: number; y: number };
  createdAt: string;
}

const API_URL = 'https://functions.poehali.dev/2a670543-b845-4d66-ba79-3530a25cbf2e';

const WishTreeAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);

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

  const filteredWishes = wishes.filter(wish =>
    wish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wish.phone.includes(searchTerm) ||
    wish.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wish.wish.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Навигация */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/wish-tree")}
            className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors"
          >
            <Icon name="ArrowLeft" size={24} />
            <span className="font-medium">К ёлке желаний</span>
          </button>

          <h1 className="text-white font-bold text-xl flex items-center gap-2">
            🎄 Админ-панель - Все желания
          </h1>

          <div className="w-32"></div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Статистика */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-white/60 text-sm mb-2">Всего желаний</div>
              <div className="text-white text-3xl font-bold">{wishes.length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-white/60 text-sm mb-2">Сегодня</div>
              <div className="text-white text-3xl font-bold">
                {wishes.filter(w => {
                  const today = new Date().toDateString();
                  return new Date(w.createdAt).toDateString() === today;
                }).length}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-white/60 text-sm mb-2">Найдено</div>
              <div className="text-white text-3xl font-bold">{filteredWishes.length}</div>
            </div>
          </div>

          {/* Поиск */}
          <div className="mb-6">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Поиск по имени, телефону, адресу или желанию..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Таблица желаний */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-white text-xl">Загрузка данных... 🎄</div>
            </div>
          ) : filteredWishes.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-12 border border-white/20 text-center">
              <div className="text-white/60 text-lg">
                {searchTerm ? "Желания не найдены" : "Пока нет желаний"}
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-white/80 font-semibold text-sm">Дата</th>
                      <th className="px-6 py-4 text-left text-white/80 font-semibold text-sm">Имя</th>
                      <th className="px-6 py-4 text-left text-white/80 font-semibold text-sm">Телефон</th>
                      <th className="px-6 py-4 text-left text-white/80 font-semibold text-sm">Адрес</th>
                      <th className="px-6 py-4 text-left text-white/80 font-semibold text-sm">Желание</th>
                      <th className="px-6 py-4 text-center text-white/80 font-semibold text-sm">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredWishes.map((wish) => (
                      <tr key={wish.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-white/70 text-sm whitespace-nowrap">
                          {formatDate(wish.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-white font-medium">{wish.name}</td>
                        <td className="px-6 py-4 text-white/70">{wish.phone}</td>
                        <td className="px-6 py-4 text-white/70 max-w-xs truncate">{wish.address}</td>
                        <td className="px-6 py-4 text-white/70 max-w-sm truncate">{wish.wish}</td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => setSelectedWish(wish)}
                            className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all inline-flex items-center gap-2"
                          >
                            <Icon name="Eye" size={16} />
                            Подробнее
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно подробностей */}
      {selectedWish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl border-2 border-white/20 shadow-2xl max-w-2xl w-full p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                🎁 Детали желания
              </h2>
              <button
                onClick={() => setSelectedWish(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="space-y-4 relative z-10">
              <div>
                <label className="text-white/60 text-sm">Дата создания</label>
                <div className="text-white text-lg font-medium">{formatDate(selectedWish.createdAt)}</div>
              </div>

              <div>
                <label className="text-white/60 text-sm">Имя</label>
                <div className="text-white text-lg font-medium">{selectedWish.name}</div>
              </div>

              <div>
                <label className="text-white/60 text-sm">Телефон</label>
                <div className="text-white text-lg font-medium">{selectedWish.phone}</div>
              </div>

              <div>
                <label className="text-white/60 text-sm">Адрес</label>
                <div className="text-white text-lg">{selectedWish.address}</div>
              </div>

              <div>
                <label className="text-white/60 text-sm">Желание</label>
                <div className="text-white text-lg p-4 bg-white/5 rounded-lg border border-white/10 mt-2">
                  {selectedWish.wish}
                </div>
              </div>

              <div>
                <label className="text-white/60 text-sm">Позиция на ёлке</label>
                <div className="text-white text-lg">
                  X: {selectedWish.position.x}, Y: {selectedWish.position.y}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedWish(null)}
              className="mt-6 w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all relative z-10"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishTreeAdmin;
