
import { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { debouncedToast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";

export function CartSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    getTotalPrice, 
    getItemsCount 
  } = useCartStore();

  const handleCheckoutClick = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  const handleRemoveItem = (itemId: number) => {
    removeItem(itemId);
    debouncedToast.success("Item removido do carrinho");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {getItemsCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-anny-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {getItemsCount()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-sm sm:max-w-md md:max-w-md">
        <SheetHeader>
          <SheetTitle>Carrinho de Compras</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col h-[calc(100vh-10rem)]">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground">Seu carrinho está vazio</p>
          ) : (
            <>
              <div className="flex-1 overflow-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        R$ {item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-2"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 mt-4 sticky bottom-0 bg-white">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Total:</span>
                  <span className="font-medium text-anny-green">R$ {getTotalPrice().toFixed(2)}</span>
                </div>
                <Button 
                  className="w-full bg-anny-green hover:bg-anny-green/90" 
                  onClick={handleCheckoutClick}
                >
                  Finalizar Compra
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
