import { Wish } from "@/pages/WishTree";
import DedMoroz from "./DedMoroz";
import ChristmasTree from "./ChristmasTree";
import Snegurochka from "./Snegurochka";

interface WishTreeComponentProps {
  wishes: Wish[];
  onAddWish: (position: { x: number; y: number }) => void;
}

const WishTreeComponent = ({ wishes, onAddWish }: WishTreeComponentProps) => {
  const branchPositions = [
    { x: 50, y: 20 },
    { x: 35, y: 30 },
    { x: 65, y: 30 },
    { x: 30, y: 42 },
    { x: 50, y: 42 },
    { x: 70, y: 42 },
    { x: 25, y: 54 },
    { x: 45, y: 54 },
    { x: 55, y: 54 },
    { x: 75, y: 54 },
    { x: 20, y: 66 },
    { x: 35, y: 66 },
    { x: 50, y: 66 },
    { x: 65, y: 66 },
    { x: 80, y: 66 },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-end justify-center gap-8">
        <DedMoroz />

        <ChristmasTree 
          wishes={wishes} 
          onAddWish={onAddWish} 
          branchPositions={branchPositions}
        />

        <Snegurochka />
      </div>

      <div className="mt-8 text-center">
        <p className="text-white/80 text-lg">
          🎁 Повешено желаний: <span className="font-bold text-2xl text-yellow-300">{wishes.length}</span> / {branchPositions.length}
        </p>
      </div>
    </div>
  );
};

export default WishTreeComponent;
