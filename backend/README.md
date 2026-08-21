# Revenue Dashboard — Backend

Backend API for the [Revenue Dashboard](../README.md) project, built with [Ruby on Rails 8](https://rubyonrails.org). Serves data to the Next.js frontend in the sibling `../frontend` project.

> This is one half of a monorepo. See the [root README](../README.md) for the project overview and how to run both projects together.

## Tech stack

- [Ruby on Rails 8](https://rubyonrails.org)
- [PostgreSQL](https://www.postgresql.org) — primary database
- [Puma](https://github.com/puma/puma) — app server
- [Solid Queue / Solid Cache / Solid Cable](https://github.com/rails/solid_queue) — job queue, cache, action cable (backed by Postgres, no Redis required)
- [Hotwire (Turbo + Stimulus)](https://hotwired.dev), [importmap-rails](https://github.com/rails/importmap-rails)
- [rack-cors](https://github.com/cyu/rack-cors) — CORS support for the frontend
- [Kamal](https://kamal-deploy.org) — Docker-based deployment

## Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| Ruby | `3.3.3` | Pinned in `.ruby-version`. Use any version manager ([asdf](https://asdf-vm.com), [rbenv](https://github.com/rbenv/rbenv), [rvm](https://rvm.io)) or [install directly](https://www.ruby-lang.org/en/documentation/installation/) |
| PostgreSQL | `>= 9.3` (16+ recommended) | Install via Homebrew: `brew install postgresql@16`, or your OS's package manager |
| Bundler | matches `Gemfile.lock` | Install via `gem install bundler` |

Check before you start:

```bash
ruby -v      # ruby 3.3.3
psql --version
bundle -v
```

Make sure PostgreSQL is running:

```bash
brew services start postgresql@16
```

## Setup & running locally

```bash
cd backend

# 1. Install gem dependencies
bundle install

# 2. Create & migrate the database (dev + test), per config/database.yml
bin/rails db:prepare

# 3. Start the server
bin/rails server
# or: bin/dev
```

The API runs at **http://localhost:3000**.

> You can also run `bin/setup`, which does all three steps above (install gems, prepare the DB, clear logs/tmp) and then boots the server.

## Credentials

`config/master.key` decrypts `config/credentials.yml.enc` and is **not** committed to the repo (it's in `.gitignore`), so a fresh clone won't have it.

- **Joining an existing project:** get `master.key` shared with you out-of-band (Slack, password manager, etc. — never through git) by someone who already has it, and place it at `backend/config/master.key`.
- **Starting fresh / no one has one yet:** generate a new one by running `bin/rails credentials:edit` — Rails will create both `config/master.key` and `config/credentials.yml.enc` for you.

## Database

Default database names (from `config/database.yml`):

| Env | Database |
|---|---|
| development | `revenue_dashboard_development` |
| test | `revenue_dashboard_test` |
| production | `revenue_dashboard_production` (+ `_cache`, `_queue`, `_cable`) |

Common commands:

```bash
bin/rails db:prepare   # create DB + run pending migrations
bin/rails db:migrate   # run new migrations
bin/rails db:seed      # seed sample data
bin/rails db:reset     # drop + recreate + seed
```

## Common commands

| Command | Description |
|---|---|
| `bin/rails server` | Run the dev server (port 3000) |
| `bin/rails console` | Rails console |
| `bin/rails test` | Run the test suite |
| `bin/rubocop` | Style check (Omakase) |
| `bin/brakeman` | Static security vulnerability scan |

## Connecting to the frontend

The Next.js frontend runs at `http://localhost:3001` and calls this API at `http://localhost:3000`. Since these are different origins, CORS is enabled via `rack-cors` in `config/initializers/cors.rb`, which allows `http://localhost:3001` by default:

```ruby
# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ENV.fetch("CORS_ORIGINS", "http://localhost:3001").split(",")

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```

To allow additional origins (e.g. a deployed frontend URL), set the `CORS_ORIGINS` env var as a comma-separated list:

```bash
CORS_ORIGINS=http://localhost:3001,https://app.example.com
```

## Troubleshooting

- **`FATAL: role "..." does not exist` / Postgres authentication errors** — `config/database.yml` uses your OS user as the default Postgres role in development. Either create a matching role (`createuser -s $(whoami)`) or set `username`/`password`/`host` in `config/database.yml` to match your local Postgres setup.
- **`Missing encryption key to decrypt file...`** — `config/master.key` is missing. See the [Credentials](#credentials) section above.
- **`Address already in use - bind(2) for "127.0.0.1" port 3000`** — another process is using port 3000. Stop it, or run `bin/rails server -p 3002` (and update `NEXT_PUBLIC_API_URL` / `CORS_ORIGINS` to match).
- **`bundle install` fails on the `pg` gem** — make sure PostgreSQL's dev headers are available, e.g. `brew install postgresql@16` on macOS, or `libpq-dev` on Debian/Ubuntu.

## Deployment

Deployed via [Kamal](https://kamal-deploy.org), configured in `config/deploy.yml` with secrets in `.kamal/secrets`.

```bash
bin/kamal deploy
```

> `config/deploy.yml` currently holds placeholder values (`your-user/backend`, `app.example.com`) — fill in real server/registry details before your first deploy.
