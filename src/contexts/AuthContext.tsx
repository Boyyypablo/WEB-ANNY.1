
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, type: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (event === 'SIGNED_OUT') {
        setProfile(null);
        setIsAdmin(false);
      }
      
      // Use setTimeout to avoid recursion with fetchProfile
      if (session?.user) {
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Erro ao buscar perfil:', error);
      } else if (data) {
        setProfile(data);
        setIsAdmin(data.user_type === 'master');
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(`Falha no login: ${error.message}`);
        return { error };
      }
      toast.success("Login efetuado com sucesso!");
      
      // Update last login timestamp
      if (user?.id) {
        await supabase
          .from('profiles')
          .update({ last_login: new Date().toISOString() })
          .eq('id', user.id);
      }
      
      navigate('/home');
      return { error: null };
    } catch (error: any) {
      toast.error(`Erro no login: ${error.message}`);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, type: string) => {
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
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        session, 
        user, 
        profile, 
        loading, 
        signIn, 
        signUp, 
        signOut, 
        isAdmin,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
