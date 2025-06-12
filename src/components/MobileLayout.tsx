import { ReactNode } from "react";
import MobileNavigation from "@/components/MobileNavigation";
import { useCapacitor } from "@/hooks/useCapacitor";

interface MobileLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
}

const MobileLayout = ({
  children,
  showNavigation = true,
}: MobileLayoutProps) => {
  const { isNative } = useCapacitor();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Статус бар отступ для мобильных устройств */}
      {isNative && <div className="h-safe-area-top bg-gray-900" />}

      {/* Основной контент */}
      <div className={`flex-1 ${showNavigation ? "pb-20" : ""}`}>
        {children}
      </div>

      {/* Мобильная навигация */}
      {showNavigation && <MobileNavigation />}
    </div>
  );
};

export default MobileLayout;
