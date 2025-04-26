import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartSheet } from "./CartSheet";
import { ChatDialog } from "./ChatDialog";
import { MessageCircle } from "lucide-react";
import NotificationsDialog from "./NotificationsDialog";
import AccessibilityControls from "./AccessibilityControls";

const Header = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);

  const updateCartCount = () => {
    try {
      const cartJson = localStorage.getItem("cart");
      if (cartJson) {
        const cart = JSON.parse(cartJson);
        const count = cart.reduce((total: number, item: any) => total + item.quantity, 0);
        setCartItemCount(count);
      }
    } catch (error) {
      console.error("Error updating cart count:", error);
    }
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return <header className="sticky top-0 z-50 w-full bg-white shadow-md">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-anny-green font-bold flex items-center gap-3">
        <img src="/logo.png" alt="Anny" className="h-12 w-auto" />
        <div className="hidden md:flex flex-col">
          <span className="text-xl">Projeto Anny</span>
          <span className="text-sm text-anny-green/80">Saúde e bem-estar ao seu alcance</span>
        </div>
      </Link>
      <div className="flex items-center gap-1 md:gap-4">
        <AccessibilityControls />
        <NotificationsDialog />
        <CartSheet />
        <button onClick={() => setChatOpen(true)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
          <MessageCircle className="h-5 w-5" />
        </button>
        <ChatDialog open={chatOpen} onOpenChange={setChatOpen} initialContext="atendimento" />
      </div>
    </div>
  </header>;
};

export default Header;
