
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

export async function signIn(email: string, password: string) {
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(`Falha no login: ${error.message}`);
      return { error };
    }
    toast.success("Login efetuado com sucesso!");
    
    return { error: null };
  } catch (error: any) {
    toast.error(`Erro no login: ${error.message}`);
    return { error };
  }
}

export async function signUp(email: string, password: string, type: string) {
  try {
    const validUserTypes = ['master', 'association', 'patient'];
    // Ensure type is one of the valid enum values
    const userType = validUserTypes.includes(type) ? type : 'patient';
    
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          type: userType
        }
      }
    });
    
    if (error) {
      toast.error(`Falha no cadastro: ${error.message}`);
      return { error };
    }
    
    // If it's an association or government account, create a tenant
    if (userType === 'association' || userType === 'master') {
      // Extract the username part from the email for a basic tenant name
      const tenantName = email.split('@')[0];
      const tenantType = userType === 'master' ? 'government' : 'association';
      
      const { data: tenant, error: tenantError } = await supabase
        .from('tenants')
        .insert({ 
          name: tenantName,
          type: tenantType as any
        })
        .select()
        .single();
        
      if (tenantError) {
        console.error("Error creating tenant:", tenantError);
      } else if (tenant && data.user) {
        // Update the profile with tenant_id
        await supabase
          .from('profiles')
          .update({ tenant_id: tenant.id })
          .eq('id', data.user.id);
      }
    }
    
    toast.success("Cadastro realizado com sucesso!");
    return { error: null };
  } catch (error: any) {
    toast.error(`Erro no cadastro: ${error.message}`);
    return { error };
  }
}

export async function updateLastLogin(userId: string) {
  if (userId) {
    return await supabase
      .from('profiles')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userId);
  }
  return null;
}

export async function signOut() {
  return await supabase.auth.signOut();
}
