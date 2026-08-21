# Revenue Dashboard — Frontend

Frontend for the [Revenue Dashboard](../README.md) project, built with [Next.js](https://nextjs.org) (App Router). Talks to the Rails API backend in the sibling `../backend` project.

> This is one half of a monorepo. See the [root README](../README.md) for the project overview and how to run both projects together.

## Tech stack

- [Next.js 16](https://nextjs.org) — App Router, Turbopack
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [ESLint](https://eslint.org) (`eslint-config-next`)
- [Yarn Classic (1.x)](https://classic.yarnpkg.com) — package manager

## Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| Node.js | `24.10.0` | Pinned in `.tool-versions`. Use any version manager ([asdf](https://asdf-vm.com), [nvm](https://github.com/nvm-sh/nvm), [fnm](https://github.com/Schniz/fnm)) or [install directly](https://nodejs.org) |
| Yarn | `1.22.x` (Classic) | Install via `npm install -g yarn` or Homebrew (`brew install yarn`) |
| Backend API | see [`../backend/README.md`](../backend/README.md) | Needed if you want the frontend to hit real data |

Check your versions before you start:

```bash
node -v   # v24.10.0
yarn -v   # 1.22.x
```

> **Note:** the project deliberately uses Yarn Classic, not Yarn Berry/PnP. If `yarn -v` reports something other than `1.x`, install Yarn Classic explicitly (`npm install -g yarn`) and make sure it's the `yarn` your shell resolves first — otherwise `yarn install` may behave differently than documented here.

## Setup & running locally

```bash
cd frontend

# 1. Install dependencies
yarn install

# 2. Create your local env file from the example
cp .env.example .env.local
# adjust NEXT_PUBLIC_API_URL if the backend isn't running on localhost:3000

# 3. Run the dev server
yarn dev
```

The app runs at **http://localhost:3001**.

> The frontend is pinned to **port 3001** (see the `dev`/`start` scripts in `package.json`) so it doesn't collide with the Rails backend's default port 3000 when running both locally.

## Environment variables

See `.env.example` for the full list. Copy it to `.env.local` (already gitignored, never commit it).

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API | `http://localhost:3000` |

## Scripts

| Command | Description |
|---|---|
| `yarn dev` | Run the dev server (Turbopack) on port 3001 |
| `yarn build` | Build for production |
| `yarn start` | Run the production build on port 3001 |
| `yarn lint` | Run ESLint |

## Running alongside the backend

1. Terminal 1: `cd backend && bin/rails server` → runs at `http://localhost:3000`
2. Terminal 2: `cd frontend && yarn dev` → runs at `http://localhost:3001`

The backend already allows CORS requests from `http://localhost:3001` (see `backend/config/initializers/cors.rb`). If you change the frontend's port or add a deployed origin, update `CORS_ORIGINS` on the backend accordingly.

## Troubleshooting

- **`Error: listen EADDRINUSE: address already in use :::3001`** — something else is already on port 3001. Stop it, or run on a different port with `yarn dev -- -p 3002` (and update `CORS_ORIGINS` on the backend to match).
- **API calls fail with a CORS error in the browser console** — make sure the backend is running and its `CORS_ORIGINS` includes `http://localhost:3001` (it does by default; see `backend/config/initializers/cors.rb`).
- **`yarn install` behaves unexpectedly / mentions Yarn Berry or PnP** — you likely have Yarn Berry active instead of Classic. Run `yarn -v`; if it's not `1.x`, reinstall Yarn Classic (`npm install -g yarn`) and re-check your `PATH`.
- **Wrong Node version / native module errors** — confirm `node -v` matches `24.10.0` from `.tool-versions` before installing dependencies.

## Deployment

The backend self-hosts via Docker using [Kamal](https://kamal-deploy.org). For infrastructure consistency, you can deploy the frontend the same way (Dockerfile + Kamal). If you'd rather prioritize speed/CDN, you can deploy the frontend separately on [Vercel](https://vercel.com) — the most optimized platform for Next.js.

## Further reading

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
