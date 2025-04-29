
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, ShoppingCart, Calendar, Activity, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";

const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg md:shadow-none z-10 lg:hidden">
        <div className="flex justify-between items-center py-3 px-6">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <Home size={24} />
            <span className="text-xs mt-1">Início</span>
          </Link>
          
          <Link to="/medications" className={`nav-link ${isActive('/medications') ? 'active' : ''}`}>
            <ShoppingCart size={24} />
            <span className="text-xs mt-1">Medicamentos</span>
          </Link>
          
          <Link to="/consultation" className={`nav-link ${isActive('/consultation') ? 'active' : ''}`}>
            <Calendar size={24} />
            <span className="text-xs mt-1">Consultas</span>
          </Link>
          
          <Link to="/symptoms" className={`nav-link ${isActive('/symptoms') ? 'active' : ''}`}>
            <Activity size={24} />
            <span className="text-xs mt-1">Sintomas</span>
          </Link>
          
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="nav-link h-auto px-0">
                <Menu size={24} />
                <span className="text-xs mt-1">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <Sidebar isMobile onClose={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      
      <div className="hidden lg:block">
        <Sidebar />
      </div>
    </>
  );
};

export default Navigation;
