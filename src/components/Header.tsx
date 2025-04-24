
import { useNavigate } from "react-router-dom";
import { CartSheet } from "./CartSheet";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white py-3 px-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          onClick={() => navigate("/")} 
          className="cursor-pointer flex items-center space-x-6"
        >
          <img 
            src="/logo.png" 
            alt="Projeto Anny Logo" 
            className="h-20 w-20 object-contain"
            onError={(e) => {
              console.error('Logo image failed to load', e);
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <h1 className="text-anny-green text-4xl md:text-5xl font-bold">Projeto Anny</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <CartSheet />
          <Button
            onClick={() => navigate("/profile")}
            className="hidden md:flex items-center gap-2"
            variant="outline"
          >
            <UserRound size={20} />
            <span>Perfil</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
