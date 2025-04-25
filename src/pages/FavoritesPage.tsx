
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { debouncedToast } from "@/components/ui/sonner";
import { Link } from "react-router-dom";

interface Medication {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar favoritos do localStorage
    try {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFromFavorites = (medicationId: number) => {
    try {
      const updatedFavorites = favorites.filter(item => item.id !== medicationId);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      debouncedToast.success("Item removido dos favoritos");
    } catch (error) {
      console.error("Erro ao remover dos favoritos:", error);
      debouncedToast.error("Erro ao remover dos favoritos");
    }
  };

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
      console.error("Erro ao adicionar ao carrinho:", error);
      debouncedToast.error("Erro ao adicionar ao carrinho");
    }
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="flex items-center gap-2 text-anny-green hover:text-anny-green/90"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Button>

      <div className="flex items-center gap-3">
        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        <h1 className="text-2xl md:text-3xl font-bold">Meus Favoritos</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[30vh]">
          <div className="animate-pulse text-anny-green">Carregando...</div>
        </div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(medication => (
            <div key={medication.id} className="anny-card">
              <Link to={`/medications/${medication.id}`} className="block">
                <div className="h-40 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={medication.image} 
                    alt={medication.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1 hover:text-anny-green transition-colors line-clamp-2">
                  {medication.name}
                </h3>
              </Link>
              <p className="text-anny-green/70 text-sm mb-3 line-clamp-2">{medication.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">R$ {medication.price.toFixed(2)}</span>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => removeFromFavorites(medication.id)}
                  >
                    <Trash2 size={16} />
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
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Nenhum favorito encontrado</h3>
          <p className="mt-2 text-sm text-gray-500">
            Você ainda não adicionou nenhum medicamento aos seus favoritos.
            Explore nossos medicamentos disponíveis.
          </p>
          <Button 
            className="mt-4"
            onClick={() => navigate("/medications")}
          >
            Ver Medicamentos
          </Button>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
