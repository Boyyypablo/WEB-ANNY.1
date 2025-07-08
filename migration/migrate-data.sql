-- Script para migrar dados do Supabase para Cloud SQL
-- Execute após setup inicial do Cloud SQL

-- Inserir dados da tabela tenants
-- Substitua pelos dados reais do backup
INSERT INTO public.tenants (id, type, created_at, updated_at, area_of_activity, name, institution_name, cnpj)
SELECT id, type, created_at, updated_at, area_of_activity, name, institution_name, cnpj
FROM temp_tenants_backup;

-- Inserir dados da tabela profiles
-- Substitua pelos dados reais do backup
INSERT INTO public.profiles (
    id, user_type, created_at, updated_at, tenant_id, birth_date, 
    two_factor_enabled, last_login, notify_email, notify_push, newsletter,
    avatar_url, email, full_name, cpf, gender, sus_card, medical_conditions,
    medications, position, phone, address, zip_code
)
SELECT 
    id, user_type, created_at, updated_at, tenant_id, birth_date,
    two_factor_enabled, last_login, notify_email, notify_push, newsletter,
    avatar_url, email, full_name, cpf, gender, sus_card, medical_conditions,
    medications, position, phone, address, zip_code
FROM temp_profiles_backup;

-- Inserir dados da tabela symptom_diary
INSERT INTO public.symptom_diary (id, user_id, created_at, intensity, symptom_type, notes)
SELECT id, user_id, created_at, intensity, symptom_type, notes
FROM temp_symptom_diary_backup;

-- Inserir dados da tabela audit_logs
INSERT INTO public.audit_logs (
    id, user_id, entity_id, old_values, new_values, created_at,
    ip_address, user_agent, action, entity
)
SELECT 
    id, user_id, entity_id, old_values, new_values, created_at,
    ip_address, user_agent, action, entity
FROM temp_audit_logs_backup;

-- Verificar contagem de registros migrados
SELECT 'tenants' as tabela, COUNT(*) as registros FROM public.tenants
UNION ALL
SELECT 'profiles' as tabela, COUNT(*) as registros FROM public.profiles
UNION ALL
SELECT 'symptom_diary' as tabela, COUNT(*) as registros FROM public.symptom_diary
UNION ALL
SELECT 'audit_logs' as tabela, COUNT(*) as registros FROM public.audit_logs;

-- Recriar políticas RLS para Cloud SQL (adaptadas)
-- Políticas para profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT USING (id = current_user_id());

CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE USING (id = current_user_id());

-- Políticas para symptom_diary
CREATE POLICY "Users can view their own symptom entries" ON public.symptom_diary
FOR SELECT USING (user_id = current_user_id());

CREATE POLICY "Users can create their own symptom entries" ON public.symptom_diary
FOR INSERT WITH CHECK (user_id = current_user_id());

CREATE POLICY "Users can update their own symptom entries" ON public.symptom_diary
FOR UPDATE USING (user_id = current_user_id());

CREATE POLICY "Users can delete their own symptom entries" ON public.symptom_diary
FOR DELETE USING (user_id = current_user_id());

-- Políticas para tenants
CREATE POLICY "Users can view related tenants" ON public.tenants
FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = current_user_id() 
    AND profiles.tenant_id = tenants.id
));

-- Função para obter ID do usuário atual (substituindo auth.uid())
CREATE OR REPLACE FUNCTION current_user_id() 
RETURNS uuid 
LANGUAGE sql 
STABLE
AS $$
    SELECT COALESCE(
        current_setting('app.current_user_id', true)::uuid,
        '00000000-0000-0000-0000-000000000000'::uuid
    );
$$;