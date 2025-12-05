# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Version:** 2.5.0 | **Last Updated:** 2024-12-05

## Project Overview

Full-stack web application for the 2ª Vara Cível de Cariacica (2nd Civil Court of Cariacica), a Brazilian civil court. The site provides public services, court information, LGPD-compliant legal documents, an **AI-powered chatbot** using Google Gemini, **protected admin panel** with Replit Auth, and automated TJES news updates.

## Critical Architecture Note

**The Gemini API integration is in the BACKEND, not the frontend.**

```
Frontend (Chatbot.tsx) → HTTP POST /api/chat → Backend (chat.service.ts) → Google Gemini
```

This architecture ensures the API key is never exposed in the browser.

## Development Commands

```bash
# Install all dependencies
npm install && cd backend && npm install && cd ..

# Start development (both servers)
# Terminal 1 - Backend:
cd backend && npm run dev

# Terminal 2 - Frontend:
npm run dev

# Build for production
npm run build
```

**Ports:**
- Frontend: 5000 (configured for Replit webview)
- Backend: 3001 (internal, proxied via Vite or prod-server.js)

## Environment Setup

**Required Secrets:**
```
GEMINI_API_KEY=your_gemini_api_key
GMAIL_APP_PASSWORD=your_gmail_app_password_16_chars
```

The key is accessed ONLY in `backend/src/services/chat.service.ts` via `process.env.GEMINI_API_KEY`.

**DO NOT** add Gemini API key to:
- vite.config.ts
- Frontend environment variables
- Any client-side code

## Architecture

### Frontend Structure

```
/
├── App.tsx              # Main component, all sections, accessibility
├── components/
│   ├── Chatbot.tsx      # Chat UI, message rendering, Maps display
│   ├── Icons.tsx        # Lucide icon components
│   └── LegalDocuments.tsx  # Privacy Policy & Terms modals
├── services/
│   └── geminiService.ts # HTTP client for /api/chat (NOT direct Gemini)
├── constants.ts         # Services, FAQs, news, contact info
├── types.ts             # TypeScript interfaces
└── vite.config.ts       # Vite config with /api proxy
```

### Backend Structure

```
backend/
├── src/
│   ├── server.ts        # Express app entry point
│   ├── routes/
│   │   ├── chat.routes.ts      # POST /api/chat, /api/chat/clear
│   │   ├── contact.routes.ts
│   │   ├── appointment.routes.ts
│   │   ├── demand.routes.ts
│   │   ├── article.routes.ts   # CRUD artigos (auth required for mutations)
│   │   └── news.routes.ts      # GET /api/news (TJES automated)
│   ├── services/
│   │   ├── chat.service.ts     # GEMINI INTEGRATION HERE
│   │   ├── email.service.ts
│   │   └── news.service.ts     # TJES news scraper
│   └── middleware/
│       ├── rateLimiter.ts
│       ├── validator.ts
│       └── replitAuth.ts       # Replit Auth middleware
└── prisma/
    └── schema.prisma           # User, Session, Article models
```

### Authentication (Replit Auth)

```
User clicks Login → Replit OAuth → Session stored in PostgreSQL → Cookie set
```

- **Protected routes**: POST/PUT/DELETE on `/api/articles`
- **Middleware**: `backend/src/middleware/replitAuth.ts`
- **Frontend hook**: `hooks/useAuth.ts`
- **Session storage**: PostgreSQL `sessions` table

### Data Flow

1. **User types message** in Chatbot.tsx
2. **Frontend calls** `POST /api/chat` with message and sessionId
3. **Vite proxy** forwards to backend on port 3001
4. **chat.routes.ts** validates request with Zod
5. **chat.service.ts** sends to Gemini with system instruction
6. **Response** includes text and optional groundingMetadata (Maps)
7. **Chatbot.tsx** renders response, including embedded Maps if present

## Chatbot Protocol

The system instruction in `chat.service.ts` defines:

### Identification Flow
1. Ask if Advogado (lawyer) or Parte (party)
2. Request OAB (lawyer) or CPF (party)

