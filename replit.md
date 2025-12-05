# 2ª Vara Cível de Cariacica - Documentação Replit

## Visão Geral

Portal oficial de serviços digitais da 2ª Vara Cível de Cariacica (TJES). Aplicação full-stack com assistente virtual inteligente (Google Gemini), formulários interativos, agendamento de atendimentos e conformidade LGPD.

**Estado Atual**: Configurado e funcionando no ambiente Replit (Dezembro 2025)

---

## Alterações Recentes

### Dezembro 2025
- ✅ Importação do repositório GitHub para Replit
- ✅ Configuração do Vite na porta 5000 com suporte a proxy Replit
- ✅ Setup do backend com Prisma ORM
- ✅ Configuração de variáveis de ambiente
- ✅ CORS atualizado para domínios Replit
- ✅ Workflows configurados (Frontend + Backend)
- ✅ Integração Google Gemini no backend (com sessões)
- ✅ Integração Google Maps no chatbot
- ✅ Documentos LGPD (Política de Privacidade e Termos de Uso)
- ✅ Configuração do secret `GEMINI_API_KEY`
- ✅ Correção de segurança: remoção de API key do bundle frontend
- ✅ Limpeza de código: pastas e dependências não utilizadas removidas
- ✅ **Chatbot como canal principal**: botão expandido, indicador online, tooltip proativo
- ✅ **Hero CTA**: botão "Fale Conosco" abre chatbot diretamente
- ✅ **Verificação de segurança**: API keys, CORS, rate limiting, headers validados
- ✅ **Deploy configurado**: Reserved VM pronto para publicação
- ✅ **PostgreSQL**: Migrado de SQLite para PostgreSQL Replit
- ✅ **Email Gmail**: Sistema de notificações configurado com Nodemailer + Gmail App Password
- ✅ **Notícias Automáticas**: Sistema de busca de notícias TJES com atualização diária às 9h (America/Sao_Paulo)
  - Fonte: https://www.tjes.jus.br/category/s1-front-page/ultimasnoticias/
  - Pipeline multi-estratégia: RSS direto → Proxy RSS (r.jina.ai) → HTML scraping → Fallback estático
  - Mecanismo de backoff para evitar spam de erros 403
  - Frontend dinâmico com fallback para constantes
  - Seção de notícias posicionada antes das Perguntas Frequentes

---

## Arquitetura do Projeto

### Frontend
| Aspecto | Detalhe |
|---------|---------|
| **Framework** | React 19.2.0 + TypeScript 5.8.2 |
| **Build Tool** | Vite 6.2.0 |
| **Porta** | 5000 (webview Replit) |
| **Localização** | Diretório raiz |
| **Entry Point** | `index.tsx` |
| **Componente Principal** | `App.tsx` |

### Backend
| Aspecto | Detalhe |
|---------|---------|
| **Framework** | Express 4.21.2 + TypeScript 5.8.2 |
| **Porta** | 3001 (interno) |
| **Localização** | `backend/` |
| **Entry Point** | `backend/src/server.ts` |
| **Banco de Dados** | PostgreSQL via Prisma |
| **API Base** | `/api` |

### Funcionalidades Principais
| Feature | Descrição |
|---------|-----------|
| 🤖 **Chatbot IA** | Google Gemini com integração Google Maps |
| 📝 **Formulários** | Contato, agendamento e demandas |
| 📅 **Agendamento** | Presencial e virtual (Zoom) |
| 📰 **Notícias Automáticas** | Atualização diária às 9h do TJES |
| ♿ **Acessibilidade** | Fonte, contraste e modo escuro |
| 🔐 **Segurança** | Helmet, CORS, Rate Limiting |
| 📋 **LGPD** | Política de Privacidade e Termos de Uso |

---

## Variáveis de Ambiente

### Secrets (Configurados)
| Secret | Status | Descrição |
|--------|--------|-----------|
| `GEMINI_API_KEY` | ✅ Configurado | Chave API Google Gemini |
| `GMAIL_APP_PASSWORD` | ✅ Configurado | Senha de app do Gmail (16 caracteres) |

### Ambiente de Desenvolvimento
| Variável | Valor | Descrição |
|----------|-------|-----------|
| `DATABASE_URL` | (secret) | URL do PostgreSQL Replit |
| `BACKEND_PORT` | `3001` | Porta do backend |
| `NODE_ENV` | `development` | Ambiente |
| `VITE_API_URL` | `/api` | URL da API (proxy) |

