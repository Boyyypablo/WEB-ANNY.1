
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Medication, calculateAverageRating } from "../types";
import ProductRating from "./ProductRating";

interface RelatedProductsProps {
  products: Medication[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const navigate = useNavigate();

  if (!products.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => {
          const rating = calculateAverageRating(product.reviews);
          const reviewsCount = product.reviews?.length || 0;
          
          return (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-2">
                <AspectRatio ratio={16/9} className="bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </AspectRatio>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold line-clamp-2 mb-2 hover:text-anny-green cursor-pointer" 
                    onClick={() => navigate(`/medications/${product.id}`)}>
                  {product.name}
                </h3>
                <ProductRating rating={rating} reviewsCount={reviewsCount} size="sm" />
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold">R$ {product.price.toFixed(2)}</span>
                  <Button 
                    size="sm" 
                    className="bg-anny-green hover:bg-anny-green/90"
                    onClick={() => navigate(`/medications/${product.id}`)}
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