### Scheduling Flow
1. Ask Presencial or Virtual (Zoom)
2. **Highlight**: Virtual has MORE AVAILABILITY
3. **Default**: Direct to Assessoria do Gabinete
4. **Only mention Juiz** if user explicitly requests

### Data Collection
- Nome completo (full name)
- Nº do Processo (case number)
- Dúvida/Assunto or Motivo (question/reason)

### Google Maps Integration
- Enabled via `tools: [{ googleMaps: {} }]`
- Triggered by location questions ("onde fica", "como chegar")
- Returns groundingMetadata with map data
- Frontend renders embedded iframe

## Content Management

### constants.ts
- `SERVICES`: Service cards with icons, links, tutorials
- `FAQS`: FAQ items organized by category
- `LATEST_NEWS`: News ticker items
- `JUDGE_INFO`: Magistrate information
- `CONTACT_INFO`: Address, phone, email

### types.ts
- `ServiceItem`, `FaqItem`, `NewsItem` interfaces
- `ChatMessage` with groundingMetadata support
- `NavigationSection` enum

## Components

### LegalDocuments.tsx
LGPD-compliant modals for:
- **Privacy Policy**: Data collection, purposes, rights, security
- **Terms of Use**: Object, duties, prohibitions, responsibilities

Accessible from footer links via state: `isPrivacyOpen`, `isTermsOpen`

### Chatbot.tsx
- Session management via sessionStorage
- Message history state
- Loading indicators
- Google Maps iframe rendering from groundingMetadata
- Accessibility: ARIA labels, keyboard navigation, focus management

## Styling

- Tailwind CSS via CDN (development)
- Custom colors: `legal-blue` (#0a2540), `legal-gold` (#c49a3c)
- Theme classes on body: `dark-mode`, `high-contrast`
- Font classes on html: `font-lg`, `font-xl`

## Important Implementation Notes

### Session Persistence
```typescript
// Frontend: sessionStorage
const sessionId = sessionStorage.getItem('chat_session_id');

// Backend: in-memory Map
let chatSessions: Map<string, Chat> = new Map();
```

### Error Handling
- Frontend shows user-friendly error messages
- Backend logs errors with console.error
- Graceful fallback if Gemini unavailable

### Rate Limiting
- Configured in `backend/src/middleware/rateLimiter.ts`
- Applied to all `/api` routes

## Code Modification Guidelines

### Adding New Chat Behaviors
1. Update SYSTEM_INSTRUCTION in `backend/src/services/chat.service.ts`
2. Test with various user inputs
3. Verify Maps integration still works

### Adding New API Endpoints
1. Create route file in `backend/src/routes/`
2. Add Zod validation schema
3. Register in `backend/src/server.ts`
4. Update API documentation

### Modifying Legal Documents
1. Edit `components/LegalDocuments.tsx`
2. Maintain LGPD compliance (Art. 18 rights)
3. Update version and date

### Adding New Sections
1. Add to `NavigationSection` enum in `types.ts`
2. Create section with matching id in `App.tsx`
3. Add NavLink in header navigation
4. Maintain accessibility patterns

## Security Checklist

- [x] GEMINI_API_KEY only in backend environment
- [x] No API keys in vite.config.ts
- [x] No secrets in git history
- [x] Rate limiting enabled (100 req/min general, 3-10 req/15min forms)
- [x] CORS properly configured for Replit domains
- [x] Input validation on all endpoints (Zod)
- [x] Helmet.js for XSS/clickjacking protection
- [x] Replit Auth for admin routes (POST/PUT/DELETE articles)
- [x] Sessions stored securely in PostgreSQL

## Admin Panel

The article management panel is protected by Replit Auth:

1. User must be logged in via Replit OAuth
2. GET requests (listing) are public
3. POST/PUT/DELETE require authentication
4. Unauthenticated requests return 401

## Automated Features

- **TJES News**: Daily fetch at 9 AM (America/Sao_Paulo timezone)
- **News Sources**: RSS feed with HTML fallback via proxy
