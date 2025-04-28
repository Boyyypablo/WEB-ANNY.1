
import React from "react";
import { toast } from "@/components/ui/sonner";

const SecurityTab = () => {
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Senha atualizada com sucesso!");
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Segurança</h2>
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="current-password" className="font-medium">Senha Atual</label>
          <input 
            id="current-password"
            type="password" 
            className="anny-input"
            placeholder="Digite sua senha atual"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="new-password" className="font-medium">Nova Senha</label>
          <input 
            id="new-password"
            type="password" 
            className="anny-input"
            placeholder="Digite sua nova senha"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirm-password" className="font-medium">Confirme a Nova Senha</label>
          <input 
            id="confirm-password"
            type="password" 
            className="anny-input"
            placeholder="Confirme sua nova senha"
            required
          />
        </div>
        <button type="submit" className="anny-btn-primary mt-4">
          Atualizar Senha
        </button>
      </form>
    </>
  );
};

export default SecurityTab;
