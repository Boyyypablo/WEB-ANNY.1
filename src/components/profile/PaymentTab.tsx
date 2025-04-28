
import React from "react";
import { CreditCard } from "lucide-react";

const PaymentTab = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <CreditCard size={64} className="text-anny-green mb-4" />
      <h2 className="text-xl font-semibold mb-2">Métodos de Pagamento</h2>
      <p className="text-anny-green/70 mb-6">
        Adicione seus métodos de pagamento para facilitar suas compras
      </p>
      <button className="anny-btn-primary">
        Adicionar Método de Pagamento
      </button>
    </div>
  );
};

export default PaymentTab;
