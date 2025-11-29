import Icon from "@/components/ui/icon";

interface InfoModalProps {
  onClose: () => void;
}

const InfoModal = ({ onClose }: InfoModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-2xl border-2 border-white/20 shadow-2xl max-w-md w-full p-8 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>

        {/* Заголовок */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🎂 Десертный дворик
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Контент */}
        <div className="space-y-4 relative z-10">
          <p className="text-white/90 text-base leading-relaxed">
            Десертный дворик — это домашняя кондитерская компания, которая предлагает для вас свежую и вкусную выпечку.
          </p>

          <p className="text-white/90 text-base leading-relaxed">
            Вы можете повесить на Ёлку своё желание, выбрав товары на нашем сайте:
          </p>

          <a
            href="http://desertdvorik.ru/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-pink-500/50 text-center"
          >
            🍰 Перейти на сайт
          </a>

          <div className="pt-4 text-center">
            <p className="text-white/60 text-sm">
              ✨ Загадайте желание и оно обязательно сбудется! ✨
            </p>
          </div>
        </div>

        {/* Кнопка закрыть */}
        <button
          onClick={onClose}
          className="mt-6 w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all relative z-10"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
