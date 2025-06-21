import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import OnlineUsers from "@/components/chat/OnlineUsers";
import { OnlineUser } from "@/types/chat";

interface ChatSidebarProps {
  activeUsers: OnlineUser[];
  showUserPanel: boolean;
  onClose: () => void;
}

const ChatSidebar = ({
  activeUsers,
  showUserPanel,
  onClose,
}: ChatSidebarProps) => {
  if (!showUserPanel) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 bg-white/5 backdrop-blur-sm border-l border-white/20">
        <OnlineUsers
          count={activeUsers.length}
          users={activeUsers}
          showList={showUserPanel}
        />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed inset-0 bg-black/50 z-50 flex">
        <div className="ml-auto w-80 max-w-[80vw] bg-white/10 backdrop-blur-md h-full">
          <div className="p-4 border-b border-white/20 flex justify-between items-center">
            <h3 className="text-white font-medium">Участники</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          <OnlineUsers
            count={activeUsers.length}
            users={activeUsers}
            showList={showUserPanel}
          />
        </div>
        <div className="flex-1" onClick={onClose} />
      </div>
    </>
  );
};

export default ChatSidebar;
