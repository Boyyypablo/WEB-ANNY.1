
import React, { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";

const PersonalInfoTab = () => {
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "(11) 98765-4321",
    birthdate: "15/07/1985",
    address: "Av. Paulista, 1000, São Paulo - SP"
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: profile?.email?.split('@')[0] || "Usuário",
        email: user.email || "",
      }));
    }
  }, [user, profile]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Informações atualizadas com sucesso!");
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-medium">Nome Completo</label>
            <input 
              id="name"
              type="text" 
              className="anny-input"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">Email</label>
            <input 
              id="email"
              type="email" 
              className="anny-input"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              readOnly
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-medium">Telefone</label>
            <input 
              id="phone"
              type="tel" 
              className="anny-input"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="birthdate" className="font-medium">Data de Nascimento</label>
            <input 
              id="birthdate"
              type="text" 
              className="anny-input"
              value={formData.birthdate}
              onChange={(e) => setFormData({...formData, birthdate: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="address" className="font-medium">Endereço</label>
            <input 
              id="address"
              type="text" 
              className="anny-input"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>
        </div>
        <button type="submit" className="anny-btn-primary mt-4">
          Salvar Alterações
        </button>
      </form>
    </>
  );
};

export default PersonalInfoTab;
