
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from './types';

export function useProfileFetch() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (userId: string) => {
    if (!userId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Erro ao buscar perfil:', error);
        setError(`Erro ao buscar perfil: ${error.message}`);
        // Se houver erro, pelo menos não deixamos o loading infinito
        setIsLoading(false);
        // Não atualizamos o perfil se houver erro - mantemos o estado anterior
        return false;
      } else if (data) {
        setProfile(data);
        setIsAdmin(data.user_type === 'master');
        setIsLoading(false);
        return true;
      }
    } catch (error: any) {
      console.error('Erro ao buscar perfil:', error);
      setError(`Erro ao buscar perfil: ${error.message}`);
      setIsLoading(false);
      return false;
    }
    
    setIsLoading(false);
    return false;
  };

  const refreshProfile = async (userId?: string) => {
    if (userId) {
      return await fetchProfile(userId);
    }
    return false;
  };

  return {
    profile,
    isAdmin,
    fetchProfile,
    refreshProfile,
    setProfile,
    isLoading,
    error
  };
}
