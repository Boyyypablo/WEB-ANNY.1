
import { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface Medication {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem extends Medication {
  quantity: number;
}

const MedicationsPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const medications: Medication[] = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      description: "Analgésico para dores leves a moderadas",
      price: 12.50,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2830&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Ibuprofeno 400mg",
      description: "Anti-inflamatório não esteroidal",
      price: 15.90,
      image: "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?q=80&w=2787&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Omeprazol 20mg",
      description: "Protetor gástrico para acidez estomacal",
      price: 22.75,
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2669&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Dipirona 500mg",
      description: "Analgésico e antitérmico",
      price: 9.90,
      image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=2940&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Loratadina 10mg",
      description: "Anti-histamínico para alergias",
      price: 18.50,
      image: "https://images.unsplash.com/photo-1616578492900-ea5a8fc6c341?q=80&w=2386&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Amoxicilina 500mg",
      description: "Antibiótico de amplo espectro",
      price: 35.75,
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  const addToCart = (medication: Medication) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === medication.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === medication.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { ...medication, quantity: 1 }];
      }
    });
    
    toast.success(`${medication.name} adicionado ao carrinho`);
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id);
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item => 
          item.id === id 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== id);
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Medicamentos</h1>
        <button 
          className="relative p-2 bg-white rounded-full shadow-sm border border-anny-green/10"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <ShoppingCart size={24} className="text-anny-green" />
          {getCartQuantity() > 0 && (
            <span className="absolute -top-1 -right-1 bg-anny-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {getCartQuantity()}
            </span>
          )}
        </button>
      </div>

      {/* Shopping Cart */}
      {isCartOpen && (
        <div className="anny-card">
          <h2 className="text-xl font-semibold mb-4">Carrinho de Compras</h2>
          {cart.length === 0 ? (
            <p className="text-anny-green/70 text-center py-4">Seu carrinho está vazio</p>
          ) : (
            <>
              <div className="space-y-4 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-anny-green/70">R$ {item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 bg-gray-100 rounded-full"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="p-1 bg-gray-100 rounded-full"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center font-semibold mb-4">
                <span>Total:</span>
                <span>R$ {getTotalPrice().toFixed(2)}</span>
              </div>
              <button 
                className="anny-btn-primary w-full"
                onClick={() => {
                  toast.success("Compra finalizada com sucesso!");
                  setCart([]);
                  setIsCartOpen(false);
                }}
              >
                Finalizar Compra
              </button>
            </>
          )}
        </div>
      )}

      {/* Medications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medications.map(medication => (
          <div key={medication.id} className="anny-card">
            <div className="h-40 mb-4 rounded-lg overflow-hidden">
              <img 
                src={medication.image} 
                alt={medication.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg mb-1">{medication.name}</h3>
            <p className="text-anny-green/70 text-sm mb-3">{medication.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">R$ {medication.price.toFixed(2)}</span>
              <button 
                className="anny-btn-primary flex items-center gap-2"
                onClick={() => addToCart(medication)}
              >
                <ShoppingCart size={16} />
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationsPage;
