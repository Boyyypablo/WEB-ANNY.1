
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Truck, MapPin } from "lucide-react";

const OrdersPage = () => {
  const navigate = useNavigate();
  
  // Example of empty orders list for new users
  const orders: any[] = [];
  const hasOrders = orders.length > 0;

  return (
    <div className="space-y-6">

      <h1 className="text-2xl md:text-3xl font-bold">Meus Pedidos</h1>

      {!hasOrders ? (
        <div className="text-center py-12">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <ShoppingCart className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Nenhum pedido encontrado</h3>
          <p className="mt-2 text-sm text-gray-500">
            Você ainda não realizou nenhum pedido.
            Explore nossos medicamentos disponíveis.
          </p>
          <Button 
            className="mt-4"
            onClick={() => navigate("/medications")}
          >
            Ver Medicamentos
          </Button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default OrdersPage;
