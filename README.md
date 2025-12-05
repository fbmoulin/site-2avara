# 2ª Vara Cível de Cariacica - Portal Oficial

<div align="center">

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.8.2-blue)

Portal de serviços digitais da 2ª Vara Cível de Cariacica - TJES

</div>

## Sobre

Aplicação full-stack com assistente virtual (Google Gemini), formulários interativos, agendamento de atendimentos e conformidade LGPD.

### Funcionalidades

- **Assistente Virtual (IA)** - Chatbot com Google Gemini + Google Maps
- **Agendamento** - Presencial e virtual (Zoom)
- **Formulários** - Contato, demandas e reclamações
- **LGPD** - Política de Privacidade e Termos de Uso
- **Acessibilidade** - Fonte, contraste e modo escuro

## Stack

| Frontend | Backend |
|----------|---------|
| React 19.2 | Express 4.21 |
| TypeScript 5.8 | Prisma 6.2 |
| Vite 6.2 | Google GenAI |
| Tailwind CSS | Zod + Helmet |

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
# Secret (obrigatório)
GEMINI_API_KEY=sua_chave_gemini

# Backend (.env)
DATABASE_URL="file:./prisma/dev.db"
BACKEND_PORT=3001
NODE_ENV=development
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

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/chat` | Chatbot |
| POST | `/api/contact` | Contato |
| POST | `/api/appointments` | Agendamento |
| POST | `/api/demands` | Demandas |
| GET | `/health` | Health check |

## Estrutura

```
├── components/          # React components
├── services/            # Frontend services
├── backend/
│   ├── src/routes/      # API routes
│   ├── src/services/    # Gemini integration
│   └── prisma/          # Database
├── App.tsx              # Main component
└── prod-server.js       # Production server
```

## Deploy

Consulte [DEPLOYMENT.md](DEPLOYMENT.md) para instruções detalhadas.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

**2ª Vara Cível de Cariacica**  
Fórum Des. Américo Ribeiro Coelho  
R. Meridional, 1000 - Alto Lage, Cariacica - ES

- Email: 2varacivel@tjes.jus.br
- Telefone: (27) 3246-5641
