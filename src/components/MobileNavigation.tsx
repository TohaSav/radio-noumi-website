import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useCapacitor } from "@/hooks/useCapacitor";
import { ImpactStyle } from "@capacitor/haptics";

const MobileNavigation = () => {
  const location = useLocation();
  const { playHaptic } = useCapacitor();

  const handleNavClick = () => {
    playHaptic(ImpactStyle.Light);
  };

  const navItems = [
    { path: "/", icon: "Radio", label: "Радио" },
    { path: "/reels", icon: "Play", label: "Reels" },
    { path: "/dating", icon: "Heart", label: "Чат" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 z-50">
      <div className="flex justify-around items-center py-2 px-4 safe-area-bottom">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-purple-600 bg-purple-50 scale-105"
                  : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
              }`}
            >
              <Icon
                name={item.icon as any}
                size={24}
                className={isActive ? "text-purple-600" : "text-gray-600"}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;
