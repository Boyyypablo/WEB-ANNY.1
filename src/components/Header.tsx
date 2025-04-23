
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white py-3 px-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          onClick={() => navigate("/")} 
          className="cursor-pointer flex items-center space-x-5"
        >
          <img 
            src="/logo.png" 
            alt="Projeto Anny Logo" 
            className="h-16 w-16 object-contain"
            onError={(e) => {
              console.error('Logo image failed to load', e);
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <h1 className="text-anny-green text-xl md:text-2xl font-bold">Projeto Anny</h1>
        </div>
        
        <div className="hidden md:block">
          <button 
            onClick={() => navigate("/consultation")}
            className="anny-btn-primary"
          >
            Agendar Consulta
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

