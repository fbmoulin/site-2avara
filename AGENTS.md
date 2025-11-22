# Repository Guidelines

## Project Structure & Module Organization
- `App.tsx` holds the main layout, navigation state, and section rendering; `index.tsx` mounts the React app for Vite.
- `components/Chatbot.tsx` manages the chat drawer and UX controls; `components/Icons.tsx` centralizes SVGs.
- `services/geminiService.ts` wraps Google Gemini calls and prompt handling; configure `GEMINI_API_KEY` in `.env.local`.
- `constants.ts` stores structured content (services, FAQ, news, contacts); `types.ts` defines shared interfaces/enums.
- `vite.config.ts` and `index.html` contain the build shell; `metadata.json` and static assets live at the repo root.

## Build, Test, and Development Commands
- `npm install` installs React 19, Vite 6, and TypeScript 5 toolchain.
- `npm run dev` starts the Vite dev server; hot reloads the UI.
- `npm run build` creates a production bundle in `dist/`.
- `npm run preview` serves the built bundle locally for final checks.
- Set `GEMINI_API_KEY` in `.env.local` before any dev, build, or preview runs.

## Coding Style & Naming Conventions
- Use TypeScript with React function components and hooks; keep local state near its section.
- Follow the existing 2-space indentation, single quotes, and semicolons.
- Name components and files in PascalCase (`Chatbot.tsx`); use `camelCase` for functions/props; enums/types are PascalCase.
- Keep shared shapes in `types.ts` and user-facing copy in `constants.ts`; avoid duplicating literals in components.
- Prefer className utility strings already in use; keep inline styling minimal.

## Testing Guidelines
- No automated test suite is present; add `*.test.tsx` near components or services when introducing new logic.
- For chat flows, mock Gemini calls in `services/geminiService.ts` or use a non-sensitive key before shipping.
- Use `npm run preview` for manual regression checks across navigation, accessibility toggles, and chatbot interactions.

## Commit & Pull Request Guidelines
- Commits: short imperative subjects (e.g., `Add chatbot toggle`), scoped to a clear change set.
- PRs: describe user impact, list validation steps/commands, attach screenshots or GIFs for UI changes, and link issues/tasks.
- Ensure env files and secrets (`.env.local`, API keys) stay out of version control.

## Security & Configuration Tips
- Rotate `GEMINI_API_KEY` if exposed; prefer `.env.example` updates over sharing real keys.
- Limit logging of chat content and avoid storing PII; treat Gemini outputs as user-visible content.
- Review dependency bumps and Gemini model changes for behavior shifts before release.
