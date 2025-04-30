
import { Truck } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProductDeliveryInfoProps {
  delivery: {
    min: string;
    max: string;
  };
}

const ProductDeliveryInfo = ({ delivery }: ProductDeliveryInfoProps) => {
  return (
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
  );
};

export default ProductDeliveryInfo;
