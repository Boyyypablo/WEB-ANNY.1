
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Search, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implementar lógica de busca aqui
      console.log("Searching for:", searchQuery);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const goHome = () => {
    navigate("/");
  };

  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  return (
    <div className="min-h-screen flex bg-anny-bg">
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        w-80 lg:w-96
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <img src="/logo.png" alt="Projeto Anny" className="h-10 w-auto" />
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar no portal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2"
            />
          </form>
        </div>

        {/* Navigation Buttons */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2">
            {!isHomePage && (
              <Button variant="outline" size="sm" onClick={goBack} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={goHome} className="flex-1">
              <Home className="h-4 w-4 mr-2" />
              Início
            </Button>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          <Sidebar isMobile onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 lg:pb-0">
        {/* Top Bar with Menu Button */}
        <div className="bg-white border-b border-gray-200 p-4 lg:hidden">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
            <span className="font-medium text-gray-700">Menu</span>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Desktop Sidebar Toggle */}
        <div className="hidden lg:block fixed top-4 left-4 z-30">
          <Button variant="outline" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <Header />
        <main className="flex-1 container mx-auto px-4 pt-4">
          <Outlet />
        </main>
        <Footer />
        
        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default Layout;
