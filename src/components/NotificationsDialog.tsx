import { useState, useEffect } from "react";
import { Bell, Calendar, ShoppingCart, FileText, X, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { debouncedToast } from "@/components/ui/sonner";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "appointment" | "order" | "exam" | "system";
  date: string;
  read: boolean;
  actionPath?: string;
}

const NotificationsDialog = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  
  const exampleNotifications: Notification[] = [
    {
      id: 1,
      title: "Consulta agendada",
      message: "Lembrete: Sua consulta com Dra. Fernanda Lima está agendada para amanhã às 14:00",
      type: "appointment",
      date: "10 minutos atrás",
      read: false,
      actionPath: "/consultation"
    },
    {
      id: 2,
      title: "Pedido enviado",
      message: "Seu pedido #12345 foi enviado e está a caminho. Acompanhe o status!",
      type: "order",
      date: "2 horas atrás",
      read: false,
      actionPath: "/orders"
    },
    {
      id: 3,
      title: "Novo resultado de exame",
      message: "O resultado do seu exame de sangue já está disponível para visualização.",
      type: "exam",
      date: "1 dia atrás",
      read: true,
      actionPath: "/history"
    },
    {
      id: 4,
      title: "Boas-vindas",
      message: "Bem-vindo ao Projeto Anny! Estamos felizes em te ter conosco.",
      type: "system",
      date: "3 dias atrás",
      read: true
    }
  ];

  useEffect(() => {
    try {
      const savedNotifications = localStorage.getItem('notifications');
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      } else {
        setNotifications(exampleNotifications);
        localStorage.setItem('notifications', JSON.stringify(exampleNotifications));
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  }, []);

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
    setNotifications([]);
    localStorage.setItem('notifications', JSON.stringify([]));
    debouncedToast.success("Todas as notificações foram removidas");
  };

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Notificações</span>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="text-sm text-anny-green hover:text-anny-green/80"
                >
                  Marcar todas como lidas
                </Button>
              )}
              {notifications.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllNotifications}
                  className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Limpar todas
                </Button>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="max-h-[60vh] overflow-y-auto pr-1">
          {notifications.length > 0 ? (
            <div className="space-y-2">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg flex items-start gap-3 cursor-pointer transition-colors ${
                    notification.read ? 'bg-gray-50' : 'bg-anny-green/5 hover:bg-anny-green/10'
                  }`}
                  onClick={() => handleNotificationClick(notification)}
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
                          deleteNotification(notification.id);
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
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">Não há notificações</h3>
              <p className="text-sm text-gray-500 max-w-xs mx-auto mt-1">
                Suas notificações sobre consultas, pedidos e exames aparecerão aqui.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsDialog;
