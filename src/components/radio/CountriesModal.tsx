import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCountriesStats } from "@/hooks/useCountriesStats";

interface CountriesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CountriesModal({
  open,
  onOpenChange,
}: CountriesModalProps) {
  const { countries } = useCountriesStats();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            География слушателей
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {countries.map((country, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 hover:from-purple-100 hover:via-pink-100 hover:to-blue-100 rounded-lg transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{country.flag}</span>
                <span className="font-medium text-gray-900">
                  {country.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, country.percentage)}%` }}
                  />
                </div>
                <span className="font-bold text-purple-600 min-w-[3rem] text-right">
                  {country.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}