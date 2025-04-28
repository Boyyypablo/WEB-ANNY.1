
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, Lock, Settings, LogOut, CreditCard, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

interface ProfileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileNavigation: React.FC<ProfileNavigationProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <div className="anny-card p-0 overflow-hidden">
      <nav className="flex flex-col">
        <button
          className={`flex items-center gap-3 px-4 py-3 hover:bg-anny-green-light transition-colors ${activeTab === 'personal' ? 'bg-anny-green-light' : ''}`}
          onClick={() => setActiveTab("personal")}
        >
          <UserRound size={20} />
          <span>Dados Pessoais</span>
        </button>
        <button
          className={`flex items-center gap-3 px-4 py-3 hover:bg-anny-green-light transition-colors ${activeTab === 'security' ? 'bg-anny-green-light' : ''}`}
          onClick={() => setActiveTab("security")}
        >
          <Lock size={20} />
          <span>Segurança</span>
        </button>
        <button
          className={`flex items-center gap-3 px-4 py-3 hover:bg-anny-green-light transition-colors ${activeTab === 'payment' ? 'bg-anny-green-light' : ''}`}
          onClick={() => setActiveTab("payment")}
        >
          <CreditCard size={20} />
          <span>Pagamento</span>
        </button>
        <button
          className={`flex items-center gap-3 px-4 py-3 hover:bg-anny-green-light transition-colors ${activeTab === 'settings' ? 'bg-anny-green-light' : ''}`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings size={20} />
          <span>Configurações</span>
        </button>
        <button
          className="flex items-center gap-3 px-4 py-3 hover:bg-anny-green-light transition-colors"
          onClick={() => navigate("/orders")}
        >
          <Package size={20} />
          <span>Meus Pedidos</span>
        </button>
      </nav>
      <div className="border-t">
        <button
          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors w-full"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileNavigation;
