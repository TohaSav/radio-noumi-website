import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface GenderFilterProps {
  selectedFilter: "all" | "male" | "female";
  onFilterChange: (filter: "all" | "male" | "female") => void;
}

export default function GenderFilter({
  selectedFilter,
  onFilterChange,
}: GenderFilterProps) {
  return (
    <div className="flex gap-2 mb-4">
      <Button
        variant={selectedFilter === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("all")}
        className="flex-1"
      >
        <Icon name="Users" size={16} className="mr-1" />
        Все
      </Button>
      <Button
        variant={selectedFilter === "male" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("male")}
        className="flex-1"
      >
        <Icon name="User" size={16} className="mr-1" />М
      </Button>
      <Button
        variant={selectedFilter === "female" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("female")}
        className="flex-1"
      >
        <Icon name="Heart" size={16} className="mr-1" />Ж
      </Button>
    </div>
  );
}
