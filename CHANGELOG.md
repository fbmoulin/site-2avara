# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [2.7.0] - 2024-12-05

### Adicionado
- **Formulário de contato aprimorado**:
  - Campo "Você é" para identificar se é Parte (cidadão) ou Advogado(a)
  - Campo CPF condicional (aparece apenas para Parte)
  - Campo OAB condicional (aparece apenas para Advogado)
  - Indicação de DDD obrigatório no campo telefone com placeholder
  - Feedback visual de sucesso/erro no envio
  - Estado de loading com spinner durante envio
  - Validação Zod no backend para novos campos
- **Email com identificação completa**: Tipo de usuário, CPF/OAB incluídos no email de notificação
- **Link "Localização"** no menu do header (desktop e mobile) com link direto para Google Maps

### Corrigido
- Formulário de contato agora usa JavaScript (fetch) em vez de submit HTML tradicional
- Formulário não redireciona mais para página em branco ao enviar

### Melhorado
- Labels mais claros nos formulários
- Campos desabilitados durante envio para evitar duplo clique
- Limpeza automática do formulário após envio bem-sucedido

## [2.6.0] - 2024-12-05

### Adicionado
- **VLibras Widget** (v6.0.0) - Tradução de conteúdo para Língua Brasileira de Sinais (LIBRAS)
  - Avatar 3D animado para tradução visual
  - Carregamento dinâmico para melhor performance
  - Compatível com alto contraste e modo noturno
  - Atende Resolução CNJ nº 401/2021 (obrigatório para sites do Poder Judiciário)
- **Documentação atualizada** com guia de uso do VLibras

## [2.5.0] - 2024-12-05

### Adicionado
- **Autenticação Replit Auth** para painel administrativo de artigos
- **Middleware de autenticação** com proteção de rotas (POST, PUT, DELETE)
- **Gerenciamento de sessões** armazenadas no PostgreSQL
- **Hook useAuth** para controle de autenticação no frontend
- **Painel administrativo de artigos** com CRUD completo protegido
- **Aviso "Em Desenvolvimento"** na seção de artigos para futura página de blog
- **Documentação de acessibilidade** (ACESSIBILIDADE_PLANO.md) conforme e-MAG 3.1
- **Link de acessibilidade** na navegação do header
- **Notícias TJES automatizadas** com busca diária às 9h

### Melhorado
- **Segurança reforçada** com Helmet.js, CORS e rate limiting
- **Estrutura de componentes** com AdminArticles.tsx separado
- **Layout responsivo** com caixas de serviço em três linhas verticais
- **Seção de notícias** com exibição vertical

### Segurança
- Proteção contra XSS via Helmet.js
- Proteção contra clickjacking
- Rate limiting: 100 req/min geral, 3-10 req/15min por formulário
- CORS configurado para domínios Replit
- Rotas administrativas protegidas com autenticação obrigatória

## [2.0.0] - 2024-12-04

### Adicionado
- **Assistente Virtual (Chatbot)** com Google Gemini 2.0
- **Integração Google Maps** para localização do fórum
- **Formulários interativos** para contato, demandas e agendamentos
- **Agendamento de atendimentos** presencial e virtual (Zoom)
- **Conformidade LGPD** com Política de Privacidade e Termos de Uso
- **Acessibilidade** com ajuste de fonte, contraste e modo escuro
- **Backend Express** com TypeScript e Prisma ORM
- **Banco PostgreSQL** para persistência de dados
- **Sistema de email** via Nodemailer/Gmail

### Tecnologias
- React 19.2.0 com TypeScript 5.8.2
- Vite 6.2.0 para build
- Express 4.21.2 para API
- Prisma ORM para banco de dados
- Google GenAI SDK para chatbot

## [1.0.0] - 2024-12-01

### Inicial
- Estrutura base do portal
- Layout responsivo
- Seções informativas sobre a 2ª Vara Cível
- Informações de contato e localização
