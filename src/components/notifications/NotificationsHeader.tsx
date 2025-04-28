
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
    <DialogTitle className="flex justify-between items-center">
      <span>Notificações</span>
      <div className="flex gap-2">
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onMarkAllAsRead}
            className="text-sm text-anny-green hover:text-anny-green/80"
          >
            Marcar todas como lidas
          </Button>
        )}
        {hasNotifications && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Limpar todas
          </Button>
        )}
      </div>
    </DialogTitle>
  );
};
