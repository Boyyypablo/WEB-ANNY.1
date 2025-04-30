
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, ChevronLeft, MinusCircle, PlusCircle, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { debouncedToast } from "@/components/ui/sonner";
import { useCartStore } from "@/store/cartStore";
import { useProductDelivery } from "@/features/products/hooks/useProductDelivery";
import { Link } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const { deliveryEstimate } = useProductDelivery();
  const deliveryInfo = deliveryEstimate();
  const shippingCost = items.length > 0 ? 15.99 : 0;

  const handleRemoveItem = (itemId: number) => {
    removeItem(itemId);
    debouncedToast.success("Item removido do carrinho");
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleApplyCoupon = () => {
    if (!couponCode) {
      debouncedToast.error("Digite um cupom");
      return;
    }

    setIsApplyingCoupon(true);
    
    // Simulação de verificação de cupom
    setTimeout(() => {
      setIsApplyingCoupon(false);
      debouncedToast.error("Cupom inválido ou expirado");
      setCouponCode("");
    }, 1500);
  };

  const handleClearCart = () => {
    if (window.confirm("Tem certeza que deseja limpar o carrinho?")) {
      clearCart();
      debouncedToast.success("Carrinho limpo com sucesso");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Button 
          variant="ghost" 
          className="p-0" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <ShoppingCart className="h-7 w-7" />
          Carrinho de Compras
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-medium mb-2">Seu carrinho está vazio</h2>
          <p className="text-gray-500 mb-6">Adicione itens para continuar com suas compras</p>
          <Button onClick={() => navigate("/medications")}>
            Ver Produtos
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="hidden sm:table-cell">Preço</TableHead>
                    <TableHead>Qtd</TableHead>
                    <TableHead>Subtotal</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Link to={`/medications/${item.id}`}>
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded-md" 
                            />
                          </Link>
                          <Link 
                            to={`/medications/${item.id}`}
                            className="font-medium hover:text-anny-green transition-colors"
                          >
                            {item.name}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        R$ {item.price.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8" 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between mt-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/medications")}
              >
                Continuar Comprando
              </Button>
              
              <Button 
                variant="outline" 
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleClearCart}
              >
                Limpar Carrinho
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg space-y-6">
              <h2 className="font-semibold text-lg border-b pb-4">Resumo do Pedido</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} itens)</span>
                  <span>R$ {getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Entrega</span>
                  <span>R$ {shippingCost.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Entrega estimada: {deliveryInfo.min} - {deliveryInfo.max}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span className="text-anny-green">R$ {(getTotalPrice() + shippingCost).toFixed(2)}</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Cupom de desconto"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button 
                      variant="outline" 
                      disabled={isApplyingCoupon} 
                      onClick={handleApplyCoupon}
                    >
                      <Ticket className="mr-2 h-4 w-4" />
                      {isApplyingCoupon ? "Aplicando..." : "Aplicar"}
                    </Button>
                  </div>

                  <Button 
                    className="w-full bg-anny-green hover:bg-anny-green/90 py-6 text-base"
                    onClick={() => navigate("/checkout")}
                  >
                    Finalizar Compra
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
