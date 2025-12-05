# Guia de Deploy - 2ª Vara Cível de Cariacica

## Arquitetura de Produção

```
┌─────────────────────────────────────────────────────────────────────┐
│                           INTERNET                                  │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      REPLIT / VERCEL / NETLIFY                      │
│                         (Frontend + Proxy)                          │
│                            Porta 5000                               │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                            Proxy /api
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND (Express + TypeScript)                   │
│                            Porta 3001                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │  Chat API    │  │  Forms API   │  │     Gemini Service       │  │
│  │  /api/chat   │  │  /api/*      │  │  (GEMINI_API_KEY aqui)   │  │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
          │                                       │
          ▼                                       ▼
┌──────────────────┐                   ┌──────────────────┐
│  Google Gemini   │                   │  PostgreSQL      │
│  + Google Maps   │                   │  (Supabase/Neon) │
└──────────────────┘                   └──────────────────┘
```

---

## Opção 1: Deploy no Replit (Recomendado)

O projeto está pré-configurado para Replit.

### Configuração Automática

1. **Importar repositório** no Replit
2. **Adicionar Secrets** no painel:
   - `GEMINI_API_KEY` - Chave da API do Google Gemini

### Workflows Configurados

| Workflow | Comando | Porta | Saída |
|----------|---------|-------|-------|
| Frontend | `npm run dev` | 5000 | Webview |
| Backend | `cd backend && npm run dev` | 3001 | Console |

### Deploy para Produção (Replit)

1. Clique em **Deploy** no Replit
2. Selecione **VM** (requer estado do backend)
3. Configuração:
   - Build: `npm run build` (compila frontend Vite + backend TypeScript)
   - Run: `npm run start:backend & npm start`
   
**Fluxo de Produção:**
```
npm run start:backend → cd backend && npm start → node dist/server.js (porta 3001)
npm start → node prod-server.js (porta 5000, serve frontend + proxy /api)
```

---

## Opção 2: Deploy Separado (Vercel + Render)

### Passo 1: Configurar Banco de Dados

#### Supabase (Recomendado)
```bash
# 1. Criar projeto em https://supabase.com
# 2. Copiar connection strings:

# Transaction Mode (aplicação):
postgresql://postgres.[REF]:[PASS]@pooler.supabase.com:6543/postgres?pgbouncer=true

# Session Mode (migrations):
postgresql://postgres.[REF]:[PASS]@pooler.supabase.com:5432/postgres
```

#### Neon (Alternativa)
```bash
# 1. Criar projeto em https://neon.tech
# 2. Copiar connection string
```

### Passo 2: Preparar Schema PostgreSQL

```bash
cd backend

# Usar schema PostgreSQL
cp prisma/schema.postgresql.prisma prisma/schema.prisma

# Gerar cliente
npx prisma generate

# Aplicar migrations
npx prisma migrate deploy
```

### Passo 3: Deploy do Backend (Render)

1. **New → Web Service** no Render
2. Conectar repositório GitHub
3. Configurar:

| Campo | Valor |
|-------|-------|
| Root Directory | `backend` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm run db:migrate && npm start` |

4. Variáveis de ambiente:

```env
DATABASE_URL=postgresql://...?pgbouncer=true
DIRECT_URL=postgresql://...:5432/postgres
GEMINI_API_KEY=sua_chave_aqui
NODE_ENV=production
BACKEND_PORT=3001
FRONTEND_URL=https://seu-frontend.vercel.app
ALLOWED_ORIGINS=https://seu-frontend.vercel.app
SESSION_SECRET=gerar_com_openssl_rand_base64_32
```

### Passo 4: Deploy do Frontend (Vercel)

1. **Import Project** no Vercel
2. Conectar repositório
3. Configurar:

| Campo | Valor |
|-------|-------|
| Framework | Vite |
| Root Directory | `.` (raiz) |
| Build Command | `npm run build` |
| Output Directory | `dist` |

4. Variáveis de ambiente:

```env
VITE_API_URL=https://seu-backend.onrender.com/api
```

**Nota:** Não adicione `GEMINI_API_KEY` no frontend!

---

## Variáveis de Ambiente

### Backend (Obrigatórias)

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `GEMINI_API_KEY` | Chave API Google Gemini | `AIza...` |
| `DATABASE_URL` | Conexão PostgreSQL | `postgresql://...` |
| `NODE_ENV` | Ambiente | `production` |
| `BACKEND_PORT` | Porta do servidor | `3001` |
| `FRONTEND_URL` | URL do frontend | `https://...` |
| `ALLOWED_ORIGINS` | CORS permitido | `https://...` |
| `SESSION_SECRET` | Segredo de sessão | `base64...` |

