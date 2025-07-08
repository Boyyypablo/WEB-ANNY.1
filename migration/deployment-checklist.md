# Checklist de Migração para Google Cloud SQL

## Fase 1: Preparação (1-2 dias)

### ✅ Google Cloud Setup
- [ ] Criar projeto no Google Cloud Console
- [ ] Ativar API do Cloud SQL
- [ ] Configurar billing account
- [ ] Instalar Google Cloud CLI

### ✅ Criar Instância Cloud SQL
```bash
gcloud sql instances create projeto-anny-db \
    --database-version=POSTGRES_15 \
    --tier=db-f1-micro \
    --region=us-central1 \
    --storage-size=10GB \
    --storage-type=SSD \
    --backup-start-time=03:00 \
    --enable-bin-log
```

### ✅ Configurar Rede e Segurança
- [ ] Configurar IP autorizado para acesso externo
- [ ] Criar usuário de banco de dados
- [ ] Configurar SSL obrigatório
- [ ] Configurar VPC se necessário

### ✅ Backup Supabase
- [ ] Executar script `backup-supabase.sql`
- [ ] Exportar dados usando pg_dump
- [ ] Salvar backup em local seguro
- [ ] Verificar integridade do backup

## Fase 2: Migração de Dados (1 dia)

### ✅ Setup Inicial Cloud SQL
- [ ] Executar `cloud-sql-setup.sql`
- [ ] Verificar criação de tabelas
- [ ] Verificar criação de índices
- [ ] Verificar funções e triggers

### ✅ Migração de Dados
- [ ] Executar `migrate-data.sql`
- [ ] Verificar contagem de registros
- [ ] Validar integridade referencial
- [ ] Testar queries principais

### ✅ Configuração de Segurança
- [ ] Configurar políticas RLS adaptadas
- [ ] Testar permissões de acesso
- [ ] Configurar auditoria
- [ ] Configurar backups automáticos

## Fase 3: Adaptação da Aplicação (2-3 dias)

### ✅ Configuração da Aplicação
- [ ] Atualizar variáveis de ambiente
- [ ] Configurar connection string Cloud SQL
- [ ] Testar conectividade da aplicação
- [ ] Configurar pool de conexões

### ✅ Migração de Autenticação
- [ ] Configurar Firebase Auth
- [ ] Migrar usuarios existentes
- [ ] Atualizar componentes de login/signup
- [ ] Testar fluxo de autenticação completo

### ✅ Adaptação do Código
- [ ] Substituir chamadas `supabase.auth` por Firebase
- [ ] Atualizar contexto de autenticação
- [ ] Adaptar políticas RLS para novo sistema
- [ ] Testar todas as funcionalidades

### ✅ Testes
- [ ] Testar cadastro de usuários
- [ ] Testar login/logout
- [ ] Testar CRUD de dados
- [ ] Testar permissões e segurança
- [ ] Testar performance

## Fase 4: Cutover e Validação (1 dia)

### ✅ Preparação Final
- [ ] Comunicar manutenção aos usuários
- [ ] Fazer backup final do Supabase
- [ ] Preparar rollback plan
- [ ] Configurar monitoramento

### ✅ Migração Final
- [ ] Parar aplicação temporariamente
- [ ] Migrar dados delta (últimas alterações)
- [ ] Atualizar DNS/configurações
- [ ] Iniciar aplicação com novo banco

### ✅ Validação Pós-Migração
- [ ] Testar funcionalidades críticas
- [ ] Verificar logs de erro
- [ ] Monitorar performance
- [ ] Validar com usuários de teste
- [ ] Comunicar conclusão da migração

## Scripts Necessários

1. **backup-supabase.sql** - Backup completo do Supabase
2. **cloud-sql-setup.sql** - Setup inicial do Cloud SQL
3. **migrate-data.sql** - Migração dos dados
4. **firebase-auth-setup.js** - Configuração Firebase Auth

## Variáveis de Ambiente

Atualizar no arquivo de configuração:
```env
VITE_CLOUD_SQL_URL=https://your-cloud-sql-instance.googleapis.com
VITE_CLOUD_SQL_ANON_KEY=your-cloud-sql-anon-key
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
```

## Monitoramento Pós-Migração

- [ ] Configurar alertas de erro
- [ ] Monitorar performance de queries
- [ ] Acompanhar uso de recursos
- [ ] Verificar logs de auditoria
- [ ] Monitorar custos

## Rollback Plan

Em caso de problemas:
1. Reverter DNS/configurações
2. Restaurar aplicação anterior
3. Comunicar status aos usuários
4. Investigar e corrigir problemas
5. Reagendar migração

## Custos Estimados

- **Cloud SQL**: ~$25-50/mês (instância f1-micro)
- **Firebase Auth**: Gratuito até 10k usuários
- **Backup Storage**: ~$5-10/mês
- **Network**: ~$5-15/mês

**Total estimado**: $35-75/mês