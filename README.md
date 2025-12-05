# 2ª Vara Cível de Cariacica - Portal Oficial

<div align="center">

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.8.2-blue)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4)

**Portal oficial de serviços digitais da 2ª Vara Cível de Cariacica**  
Tribunal de Justiça do Estado do Espírito Santo (TJES)

[Acessar Portal](#) · [Reportar Bug](https://github.com/fbmoulin/site-2avara/issues) · [Requisitar Feature](https://github.com/fbmoulin/site-2avara/issues)

</div>

---

## Sobre o Projeto

Aplicação full-stack moderna desenvolvida para a 2ª Vara Cível de Cariacica, oferecendo serviços digitais ao cidadão com **assistente virtual inteligente** alimentado por Google Gemini, formulários interativos para contato, agendamento e registro de demandas, e total conformidade com a **LGPD** (Lei Geral de Proteção de Dados).

### Funcionalidades Principais

| Funcionalidade | Descrição |
|----------------|-----------|
| **Assistente Virtual (IA)** | Chatbot com Google Gemini para triagem de atendimentos, agendamentos e orientações |
| **Integração Google Maps** | Localização do fórum com mapa interativo integrado ao chatbot |
| **Agendamento Inteligente** | Sistema de pré-reserva para atendimentos presenciais e virtuais (Zoom) |
| **Registro de Demandas** | Canal para reclamações, pedidos de celeridade e petições urgentes |
| **Conformidade LGPD** | Política de Privacidade e Termos de Uso integrados |
| **Acessibilidade** | Controles de fonte, alto contraste e modo escuro |
| **Segurança** | Helmet, CORS, Rate Limiting e validação de dados |

---

## Arquitetura

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USUÁRIO (Browser)                           │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                          │
│                         Porta 5000                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │   App.tsx   │  │  Chatbot    │  │   Forms     │  │ LegalDocs  │ │
│  │  (Layout)   │  │ (Frontend)  │  │ (Contato)   │  │  (LGPD)    │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                            Proxy /api
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND (Express + TypeScript)                   │
│                         Porta 3001                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │  Chat API   │  │  Contact    │  │ Appointment │  │  Demand    │ │
│  │  (Gemini)   │  │   API       │  │    API      │  │   API      │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
          │                                       │
          ▼                                       ▼
┌──────────────────┐                   ┌──────────────────┐
│  Google Gemini   │                   │  SQLite/Postgres │
│   (AI + Maps)    │                   │    (Prisma)      │
└──────────────────┘                   └──────────────────┘
```

---

## Stack Tecnológica

### Frontend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| React | 19.2.0 | Biblioteca para interfaces |
| TypeScript | 5.8.2 | Superset JavaScript tipado |
| Vite | 6.2.0 | Build tool e dev server |
| Tailwind CSS | CDN | Framework CSS utility-first |
| Lucide React | 0.554.0 | Biblioteca de ícones |

### Backend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| Express | 4.21.2 | Framework web Node.js |
| TypeScript | 5.8.2 | Tipagem estática |
| Prisma | 6.2.0 | ORM moderno |
| Google GenAI | 1.31.0 | SDK do Gemini |
| Zod | 3.24.1 | Validação de schemas |
| Helmet | 8.0.0 | Segurança HTTP |

---

## Estrutura do Projeto

```
/
├── components/                 # Componentes React
│   ├── Chatbot.tsx            # Widget de chat (UI)
│   ├── Icons.tsx              # Ícones centralizados
│   └── LegalDocuments.tsx     # Modais LGPD
├── services/
│   └── geminiService.ts       # Cliente API do chat (frontend)
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── chat.routes.ts      # API do chatbot
│   │   │   ├── contact.routes.ts   # API de contato
│   │   │   ├── appointment.routes.ts
│   │   │   └── demand.routes.ts
│   │   ├── services/
│   │   │   ├── chat.service.ts     # Integração Gemini (BACKEND)
│   │   │   └── email.service.ts
│   │   └── server.ts
│   └── prisma/
│       ├── schema.prisma
│       └── dev.db
├── attached_assets/            # Imagens e assets
├── App.tsx                     # Componente principal
├── constants.ts                # Dados estáticos
├── types.ts                    # Interfaces TypeScript
├── vite.config.ts              # Configuração Vite
├── prod-server.js              # Servidor de produção
└── replit.md                   # Documentação Replit
```

---

## Assistente Virtual (Chatbot)

O chatbot é alimentado por **Google Gemini 2.5 Flash** e implementa um protocolo de atendimento estruturado:

### Protocolo de Atendimento

```
1. IDENTIFICAÇÃO
   └── Pergunta se é Advogado ou Parte
       ├── Advogado → Solicita OAB
       └── Parte → Solicita CPF

2. TIPO DE ATENDIMENTO
   └── Presencial ou Virtual (Zoom)
       └── Destaca: Virtual tem MAIOR DISPONIBILIDADE

3. DIRECIONAMENTO
   └── Por padrão: Assessoria do Gabinete
       └── Juiz: Só se expressamente solicitado
           └── Informa: casos urgentes ou despacho pendente

4. COLETA DE DADOS
   ├── Nome completo
   ├── Número do processo
   └── Dúvida/Assunto ou Motivo

5. CONFIRMAÇÃO
   └── "Solicitação pré-reservada. Secretaria entrará em contato."
```

### Funcionalidades do Chatbot

- **Triagem de atendimentos** para advogados e partes
- **Agendamento** presencial e virtual (destaque para Zoom)
- **Registro de demandas** e reclamações
- **Localização do fórum** com Google Maps integrado
- **Informações gerais** sobre horário e contatos
- **Memória de sessão** para contexto da conversa

---

## Conformidade LGPD

O portal implementa conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018):

### Documentos Disponíveis

| Documento | Conteúdo |
|-----------|----------|
| **Política de Privacidade** | Dados coletados, finalidades, direitos do titular, segurança |
| **Termos de Uso** | Objeto, direitos/deveres, vedações, responsabilidades |

### Direitos do Titular (Art. 18 LGPD)

- Confirmação de tratamento
- Acesso aos dados
- Correção de dados
- Anonimização/bloqueio
- Portabilidade
- Revogação do consentimento

---

## Instalação

### Pré-requisitos

- Node.js >= 18.0.0
- npm ou yarn
- Chave API do Google Gemini

### Configuração Local

```bash
# Clonar repositório
git clone https://github.com/fbmoulin/site-2avara.git
cd site-2avara

# Instalar dependências do frontend
npm install

# Instalar dependências do backend
cd backend && npm install && cd ..

# Configurar banco de dados
cd backend && npx prisma generate && npx prisma migrate dev && cd ..
```

### Variáveis de Ambiente

**Secrets (obrigatórios):**
```env
GEMINI_API_KEY=sua_chave_gemini
```

**Backend (backend/.env):**
```env
DATABASE_URL="file:./prisma/dev.db"
BACKEND_PORT=3001
NODE_ENV=development
```

**Nota:** O `DATABASE_URL` é relativo ao diretório `backend/`.

---

## Executando

### Desenvolvimento

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
npm run dev
```

- Frontend: http://localhost:5000
- Backend: http://localhost:3001

### Produção

```bash
# Build completo (frontend Vite + backend TypeScript)
npm run build

# Iniciar servidores
npm run start:backend &  # Backend na porta 3001
npm start               # Frontend + proxy na porta 5000
```

**Nota:** O `prod-server.js` serve os arquivos estáticos do frontend e faz proxy das requisições `/api` para o backend.

---

## API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/chat` | Enviar mensagem ao chatbot |
| POST | `/api/chat/clear` | Limpar sessão do chat |
| POST | `/api/contact` | Enviar mensagem de contato |
| POST | `/api/appointments` | Criar agendamento |
| POST | `/api/demands` | Registrar demanda |
| GET | `/health` | Health check |

### Exemplo: Chat

```http
POST /api/chat
Content-Type: application/json

{
  "message": "Quero agendar um atendimento",
  "sessionId": "unique-session-id"
}

Response:
{
  "success": true,
  "data": {
    "text": "Resposta do assistente...",
    "groundingMetadata": { ... }
  }
}
```

---

## Acessibilidade

O portal implementa recursos de acessibilidade:

- **Ajuste de fonte**: 3 tamanhos (normal, grande, extra grande)
- **Alto contraste**: Modo de cores otimizado
- **Modo escuro**: Tema noturno
- **Navegação por teclado**: Skip links e focus management
- **ARIA labels**: Suporte a leitores de tela

---

## Deploy

### Replit (Recomendado)

O projeto está configurado para Replit com:
- Frontend na porta 5000 (webview)
- Backend na porta 3001 (interno)
- Proxy automático de `/api`
- Secrets gerenciados via painel

### Outras Plataformas

Consulte [DEPLOYMENT.md](DEPLOYMENT.md) para instruções detalhadas de deploy em:
- Vercel/Netlify (frontend)
- Render/Railway (backend)
- Supabase/PostgreSQL (banco de dados)

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

---

## Contato

**2ª Vara Cível de Cariacica**  
Fórum Des. Américo Ribeiro Coelho  
R. Meridional, 1000 - Alto Lage, Cariacica - ES

- **Email**: 2varacivel@tjes.jus.br
- **Telefone**: (27) 3246-5641
- **Horário**: Segunda a sexta, 12h às 18h

---

<div align="center">

Desenvolvido com dedicação para a Justiça do Espírito Santo

**[Voltar ao topo](#2ª-vara-cível-de-cariacica---portal-oficial)**

</div>
