
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartSheet } from "./CartSheet";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  
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
          <h1 className="text-anny-green text-xl md:text-2xl font-bold">Projeto Anny</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <CartSheet />
          <button 
            onClick={() => navigate("/consultation")}
            className="anny-btn-primary hidden md:block"
          >
            Agendar Consulta
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
