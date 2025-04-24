
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Medication {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

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

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const medication = medications.find(med => med.id === Number(id));
  
  if (!medication) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Produto não encontrado</p>
        <Button onClick={() => navigate('/medications')}>Voltar para Medicamentos</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
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
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate('/medications')}
        className="mb-6"
      >
        Voltar para Medicamentos
      </Button>
      
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img 
              src={medication.image} 
              alt={medication.name} 
              className="w-full rounded-lg object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold">{medication.name}</h1>
            <p className="text-lg text-anny-green/70">{medication.description}</p>
            <p className="text-2xl font-bold text-anny-green">
              R$ {medication.price.toFixed(2)}
            </p>
            <Button 
              onClick={handleAddToCart}
              className="w-full md:w-auto flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetailPage;
