# Revenue Dashboard

A revenue dashboard application, split into two projects in this monorepo:

- **[`backend/`](backend/README.md)** — Ruby on Rails 8 API (PostgreSQL, Solid Queue/Cache/Cable)
- **[`frontend/`](frontend/README.md)** — Next.js 16 web app (TypeScript, Tailwind CSS)

Each project has its own README with full setup instructions. This file covers how they fit together and how to get both running locally.

## Getting the code

```bash
git clone https://github.com/quangminhvo79/revenue_dashboard.git
cd revenue_dashboard
```

## Prerequisites

| Tool | Version | Used by |
|---|---|---|
| [Ruby](https://www.ruby-lang.org) | `3.3.3` | backend |
| [PostgreSQL](https://www.postgresql.org) | `>= 9.3` (16+ recommended) | backend |
| [Node.js](https://nodejs.org) | `24.10.0` | frontend |
| [Yarn Classic](https://classic.yarnpkg.com) | `1.x` | frontend |

Both `backend/.ruby-version` and `frontend/.tool-versions` pin their exact runtime version. Any version manager works ([asdf](https://asdf-vm.com), [rbenv](https://github.com/rbenv/rbenv)/[nvm](https://github.com/nvm-sh/nvm), or installing the versions directly) — see each project's README for details.

## Quickstart (run both locally)

```bash
# Terminal 1 — backend API on http://localhost:3000
cd backend
bundle install
bin/rails db:prepare
bin/rails server

# Terminal 2 — frontend on http://localhost:3001
cd frontend
yarn install
cp .env.example .env.local
yarn dev
```

Open **http://localhost:3001** in your browser. The frontend calls the backend API, and CORS is already configured to allow requests from `http://localhost:3001` (see `backend/config/initializers/cors.rb`).

For full details — credentials setup, database commands, environment variables, deployment — see:

- [`backend/README.md`](backend/README.md)
- [`frontend/README.md`](frontend/README.md)

## Repository layout

```
revenue_dashboard/
├── backend/     # Rails API
└── frontend/    # Next.js app
```
