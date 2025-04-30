
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { debouncedToast } from "@/components/ui/sonner";
import { useCartStore } from "@/store/cartStore";
import { Medication } from "../types";
import ProductRating from "./ProductRating";
import QuantitySelector from "./QuantitySelector";

interface ProductPurchaseCardProps {
  product: Medication;
  averageRating?: number;
  reviewsCount: number;
}

const ProductPurchaseCard = ({ product, averageRating, reviewsCount }: ProductPurchaseCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { addItem } = useCartStore();

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    try {
      // Adiciona ao carrinho usando o Zustand store
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      
      debouncedToast.success(`${product.name} adicionado ao carrinho (${quantity} unidade${quantity > 1 ? 's' : ''})`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      debouncedToast.error("Erro ao adicionar ao carrinho");
    }
  };

  const toggleFavorite = () => {
    const isFavorite = favorites.includes(product.id);
    
    try {
      // Recuperar favoritos atuais
      const savedFavorites = localStorage.getItem('favorites');
      const currentFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];
      
      let updatedFavorites;
      
      if (isFavorite) {
        // Remover dos favoritos
        updatedFavorites = currentFavorites.filter((item: Medication) => item.id !== product.id);
        debouncedToast.success(`${product.name} removido dos favoritos`);
      } else {
        // Adicionar aos favoritos
        updatedFavorites = [...currentFavorites, product];
        debouncedToast.success(`${product.name} adicionado aos favoritos`);
      }
      
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
      // Atualizar estado de favoritos locais
      setFavorites(updatedFavorites.map((item: Medication) => item.id));
    } catch (error) {
      console.error("Error toggling favorite:", error);
      debouncedToast.error("Erro ao atualizar favoritos");
    }
  };

  return (
    <Card className="p-6">
      {/* Cabeçalho do Produto */}
      <div className="space-y-3 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
        <ProductRating rating={averageRating} reviewsCount={reviewsCount} />
        <p className="text-anny-green/70">{product.description}</p>
      </div>
      
      <div className="border-t border-b py-4 my-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-anny-green">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-anny-green">
            Em até 12x de R$ {(product.price / 12).toFixed(2)}
          </p>
        </div>
      </div>
      
      {/* Seletor de Quantidade */}
      <QuantitySelector quantity={quantity} onQuantityChange={handleQuantityChange} />
      
      {/* Botões de Ação */}
      <div className="flex flex-col gap-3">
        <Button 
          onClick={handleAddToCart}
          className="w-full py-6 bg-anny-green hover:bg-anny-green/90 gap-2"
          size="lg"
        >
          <ShoppingCart size={20} />
          Adicionar ao Carrinho
        </Button>
        
        <Button
          variant="outline"
          onClick={toggleFavorite}
          className="w-full gap-2"
        >
          <Heart className={favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""} size={20} />
          {favorites.includes(product.id) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
        </Button>
      </div>
    </Card>
  );
};

export default ProductPurchaseCard;
