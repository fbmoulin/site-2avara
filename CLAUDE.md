# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript website for the 2ª Vara Cível de Cariacica (2nd Civil Court of Cariacica), a Brazilian civil court. The site provides public services, court information, and an AI-powered chatbot for virtual assistance using Google Gemini.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 3000)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build
npm run preview
```

**Environment Setup**: Before running any command, set `GEMINI_API_KEY` in `.env.local`. The Vite config maps this to `process.env.API_KEY` for the Gemini service.

## Architecture

### Core Application Structure

- **App.tsx**: Main application component containing all page sections, navigation state, accessibility controls (font size, high contrast, dark mode), and scroll-spy navigation. All sections render in a single-page layout.
- **index.tsx**: React app entry point that mounts App.tsx into the DOM.
- **index.html**: Main HTML shell with inline CSS for theme classes (font-lg, font-xl, high-contrast, dark-mode) and animations.

### Content Management

- **constants.ts**: Central data store for all user-facing content:
  - `SERVICES`: Service cards with links, icons, and optional tutorials
  - `FAQS`: FAQ items with categories
  - `LATEST_NEWS`: News ticker items
  - `JUDGE_INFO`: Magistrate biography and photo
  - `CONTACT_INFO`: Address, phone, email, WhatsApp

- **types.ts**: TypeScript interfaces for all data structures (ServiceItem, FaqItem, ChatMessage, etc.) and NavigationSection enum.

### Components

- **components/Chatbot.tsx**: Floating chat widget with:
  - Gemini AI integration via geminiService
  - Message history state management
  - Google Maps grounding metadata rendering (displays embedded maps when Gemini uses Maps tool)
  - Accessibility features (keyboard navigation, focus management, ARIA labels)

- **components/Icons.tsx**: Centralized icon components from lucide-react (Scale, Menu, X, MapPin, Phone, etc.).

### Services

- **services/geminiService.ts**: Wrapper for Google Gemini API:
  - Uses `@google/genai` SDK
  - Maintains a persistent chat session
  - System instruction defines chatbot behavior as a court virtual assistant
  - Configured with Google Maps tool integration for location queries
  - Returns both text responses and grounding metadata

### Styling Approach

- Tailwind CSS via inline className strings
- Custom color palette: `legal-blue` (#0a2540), `legal-gold` (#c49a3c), `light-bg` (#f8f9fa)
- Theme classes applied to document.body: `dark-mode`, `high-contrast`
- Font size classes applied to document.documentElement: `font-lg`, `font-xl`

### Key Features Implementation

1. **Accessibility Controls**: Implemented in App.tsx accessibility bar with state for fontSize, highContrast, and isDarkMode that apply CSS classes via useEffect.

2. **Scroll-Spy Navigation**: useEffect in App.tsx monitors scroll position and updates activeSection state based on which section is in viewport.

3. **Service Cards with Multiple Actions**: Services in constants.ts can have either a single `url` or multiple `links` array. The App.tsx rendering handles both cases, with special handling for `#chatbot` links that open the chat drawer.

4. **Chatbot Google Maps Integration**: When Gemini uses Maps tool, groundingMetadata contains map data. Chatbot.tsx renders this as embedded iframes with Google Maps embeds.

## Important Implementation Notes

### Environment Variables
- Vite config defines both `process.env.API_KEY` and `process.env.GEMINI_API_KEY` from the `GEMINI_API_KEY` environment variable
- The geminiService uses `process.env.API_KEY`
- Without a valid API key, chatbot operates in demo mode with fallback message

### Gemini AI Configuration
- Model: `gemini-2.5-flash`
- System instruction in services/geminiService.ts defines chatbot personality and protocols
- Chatbot is configured for legal/court context with formal tone
- Google Maps tool is enabled for location queries
- Chat session persists across messages (not recreated per message)

### Navigation Pattern
- All navigation uses `scrollToSection(id)` helper that calls `scrollIntoView({ behavior: 'smooth' })`
- Navigation sections defined in NavigationSection enum in types.ts
- Mobile menu state controlled by `isMobileMenuOpen` boolean

### Data Flow for Service Actions
- Services with `links` array render multiple action buttons
- Links with `#chatbot` URL trigger `setIsChatOpen(true)` instead of navigation
- Links with `#` prefix trigger scrollToSection, others open in new tab
- Email links (`mailto:`) handled appropriately (no target="_blank")

## Code Modification Guidelines

When adding new services, update constants.ts SERVICES array with proper ServiceItem structure. For services needing multiple action buttons, use the `links` array pattern rather than single `url`.

When modifying chatbot behavior, update SYSTEM_INSTRUCTION in services/geminiService.ts. The instruction defines protocols for scheduling, information requests, and tool usage.

When adding new sections to the page, add to NavigationSection enum in types.ts, create section element with matching id in App.tsx, and add NavLink in header navigation.

For accessibility features, maintain ARIA labels, keyboard navigation support, and focus management patterns established in existing components. The skip link, toolbar roles, and live regions are critical for screen reader users.