### Email (Gmail)
| Variável | Valor | Descrição |
|----------|-------|-----------|
| `EMAIL_FROM` | `2acivelcariacica@gmail.com` | Email remetente |
| `EMAIL_TO` | `2acivelcariacica@gmail.com` | Email destinatário |
| `GMAIL_APP_PASSWORD` | (secret) | Senha de app do Gmail (16 caracteres) |

**Como configurar o Gmail App Password:**
1. Ative a verificação em duas etapas em https://myaccount.google.com/security
2. Gere uma senha de app em https://myaccount.google.com/apppasswords
3. Adicione como secret `GMAIL_APP_PASSWORD`

---

## Workflows

### Frontend
| Aspecto | Valor |
|---------|-------|
| **Nome** | Frontend |
| **Comando** | `npm run dev` |
| **Porta** | 5000 |
| **Saída** | Webview |

### Backend
| Aspecto | Valor |
|---------|-------|
| **Nome** | Backend |
| **Comando** | `cd backend && npm run dev` |
| **Porta** | 3001 |
| **Saída** | Console |

---

## Protocolo do Assistente Virtual

O chatbot implementa um protocolo estruturado de atendimento:

### Fluxo de Identificação
```
1. TIPO DE USUÁRIO
   ├── Advogado → Solicita número da OAB
   └── Parte → Solicita número do CPF

2. MODALIDADE DE ATENDIMENTO
   ├── Presencial
   └── Virtual (Zoom) ← DESTAQUE: Maior disponibilidade

3. DIRECIONAMENTO (Padrão: Assessoria)
   ├── Assessoria do Gabinete (default)
   │   └── Dúvidas, andamento, despachos
   └── Juiz (apenas se solicitado)
       └── Casos urgentes, despachos pendentes

4. COLETA DE DADOS
   ├── Nome completo
   ├── Número do processo
   └── Dúvida/Assunto ou Motivo

5. CONFIRMAÇÃO
   └── "Solicitação pré-reservada. Secretaria entrará em contato."
```

### Integração Google Maps
- Ativada automaticamente para perguntas de localização
- Retorna mapa interativo embutido no chat
- Endereço: Fórum Des. Américo Ribeiro Coelho, R. Meridional, 1000

### UX do Chatbot (Canal Principal)
O chatbot foi projetado como o principal canal de comunicação:

| Elemento | Descrição |
|----------|-----------|
| **Botão Expandido** | Mostra "Atendimento Virtual" (desktop) ou "Fale Conosco" (mobile) |
| **Indicador Online** | Badge verde pulsante no canto superior direito |
| **Animação Pulse** | Anel sutil que chama atenção sem ser intrusivo |
| **Tooltip Proativo** | Aparece após 3s: "Precisa de ajuda com agendamentos ou informações?" |
| **Hero CTA** | Botão "Fale Conosco" na hero section abre o chatbot diretamente |
| **Status no Chat** | Header mostra "Online agora" quando aberto |

Todas as animações respeitam `prefers-reduced-motion` para acessibilidade.

---

## Documentos LGPD

### Política de Privacidade
Inclui seções sobre:
- Dados coletados (fornecidos e automáticos)
- Finalidades do tratamento
- Base legal (Art. 7º LGPD)
- Compartilhamento de dados
- Direitos do titular (Art. 18 LGPD)
- Medidas de segurança
- Contato e reclamações (ANPD)

### Termos de Uso
Inclui seções sobre:
- Objeto e definições
- Direitos e deveres do usuário
- Vedações
- Propriedade intelectual
- Limitação de responsabilidade
- Sobre o assistente virtual
- Foro e jurisdição

---

## API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/chat` | Enviar mensagem ao chatbot |
| `POST` | `/api/chat/clear` | Limpar sessão do chat |
| `POST` | `/api/contact` | Enviar mensagem de contato |
| `POST` | `/api/appointments` | Criar agendamento |
| `POST` | `/api/demands` | Registrar demanda |
| `GET` | `/api/news` | Listar notícias ativas |
| `GET` | `/api/news/status` | Status do sistema de notícias |
| `POST` | `/api/news/refresh` | Atualizar notícias manualmente |
| `GET` | `/health` | Health check |

