
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, QrCode, Banknote, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { debouncedToast } from "@/components/ui/sonner";

type PaymentMethod = "credit" | "debit" | "pix" | "boleto";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit");
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const navigate = useNavigate();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      debouncedToast.success("Compra finalizada com sucesso!");
      // Clear cart
      localStorage.setItem('cart', JSON.stringify([]));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      // Redirect to home
      navigate('/');
    }, 2000);
  };

  const applyCoupon = () => {
    if (couponCode) {
      debouncedToast.error("Cupom inválido ou expirado");
      setCouponCode("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Finalizar Compra</h1>
      
      <form onSubmit={handlePayment} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Método de Pagamento</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod("credit")}
              className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                paymentMethod === "credit"
                  ? "border-anny-green bg-anny-green/5"
                  : "border-gray-200 hover:border-anny-green"
              }`}
            >
              <CreditCard className="h-6 w-6" />
              <span>Crédito</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("debit")}
              className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                paymentMethod === "debit"
                  ? "border-anny-green bg-anny-green/5"
                  : "border-gray-200 hover:border-anny-green"
              }`}
            >
              <CreditCard className="h-6 w-6" />
              <span>Débito</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("pix")}
              className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                paymentMethod === "pix"
                  ? "border-anny-green bg-anny-green/5"
                  : "border-gray-200 hover:border-anny-green"
              }`}
            >
              <QrCode className="h-6 w-6" />
              <span>PIX</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("boleto")}
              className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                paymentMethod === "boleto"
                  ? "border-anny-green bg-anny-green/5"
                  : "border-gray-200 hover:border-anny-green"
              }`}
            >
              <Banknote className="h-6 w-6" />
              <span>Boleto</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Informações Pessoais</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" required placeholder="Digite seu nome completo" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="Digite seu email" />
            </div>
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input id="address" required placeholder="Digite seu endereço completo" />
            </div>
          </div>
        </div>

        {paymentMethod === "credit" || paymentMethod === "debit" ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Informações do Cartão</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="card">Número do cartão</Label>
                <Input id="card" required placeholder="0000 0000 0000 0000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Data de validade</Label>
                  <Input id="expiry" required placeholder="MM/AA" />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" required placeholder="123" />
                </div>
              </div>
            </div>
          </div>
        ) : paymentMethod === "pix" ? (
          <div className="p-8 border rounded-lg text-center space-y-4">
            <QrCode className="mx-auto h-32 w-32" />
            <p>Escaneie o QR Code para pagar</p>
          </div>
        ) : (
          <div className="p-8 border rounded-lg text-center space-y-4">
            <Banknote className="mx-auto h-32 w-32" />
            <p>Gerar boleto para pagamento</p>
          </div>
        )}

        <div className="border-t pt-6 space-y-4">
          <div className="flex gap-4">
            <Input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Digite seu cupom de desconto"
            />
            <Button type="button" variant="outline" onClick={applyCoupon}>
              <Ticket className="mr-2 h-4 w-4" />
              Aplicar
            </Button>
          </div>

          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total:</span>
            <span className="text-anny-green">R$ 2210.69</span>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-anny-green hover:bg-anny-green/90"
            disabled={isProcessing}
          >
            {isProcessing ? "Processando..." : "Finalizar Compra"}
          </Button>
        </div>
      </form>
    </div>
  );
}
