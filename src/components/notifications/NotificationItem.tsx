
import { Bell, Calendar, FileText, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: "appointment" | "order" | "exam" | "system";
  date: string;
  read: boolean;
  actionPath?: string;
}

interface NotificationItemProps {
  notification: Notification;
  onDelete: (id: number) => void;
  onClick: (notification: Notification) => void;
}

export const NotificationItem = ({ notification, onDelete, onClick }: NotificationItemProps) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'order':
        return <ShoppingCart className="w-5 h-5 text-green-500" />;
      case 'exam':
        return <FileText className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div 
      className={`p-3 rounded-lg flex items-start gap-3 cursor-pointer transition-colors ${
        notification.read ? 'bg-gray-50' : 'bg-anny-green/5 hover:bg-anny-green/10'
      }`}
      onClick={() => onClick(notification)}
    >
      <div className="mt-1">
        {getNotificationIcon(notification.type)}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className={`text-sm font-medium ${!notification.read ? 'text-anny-green' : 'text-gray-700'}`}>
            {notification.title}
          </h4>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notification.id);
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {notification.message}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {notification.date}
        </p>
      </div>
    </div>
  );
};
