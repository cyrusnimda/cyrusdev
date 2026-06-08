# Cyrusdev — Agent guide

## Stack
- **Astro 5** SSR with `@astrojs/node` standalone adapter
- **Tailwind CSS 4** via `@tailwindcss/vite` Vite plugin
- **pnpm** (lockfile: `pnpm-lock.yaml`; also has stale `package-lock.json`)

## Commands
| Action | Command |
|---|---|
| Dev server | `pnpm dev` |
| Build | `pnpm build` |
| Preview production build | `pnpm preview` |
| Astro CLI passthrough | `pnpm astro ...` |

No linter, no formatter, no typecheck scripts exist.

## Dev server
Runs at `http://localhost:4321`. Uses Astro dev toolbar (disabled in config).

## Env vars (required at build time)
Defined in `astro.config.mjs` env schema:

| Variable | Context | Access |
|---|---|---|
| `CLOUDFLARE_APIKEY` | server | public (Turnstile site key) |
| `CLOUDFLARE_SECRETKEY` | server | secret |
| `MAILGUN_API_KEY` | server | secret |

Copy `.env.sample` → `.env` and fill real values. Note `.env.sample` still says `SENDGRID_API_KEY` — ignore it, the app uses Mailgun.

## Structure
```
src/
├── pages/         # Routes: index, contact, projects, services, api/contacto
├── components/    # Menu.astro only
├── layouts/       # Layout.astro
├── lib/           # email.ts (Mailgun client)
├── assets/        # global.css (@import "tailwindcss"), images
├── middleware.ts  # CSP + security headers
```

## Contact form flow
1. User submits form with Turnstile widget → POST `/api/contacto`
2. Server verifies Turnstile token against Cloudflare
3. Server sends email via Mailgun (`mg.cyrusnimda.com` domain)
4. Client shows Notyf toast on success/error

## CI / Deploy
- GitHub Actions (`.github/workflows/astro.yml`) triggers on push/PR to `master`
- **Uses `npm ci`** (not `pnpm`), then `npm run build` with env secrets injected
- Artifact from `dist/` is rsync'd via SSH to `ssh.cyrusnimda.com` → `/var/www/html/cyrusdev.co.uk/`
- Deploy step uses `easingthemes/ssh-deploy` with SSH private key secret

## Build output
- `dist/` — production build (gitignored)
- `.astro/` — generated TypeScript types (gitignored)
- Built entrypoint: `dist/server/entry.mjs` (used by PM2 in production)

## Gotchas
- CI uses `npm ci` while the repo uses `pnpm` — ensure `package-lock.json` is in sync if adding deps, or risk CI failure.
- `.env` with real keys is **committed** (`.gitignore` does not include it) — do not commit another `.env`.
- `ecosystem.config.cjs` (PM2) has hardcoded secrets and is gitignored.
- No test suite exists.
- TypeScript extends `astro/tsconfigs/strict`.
- VS Code: install `astro-build.astro-vscode` extension.
