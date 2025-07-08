// Google Cloud SQL PostgreSQL client configuration
import { createClient } from '@supabase/supabase-js';

// Cloud SQL connection configuration
const CLOUD_SQL_URL = process.env.VITE_CLOUD_SQL_URL || "https://your-cloud-sql-instance.googleapis.com";
const CLOUD_SQL_ANON_KEY = process.env.VITE_CLOUD_SQL_ANON_KEY || "your-cloud-sql-anon-key";

// Create Cloud SQL client (using Supabase client structure for easier migration)
export const cloudSqlClient = createClient(CLOUD_SQL_URL, CLOUD_SQL_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  }
});

// Alternative: Direct PostgreSQL connection (uncomment if needed)
/*
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.VITE_CLOUD_SQL_HOST,
  port: parseInt(process.env.VITE_CLOUD_SQL_PORT || '5432'),
  database: process.env.VITE_CLOUD_SQL_DATABASE,
  user: process.env.VITE_CLOUD_SQL_USER,
  password: process.env.VITE_CLOUD_SQL_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
});

export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};
*/

// Database types (same as Supabase types for compatibility)
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_type: 'master' | 'association' | 'patient';
          created_at: string | null;
          updated_at: string | null;
          tenant_id: string | null;
          birth_date: string | null;
          two_factor_enabled: boolean | null;
          last_login: string | null;
          notify_email: boolean | null;
          notify_push: boolean | null;
          newsletter: boolean | null;
          avatar_url: string | null;
          email: string;
          full_name: string | null;
          cpf: string | null;
          gender: string | null;
          sus_card: string | null;
          medical_conditions: string[] | null;
          medications: string[] | null;
          position: string | null;
          phone: string | null;
          address: string | null;
          zip_code: string | null;
        };
        Insert: {
          id: string;
          user_type?: 'master' | 'association' | 'patient';
          email: string;
          full_name?: string | null;
          // ... outros campos opcionais
        };
        Update: {
          full_name?: string | null;
          phone?: string | null;
          address?: string | null;
          // ... outros campos que podem ser atualizados
        };
      };
      symptom_diary: {
        Row: {
          id: string;
          user_id: string;
          created_at: string;
          intensity: number;
          symptom_type: string;
          notes: string | null;
        };
        Insert: {
          user_id: string;
          intensity: number;
          symptom_type: string;
          notes?: string | null;
        };
        Update: {
          intensity?: number;
          symptom_type?: string;
          notes?: string | null;
        };
      };
      tenants: {
        Row: {
          id: string;
          type: 'patient' | 'association' | 'government';
          created_at: string;
          updated_at: string;
          area_of_activity: string | null;
          name: string;
          institution_name: string | null;
          cnpj: string | null;
        };
        Insert: {
          type: 'patient' | 'association' | 'government';
          name: string;
          area_of_activity?: string | null;
          institution_name?: string | null;
          cnpj?: string | null;
        };
        Update: {
          name?: string;
          area_of_activity?: string | null;
          institution_name?: string | null;
          cnpj?: string | null;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          entity_id: string | null;
          old_values: any | null;
          new_values: any | null;
          created_at: string;
          ip_address: string | null;
          user_agent: string | null;
          action: string;
          entity: string;
        };
        Insert: {
          user_id?: string | null;
          entity_id?: string | null;
          old_values?: any | null;
          new_values?: any | null;
          ip_address?: string | null;
          user_agent?: string | null;
          action: string;
          entity: string;
        };
        Update: {
          // audit_logs geralmente não são atualizados
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      tenant_type: 'patient' | 'association' | 'government';
      user_type: 'master' | 'association' | 'patient';
    };
  };
};