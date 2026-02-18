# WhatsApp Bot Agent SaaS

## Overview
Site SaaS para vender serviço de agente bot WhatsApp para empresas usando automação n8n. O site inclui landing page, formulário de captação de leads, planos de preços, depoimentos e painel para usuários logados.

## Recent Changes
- 2026-02-18: Projeto criado com landing page, dashboard, autenticação Replit Auth, banco PostgreSQL
- 2026-02-18: Stripe integration dismissed by user - payment processing not yet integrated

## User Preferences
- Idioma: Português (Brasil)
- Tema: Verde WhatsApp (#25D366) com modo claro/escuro
- Stack: fullstack JavaScript (Express + React + PostgreSQL)

## Project Architecture

### Tech Stack
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL (Neon) via Drizzle ORM
- **Auth**: Replit Auth (OpenID Connect)

### Directory Structure
- `client/src/pages/` - Landing page e Dashboard
- `client/src/hooks/` - useAuth, useToast
- `client/src/components/ui/` - Componentes shadcn
- `server/` - Express backend, routes, storage
- `server/replit_integrations/auth/` - Replit Auth module
- `shared/` - Schema Drizzle, tipos compartilhados, rotas API

### Database Tables
- `users` - Usuários autenticados (Replit Auth)
- `sessions` - Sessões de login
- `leads` - Leads capturados pelo formulário de contato
- `plans` - Planos de preço (seeded com Starter, Profissional, Enterprise)
- `testimonials` - Depoimentos de clientes

### API Endpoints
- `GET /api/plans` - Lista planos de preços
- `GET /api/testimonials` - Lista depoimentos
- `POST /api/leads` - Submete formulário de contato
- `GET /api/auth/user` - Usuário autenticado atual
- `GET /api/login` - Inicia fluxo de login
- `GET /api/logout` - Inicia fluxo de logout

### Notes
- Stripe connector was dismissed - payment processing needs to be added later (user needs to set up Stripe or provide API keys)
- Preços são armazenados em centavos (ex: 9900 = R$ 99,00)
- n8n integration is referenced in UI but not programmatically connected
