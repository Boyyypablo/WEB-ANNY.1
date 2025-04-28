
import React, { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const PersonalInfoTab = () => {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Common fields
    full_name: "",
    email: "",
    phone: "",
    address: "",
    zip_code: "",
    
    // Patient specific fields
    birth_date: "",
    cpf: "",
    gender: "",
    sus_card: "",
    medical_conditions: "",
    medications: "",
    
    // Association/Government specific fields
    position: "",
    institution_name: "",
    cnpj: "",
    area_of_activity: ""
  });

  const isPatient = profile?.user_type === 'patient';

  useEffect(() => {
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          full_name, email, phone, address, zip_code,
          birth_date, cpf, gender, sus_card, medical_conditions, medications,
          position, tenant_id
        `)
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Error loading profile:", error);
        return;
      }

      if (data) {
        // If user has a tenant_id, fetch tenant data
        let tenantData = {};
        if (data.tenant_id) {
          const { data: tenant, error: tenantError } = await supabase
            .from('tenants')
            .select('institution_name, cnpj, area_of_activity')
            .eq('id', data.tenant_id)
            .single();

          if (!tenantError && tenant) {
            tenantData = tenant;
          }
        }

        // Prepare medical conditions and medications as strings if they exist
        const medCondStr = data.medical_conditions ? data.medical_conditions.join(", ") : "";
        const medsStr = data.medications ? data.medications.join(", ") : "";

        setFormData({
          ...formData,
          ...data,
          ...tenantData,
          email: user.email || "",
          medical_conditions: medCondStr,
          medications: medsStr,
          // Format date if it exists
          birth_date: data.birth_date ? new Date(data.birth_date).toISOString().split('T')[0] : "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      setLoading(true);

      // Prepare data for update
      const profileData = {
        full_name: formData.full_name,
        phone: formData.phone,
        address: formData.address,
        zip_code: formData.zip_code,
        birth_date: formData.birth_date || null,
        cpf: formData.cpf || null,
        gender: formData.gender || null,
        sus_card: formData.sus_card || null,
        medical_conditions: formData.medical_conditions ? formData.medical_conditions.split(',').map(item => item.trim()) : null,
        medications: formData.medications ? formData.medications.split(',').map(item => item.trim()) : null,
        position: formData.position || null,
      };

      // Update profile data
      const { error: profileError } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);

      if (profileError) {
        toast.error(`Erro ao atualizar perfil: ${profileError.message}`);
        return;
      }

      // If user is association or government and has tenant data, update tenant
      if (!isPatient && profile?.tenant_id) {
        const tenantData = {
          institution_name: formData.institution_name || null,
          cnpj: formData.cnpj || null,
          area_of_activity: formData.area_of_activity || null,
        };

        const { error: tenantError } = await supabase
          .from('tenants')
          .update(tenantData)
          .eq('id', profile.tenant_id);

        if (tenantError) {
          toast.error(`Erro ao atualizar dados da instituição: ${tenantError.message}`);
          return;
        }
      }

      toast.success("Informações atualizadas com sucesso!");
    } catch (error: any) {
      toast.error(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Common fields for all user types */}
          <div className="flex flex-col gap-2">
            <label htmlFor="full_name" className="font-medium">Nome Completo</label>
            <input 
              id="full_name"
              type="text" 
              className="anny-input"
              value={formData.full_name || ""}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">Email</label>
            <input 
              id="email"
              type="email" 
              className="anny-input"
              value={formData.email || ""}
              readOnly
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-medium">Telefone</label>
            <input 
              id="phone"
              type="tel" 
              className="anny-input"
              value={formData.phone || ""}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          
          {/* Conditional fields based on user type */}
          {isPatient ? (
            // Patient-specific fields
            <>
              <div className="flex flex-col gap-2">
                <label htmlFor="birth_date" className="font-medium">Data de Nascimento</label>
                <input 
                  id="birth_date"
                  type="date" 
                  className="anny-input"
                  value={formData.birth_date || ""}
                  onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="cpf" className="font-medium">CPF</label>
                <input 
                  id="cpf"
                  type="text" 
                  className="anny-input"
                  value={formData.cpf || ""}
                  onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="gender" className="font-medium">Gênero</label>
                <select 
                  id="gender"
                  className="anny-input"
                  value={formData.gender || ""}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                  <option value="prefiro_nao_informar">Prefiro não informar</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="sus_card" className="font-medium">Cartão do SUS</label>
                <input 
                  id="sus_card"
                  type="text" 
                  className="anny-input"
                  value={formData.sus_card || ""}
                  onChange={(e) => setFormData({...formData, sus_card: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="medical_conditions" className="font-medium">Condições Médicas</label>
                <textarea 
                  id="medical_conditions"
                  className="anny-input"
                  value={formData.medical_conditions || ""}
                  onChange={(e) => setFormData({...formData, medical_conditions: e.target.value})}
                  placeholder="Separe por vírgulas, ex: Diabetes, Hipertensão"
                  rows={2}
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="medications" className="font-medium">Medicamentos em uso</label>
                <textarea 
                  id="medications"
                  className="anny-input"
                  value={formData.medications || ""}
                  onChange={(e) => setFormData({...formData, medications: e.target.value})}
                  placeholder="Separe por vírgulas, ex: Insulina, Losartana"
                  rows={2}
                />
              </div>
            </>
          ) : (
            // Association/Government specific fields
            <>
              <div className="flex flex-col gap-2">
                <label htmlFor="position" className="font-medium">Cargo ou Função</label>
                <input 
                  id="position"
                  type="text" 
                  className="anny-input"
                  value={formData.position || ""}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="institution_name" className="font-medium">Nome da Instituição</label>
                <input 
                  id="institution_name"
                  type="text" 
                  className="anny-input"
                  value={formData.institution_name || ""}
                  onChange={(e) => setFormData({...formData, institution_name: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="cnpj" className="font-medium">CNPJ</label>
                <input 
                  id="cnpj"
                  type="text" 
                  className="anny-input"
                  value={formData.cnpj || ""}
                  onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="area_of_activity" className="font-medium">Área de Atuação</label>
                <input 
                  id="area_of_activity"
                  type="text" 
                  className="anny-input"
                  value={formData.area_of_activity || ""}
                  onChange={(e) => setFormData({...formData, area_of_activity: e.target.value})}
                />
              </div>
            </>
          )}

          {/* Common address fields for all users */}
          <div className="flex flex-col gap-2">
            <label htmlFor="zip_code" className="font-medium">CEP</label>
            <input 
              id="zip_code"
              type="text" 
              className="anny-input"
              value={formData.zip_code || ""}
              onChange={(e) => setFormData({...formData, zip_code: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="address" className="font-medium">Endereço Completo</label>
            <input 
              id="address"
              type="text" 
              className="anny-input"
              value={formData.address || ""}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>
        </div>
        <button 
          type="submit" 
          className="anny-btn-primary mt-4" 
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </>
  );
};

export default PersonalInfoTab;
