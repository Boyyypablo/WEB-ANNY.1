
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { debouncedToast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationsList } from "./notifications/NotificationsList";
import { NotificationsHeader } from "./notifications/NotificationsHeader";
import type { Notification } from "./notifications/NotificationItem";

const NotificationsDialog = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    try {
      const storageKey = user ? `notifications_${user.id}` : 'notifications';
      const savedNotifications = localStorage.getItem(storageKey);
      
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      } else {
        const welcomeNotif = [{
          id: 1,
          title: "Boas-vindas",
          message: "Bem-vindo ao Projeto Anny! Estamos felizes em te ter conosco.",
          type: "system" as const,
          date: "Agora",
          read: false
        }];
        setNotifications(welcomeNotif);
        localStorage.setItem(storageKey, JSON.stringify(welcomeNotif));
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  }, [user]);

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    );
    
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    debouncedToast.success("Todas as notificações foram marcadas como lidas");
  };

  const deleteNotification = (id: number) => {
    const updatedNotifications = notifications.filter(notif => notif.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const clearAllNotifications = () => {
    const storageKey = user ? `notifications_${user.id}` : 'notifications';
    setNotifications([]);
    localStorage.setItem(storageKey, JSON.stringify([]));
    debouncedToast.success("Todas as notificações foram removidas");
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    setOpen(false);
    
    if (notification.actionPath) {
      navigate(notification.actionPath);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-4">
        <NotificationsHeader
          unreadCount={unreadCount}
          hasNotifications={notifications.length > 0}
          onMarkAllAsRead={markAllAsRead}
          onClearAll={clearAllNotifications}
        />
        
        <div className="max-h-[60vh] overflow-y-auto pr-1 mt-2">
          <NotificationsList
            notifications={notifications}
            onDelete={deleteNotification}
            onClick={handleNotificationClick}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsDialog;
