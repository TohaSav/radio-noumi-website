const OrderButton = () => {
  const handleOrderClick = () => {
    const whatsappUrl = `https://wa.me/79049808275?text=${encodeURIComponent("Привет! Хочу заказать свою песню на Radio Noumi")}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="text-center">
      <button
        onClick={handleOrderClick}
        className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-110 transition-all duration-500 border border-white/20 backdrop-blur-sm relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <span className="relative z-10">🎵 Заказать свою песню</span>
      </button>
      <p className="text-white mt-2 text-sm">Свяжитесь с нами в WhatsApp</p>
    </div>
  );
};

export default OrderButton;
