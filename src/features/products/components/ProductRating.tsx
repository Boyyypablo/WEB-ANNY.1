
import { Star } from "lucide-react";

interface ProductRatingProps {
  rating: number | undefined;
  reviewsCount?: number;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
}

const ProductRating = ({ 
  rating, 
  reviewsCount = 0, 
  showCount = true,
  size = "md"
}: ProductRatingProps) => {
  if (!rating) return null;
  
  const getSizeClasses = () => {
    switch(size) {
      case "sm": return { star: "h-4 w-4", text: "text-sm" };
      case "lg": return { star: "h-5 w-5", text: "text-lg" };
      default: return { star: "h-4 w-4", text: "text-sm" };
    }
  };
  
  const { star, text } = getSizeClasses();
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i}
          className={`${star} ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
      <span className={`font-medium ml-2 ${text}`}>{rating.toFixed(1)}</span>
      {showCount && reviewsCount > 0 && (
        <span className={`text-muted-foreground ${text}`}>({reviewsCount} avaliações)</span>
      )}
    </div>
  );
};

export default ProductRating;
