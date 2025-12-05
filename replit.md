# 2ª Vara Cível de Cariacica - Replit Project Setup

## Overview
Full-stack web application for the 2nd Civil Court of Cariacica (TJES). This is a modern judicial services portal with AI-powered chatbot, contact forms, appointment scheduling, and administrative dashboard.

**Current State**: Imported from GitHub and configured for Replit environment (December 5, 2024)

## Recent Changes (December 5, 2024)
- ✅ Imported GitHub repository to Replit
- ✅ Configured Vite frontend to run on port 5000 with Replit proxy support
- ✅ Installed backend dependencies and setup SQLite database
- ✅ Configured environment variables for development
- ✅ Updated backend CORS to allow Replit domains
- ✅ Setup workflows for both frontend and backend
- ✅ Configured deployment settings
- ✅ Added Google Gemini AI integration for chatbot

## Project Architecture

### Frontend
- **Framework**: React 19.2.0 + TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Port**: 5000 (configured for Replit webview)
- **Location**: Root directory
- **Entry Point**: `index.tsx`
- **Main Component**: `App.tsx`

### Backend
- **Framework**: Express 4.21.2 + TypeScript 5.8.2
- **Port**: 3001 (internal, not exposed)
- **Location**: `backend/` directory
- **Entry Point**: `backend/src/server.ts`
- **Database**: SQLite (development) via Prisma ORM
- **API Base**: `/api`

### Key Features
- 🤖 AI Chatbot with Google Gemini (with Google Maps integration)
- 📝 Contact forms with validation
- 📅 Appointment scheduling system
- 📊 Demand management
- ♿ Accessibility controls (font size, contrast, dark mode)
- 🔐 Security: Helmet, CORS, Rate Limiting

## Environment Variables

### Secrets (Required from User)
- `GEMINI_API_KEY` - Google Gemini API key for chatbot functionality

### Development Environment
- `DATABASE_URL` - SQLite database path: `file:./backend/prisma/dev.db`
- `BACKEND_PORT` - Backend server port: `3001` (separate from frontend PORT)
- `NODE_ENV` - Environment: `development`
- `FRONTEND_URL` - Replit frontend URL
- `ALLOWED_ORIGINS` - CORS allowed origins (includes Replit domains)
- `VITE_API_URL` - Backend API URL: `/api` (proxied by Vite dev server)

### Optional (Email Service)
- `SENDGRID_API_KEY` - SendGrid API key for email notifications
- `EMAIL_FROM` - Sender email address
- `EMAIL_TO` - Recipient email address

## Workflows

### Frontend Workflow
- **Name**: Frontend
- **Command**: `npm run dev`
- **Port**: 5000
- **Output**: Webview
- **Status**: Running

### Backend Workflow
- **Name**: Backend
- **Command**: `cd backend && npm run dev`
- **Port**: 3001
- **Output**: Console
- **Status**: Running

## Database Schema (Prisma)

### Models
1. **ContactMessage** - Contact form submissions
2. **Appointment** - Appointment scheduling (presencial/virtual)
3. **Demand** - Demand and complaint tracking

### Commands
```bash
# Generate Prisma client
cd backend && npx prisma generate

# Run migrations
cd backend && npx prisma migrate deploy

# Open Prisma Studio
cd backend && npx prisma studio
```

## API Endpoints
- `POST /api/contact` - Submit contact form
- `POST /api/appointments` - Create appointment
- `POST /api/demands` - Register demand
- `GET /health` - Health check

## Deployment Configuration
- **Target**: VM (needs to maintain backend state)
- **Build**: `npm run build` (builds both frontend and backend)
- **Run**: `npm run start:backend & npm start` (starts backend then production server)
- **Production Server**: Custom Express server (`prod-server.js`) that:
  - Serves static frontend files from `dist/` directory
  - Proxies `/api` requests to backend on port 3001
  - Runs on port 5000 (exposed to internet)
- **Production Setup**: User must configure production environment variables and migrate to PostgreSQL database

## Development Notes

### CORS Configuration
- Backend accepts requests from Replit domains (`.replit.dev`)
- Allows localhost on ports 5000, 3000, 5173
- Credentials enabled for session support

### Vite Configuration
- Port 5000 for Replit webview compatibility
- HMR configured for Replit proxy
- Environment variables loaded from `.env` files

### Known Issues
- SendGrid email service not configured (optional feature)
- AdminJS panel temporarily disabled in code
- Tailwind CSS loaded via CDN (should use PostCSS for production)

## Important Notes
- **Port Configuration**: Backend uses `BACKEND_PORT` (defaults to 3001) to avoid conflicts with frontend `PORT` (5000) in deployment
- **API Routing**: Frontend uses relative path `/api` which is proxied in both dev (Vite proxy) and production (prod-server.js)

## User Preferences
- None documented yet

## Next Steps
1. User should provide `GEMINI_API_KEY` for chatbot functionality
2. Optionally configure SendGrid for email notifications
3. Test all form submissions and chatbot interactions
4. For production: Migrate to PostgreSQL database
5. For production: Install Tailwind CSS as PostCSS plugin
