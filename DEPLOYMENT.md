# Guia de Deploy - 2a Vara Civel de Cariacica

## Arquitetura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Frontend     │────▶│     Backend     │────▶│    Supabase     │
│  (React/Vite)   │     │   (Express)     │     │  (PostgreSQL)   │
│                 │     │                 │     │                 │
│  Vercel/Netlify │     │ Render/Railway  │     │   supabase.com  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │
         │                      │
         ▼                      ▼
   Google Gemini          SendGrid
     (Chatbot)             (Email)
```

## Passo a Passo

### 1. Configurar Supabase

1. Criar conta em https://supabase.com
2. Criar novo projeto
3. Aguardar provisionamento (~2 min)
4. Ir em **Project Settings** > **Database**
5. Copiar as connection strings:

   **Transaction Mode (para aplicacao):**
   ```
   postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

   **Session Mode (para migrations):**
   ```
   postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
   ```

### 2. Preparar Schema para Producao

```bash
# Copiar schema do Supabase
cp backend/prisma/schema.postgresql.prisma backend/prisma/schema.prisma
```

### 3. Configurar Variaveis de Ambiente

**Backend (.env):**
```env
# Supabase Database
DATABASE_URL="postgresql://postgres.[REF]:[PASS]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[REF]:[PASS]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# Server
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://seu-frontend.vercel.app
ALLOWED_ORIGINS=https://seu-frontend.vercel.app

# Security (gerar valores seguros!)
SESSION_SECRET=<openssl rand -base64 32>

# Email (opcional)
SENDGRID_API_KEY=<sua-chave>
EMAIL_FROM=noreply@seu-dominio.com
EMAIL_TO=admin@seu-dominio.com
```

### 4. Executar Migrations

```bash
cd backend

# Gerar Prisma Client
npm run db:generate

# Aplicar migrations no Supabase
npm run db:migrate
```

### 5. Deploy do Backend

#### Render.com (Recomendado)
1. New → Web Service
2. Conectar repositório GitHub
3. Configurar:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run db:migrate && npm start`
4. Adicionar variaveis de ambiente (do passo 3)

#### Vercel (Serverless)
1. Importar repositório
2. Framework: Other
3. Root Directory: `backend`
4. Build Command: `npm install && npm run build`
5. Adicionar variaveis de ambiente

### 6. Deploy do Frontend

#### Vercel
1. Importar repositório
2. Framework: Vite
3. Root Directory: `.` (raiz)
4. Variaveis de ambiente:
   ```
   GEMINI_API_KEY=<sua-chave-api>
   VITE_API_URL=https://seu-backend.onrender.com/api
   ```

### 7. Verificar Deploy

1. Acessar URL do backend: `https://seu-backend.onrender.com/health`
2. Acessar frontend e testar formularios
3. Verificar dados no Supabase Dashboard > Table Editor

---

## Supabase - Recursos Adicionais

### Visualizar Dados
- Supabase Dashboard > Table Editor
- Ver tabelas: `contact_messages`, `appointments`, `demands`

### Backup Automatico
- Supabase Pro: backups diarios automaticos
- Free tier: exportar manualmente via pg_dump

### Row Level Security (Opcional)
O Supabase suporta RLS para seguranca adicional. Para este projeto, a API backend ja gerencia a seguranca.

---

## Comandos Uteis

```bash
# Backend - Local
cd backend
npm run dev          # Desenvolvimento
npm run build        # Build producao
npm run db:studio    # Interface visual do banco

# Frontend - Local
npm run dev          # Desenvolvimento
npm run build        # Build producao
npm run preview      # Preview do build

# Database
npm run db:generate  # Gerar Prisma Client
npm run db:migrate   # Aplicar migrations
npm run db:push      # Push schema (dev only)
```

---

## Troubleshooting

### Erro: "prepared statement already exists"
- Causa: Connection pooling com Prisma
- Solucao: Usar `?pgbouncer=true` na DATABASE_URL

### Erro: "Connection refused"
- Verificar se as URLs estao corretas
- Confirmar que a senha nao tem caracteres especiais sem encoding

### Erro de CORS
- Verificar `ALLOWED_ORIGINS` com URL exata (com https://)
- Nao incluir barra final na URL

### Migrations falham
- Usar `DIRECT_URL` (porta 5432) para migrations
- `DATABASE_URL` (porta 6543) para aplicacao

---

## Custos

| Servico | Plano Gratuito | Notas |
|---------|----------------|-------|
| **Supabase** | 500MB DB, 1GB storage | Ideal para comecar |
| **Vercel** | Ilimitado para frontend | Hobby plan |
| **Render** | 750h/mes | Backend (spin down apos 15min) |
| **SendGrid** | 100 emails/dia | Opcional |
| **Gemini** | Gratuito | Com limites de quota |

---

## Checklist Pre-Deploy

- [ ] Supabase projeto criado
- [ ] `DATABASE_URL` com `?pgbouncer=true`
- [ ] `DIRECT_URL` com porta 5432
- [ ] Schema copiado: `schema.postgresql.prisma` → `schema.prisma`
- [ ] Migrations executadas com sucesso
- [ ] `SESSION_SECRET` com 32+ caracteres
- [ ] `ALLOWED_ORIGINS` configurado
- [ ] Frontend `VITE_API_URL` apontando para backend
- [ ] HTTPS em todos os servicos
