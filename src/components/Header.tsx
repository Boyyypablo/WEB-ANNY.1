
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartSheet } from "./CartSheet";
import { ChatDialog } from "./ChatDialog";
import NotificationsDialog from "./NotificationsDialog";

const Header = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

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
    // Initial cart count
    updateCartCount();
    
    // Listen for cart updates
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);
    
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return <header className="sticky top-0 z-50 w-full bg-white shadow-md">
    <div className="container mx-auto px-4 py-2 flex justify-between items-center">
      <Link to="/" className="text-anny-green font-bold flex items-center gap-2">
        <img src="/logo.png" alt="Anny" className="h-10 w-auto" />
        <span className="text-xl hidden md:block">Anny</span>
      </Link>
      <div className="flex items-center gap-1 md:gap-4">
        <NotificationsDialog />
        <CartSheet itemCount={cartItemCount} />
        <ChatDialog />
      </div>
    </div>
  </header>;
}

export default Header;
