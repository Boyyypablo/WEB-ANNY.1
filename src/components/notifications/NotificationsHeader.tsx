
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";

interface NotificationsHeaderProps {
  unreadCount: number;
  hasNotifications: boolean;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export const NotificationsHeader = ({
  unreadCount,
  hasNotifications,
  onMarkAllAsRead,
  onClearAll
}: NotificationsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-3 px-1">
      <DialogTitle className="text-lg">Notificações</DialogTitle>
      <div className="flex gap-2 items-center">
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onMarkAllAsRead}
            className="text-xs text-anny-green hover:text-anny-green/80 h-8 px-2"
          >
            Marcar todas como lidas
          </Button>
        )}
        {hasNotifications && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 h-8 px-2"
          >
            <Trash2 className="w-3 h-3" />
            Limpar
          </Button>
        )}
      </div>
    </div>
  );
};
