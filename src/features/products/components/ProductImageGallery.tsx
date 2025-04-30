
import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

const ProductImageGallery = ({ images, name }: ProductImageGalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
  };

  return (
    <div className="space-y-6">
      {/* Imagem Principal */}
      <div className="relative rounded-lg overflow-hidden bg-white border">
        <div 
          className={`cursor-zoom-in ${isZoomed ? 'overflow-hidden' : ''}`}
          onClick={toggleZoom}
        >
          <AspectRatio ratio={16/9} className="bg-muted">
            <img 
              src={images[activeImageIndex]} 
              alt={name} 
              className={`w-full h-full object-contain transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : ''}`}
            />
          </AspectRatio>
        </div>
      </div>
      
      {/* Carrossel de Miniaturas */}
      {images.length > 1 && (
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index} className="basis-1/4 sm:basis-1/5 md:basis-1/6 lg:basis-1/5">
                <div 
                  className={`border rounded-md overflow-hidden cursor-pointer p-2 transition-all ${activeImageIndex === index ? 'border-anny-green ring-2 ring-anny-green/30' : 'hover:border-gray-300'}`}
                  onClick={() => handleImageClick(index)}
                >
                  <AspectRatio ratio={1/1}>
                    <img 
                      src={img} 
                      alt={`${name} - imagem ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="relative inset-0 translate-y-0 mr-2" />
            <CarouselNext className="relative inset-0 translate-y-0 ml-2" />
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default ProductImageGallery;
