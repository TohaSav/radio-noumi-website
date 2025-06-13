interface GenderFilterProps {
  selectedFilter: "all" | "male" | "female";
  onFilterChange: (filter: "all" | "male" | "female") => void;
}

const GenderFilter = ({
  selectedFilter,
  onFilterChange,
}: GenderFilterProps) => {
  const filters = [
    { value: "all" as const, label: "Все", color: "bg-pink-500" },
    { value: "male" as const, label: "Мужчины", color: "bg-blue-500" },
    { value: "female" as const, label: "Женщины", color: "bg-pink-500" },
  ];

  return (
    <div className="flex gap-2 mb-4 bg-white/90 p-2 rounded-lg shadow-sm">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedFilter === filter.value
              ? `${filter.color} text-white`
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default GenderFilter;
