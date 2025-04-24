import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Link } from "react-router-dom";

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
      name: "Extrato de Cannabis Sativa 36,76mg/ml – Ease Labs Pharma (30ml)",
      description: "Produto fitoterápico com 36,76 mg/ml de CBD, indicado para auxiliar no tratamento de condições como ansiedade e dores crônicas.",
      price: 375.00,
      image: "/lovable-uploads/12699b83-589c-4563-8e2e-0ad1d7f31f83.png"
    },
    {
      id: 2,
      name: "Canabidiol Herbarium 200mg/ml (30ml)",
      description: "Solução oral com alta concentração de CBD, indicada para casos de epilepsia refratária e outras condições neurológicas.",
      price: 2210.69,
      image: "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png"
    },
    {
      id: 3,
      name: "Canabidiol 20mg/ml – Prati-Donaduzzi (30ml)",
      description: "Solução oral com 20 mg/ml de CBD, indicada para auxiliar no tratamento de epilepsia e outras condições neurológicas.",
      price: 92.79,
      image: "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png"
    },
    {
      id: 4,
      name: "Canabidiol 79,14mg/ml – GreenCare (30ml)",
      description: "Solução oral com 79,14 mg/ml de CBD, indicada para tratamento de dores crônicas e distúrbios neurológicas.",
      price: 994.42,
      image: "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png"
    },
    {
      id: 5,
      name: "Óleo CBD 1000mg – Naturecan (30ml)",
      description: "Óleo com 1000 mg de CBD, indicado para auxiliar no alívio de sintomas de ansiedade e estresse.",
      price: 499.00,
      image: "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png"
    },
    {
      id: 6,
      name: "Óleo de Cannabis – Abrace Esperança (30ml)",
      description: "Óleo de CBD com preço acessível, voltado para pacientes com dificuldades financeiras, indicado para diversas condições neurológicas.",
      price: 79.00,
      image: "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png"
    }
  ];

  const addToCart = (medication: Medication) => {
    const savedCart = localStorage.getItem('cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    
    const existingItem = cart.find((item: any) => item.id === medication.id);
    
    if (existingItem) {
      const newCart = cart.map((item: any) => 
        item.id === medication.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(newCart));
    } else {
      const newCart = [...cart, { ...medication, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
    
    toast.success(`${medication.name} adicionado ao carrinho`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Medicamentos</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medications.map(medication => (
          <div key={medication.id} className="anny-card">
            <Link to={`/medications/${medication.id}`} className="block">
              <div className="h-40 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={medication.image} 
                  alt={medication.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <h3 className="font-semibold text-lg mb-1 hover:text-anny-green transition-colors">
                {medication.name}
              </h3>
            </Link>
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
