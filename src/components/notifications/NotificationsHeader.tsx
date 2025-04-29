
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
    <div className="flex flex-col mb-4 px-1">
      <DialogTitle className="text-xl font-medium text-center text-anny-green mb-3">
        Notificações
      </DialogTitle>
      
      {(unreadCount > 0 || hasNotifications) && (
        <div className="flex justify-between items-center">
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onMarkAllAsRead}
              className="text-xs text-anny-green hover:text-anny-green/80 h-7 px-2"
            >
              Marcar todas como lidas
            </Button>
          )}
          {hasNotifications && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 h-7 px-2 ml-auto"
            >
              <Trash2 className="w-3 h-3" />
              Limpar todas
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
