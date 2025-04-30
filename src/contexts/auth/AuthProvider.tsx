
import React, { createContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType } from './types';
import { useProfileFetch } from './useProfileFetch';
import { signIn as authSignIn, signUp as authSignUp, signOut as authSignOut, updateLastLogin } from './authActions';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { profile, isAdmin, fetchProfile, refreshProfile } = useProfileFetch();
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
