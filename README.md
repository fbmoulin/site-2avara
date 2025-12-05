# 2ª Vara Cível de Cariacica - Portal Oficial

<div align="center">

![Version](https://img.shields.io/badge/version-2.5.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.8.2-blue)

Portal de serviços digitais da 2ª Vara Cível de Cariacica - TJES

</div>

## Sobre

Aplicação full-stack com assistente virtual (Google Gemini), formulários interativos, agendamento de atendimentos, painel administrativo protegido e conformidade LGPD.

### Funcionalidades

- **Assistente Virtual (IA)** - Chatbot com Google Gemini + Google Maps
- **Agendamento** - Presencial e virtual (Zoom)
- **Formulários** - Contato, demandas e reclamações
- **LGPD** - Política de Privacidade e Termos de Uso
- **Acessibilidade** - Fonte, contraste e modo escuro (e-MAG 3.1)
- **Painel Admin** - Gerenciamento de artigos com autenticação Replit
- **Notícias TJES** - Atualização automática diária

## Stack

| Frontend | Backend |
|----------|---------|
| React 19.2 | Express 4.21 |
| TypeScript 5.8 | Prisma + PostgreSQL |
| Vite 6.2 | Google GenAI |
| Tailwind CSS | Nodemailer + Gmail |

## Instalação

```bash
# Clonar e instalar
git clone https://github.com/fbmoulin/site-2avara.git
cd site-2avara
npm install
cd backend && npm install && cd ..

# Configurar banco
cd backend && npx prisma generate && npx prisma migrate dev && cd ..
```

## Configuração

```env
# Secrets (obrigatório)
GEMINI_API_KEY=sua_chave_gemini
GMAIL_APP_PASSWORD=senha_app_gmail_16_caracteres

# Backend (.env)
DATABASE_URL="postgresql://..."  # PostgreSQL Replit
BACKEND_PORT=3001
NODE_ENV=development

# Email
EMAIL_FROM=2acivelcariacica@gmail.com
EMAIL_TO=2acivelcariacica@gmail.com
```

## Executando

```bash
# Desenvolvimento
cd backend && npm run dev  # Terminal 1
npm run dev                # Terminal 2

# Produção
npm run build
npm run start:backend & npm start
```

## API

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/chat` | Chatbot | - |
| POST | `/api/contact` | Contato | - |
| POST | `/api/appointments` | Agendamento | - |
| POST | `/api/demands` | Demandas | - |
| GET | `/api/articles` | Listar artigos | - |
| POST | `/api/articles` | Criar artigo | Replit Auth |
| PUT | `/api/articles/:id` | Editar artigo | Replit Auth |
| DELETE | `/api/articles/:id` | Excluir artigo | Replit Auth |
| GET | `/api/news` | Notícias TJES | - |
| GET | `/api/auth/user` | Usuário logado | - |
| GET | `/health` | Health check | - |

## Estrutura

```
├── components/          # React components
│   ├── AdminArticles.tsx   # Painel admin de artigos
│   ├── Chatbot.tsx         # Assistente virtual
│   └── LegalDocuments.tsx  # Políticas LGPD
├── hooks/
│   └── useAuth.ts       # Hook de autenticação
├── services/            # Frontend services
├── backend/
│   ├── src/routes/      # API routes
│   ├── src/services/    # Gemini, email, news
│   ├── src/middleware/  # Auth, rate limit
│   └── prisma/          # Database schema
├── App.tsx              # Main component
└── prod-server.js       # Production server
```

## Segurança

- **Autenticação**: Replit Auth para painel administrativo
- **Proteção XSS**: Helmet.js
- **Rate Limiting**: 100 req/min geral, 3-10 req/15min por formulário
- **CORS**: Configurado para domínios Replit
- **Sessões**: Armazenadas em PostgreSQL

## Deploy

Consulte [DEPLOYMENT.md](DEPLOYMENT.md) para instruções detalhadas.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

**2ª Vara Cível de Cariacica**  
Fórum Des. Américo Ribeiro Coelho  
R. Meridional, 1000 - Alto Lage, Cariacica - ES

- Email: 2acivelcariacica@gmail.com
- Telefone: (27) 3246-5641
