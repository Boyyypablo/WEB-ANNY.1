
import { useState, useEffect } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { debouncedToast } from "@/components/ui/sonner";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
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

  useEffect(() => {
    // Carregar favoritos do localStorage
    try {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        const favoriteItems = JSON.parse(savedFavorites);
        const favoriteIds = favoriteItems.map((item: Medication) => item.id);
        setFavorites(favoriteIds);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  }, []);

  const addToCart = (medication: Medication) => {
    try {
      const savedCart = localStorage.getItem('cart');
      const cart = savedCart ? JSON.parse(savedCart) : [];
      
      const existingItem = cart.find((item: any) => item.id === medication.id);
      
      let newCart;
      if (existingItem) {
        newCart = cart.map((item: any) => 
          item.id === medication.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...cart, { ...medication, quantity: 1 }];
      }
      
      localStorage.setItem('cart', JSON.stringify(newCart));
      
      // Dispatch events to notify components of cart updates
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      
      debouncedToast.success(`${medication.name} adicionado ao carrinho`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      debouncedToast.error("Erro ao adicionar ao carrinho");
    }
  };

  const toggleFavorite = (medication: Medication) => {
    try {
      const isFavorite = favorites.includes(medication.id);
      
      // Recuperar favoritos atuais
      const savedFavorites = localStorage.getItem('favorites');
      const currentFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];
      
      let updatedFavorites;
      
      if (isFavorite) {
        // Remover dos favoritos
        updatedFavorites = currentFavorites.filter((item: Medication) => item.id !== medication.id);
        debouncedToast.success(`${medication.name} removido dos favoritos`);
      } else {
        // Adicionar aos favoritos
        updatedFavorites = [...currentFavorites, medication];
        debouncedToast.success(`${medication.name} adicionado aos favoritos`);
      }
      
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
      // Atualizar estado de favoritos locais
      setFavorites(updatedFavorites.map((item: Medication) => item.id));
    } catch (error) {
      console.error("Error toggling favorite:", error);
      debouncedToast.error("Erro ao atualizar favoritos");
    }
  };

  const filteredMedications = medications.filter(medication =>
    medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medication.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Medicamentos</h1>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Buscar medicamentos..." 
            className="anny-input flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate("/favorites")}
          >
            <Heart className="w-5 h-5" />
            <span className="hidden sm:inline">Favoritos</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMedications.map(medication => (
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
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  size="icon"
                  className={favorites.includes(medication.id) 
                    ? "text-red-500 hover:text-red-600" 
                    : "text-gray-400 hover:text-red-400"}
                  onClick={() => toggleFavorite(medication)}
                >
                  <Heart className={favorites.includes(medication.id) ? "fill-red-500" : ""} size={16} />
                </Button>
                <Button 
                  className="anny-btn-primary flex items-center gap-2"
                  onClick={() => addToCart(medication)}
                >
                  <ShoppingCart size={16} />
                  Comprar
                </Button>
              </div>
            </div>
          </div>
        ))}

        {filteredMedications.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Nenhum medicamento encontrado</h3>
            <p className="mt-2 text-sm text-gray-500">
              Tente ajustar sua pesquisa ou verifique se digitou corretamente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationsPage;
