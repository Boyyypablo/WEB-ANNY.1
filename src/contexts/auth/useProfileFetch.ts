
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from './types';

export function useProfileFetch() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

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
    }
  };

  const refreshProfile = async (userId?: string) => {
    if (userId) {
      await fetchProfile(userId);
    }
  };

  return {
    profile,
    isAdmin,
    fetchProfile,
    refreshProfile,
    setProfile
  };
}
