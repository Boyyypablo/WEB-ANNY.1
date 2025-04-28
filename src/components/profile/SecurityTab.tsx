
import React, { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const SecurityTab = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  useEffect(() => {
    if (user?.id) {
      loadSecuritySettings();
    }
  }, [user]);

  const loadSecuritySettings = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('two_factor_enabled')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Error loading security settings:", error);
        return;
      }

      if (data) {
        setTwoFactorEnabled(data.two_factor_enabled || false);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const currentPassword = formData.get('current-password') as string;
    const newPassword = formData.get('new-password') as string;
    const confirmPassword = formData.get('confirm-password') as string;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("A nova senha e a confirmação não coincidem");
      return;
    }
    
    try {
      setLoading(true);
      
      // Supabase requires us to sign in again with the current password
      // before changing the password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email as string,
        password: currentPassword
      });
      
      if (signInError) {
        toast.error("Senha atual incorreta");
        return;
      }
      
      // Change the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (updateError) {
        toast.error(`Erro ao atualizar senha: ${updateError.message}`);
        return;
      }
      
      toast.success("Senha atualizada com sucesso!");
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast.error(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleTwoFactor = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      
      // In a real implementation, this would involve additional steps
      // such as sending verification codes, etc.
      const newValue = !twoFactorEnabled;
      
      const { error } = await supabase
        .from('profiles')
        .update({ two_factor_enabled: newValue })
        .eq('id', user.id);
      
      if (error) {
        toast.error(`Erro ao atualizar configuração de 2FA: ${error.message}`);
        return;
      }
      
      setTwoFactorEnabled(newValue);
      toast.success(`Autenticação de dois fatores ${newValue ? 'ativada' : 'desativada'} com sucesso!`);
    } catch (error: any) {
      toast.error(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Segurança</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Autenticação de Dois Fatores (2FA)</h3>
        <p className="text-gray-600 mb-4">
          A autenticação de dois fatores adiciona uma camada extra de segurança à sua conta.
          Além da sua senha, você precisará fornecer um código de verificação ao fazer login.
        </p>
        <div className="flex items-center">
          <button
            onClick={toggleTwoFactor}
            disabled={loading}
            className={`px-4 py-2 rounded transition-colors ${
              twoFactorEnabled 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-anny-green hover:bg-anny-green/90 text-white'
            }`}
          >
            {loading ? 'Processando...' : twoFactorEnabled ? 'Desativar 2FA' : 'Ativar 2FA'}
          </button>
          <span className="ml-4">
            Status: 
            <span className={`font-semibold ${twoFactorEnabled ? 'text-green-600' : 'text-gray-600'}`}>
              {twoFactorEnabled ? ' Ativado' : ' Desativado'}
            </span>
          </span>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Alterar Senha</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="current-password" className="font-medium">Senha Atual</label>
            <input 
              id="current-password"
              name="current-password"
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
              name="new-password"
              type="password" 
              className="anny-input"
              placeholder="Digite sua nova senha"
              minLength={6}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirm-password" className="font-medium">Confirme a Nova Senha</label>
            <input 
              id="confirm-password"
              name="confirm-password"
              type="password" 
              className="anny-input"
              placeholder="Confirme sua nova senha"
              minLength={6}
              required
            />
          </div>
          <button 
            type="submit" 
            className="anny-btn-primary mt-4"
            disabled={loading}
          >
            {loading ? "Processando..." : "Atualizar Senha"}
          </button>
        </form>
      </div>
    </>
  );
};

export default SecurityTab;
