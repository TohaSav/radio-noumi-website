import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import OnlineUsers from "@/components/chat/OnlineUsers";
import { OnlineUser } from "@/types/chat";

interface ChatHeaderProps {
  activeUsers: OnlineUser[];
  showUserPanel: boolean;
  onToggleUserPanel: () => void;
}

const ChatHeader = ({
  activeUsers,
  showUserPanel,
  onToggleUserPanel,
}: ChatHeaderProps) => {
  return (
    <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-4 flex-shrink-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <OnlineUsers count={activeUsers.length} />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleUserPanel}
              className="text-white hover:bg-white/10"
            >
              <Icon name="Users" size={16} />
            </Button>
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                <Icon name="Home" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
