
import { useNavigate } from "react-router-dom";
import { Package, Truck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const OrdersPage = () => {
  const navigate = useNavigate();

  // Mock data - em uma aplicação real, isso viria de uma API
  const orders = [
    {
      id: "1",
      date: "15/04/2025",
      status: "Entregue",
      trackingCode: "BR123456789",
      items: [
        { name: "Vitamina C", quantity: 2, price: "R$ 45,90" }
      ],
      address: "Av. Paulista, 1000 - São Paulo, SP",
      total: "R$ 91,80"
    },
    {
      id: "2",
      date: "20/04/2025",
      status: "Em trânsito",
      trackingCode: "BR987654321",
      items: [
        { name: "Complexo B", quantity: 1, price: "R$ 32,90" },
        { name: "Ômega 3", quantity: 1, price: "R$ 65,90" }
      ],
      address: "Av. Paulista, 1000 - São Paulo, SP",
      total: "R$ 98,80"
    }
  ];

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

      <h1 className="text-2xl md:text-3xl font-bold">Meus Pedidos</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="anny-card space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Pedido #{order.id}</p>
                <p className="text-sm text-gray-600">{order.date}</p>
              </div>
              <span className={`text-sm px-3 py-1 rounded-full ${
                order.status === 'Entregue' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {order.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Package className="w-4 h-4" />
                <span>Código de rastreio: {order.trackingCode}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-4 h-4" />
                <span>Status: {order.status}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Endereço: {order.address}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="font-semibold mb-2">Itens do pedido:</p>
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span>{item.price}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold mt-2 pt-2 border-t">
                <span>Total</span>
                <span>{order.total}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
