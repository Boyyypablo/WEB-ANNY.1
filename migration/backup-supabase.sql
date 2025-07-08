-- Script para backup completo do banco Supabase
-- Execute no terminal: pg_dump -h db.ovdujjdkllucjlzargsl.supabase.co -U postgres -d postgres > backup-supabase.sql

-- Backup das tabelas específicas
-- Tabela profiles
SELECT * FROM profiles;

-- Tabela symptom_diary  
SELECT * FROM symptom_diary;

-- Tabela tenants
SELECT * FROM tenants;

-- Tabela audit_logs
SELECT * FROM audit_logs;

-- Backup do schema das tabelas
\d+ profiles;
\d+ symptom_diary;
\d+ tenants;
\d+ audit_logs;

-- Backup das políticas RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE schemaname = 'public';

-- Backup das funções personalizadas
SELECT routine_name, routine_definition 
FROM information_schema.routines 
WHERE routine_schema = 'public';

-- Backup dos triggers
SELECT trigger_name, event_manipulation, event_object_table, action_statement
FROM information_schema.triggers 
WHERE trigger_schema = 'public';