### Exemplo: Chat API
```json
// Request
POST /api/chat
{
  "message": "Quero agendar um atendimento",
  "sessionId": "unique-session-id"
}

// Response
{
  "success": true,
  "data": {
    "text": "Prezado(a) usuário(a)...",
    "groundingMetadata": {}
  }
}
```

---

## Banco de Dados (Prisma)

### Modelos
| Modelo | Descrição |
|--------|-----------|
| `ContactMessage` | Mensagens do formulário de contato |
| `Appointment` | Agendamentos (presencial/virtual) |
| `Demand` | Demandas e reclamações |
| `News` | Notícias do TJES (atualização automática) |

### Comandos
```bash
# Gerar Prisma Client
cd backend && npx prisma generate

# Executar migrations
cd backend && npx prisma migrate deploy

# Interface visual
cd backend && npx prisma studio
```

---

## Configuração de Deploy

### Target
- **Tipo**: Reserved VM (requer estado do backend para sessões de chat)
- **Build**: `npm run build` (compila frontend Vite + backend TypeScript)
- **Run**: `cd backend && npm start & sleep 2 && npm start` (inicia backend + prod-server.js)
- **Status**: Pronto para publicação

### Scripts Disponíveis (Root)
| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia Vite dev server (porta 5000) |
| `npm run build` | Compila frontend (Vite) e backend (TypeScript) |
| `npm run start` | Inicia prod-server.js (serve frontend + proxy /api) |
| `npm run start:backend` | Inicia backend em produção (porta 3001) |

### Scripts Disponíveis (Backend)
| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia backend dev com hot reload (tsx watch) |
| `npm run build` | Compila TypeScript para JavaScript |
| `npm start` | Inicia servidor de produção |
| `npm run db:generate` | Gera Prisma Client |
| `npm run db:migrate` | Executa migrations |
| `npm run db:studio` | Interface visual do banco |

### Servidor de Produção
O `prod-server.js` serve:
- Arquivos estáticos do frontend (`dist/`)
- Proxy de `/api` para backend na porta 3001

---

## Estrutura de Arquivos

```
/
├── components/
│   ├── Chatbot.tsx          # Interface do chat
│   ├── Icons.tsx            # Ícones centralizados
│   └── LegalDocuments.tsx   # Modais LGPD
├── services/
│   └── geminiService.ts     # Cliente HTTP para /api/chat
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── chat.routes.ts
│   │   │   ├── contact.routes.ts
│   │   │   ├── appointment.routes.ts
│   │   │   └── demand.routes.ts
│   │   ├── services/
│   │   │   ├── chat.service.ts    # GEMINI AQUI
│   │   │   └── email.service.ts
│   │   └── server.ts
│   └── prisma/
│       └── schema.prisma
├── attached_assets/
├── App.tsx
├── constants.ts
├── types.ts
├── vite.config.ts
├── prod-server.js
└── replit.md
```

---

## Notas Importantes

### Segurança (Verificado)
| Aspecto | Status | Detalhes |
|---------|--------|----------|
| **API Keys** | ✅ Seguro | `GEMINI_API_KEY` apenas no backend, nunca exposta |
| **CORS** | ✅ Configurado | Aceita `.replit.dev` e localhost (5000, 3000, 5173) |
| **Headers** | ✅ Ativo | Helmet protege contra XSS, clickjacking, etc. |
| **Rate Limiting** | ✅ Ativo | 100/min geral, 3-10/15min por formulário |
| **Erros** | ✅ Seguro | Stack traces ocultos em produção |

### Vite
- Porta 5000 para compatibilidade com webview Replit
- `allowedHosts: true` para proxy Replit
- HMR configurado para proxy WSS

---

## Próximos Passos Sugeridos

1. **AdminJS**: Reativar painel administrativo
2. **Tailwind**: Migrar de CDN para PostCSS (produção)
3. **Testes**: Adicionar suite de testes automatizados
4. **Monitoramento**: Adicionar logs e métricas de uso
5. **Backup**: Configurar backup automático do banco de dados

---

## Contato

**2ª Vara Cível de Cariacica**  
Fórum Des. Américo Ribeiro Coelho  
R. Meridional, 1000 - Alto Lage, Cariacica - ES

- **Email**: 2acivelcariacica@gmail.com
- **Telefone**: (27) 3246-5641
- **Horário**: Segunda a sexta, 12h às 18h
