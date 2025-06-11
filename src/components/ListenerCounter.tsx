interface ListenerCounterProps {
  count: number;
}

const ListenerCounter = ({ count }: ListenerCounterProps) => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Сейчас нас слушают</h3>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-3xl font-bold font-montserrat">
            {count.toLocaleString()}
          </span>
          <span className="text-xl">человек</span>
        </div>
      </div>
    </div>
  );
};

export default ListenerCounter;
