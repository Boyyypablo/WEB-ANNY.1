import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, ShoppingCart, History, UserRound, Home, Activity, 
  Thermometer, FileText, BookOpen, Heart, Gift, MessagesSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label, isActive, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
      isActive 
        ? "bg-anny-green text-white" 
        : "text-anny-green hover:bg-anny-green/10"
    )}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobile = false, onClose }) => {
  const location = useLocation();
  const { session } = useAuth();
  const isActive = (path: string) => location.pathname === path;
  
  const handleClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <aside className={cn(
      "flex flex-col bg-white border-r border-gray-100 h-full overflow-y-auto",
      isMobile ? "w-full p-4" : "w-64 py-6 px-3 hidden lg:flex"
    )}>
      {isMobile && (
        <div className="flex items-center justify-between mb-6">
          <img src="/logo.png" alt="Projeto Anny" className="h-10 w-auto" />
          <Button variant="ghost" onClick={onClose}>
            <span className="sr-only">Fechar</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </Button>
        </div>
      )}
      
      <div className="space-y-1">
        <NavLink 
          to="/home" 
          icon={<Home size={20} />} 
          label="Início" 
          isActive={isActive("/home") || isActive("/")} 
          onClick={handleClick}
        />
        
        <NavLink 
          to="/consultation" 
          icon={<Calendar size={20} />} 
          label="Consultas" 
          isActive={isActive("/consultation")} 
          onClick={handleClick}
        />
        
        <NavLink 
          to="/medications" 
          icon={<ShoppingCart size={20} />} 
          label="Medicamentos" 
          isActive={isActive("/medications")} 
          onClick={handleClick}
        />
        
        <NavLink 
          to="/history" 
          icon={<History size={20} />} 
          label="Histórico" 
          isActive={isActive("/history")} 
          onClick={handleClick}
        />
        
        <NavLink 
          to="/symptoms" 
          icon={<Activity size={20} />} 
          label="Sintomas" 
          isActive={isActive("/symptoms")} 
          onClick={handleClick}
        />

        <NavLink 
          to="/symptom-diary" 
          icon={<BookOpen size={20} />} 
          label="Diário de Sintomas" 
          isActive={isActive("/symptom-diary")} 
          onClick={handleClick}
        />
        
        <NavLink 
          to="/health-devices" 
          icon={<Thermometer size={20} />} 
          label="Dispositivos" 
          isActive={isActive("/health-devices")} 
          onClick={handleClick}
        />
        
        <NavLink 
          to="/prescription-scanner" 
          icon={<FileText size={20} />} 
          label="Receitas" 
          isActive={isActive("/prescription-scanner")} 
          onClick={handleClick}
        />
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="space-y-1">
          <NavLink 
            to="/blog" 
            icon={<MessagesSquare size={20} />} 
            label="Blog" 
            isActive={isActive("/blog")} 
            onClick={handleClick}
          />
          
          <NavLink 
            to="/favorites" 
            icon={<Heart size={20} />} 
            label="Favoritos" 
            isActive={isActive("/favorites")} 
            onClick={handleClick}
          />
          
          <NavLink 
            to="/promotions" 
            icon={<Gift size={20} />} 
            label="Promoções" 
            isActive={isActive("/promotions")} 
            onClick={handleClick}
          />
          
          <NavLink 
            to="/profile" 
            icon={<UserRound size={20} />} 
            label="Perfil" 
            isActive={isActive("/profile")} 
            onClick={handleClick}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
