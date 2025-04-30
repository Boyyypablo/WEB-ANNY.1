
import { Star } from "lucide-react";
import { Review } from "../types";
import ProductRating from "./ProductRating";

interface ProductReviewsProps {
  reviews?: Review[];
  averageRating?: number;
}

const ProductReviews = ({ reviews, averageRating }: ProductReviewsProps) => {
  const reviewsCount = reviews?.length || 0;
  
  return (
    <div>
      <h3 className="font-semibold mb-4">Avaliações de Clientes</h3>
      
      {averageRating !== undefined && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex flex-col">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {reviewsCount} avaliações
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Comentários dos usuários */}
      <div className="space-y-4">
        {reviews?.map(review => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="font-medium">{review.userName}</span>
            </div>
            <p className="text-sm">
              {review.comment}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
          </div>
        ))}
        
        {(!reviews || reviews.length === 0) && (
          <p className="text-sm text-muted-foreground">
            Este produto ainda não possui avaliações.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
