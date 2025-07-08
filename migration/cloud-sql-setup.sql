-- Setup inicial do Google Cloud SQL PostgreSQL
-- Execute após criar a instância Cloud SQL

-- Criar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Criar enums necessários
CREATE TYPE tenant_type AS ENUM ('patient', 'association', 'government');
CREATE TYPE user_type AS ENUM ('master', 'association', 'patient');

-- Criar tabela profiles
CREATE TABLE public.profiles (
    id uuid NOT NULL,
    user_type user_type NOT NULL DEFAULT 'patient'::user_type,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    tenant_id uuid,
    birth_date date,
    two_factor_enabled boolean DEFAULT false,
    last_login timestamp with time zone,
    notify_email boolean DEFAULT false,
    notify_push boolean DEFAULT false,
    newsletter boolean DEFAULT false,
    avatar_url text,
    email text NOT NULL,
    full_name text,
    cpf text,
    gender text,
    sus_card text,
    medical_conditions text[],
    medications text[],
    position text,
    phone text,
    address text,
    zip_code text,
    CONSTRAINT profiles_pkey PRIMARY KEY (id)
);

-- Criar tabela tenants
CREATE TABLE public.tenants (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    type tenant_type NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    area_of_activity text,
    name text NOT NULL,
    institution_name text,
    cnpj text,
    CONSTRAINT tenants_pkey PRIMARY KEY (id)
);

-- Criar tabela symptom_diary
CREATE TABLE public.symptom_diary (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    intensity integer NOT NULL,
    symptom_type text NOT NULL,
    notes text,
    CONSTRAINT symptom_diary_pkey PRIMARY KEY (id)
);

-- Criar tabela audit_logs
CREATE TABLE public.audit_logs (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid,
    entity_id uuid,
    old_values jsonb,
    new_values jsonb,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    ip_address text,
    user_agent text,
    action text NOT NULL,
    entity text NOT NULL,
    CONSTRAINT audit_logs_pkey PRIMARY KEY (id)
);

-- Adicionar foreign keys
ALTER TABLE public.profiles ADD CONSTRAINT profiles_tenant_id_fkey 
    FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);

-- Habilitar RLS nas tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptom_diary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- Recriar funções necessárias
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    (NEW.raw_user_meta_data->>'type')::public.user_type
  );
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.log_user_activity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
    INSERT INTO public.audit_logs (
        user_id,
        action,
        entity,
        entity_id,
        old_values,
        new_values,
        ip_address
    )
    VALUES (
        auth.uid(),
        TG_OP,
        TG_TABLE_NAME,
        CASE 
            WHEN TG_OP = 'DELETE' THEN OLD.id
            ELSE NEW.id
        END,
        CASE 
            WHEN TG_OP = 'UPDATE' OR TG_OP = 'DELETE' 
            THEN to_jsonb(OLD)
            ELSE NULL
        END,
        CASE 
            WHEN TG_OP = 'UPDATE' OR TG_OP = 'INSERT' 
            THEN to_jsonb(NEW)
            ELSE NULL
        END,
        current_setting('request.headers')::json->>'x-forwarded-for'
    );
    
    RETURN NULL;
END;
$function$;

-- Criar índices para performance
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_user_type ON public.profiles(user_type);
CREATE INDEX idx_symptom_diary_user_id ON public.symptom_diary(user_id);
CREATE INDEX idx_symptom_diary_created_at ON public.symptom_diary(created_at);
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);