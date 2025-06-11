const OrderButton = () => {
  const handleOrderClick = () => {
    const whatsappUrl = `https://wa.me/79049808275?text=${encodeURIComponent("Привет! Хочу заказать свою песню на Radio Noumi")}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="text-center">
      <button
        onClick={handleOrderClick}
        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse"
      >
        🎵 Заказать свою песню
      </button>
      <p className="text-gray-600 mt-2 text-sm">Свяжитесь с нами в WhatsApp</p>
    </div>
  );
};

export default OrderButton;
