
import { Bell } from "lucide-react";
import { NotificationItem, type Notification } from "./NotificationItem";

interface NotificationsListProps {
  notifications: Notification[];
  onDelete: (id: number) => void;
  onClick: (notification: Notification) => void;
}

export const NotificationsList = ({ notifications, onDelete, onClick }: NotificationsListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-8">
        <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Não há notificações</h3>
        <p className="text-sm text-gray-500 max-w-xs mx-auto">
          Suas notificações sobre consultas, pedidos e exames aparecerão aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDelete={onDelete}
          onClick={onClick}
        />
      ))}
    </div>
  );
};
