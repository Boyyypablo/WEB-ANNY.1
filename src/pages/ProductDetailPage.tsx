import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Truck, Star, Heart } from "lucide-react";
import { debouncedToast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useCartStore } from "@/store/cartStore";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Medication {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
  images?: string[];
  specifications?: Record<string, string>;
}

const medications: Medication[] = [
  {
    id: 1,
    name: "Extrato de Cannabis Sativa 36,76mg/ml – Ease Labs Pharma (30ml)",
    description: "Produto fitoterápico com 36,76 mg/ml de CBD, indicado para auxiliar no tratamento de condições como ansiedade e dores crônicas.",
    price: 375.00,
    image: "/lovable-uploads/12699b83-589c-4563-8e2e-0ad1d7f31f83.png",
    rating: 4.8,
    reviews: 124,
    images: [
      "/lovable-uploads/12699b83-589c-4563-8e2e-0ad1d7f31f83.png",
      "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png",
      "/lovable-uploads/2bde0bd9-b878-4f46-95f9-abb77613dc6b.png"
    ],
    specifications: {
      "Concentração": "36,76 mg/ml de CBD",
      "Volume": "30ml",
      "Fabricante": "Ease Labs Pharma",
      "Forma": "Óleo para uso oral",
      "Indicação principal": "Ansiedade e dores crônicas",
      "Conservação": "Conservar em temperatura ambiente entre 15°C e 30°C"
    }
  },
  {
    id: 2,
    name: "Canabidiol Herbarium 200mg/ml (30ml)",
    description: "Solução oral com alta concentração de CBD, indicada para casos de epilepsia refratária e outras condições neurológicas.",
    price: 2210.69,
    image: "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png",
    rating: 4.9,
    reviews: 87,
    images: [
      "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png",
      "/lovable-uploads/12699b83-589c-4563-8e2e-0ad1d7f31f83.png"
    ],
    specifications: {
      "Concentração": "200 mg/ml de CBD",
      "Volume": "30ml",
      "Fabricante": "Herbarium",
      "Forma": "Solução oral",
      "Indicação principal": "Epilepsia refratária",
      "Conservação": "Conservar em temperatura ambiente entre 15°C e 30°C"
    }
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
    description: "Solução oral com 79,14 mg/ml de CBD, indicada para tratamento de dores crônicas e distúrbios neurológicos.",
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

// Produtos relacionados - recomendar produtos da mesma categoria
const getRelatedProducts = (currentId: number): Medication[] => {
  // Exclui o produto atual e retorna até 3 produtos relacionados
  return medications.filter(med => med.id !== currentId).slice(0, 3);
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { addItem } = useCartStore();
  
  const medication = medications.find(med => med.id === Number(id));
  
  if (!medication) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Produto não encontrado</p>
        <Button onClick={() => navigate('/medications')}>Voltar para Medicamentos</Button>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(medication.id);

  const handleAddToCart = () => {
    try {
      // Adiciona ao carrinho usando o Zustand store
      for (let i = 0; i < quantity; i++) {
        addItem(medication);
      }
      
      debouncedToast.success(`${medication.name} adicionado ao carrinho (${quantity} unidade${quantity > 1 ? 's' : ''})`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      debouncedToast.error("Erro ao adicionar ao carrinho");
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const toggleFavorite = () => {
    const isFavorite = favorites.includes(medication.id);
    
    try {
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

  // Renderiza as estrelas de avaliação
  const renderRating = (rating: number | undefined) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="text-sm font-medium ml-2">{rating.toFixed(1)}</span>
        {medication.reviews && (
          <span className="text-sm text-muted-foreground">({medication.reviews} avaliações)</span>
        )}
      </div>
    );
  };

  // Calcula prazo de entrega estimado (simulação)
  const deliveryEstimate = () => {
    const today = new Date();
    const minDays = 3;
    const maxDays = 7;
    
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + minDays);
    
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + maxDays);
    
    const formatOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    return {
      min: minDate.toLocaleDateString('pt-BR', formatOptions),
      max: maxDate.toLocaleDateString('pt-BR', formatOptions)
    };
  };
  
  const delivery = deliveryEstimate();

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate('/medications')}
        className="mb-6"
      >
        Voltar para Medicamentos
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Seção de Imagens - Coluna 1 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Imagem Principal */}
          <div className="relative rounded-lg overflow-hidden bg-white border">
            <div 
              className={`cursor-zoom-in ${isZoomed ? 'overflow-hidden' : ''}`}
              onClick={toggleZoom}
            >
              <AspectRatio ratio={16/9} className="bg-muted">
                <img 
                  src={medication.images ? medication.images[activeImageIndex] : medication.image} 
                  alt={medication.name} 
                  className={`w-full h-full object-contain transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : ''}`}
                />
              </AspectRatio>
            </div>
          </div>
          
          {/* Carrossel de Miniaturas */}
          {medication.images && medication.images.length > 1 && (
            <Carousel className="w-full">
              <CarouselContent>
                {medication.images.map((img, index) => (
                  <CarouselItem key={index} className="basis-1/4 sm:basis-1/5 md:basis-1/6 lg:basis-1/5">
                    <div 
                      className={`border rounded-md overflow-hidden cursor-pointer p-2 transition-all ${activeImageIndex === index ? 'border-anny-green ring-2 ring-anny-green/30' : 'hover:border-gray-300'}`}
                      onClick={() => handleImageClick(index)}
                    >
                      <AspectRatio ratio={1/1}>
                        <img 
                          src={img} 
                          alt={`${medication.name} - imagem ${index + 1}`} 
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
          
          {/* Abas para Informação Detalhada */}
          <Card className="mt-8">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="description">Descrição</TabsTrigger>
                <TabsTrigger value="specifications">Especificações</TabsTrigger>
                <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-6">
                <h3 className="font-semibold mb-2">Descrição do Produto</h3>
                <p className="text-anny-green/70">{medication.description}</p>
                <p className="mt-4">
                  Os produtos à base de Cannabis têm demonstrado resultados promissores no tratamento de diversas condições 
                  de saúde. Este produto é indicado para uso sob orientação médica e pode auxiliar no controle de sintomas 
                  como dores crônicas, ansiedade, insônia e outras condições neurológicas.
                </p>
                <p className="mt-4">
                  Importante: Este é um medicamento controlado e só pode ser adquirido mediante apresentação de prescrição médica.
                </p>
              </TabsContent>
              <TabsContent value="specifications" className="p-6">
                <h3 className="font-semibold mb-4">Especificações Técnicas</h3>
                {medication.specifications && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(medication.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-sm text-muted-foreground">{key}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="reviews" className="p-6">
                <h3 className="font-semibold mb-4">Avaliações de Clientes</h3>
                {medication.rating && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-3xl font-bold">{medication.rating.toFixed(1)}</div>
                      <div className="flex flex-col">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-5 w-5 ${i < Math.floor(medication.rating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {medication.reviews} avaliações
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Comentários de exemplo */}
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">Maria S.</span>
                    </div>
                    <p className="text-sm">
                      Excelente produto! Ajudou muito no controle da minha ansiedade. Recomendo totalmente.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">15/04/2025</p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">João P.</span>
                    </div>
                    <p className="text-sm">
                      Estou usando há 2 meses para dores crônicas e percebi uma melhora significativa. 
                      O gosto não é dos melhores, mas os benefícios compensam.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">02/04/2025</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">Ana L.</span>
                    </div>
                    <p className="text-sm">
                      Ótimo produto, entrega rápida e embalagem discreta. Tem me ajudado muito com insônia.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">27/03/2025</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        {/* Informações de Compra - Coluna 2 */}
        <div className="space-y-6">
          <Card className="p-6">
            {/* Cabeçalho do Produto */}
            <div className="space-y-3 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold">{medication.name}</h1>
              {renderRating(medication.rating)}
              <p className="text-anny-green/70">{medication.description}</p>
            </div>
            
            <div className="border-t border-b py-4 my-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-anny-green">
                    R$ {medication.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-anny-green">
                  Em até 12x de R$ {(medication.price / 12).toFixed(2)}
                </p>
              </div>
            </div>
            
            {/* Seletor de Quantidade */}
            <div className="flex items-center gap-3 my-6">
              <span className="font-medium">Quantidade:</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
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
                <Heart className={favorites.includes(medication.id) ? "fill-red-500 text-red-500" : ""} size={20} />
                {favorites.includes(medication.id) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
              </Button>
            </div>
          </Card>
          
          {/* Informações de Entrega */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3 text-anny-green">
              <Truck className="h-5 w-5" />
              <h3 className="font-medium">Informações de Entrega</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">
              Entrega estimada entre <span className="font-medium text-foreground">{delivery.min}</span> e <span className="font-medium text-foreground">{delivery.max}</span>
            </p>
            
            <p className="text-xs text-muted-foreground">
              * O prazo de entrega pode variar de acordo com a sua localização
            </p>
            
            <div className="border-t mt-4 pt-4">
              <p className="text-sm mb-2">
                <span className="font-medium">Importante:</span> Este é um medicamento controlado e só pode ser adquirido mediante apresentação de prescrição médica.
              </p>
              <p className="text-xs text-muted-foreground">
                Você será solicitado a enviar sua receita médica durante o processo de finalização da compra.
              </p>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Produtos Relacionados */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
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
                  {renderRating(product.rating)}
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
