# Plano de Refatoração Frontend - 2ª Vara Cível de Cariacica

## Objetivo
Migrar a SPA monolítica (App.tsx com 952 linhas) para uma estrutura de rotas com React Router, transições animadas com Framer Motion e layout compartilhado.

## Estrutura de Rotas

| Rota | Página | Conteúdo |
|------|--------|----------|
| `/` | HomePage | Hero + Magistrado + Equipe |
| `/servicos` | ServicosPage | Serviços Online + FAQ |
| `/noticias` | NoticiasPage | Notícias do TJES |
| `/acessibilidade` | AcessibilidadePage | Tutorial + Atalhos de teclado |
| `/contato` | ContatoPage | Mapa Google + Formulário |
| `/admin` | AdminPage | Painel administrativo (stub) |

## Layout Global (todas as páginas)

- Barra de Acessibilidade (Fonte A/A+/A-, Contraste, Modo Noturno)
- Navbar com navegação entre páginas
- Footer com links Privacidade/Termos
- Chatbot (botão flutuante)
- VLibras (widget LIBRAS)
- Modais (Privacidade, Termos de Uso)

## Estrutura de Pastas

```
├── components/
│   ├── layout/
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── AccessibilityBar.tsx
│   ├── Chatbot.tsx
│   ├── Icons.tsx
│   └── LegalDocuments.tsx
├── contexts/
│   └── UIContext.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── ServicosPage.tsx
│   ├── NoticiasPage.tsx
│   ├── AcessibilidadePage.tsx
│   ├── ContatoPage.tsx
│   └── AdminPage.tsx
├── routes/
│   └── Router.tsx
├── App.tsx
└── index.tsx
```

## Tarefas de Implementação

1. [x] Criar arquivo frontendplan.md com o plano de refatoração
2. [ ] Criar UIContext para estados globais
3. [ ] Configurar BrowserRouter no index.tsx
4. [ ] Criar Layout.tsx global
5. [ ] Criar Router.tsx com as 6 rotas
6. [ ] Criar HomePage
7. [ ] Criar ServicosPage
8. [ ] Criar NoticiasPage
9. [ ] Criar AcessibilidadePage
10. [ ] Criar ContatoPage
11. [ ] Criar AdminPage
12. [ ] Atualizar App.tsx com AnimatePresence
13. [ ] Testar navegação e funcionalidades

## Dependências

- react-router-dom (já instalado)
- framer-motion (já instalado)

## Conformidade

- CNJ Resolução 401/2021
- e-MAG 3.1
- WCAG 2.2 Nível AA
