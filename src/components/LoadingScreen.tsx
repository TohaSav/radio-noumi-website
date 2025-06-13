interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = "Загрузка..." }: LoadingScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/90 text-lg">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
