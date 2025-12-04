# Guia de Deploy - 2a Vara Civel de Cariacica

## Arquitetura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Frontend     │────▶│     Backend     │────▶│   PostgreSQL    │
│  (React/Vite)   │     │   (Express)     │     │   (Database)    │
│                 │     │                 │     │                 │
│  Vercel/Netlify │     │ Render/Railway  │     │ Render/Railway  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │
         │                      │
         ▼                      ▼
   Google Gemini          SendGrid
     (Chatbot)             (Email)
```

## Passo a Passo

### 1. Preparar Database PostgreSQL

#### Render.com (Recomendado)
1. Criar conta em https://render.com
2. New → PostgreSQL
3. Anotar a `External Database URL`

#### Railway
1. Criar conta em https://railway.app
2. New Project → Provision PostgreSQL
3. Copiar `DATABASE_URL` das variáveis

### 2. Deploy do Backend

#### Render.com
1. New → Web Service
2. Conectar repositório GitHub
3. Configurar:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run db:migrate && npm start`

4. Variáveis de ambiente:
   ```
   DATABASE_URL=<postgresql-url-do-passo-1>
   NODE_ENV=production
   PORT=3001
   FRONTEND_URL=https://seu-frontend.vercel.app
   ALLOWED_ORIGINS=https://seu-frontend.vercel.app
   SESSION_SECRET=<gerar-com-openssl-rand-base64-32>
   SENDGRID_API_KEY=<opcional>
   EMAIL_FROM=noreply@seu-dominio.com
   EMAIL_TO=admin@seu-dominio.com
   ```

#### Railway
1. New Project → Deploy from GitHub
2. Selecionar pasta `backend`
3. Adicionar variáveis de ambiente (mesmas acima)

### 3. Deploy do Frontend

#### Vercel (Recomendado)
1. Importar repositório em https://vercel.com
2. Configurar:
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (raiz)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. Variáveis de ambiente:
   ```
   GEMINI_API_KEY=<sua-chave-api>
   VITE_API_URL=https://seu-backend.onrender.com/api
   ```

#### Netlify
1. Importar repositório em https://netlify.com
2. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Adicionar variáveis de ambiente

### 4. Configurar Serviços Externos

#### Google Gemini API (Chatbot)
1. Acessar https://makersuite.google.com/app/apikey
2. Criar API Key
3. Adicionar como `GEMINI_API_KEY` no frontend

#### SendGrid (Email - Opcional)
1. Criar conta em https://sendgrid.com
2. Settings → API Keys → Create API Key
3. Adicionar como `SENDGRID_API_KEY` no backend

### 5. Migrar Database para Producao

Se usando PostgreSQL, antes do primeiro deploy:

```bash
# Copiar schema de producao
cp backend/prisma/schema.postgresql.prisma backend/prisma/schema.prisma

# Ou editar manualmente e mudar provider para "postgresql"
```

O deploy automaticamente executara `npm run db:migrate`.

## Checklist Pre-Deploy

- [ ] PostgreSQL configurado e acessivel
- [ ] `DATABASE_URL` com SSL (`?sslmode=require`)
- [ ] `SESSION_SECRET` com 32+ caracteres aleatorios
- [ ] `ALLOWED_ORIGINS` com URL exata do frontend
- [ ] `FRONTEND_URL` configurado no backend
- [ ] `VITE_API_URL` apontando para backend
- [ ] `GEMINI_API_KEY` configurado (ou chatbot em modo demo)
- [ ] HTTPS habilitado em ambos servicos

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

## Troubleshooting

### Erro de CORS
- Verificar se `ALLOWED_ORIGINS` inclui a URL exata do frontend
- URLs devem incluir protocolo (`https://`)

### Database Connection Failed
- Verificar se `DATABASE_URL` inclui `?sslmode=require`
- Confirmar que IP do servidor esta liberado no firewall

### Chatbot Nao Funciona
- Verificar `GEMINI_API_KEY` no frontend
- Checar console do navegador para erros de API

### Emails Nao Enviados
- Verificar `SENDGRID_API_KEY`
- Confirmar que email de origem esta verificado no SendGrid

## Custos Estimados

| Servico | Plano Gratuito | Notas |
|---------|----------------|-------|
| Vercel | Sim | Frontend hosting |
| Render | Sim* | Backend + DB (spin down apos 15min) |
| Railway | $5 credito/mes | Backend + DB |
| SendGrid | 100 emails/dia | Email service |
| Gemini | Gratuito | Com limites de quota |

*Render free tier tem spin down - considere plano pago para producao.