### Backend (Opcionais)

| Variável | Descrição |
|----------|-----------|
| `SENDGRID_API_KEY` | Chave SendGrid para emails |
| `EMAIL_FROM` | Email remetente |
| `EMAIL_TO` | Email destinatário |
| `ADMIN_EMAIL` | Email admin (AdminJS) |
| `ADMIN_PASSWORD` | Senha admin (AdminJS) |

### Frontend

| Variável | Descrição |
|----------|-----------|
| `VITE_API_URL` | URL da API (default: `/api`) |

---

## Servidor de Produção

O arquivo `prod-server.js` serve:
- Arquivos estáticos do frontend (`dist/`)
- Proxy de `/api` para o backend

```javascript
// Estrutura simplificada
app.use('/api', proxy('http://localhost:3001'));
app.use(express.static('dist'));
app.get('*', (req, res) => res.sendFile('dist/index.html'));
```

---

## Verificação do Deploy

### 1. Testar Health Check
```bash
curl https://seu-backend.onrender.com/health
# Esperado: {"status":"ok","timestamp":"...","environment":"production"}
```

### 2. Testar Chat API
```bash
curl -X POST https://seu-backend.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Olá","sessionId":"test"}'
# Esperado: {"success":true,"data":{"text":"..."}}
```

### 3. Testar Frontend
- Acessar URL do frontend
- Abrir chatbot e enviar mensagem
- Verificar se mapas aparecem ao perguntar localização

---

## Troubleshooting

### Erro: "Gemini API key not configured"
- Verificar se `GEMINI_API_KEY` está no backend
- NÃO adicionar no frontend

### Erro: CORS
- Verificar `ALLOWED_ORIGINS` inclui URL exata do frontend
- Incluir `https://` na URL
- Não incluir barra final

### Erro: "prepared statement already exists"
- Adicionar `?pgbouncer=true` na `DATABASE_URL`

### Chatbot não responde
- Verificar logs do backend
- Testar endpoint `/api/chat` diretamente
- Verificar quota do Gemini API

### Maps não aparecem no chat
- Perguntar especificamente sobre localização
- Verificar se `groundingMetadata` está sendo retornado
- Verificar console do frontend

---

## Custos Estimados

| Serviço | Plano Gratuito | Limitações |
|---------|----------------|------------|
| **Replit** | Core $20/mês | Recomendado para produção |
| **Supabase** | 500MB DB | Ideal para começar |
| **Vercel** | Ilimitado | Hobby plan |
| **Render** | 750h/mês | Spin down após 15min |
| **Gemini** | Gratuito | Limites de quota |
| **SendGrid** | 100 emails/dia | Opcional |

---

## Checklist de Deploy

### Pré-Deploy
- [ ] Banco de dados configurado
- [ ] `GEMINI_API_KEY` no backend
- [ ] Migrations executadas
- [ ] `SESSION_SECRET` gerado (32+ caracteres)
- [ ] `ALLOWED_ORIGINS` configurado

### Pós-Deploy
- [ ] Health check respondendo
- [ ] Chat API funcionando
- [ ] Frontend carregando
- [ ] Chatbot respondendo
- [ ] Maps aparecendo em perguntas de localização
- [ ] Formulários enviando
- [ ] HTTPS ativo em todos os serviços
