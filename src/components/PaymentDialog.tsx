
import { useState } from "react";
import { CreditCard, User, Mail, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { debouncedToast } from "@/components/ui/sonner";

interface PaymentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  totalAmount: number;
  onSuccess: () => void;
}

export function PaymentDialog({ isOpen, onOpenChange, totalAmount, onSuccess }: PaymentDialogProps) {
  const [paymentStep, setPaymentStep] = useState<"details" | "processing" | "success">("details");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPaymentStep("processing");
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep("success");
      setIsSubmitting(false);
      
      // Simulate success and close dialog after showing success message
      setTimeout(() => {
        onSuccess();
        onOpenChange(false);
        setPaymentStep("details"); // Reset for next time
      }, 2000);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {paymentStep === "details" && "Finalize sua compra"}
            {paymentStep === "processing" && "Processando pagamento..."}
            {paymentStep === "success" && "Pagamento aprovado!"}
          </DialogTitle>
        </DialogHeader>
        
        {paymentStep === "details" && (
          <form onSubmit={handlePaymentSubmit} className="space-y-4 pt-4">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium">Nome completo</label>
              <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-anny-orange">
                <User className="ml-2 h-4 w-4 text-gray-500" />
                <input 
                  id="name"
                  type="text"
                  className="flex w-full rounded-md px-3 py-2 text-sm outline-none"
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-anny-orange">
                <Mail className="ml-2 h-4 w-4 text-gray-500" />
                <input 
                  id="email"
                  type="email"
                  className="flex w-full rounded-md px-3 py-2 text-sm outline-none"
                  placeholder="Digite seu email"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="address" className="text-sm font-medium">Endereço</label>
              <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-anny-orange">
                <MapPin className="ml-2 h-4 w-4 text-gray-500" />
                <input 
                  id="address"
                  type="text"
                  className="flex w-full rounded-md px-3 py-2 text-sm outline-none"
                  placeholder="Digite seu endereço completo"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="card" className="text-sm font-medium">Cartão de crédito</label>
              <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-anny-orange">
                <CreditCard className="ml-2 h-4 w-4 text-gray-500" />
                <input 
                  id="card"
                  type="text"
                  className="flex w-full rounded-md px-3 py-2 text-sm outline-none"
                  placeholder="0000 0000 0000 0000"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="space-y-1 flex-1">
                <label htmlFor="expiry" className="text-sm font-medium">Data de validade</label>
                <input 
                  id="expiry"
                  type="text"
                  className="flex w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-anny-orange"
                  placeholder="MM/AA"
                  required
                />
              </div>
              
              <div className="space-y-1 flex-1">
                <label htmlFor="cvc" className="text-sm font-medium">CVC</label>
                <input 
                  id="cvc"
                  type="text"
                  className="flex w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-anny-orange"
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span className="text-anny-green">R$ {totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full bg-anny-green hover:bg-anny-green/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processando..." : "Pagar agora"}
            </Button>
          </form>
        )}

        {paymentStep === "processing" && (
          <div className="py-8 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-anny-orange border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-center text-muted-foreground">
              Estamos processando seu pagamento. Por favor, aguarde um momento...
            </p>
          </div>
        )}

        {paymentStep === "success" && (
          <div className="py-8 flex flex-col items-center">
            <div className="w-16 h-16 bg-anny-green/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-anny-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="mt-4 text-center text-anny-green font-medium">
              Pagamento realizado com sucesso!
            </p>
            <p className="text-center text-muted-foreground">
              Seu pedido foi registrado e está sendo preparado.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
