
import React, { createContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType } from './types';
import { useProfileFetch } from './useProfileFetch';
import { signIn as authSignIn, signUp as authSignUp, signOut as authSignOut, updateLastLogin } from './authActions';
import { toast } from '@/components/ui/sonner';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { profile, isAdmin, fetchProfile, refreshProfile, error: profileError } = useProfileFetch();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      }
      
      // Use setTimeout to avoid recursion with fetchProfile
      if (session?.user) {
        setTimeout(() => {
          fetchProfile(session.user.id).then(success => {
            // Finalizamos o loading mesmo se houver falha ao buscar o perfil
            setLoading(false);
            
            // Se houver erro ao buscar o perfil, exibimos uma mensagem mais amigável
            if (!success && profileError) {
              toast.error("Não foi possível carregar seu perfil. Tente novamente mais tarde.");
            }
          });
        }, 0);
      } else {
        setLoading(false);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id).then(() => {
          setLoading(false);
        }).catch(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }).catch(err => {
      console.error("Erro ao verificar sessão:", err);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const result = await authSignIn(email, password);
    if (!result.error && user?.id) {
      await updateLastLogin(user.id);
      navigate('/home');
    }
    return result;
  };

  const signUp = async (email: string, password: string, type: string) => {
    return await authSignUp(email, password, type);
  };

  const signOut = async () => {
    await authSignOut();
  };

  const refreshUserProfile = async () => {
    if (user?.id) {
      await refreshProfile(user.id);
    }
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
        refreshProfile: refreshUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
