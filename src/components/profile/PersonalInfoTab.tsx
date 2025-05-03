
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

const PersonalInfoTab = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    cpf: "",
    phone: "",
    address: "",
    zip_code: "",
    birthdate: "",
  });
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        email: profile.email || "",
        cpf: profile.cpf || "",
        phone: profile.phone || "",
        address: profile.address || "",
        zip_code: profile.zip_code || "",
        birthdate: profile.birthdate ? new Date(profile.birthdate).toISOString().split('T')[0] : "",
      });
    }
  }, [profile]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          address: formData.address,
          zip_code: formData.zip_code,
          birthdate: formData.birthdate || null,
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast.success("Perfil atualizado com sucesso!");
      await refreshProfile();
    } catch (error: any) {
      toast.error(`Erro ao atualizar perfil: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="full_name" className="font-medium">Nome Completo</label>
            <input 
              id="full_name"
              name="full_name"
              type="text"
              className="anny-input"
              value={formData.full_name}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">Email</label>
            <input 
              id="email"
              name="email"
              type="email"
              className="anny-input"
              value={formData.email}
              disabled
              title="Email não pode ser alterado"
            />
          </div>
          
          {profile?.user_type === 'patient' && (
            <div className="flex flex-col gap-2">
              <label htmlFor="cpf" className="font-medium">CPF</label>
              <input 
                id="cpf"
                name="cpf"
                type="text" 
                className="anny-input"
                value={formData.cpf}
                disabled
                title="CPF não pode ser alterado"
              />
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-medium">Telefone</label>
            <input 
              id="phone"
              name="phone"
              type="tel"
              className="anny-input"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="font-medium">Endereço</label>
            <input 
              id="address"
              name="address"
              type="text"
              className="anny-input"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="zip_code" className="font-medium">CEP</label>
            <input 
              id="zip_code"
              name="zip_code"
              type="text"
              className="anny-input"
              value={formData.zip_code}
              onChange={handleChange}
              placeholder="00000-000"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="birthdate" className="font-medium">Data de Nascimento</label>
            <input 
              id="birthdate"
              name="birthdate"
              type="date"
              className="anny-input"
              value={formData.birthdate}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="mt-4"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </form>
    </>
  );
};

export default PersonalInfoTab;
