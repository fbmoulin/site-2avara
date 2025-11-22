# 2ª Vara Cível de Cariacica - Website Oficial

<div align="center">

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.8.2-blue)

Website oficial da 2ª Vara Cível de Cariacica - Tribunal de Justiça do Espírito Santo (TJES)

[Demo](#) · [Reportar Bug](https://github.com/fbmoulin/site-2avara/issues) · [Requisitar Feature](https://github.com/fbmoulin/site-2avara/issues)

</div>

---

## 📋 Sobre o Projeto

Aplicação full-stack moderna desenvolvida para a 2ª Vara Cível de Cariacica, oferecendo serviços digitais ao cidadão, com integração de chatbot de IA para atendimento virtual, formulários interativos, e painel administrativo para gestão de mensagens, agendamentos e demandas.

### ✨ Características Principais

- 🤖 **Chatbot com IA**: Assistente virtual alimentado por Google Gemini com integração ao Google Maps
- 📱 **Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- ♿ **Acessibilidade**: Controles de tamanho de fonte, alto contraste e modo escuro
- 🔐 **Segurança**: Implementação de Helmet, CORS, Rate Limiting e validação Zod
- 📊 **Painel Admin**: Gerenciamento de contatos, agendamentos e demandas (AdminJS)
- 🎨 **Interface Moderna**: Design clean com Tailwind CSS e componentes React
- 📧 **Sistema de Email**: Integração com SendGrid para notificações
- 💾 **Banco de Dados**: Prisma ORM com SQLite (desenvolvimento) / PostgreSQL (produção)

---

## 🚀 Stack Tecnológica

### Frontend
- **React 19.2.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.8.2** - Superset JavaScript tipado
- **Vite 6.2.0** - Build tool e dev server de alta performance
- **Tailwind CSS** - Framework CSS utility-first (via classes inline)
- **Lucide React** - Biblioteca de ícones moderna
- **Google Generative AI** - SDK oficial do Gemini para chatbot

### Backend
- **Node.js + Express 4.21.2** - Framework web para Node.js
- **TypeScript 5.8.2** - Tipagem estática
- **Prisma 6.2.0** - ORM moderno para Node.js e TypeScript
- **SQLite** - Banco de dados para desenvolvimento
- **Zod 3.24.1** - Validação de esquemas TypeScript-first
- **Helmet 8.0.0** - Middleware de segurança HTTP
- **Express Rate Limit 7.5.0** - Proteção contra abuso de API
- **SendGrid** - Serviço de email transacional
- **AdminJS 7.8.13** - Painel administrativo auto-gerado
- **Bcrypt 5.1.1** - Hash de senhas

---

## 📂 Estrutura do Projeto

```
2avara-site/
├── frontend/
│   ├── api/                    # Cliente HTTP e serviços
│   │   └── client.ts          # API client para backend
│   ├── components/            # Componentes React
│   │   ├── Chatbot.tsx        # Widget de chat com Gemini AI
│   │   └── Icons.tsx          # Componentes de ícones
│   ├── services/              # Serviços de integração
│   │   └── geminiService.ts   # Integração Google Gemini
│   ├── App.tsx                # Componente principal da aplicação
│   ├── constants.ts           # Dados estáticos (serviços, FAQs, notícias)
│   ├── types.ts               # Definições TypeScript
│   ├── index.tsx              # Entry point React
│   ├── index.html             # HTML shell
│   ├── vite.config.ts         # Configuração Vite
│   └── package.json           # Dependências frontend
│
├── backend/
│   ├── src/
│   │   ├── config/            # Configurações
│   │   │   ├── database.ts    # Cliente Prisma
│   │   │   └── email.ts       # Configuração SendGrid
│   │   ├── controllers/       # Lógica de negócio
│   │   │   ├── contact.controller.ts
│   │   │   ├── appointment.controller.ts
│   │   │   └── demand.controller.ts
│   │   ├── routes/            # Rotas da API
│   │   │   ├── contact.routes.ts
│   │   │   ├── appointment.routes.ts
│   │   │   └── demand.routes.ts
│   │   ├── middleware/        # Middlewares Express
│   │   │   ├── rateLimiter.ts # Rate limiting
│   │   │   └── validator.ts   # Validação Zod
│   │   ├── services/          # Serviços de negócio
│   │   │   └── email.service.ts
│   │   ├── admin.ts           # Configuração AdminJS
│   │   └── server.ts          # Entry point do servidor
│   ├── prisma/
│   │   ├── schema.prisma      # Schema do banco de dados
│   │   └── dev.db             # Banco SQLite (dev)
│   └── package.json           # Dependências backend
│
├── .env.local                 # Variáveis de ambiente (frontend)
├── backend/.env               # Variáveis de ambiente (backend)
├── CLAUDE.md                  # Instruções para Claude Code
└── README.md                  # Este arquivo
```

---

## 🛠️ Instalação e Configuração

### Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** ou **yarn**
- **Git**
- Chave API do Google Gemini ([obter aqui](https://aistudio.google.com/app/apikey))

### 1. Clonar o Repositório

```bash
git clone https://github.com/fbmoulin/site-2avara.git
cd site-2avara
```

### 2. Configurar Frontend

```bash
# Instalar dependências
npm install

# Criar arquivo .env.local
cat > .env.local << EOF
GEMINI_API_KEY=sua_chave_api_aqui
VITE_API_URL=http://localhost:4000/api
EOF
```

### 3. Configurar Backend

```bash
cd backend

# Instalar dependências
npm install

# Criar arquivo .env
cat > .env << EOF
# Database
DATABASE_URL="file:./dev.db"

# Server
PORT=4000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"

# SendGrid (opcional - modo demo se vazio)
SENDGRID_API_KEY=""
EMAIL_FROM="noreply@2varacivel.jus.br"
EMAIL_TO="2varacivel@tjes.jus.br"

# AdminJS
ADMIN_EMAIL="admin@tjes.jus.br"
ADMIN_PASSWORD="admin123"
SESSION_SECRET="sua-chave-secreta-aqui"

# CORS
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:5173"
EOF

# Gerar Prisma Client
npx prisma generate

# Executar migrations
npx prisma migrate dev
```

---

## 🚀 Executando a Aplicação

### Desenvolvimento

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Servidor disponível em: `http://localhost:4000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Aplicação disponível em: `http://localhost:3000`

### Produção

**Build Frontend:**
```bash
npm run build
npm run preview
```

**Build Backend:**
```bash
cd backend
npm run build
npm start
```

---

## 🎯 Funcionalidades

### Para o Cidadão

#### 🏠 Página Principal
- Informações sobre a vara cível
- Biografia da magistrada
- Notícias e comunicados
- Serviços judiciais integrados (PJe, Balcão Virtual)

#### 💬 Chatbot de IA
- Atendimento virtual 24/7
- Respostas contextualizadas sobre serviços jurídicos
- Integração com Google Maps para localização
- Interface conversacional intuitiva

#### 📝 Formulários Interativos
1. **Mensagem de Contato**
   - Validação de campos (nome, telefone, email)
   - Categorização por assunto
   - Confirmação de envio

2. **Agendamento de Atendimento**
   - Escolha de tipo (presencial/virtual)
   - Seleção de destinatário (assessoria/juiz)
   - Data e horário preferencial
   - Geração automática de link Zoom (virtual)

3. **Registro de Demandas**
   - Tipos: Reclamação, Celeridade, Petição Urgente
   - Número do processo
   - Descrição detalhada
   - Priorização automática

#### ♿ Acessibilidade
- Aumentar/diminuir tamanho da fonte
- Modo de alto contraste
- Modo escuro
- Navegação por teclado
- Labels ARIA para leitores de tela

### Para Administradores

#### 🔐 Painel AdminJS (Em desenvolvimento)
- Login seguro com bcrypt
- Gerenciamento de mensagens de contato
- Gestão de agendamentos
- Acompanhamento de demandas
- Exportação de dados

---

## 🔌 API Endpoints

### Contato
```http
POST /api/contact
Content-Type: application/json

{
  "name": "João Silva",
  "phone": "(27) 99999-9999",
  "email": "joao@example.com",
  "subject": "Informação sobre processo",
  "message": "Gostaria de saber o andamento do processo 12345..."
}

Response: 201 Created
{
  "success": true,
  "id": "uuid-gerado",
  "message": "Mensagem enviada com sucesso"
}
```

### Agendamento
```http
POST /api/appointments
Content-Type: application/json

{
  "type": "virtual",
  "withWhom": "assessoria",
  "name": "Maria Santos",
  "oabNumber": "ES 12345",
  "processNumber": "0012345-67.2024.8.08.0012",
  "reason": "Esclarecimento sobre prazo",
  "preferredDate": "2024-12-01T14:00:00Z"
}

Response: 201 Created
{
  "success": true,
  "id": "uuid-gerado",
  "status": "pre_reserved",
  "zoomLink": "https://zoom.us/j/..."
}
```

### Demanda
```http
POST /api/demands
Content-Type: application/json

{
  "processNumber": "0012345-67.2024.8.08.0012",
  "demandType": "celeridade",
  "description": "Processo parado há 60 dias aguardando despacho..."
}

Response: 201 Created
{
  "success": true,
  "id": "uuid-gerado",
  "status": "pending",
  "priority": "normal"
}
```

### Health Check
```http
GET /health

Response: 200 OK
{
  "status": "ok",
  "timestamp": "2024-11-22T14:00:00.000Z",
  "environment": "development"
}
```

---

## 💾 Banco de Dados

### Schema Prisma

#### ContactMessage
- Mensagens de contato do formulário
- Status: pending, answered, archived
- Campos de auditoria (createdAt, answeredAt, answeredBy)

#### Appointment
- Agendamentos de atendimento
- Tipos: presencial, virtual
- Status: pre_reserved, confirmed, completed, cancelled
- Integração com Zoom para atendimentos virtuais

#### Demand
- Demandas e reclamações
- Tipos: reclamacao, celeridade, peticao_urgente
- Prioridades: low, normal, high, urgent
- Status: pending, in_analysis, resolved, archived

### Comandos Prisma

```bash
# Gerar cliente
npx prisma generate

# Criar migration
npx prisma migrate dev --name descricao_da_mudanca

# Visualizar banco de dados
npx prisma studio

# Reset banco (CUIDADO!)
npx prisma migrate reset
```

---

## 🔐 Variáveis de Ambiente

### Frontend (`.env.local`)
```env
GEMINI_API_KEY=         # Chave API do Google Gemini (obrigatório)
VITE_API_URL=           # URL do backend (padrão: http://localhost:4000/api)
```

### Backend (`backend/.env`)
```env
# Database
DATABASE_URL=           # Conexão Prisma (SQLite/PostgreSQL)

# Server
PORT=                   # Porta do servidor (padrão: 4000)
NODE_ENV=               # Ambiente: development/production
FRONTEND_URL=           # URL do frontend para CORS

# Email (opcional)
SENDGRID_API_KEY=       # Chave API SendGrid
EMAIL_FROM=             # Email remetente
EMAIL_TO=               # Email destinatário

# AdminJS
ADMIN_EMAIL=            # Email do administrador
ADMIN_PASSWORD=         # Senha do admin (use hash em produção)
SESSION_SECRET=         # Segredo para sessões (min 32 caracteres)

# CORS
ALLOWED_ORIGINS=        # Origens permitidas (separadas por vírgula)
```

---

## 🚢 Deploy

### Frontend (Vercel/Netlify)

```bash
# Build
npm run build

# Deploy pasta dist/
# Configure variáveis de ambiente no painel
```

### Backend (Render/Railway/Fly.io)

```bash
# Preparação
cd backend
npm run build

# Configure as variáveis de ambiente
# Use PostgreSQL em produção (não SQLite)

# Comando start
npm start
```

### Migração para PostgreSQL (Produção)

1. Atualizar `backend/prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Atualizar `DATABASE_URL` no `.env`:
```env
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

3. Executar migrations:
```bash
npx prisma migrate deploy
```

---

## 🧪 Testes

```bash
# Frontend (a implementar)
npm test

# Backend (a implementar)
cd backend
npm test

# TypeScript check
npx tsc --noEmit
```

---

## 📝 Scripts Disponíveis

### Frontend
- `npm run dev` - Inicia servidor de desenvolvimento (porta 3000)
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção

### Backend
- `npm run dev` - Inicia servidor com hot reload (tsx watch)
- `npm run build` - Compila TypeScript para JavaScript
- `npm start` - Inicia servidor de produção
- `npm run migrate` - Executa migrations do banco

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, siga estes passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👥 Autores

- **Lex Intelligentia** - *Desenvolvimento Inicial* - [lex@intelligentia.dev](mailto:lex@intelligentia.dev)

---

## 🙏 Agradecimentos

- Tribunal de Justiça do Espírito Santo (TJES)
- 2ª Vara Cível de Cariacica
- Google Gemini AI
- Comunidade Open Source

---

## 📞 Suporte

Para suporte, envie um email para [2varacivel@tjes.jus.br](mailto:2varacivel@tjes.jus.br) ou abra uma issue no GitHub.

---

<div align="center">

**[⬆ Voltar ao topo](#2ª-vara-cível-de-cariacica---website-oficial)**

Desenvolvido com ❤️ para a Justiça do Espírito Santo

</div>
