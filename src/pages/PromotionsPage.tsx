
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Tag, Clock, Percent } from "lucide-react";
import { debouncedToast } from "@/components/ui/sonner";
import { Link } from "react-router-dom";

interface Promotion {
  id: number;
  title: string;
  description: string;
  discountPercentage: number;
  originalPrice: number;
  currentPrice: number;
  image: string;
  endsAt: string;
  medicationId: number;
  code?: string;
}

const PromotionsPage = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  
  // Dados de exemplo para promoções
  const examplePromotions: Promotion[] = [
    {
      id: 1,
      title: "Extrato de Cannabis Sativa com 20% OFF",
      description: "Promoção especial por tempo limitado! Extrato de Cannabis Sativa Ease Labs Pharma com 20% de desconto.",
      discountPercentage: 20,
      originalPrice: 375.00,
      currentPrice: 300.00,
      image: "/lovable-uploads/12699b83-589c-4563-8e2e-0ad1d7f31f83.png",
      endsAt: "2025-05-10",
      medicationId: 1,
      code: "CBD20"
    },
    {
      id: 2,
      title: "Compre 2 frascos de Canabidiol 20mg e ganhe 15% OFF",
      description: "Compre 2 frascos de Canabidiol 20mg/ml – Prati-Donaduzzi e ganhe 15% de desconto no valor total.",
      discountPercentage: 15,
      originalPrice: 92.79,
      currentPrice: 78.87,
      image: "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png",
      endsAt: "2025-05-15",
      medicationId: 3
    },
    {
      id: 3,
      title: "Frete grátis na compra de Óleo CBD 1000mg",
      description: "Aproveite frete grátis para todo o Brasil na compra do Óleo CBD 1000mg – Naturecan por tempo limitado!",
      discountPercentage: 0,
      originalPrice: 499.00,
      currentPrice: 499.00,
      image: "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png",
      endsAt: "2025-05-20",
      medicationId: 5,
      code: "FRETENATURECAN"
    }
  ];

  useEffect(() => {
    // Em um cenário real, aqui buscaríamos os dados da API
    setPromotions(examplePromotions);
  }, []);

  const addToCart = (promotion: Promotion) => {
    try {
      const medication = {
        id: promotion.medicationId,
        name: promotion.title,
        description: promotion.description,
        price: promotion.currentPrice,
        image: promotion.image
      };
      
      const savedCart = localStorage.getItem('cart');
      const cart = savedCart ? JSON.parse(savedCart) : [];
      
      const existingItem = cart.find((item: any) => item.id === promotion.medicationId);
      
      let newCart;
      if (existingItem) {
        newCart = cart.map((item: any) => 
          item.id === promotion.medicationId 
            ? { ...item, quantity: item.quantity + 1, price: promotion.currentPrice }
            : item
        );
      } else {
        newCart = [...cart, { ...medication, quantity: 1 }];
      }
      
      localStorage.setItem('cart', JSON.stringify(newCart));
      
      // Dispatch events to notify components of cart updates
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      
      debouncedToast.success(`${promotion.title} adicionado ao carrinho`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      debouncedToast.error("Erro ao adicionar ao carrinho");
    }
  };

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      debouncedToast.success(`Código ${code} copiado!`);
    }).catch(() => {
      debouncedToast.error("Erro ao copiar código");
    });
  };

  // Calcula dias restantes para o fim da promoção
  const getDaysRemaining = (endsAt: string) => {
    const endDate = new Date(endsAt);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
        <Tag className="w-6 h-6 text-anny-orange" />
        <h1 className="text-2xl md:text-3xl font-bold">Promoções e Ofertas</h1>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-anny-green mb-2">Ofertas Exclusivas</h2>
        <p className="text-gray-600">
          Aproveite descontos especiais em medicamentos selecionados por tempo limitado!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map(promotion => (
          <div key={promotion.id} className="anny-card relative overflow-hidden">
            {promotion.discountPercentage > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white py-1 px-3 rounded-bl-lg font-medium">
                -{promotion.discountPercentage}%
              </div>
            )}
            
            <div className="h-40 mb-4 rounded-lg overflow-hidden">
              <Link to={`/medications/${promotion.medicationId}`}>
                <img 
                  src={promotion.image} 
                  alt={promotion.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </Link>
            </div>
            
            <Link to={`/medications/${promotion.medicationId}`} className="block">
              <h3 className="font-semibold text-lg mb-1 hover:text-anny-green transition-colors">
                {promotion.title}
              </h3>
            </Link>
            
            <p className="text-sm text-gray-600 mb-3">{promotion.description}</p>
            
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Clock className="w-4 h-4 text-anny-green" />
              <span className="text-anny-green font-medium">
                Termina em: {getDaysRemaining(promotion.endsAt)} dias
              </span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-gray-500 line-through text-sm">
                  R$ {promotion.originalPrice.toFixed(2)}
                </span>
                <span className="font-bold text-lg text-anny-green ml-2">
                  R$ {promotion.currentPrice.toFixed(2)}
                </span>
              </div>
              
              {promotion.code && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-sm"
                  onClick={() => copyPromoCode(promotion.code!)}
                >
                  <Percent className="h-3 w-3 mr-1" />
                  {promotion.code}
                </Button>
              )}
            </div>
            
            <Button 
              className="w-full"
              onClick={() => addToCart(promotion)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Aproveitar Oferta
            </Button>
          </div>
        ))}
      </div>

      {promotions.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Tag className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Nenhuma promoção disponível</h3>
          <p className="mt-2 text-sm text-gray-500">
            No momento não temos promoções ativas. Volte em breve para novidades!
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

export default PromotionsPage;
