import { Calendar, ShoppingCart, History, UserRound, Home, Activity, Thermometer, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg md:shadow-none md:relative md:top-0 md:w-auto md:ml-6 z-10">
    <div className="flex justify-between items-center py-3 px-6 md:px-12">
      <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
        <Home size={24} />
        <span className="text-xs md:text-sm mt-1">Início</span>
      </Link>
      
      <Link to="/consultation" className={`nav-link ${isActive('/consultation') ? 'active' : ''}`}>
        <Calendar size={24} />
        <span className="text-xs md:text-sm mt-1">Consultas</span>
      </Link>
      
      <Link to="/medications" className={`nav-link ${isActive('/medications') ? 'active' : ''}`}>
        <ShoppingCart size={24} />
        <span className="text-xs md:text-sm mt-1">Medicamentos</span>
      </Link>
      
      <Link to="/history" className={`nav-link ${isActive('/history') ? 'active' : ''}`}>
        <History size={24} />
        <span className="text-xs md:text-sm mt-1">Histórico</span>
      </Link>
      
      <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
        <UserRound size={24} />
        <span className="text-xs md:text-sm mt-1">Perfil</span>
      </Link>
      
      <Link to="/symptoms" className={`nav-link ${isActive('/symptoms') ? 'active' : ''}`}>
        <Activity size={24} />
        <span className="text-xs md:text-sm mt-1">Sintomas</span>
      </Link>
      
      <Link to="/health-devices" className={`nav-link ${isActive('/health-devices') ? 'active' : ''}`}>
        <Thermometer size={24} />
        <span className="text-xs md:text-sm mt-1">Dispositivos</span>
      </Link>
      
      <Link to="/prescription-scanner" className={`nav-link ${isActive('/prescription-scanner') ? 'active' : ''}`}>
        <FileText size={24} />
        <span className="text-xs md:text-sm mt-1">Receitas</span>
      </Link>
    </div>
  </nav>;
};

export default Navigation;
