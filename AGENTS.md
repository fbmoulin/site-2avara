# Repository Guidelines

## Project Structure & Module Organization

### Frontend (Root Directory)
- `App.tsx` - Main layout, navigation state, accessibility controls, and section rendering
- `index.tsx` - React app entry point that mounts App.tsx
- `constants.ts` - Structured content (services, FAQs, news, contacts)
- `types.ts` - Shared TypeScript interfaces and enums
- `vite.config.ts` - Vite configuration with proxy to backend

### Frontend Components
- `components/Chatbot.tsx` - Chat UI widget with message history and maps rendering
- `components/Icons.tsx` - Centralized SVG icon components (lucide-react)
- `components/LegalDocuments.tsx` - LGPD-compliant Privacy Policy and Terms of Use modals

### Frontend Services
- `services/geminiService.ts` - HTTP client for backend chat API (NOT direct Gemini calls)

### Backend (backend/ Directory)
- `backend/src/server.ts` - Express server entry point
- `backend/src/routes/chat.routes.ts` - Chat API endpoints
- `backend/src/routes/contact.routes.ts` - Contact form API
- `backend/src/routes/appointment.routes.ts` - Appointment scheduling API
- `backend/src/routes/demand.routes.ts` - Demand registration API
- `backend/src/services/chat.service.ts` - **Gemini AI integration (API key here)**
- `backend/src/services/email.service.ts` - SendGrid email service
- `backend/prisma/schema.prisma` - Database schema

### Assets
- `attached_assets/` - Images and static assets
- `prod-server.js` - Production server that serves frontend and proxies API

## Build, Test, and Development Commands

### Frontend
```bash
npm install          # Install React 19, Vite 6, TypeScript 5
npm run dev          # Start Vite dev server on port 5000
npm run build        # Create production bundle in dist/
npm run preview      # Serve built bundle locally
```

### Backend
```bash
cd backend
npm install          # Install Express, Prisma, Gemini SDK
npm run dev          # Start dev server with hot reload (tsx watch)
npm run build        # Compile TypeScript to JavaScript
npm start            # Start production server
```

### Database
```bash
cd backend
npx prisma generate  # Generate Prisma client
npx prisma migrate dev  # Run migrations (development)
npx prisma studio    # Visual database browser
```

## Environment Configuration

### Secrets (Required)
- `GEMINI_API_KEY` - Google Gemini API key (backend only, NEVER in frontend)

### Development Environment
- `DATABASE_URL` - Prisma connection string (SQLite for dev)
- `BACKEND_PORT` - Backend server port (default: 3001)
- `NODE_ENV` - Environment mode (development/production)

## Architecture Notes

### Security: Gemini API Key
- **CRITICAL**: The Gemini API key is ONLY used in the backend
- Frontend calls `/api/chat` which proxies to backend
- Backend `chat.service.ts` initializes Gemini with `process.env.GEMINI_API_KEY`
- NEVER expose API keys in frontend code or Vite config

### Chat Flow
```
User → Frontend (Chatbot.tsx) → /api/chat → Backend (chat.routes.ts) 
→ chat.service.ts → Google Gemini → Response back
```

### Session Management
- Each chat session has a unique `sessionId` stored in sessionStorage
- Backend maintains session state in memory (`chatSessions` Map)
- Sessions persist conversation context across messages

## Coding Style & Naming Conventions

- TypeScript with React function components and hooks
- 2-space indentation, single quotes, semicolons
- PascalCase for components and files (`Chatbot.tsx`)
- camelCase for functions and props
- PascalCase for enums and types
- Keep shared types in `types.ts`, content in `constants.ts`

## Chatbot Protocol (SYSTEM_INSTRUCTION)

The chatbot follows a structured protocol defined in `backend/src/services/chat.service.ts`:

1. **Identification**: Ask if user is Advogado (lawyer) or Parte (party)
2. **Document**: Request OAB number (lawyer) or CPF (party)
3. **Preference**: Ask for Presencial or Virtual (highlight Virtual availability)
4. **Direction**: Default to Assessoria; only mention Juiz if explicitly requested
5. **Data Collection**: Name, process number, question/subject
6. **Confirmation**: Inform pre-reservation and follow-up contact

## Testing Guidelines

- No automated test suite present
- Use `npm run preview` for manual regression checks
- Test chatbot flows, accessibility toggles, and form submissions
- Verify Google Maps integration in chat responses

## Commit & Pull Request Guidelines

- Commits: short imperative subjects (e.g., `Add chat session support`)
- PRs: describe user impact, validation steps, screenshots for UI changes
- Never commit `.env` files, API keys, or secrets

## Security & Configuration Tips

- Rotate `GEMINI_API_KEY` if exposed
- Keep API key strictly in backend environment
- Limit logging of chat content (PII concerns)
- Use rate limiting for all API endpoints
- Validate all user input with Zod schemas
