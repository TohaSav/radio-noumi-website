import Icon from "@/components/ui/icon";

interface OnlineUsersProps {
  count: number;
  users?: Array<{ id: string; name: string; avatar: string }>;
  showList?: boolean;
}

const OnlineUsers = ({ count, users = [], showList }: OnlineUsersProps) => {
  const demoUsers = [
    {
      name: "Алекс",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Мария",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Дмитрий",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Анна",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Михаил",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
  ];

  if (!showList) {
    return (
      <div className="flex items-center gap-2 text-white">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">{count} в сети</span>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center gap-2 text-white mb-4">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">{count} в сети</span>
        </div>

        <div className="space-y-3">
          {users.slice(0, 8).map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 hover:bg-white/5 rounded-lg p-2 transition-colors cursor-pointer"
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <span className="text-white text-sm font-medium">
                {user.name}
              </span>
            </div>
          ))}

          {count > 8 && (
            <div className="text-center py-4">
              <span className="text-gray-400 text-xs">
                и ещё {count - 8} участников...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnlineUsers;
