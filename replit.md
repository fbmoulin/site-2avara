# 2ª Vara Cível de Cariacica - Documentação Replit

## Overview

This project is the official digital services portal for the 2ª Vara Cível de Cariacica (TJES), a full-stack application designed to enhance public interaction with the court. Its purpose is to provide a comprehensive online platform featuring an intelligent virtual assistant (Google Gemini), a legal articles blog, interactive forms, appointment scheduling, and full compliance with LGPD regulations. The platform aims to streamline communication, provide legal information, and offer efficient digital services to citizens and legal professionals.

## User Preferences

- I prefer clear, concise, and structured explanations.
- I value a development process that emphasizes security and accessibility.
- I expect the agent to prioritize established architectural patterns and design decisions.
- Please ensure all changes are documented and aligned with the project's core objectives.
- I prefer detailed explanations.
- Do not make changes to the folder `attached_assets/`.
- Do not make changes to the file `replit.md`.

## System Architecture

The application is a full-stack project utilizing React 19.2.0 with TypeScript 5.8.2 and Vite 6.2.0 for the frontend, and Express 4.21.2 with TypeScript 5.8.2 for the backend. PostgreSQL is used as the primary database, managed via Prisma ORM.

**UI/UX Decisions:**

-   **Chatbot as Primary Channel:** The chatbot is central to user interaction, featuring an expanded button, an online indicator (pulsing green badge), and a proactive tooltip. The "Fale Conosco" CTA in the hero section directly opens the chatbot. All animations respect `prefers-reduced-motion` for accessibility.
-   **Blog Design:** Features a responsive display with cards for articles and an integrated administrative panel.
-   **Acessibility:** Includes features for font size adjustment, contrast modes, and dark mode.
-   **Hero Section:** Redesigned with a forum image, blue overlay, and enlarged badge.
-   **News Card:** Features an opaque golden/brown background with blue/white elements.

**Technical Implementations:**

-   **Frontend:** React (Vite, TypeScript) running on port 5000.
-   **Backend:** Express (TypeScript) located in the `backend/` directory, running internally on port 3001. All API endpoints are prefixed with `/api`.
-   **Database:** PostgreSQL with Prisma for ORM, configured via `DATABASE_URL` secret.
-   **AI Integration:** Google Gemini for the intelligent chatbot, including Google Maps integration for location-based queries.
-   **Email System:** Nodemailer with Gmail App Password for notifications and contact forms.
-   **Automated News:** Daily automated retrieval and update of TJES news at 9 AM.
-   **Security:** Implemented with Helmet (XSS, clickjacking protection), CORS configured for Replit domains, and rate limiting (100 req/min general, 3-10 req/15min per form). API keys are securely stored in the backend.
-   **LGPD Compliance:** Dedicated sections for Privacy Policy and Terms of Use detailing data handling, user rights, and security measures.
-   **Blog Module:** Comprehensive CRUD operations for legal articles, supporting categories, featured articles, and an admin panel.

**Core Features:**

-   **AI Chatbot:** Powered by Google Gemini, offering intelligent assistance and Google Maps integration. The chatbot follows a structured protocol for user identification, service modality (presential/virtual), and data collection.
-   **Legal Articles Blog:** Allows publication of articles, opinions, and guidelines with categories like "Artigo Jurídico," "Orientação ao Cidadão," "Notícia Interna," "Jurisprudência," "Opinião," and "Informativo."
-   **Automated TJES News:** Daily updates of news from the Espírito Santo Court of Justice.
-   **Interactive Forms:** For contact, appointment scheduling, and service demands.
-   **Appointment Scheduling:** Supports both in-person and virtual (Zoom) appointments.
-   **Security and Compliance:** Robust security measures and full adherence to LGPD.

## External Dependencies

-   **Google Gemini API:** For the intelligent virtual assistant chatbot.
-   **Google Maps API:** Integrated within the chatbot for location-based information.
-   **PostgreSQL Database:** Used for all persistent data storage, managed by Prisma ORM.
-   **Nodemailer:** For sending emails, specifically integrated with Gmail using App Passwords.
-   **Zoom:** For virtual appointment scheduling.
-   **Vite:** Frontend build tool.
-   **React:** Frontend framework.
-   **Express:** Backend web framework.
-   **Prisma ORM:** Database toolkit for data access.