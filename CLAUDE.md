# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server on port 8080
npm run build      # Next.js production build
npm run export     # Export static site to /out (run after build)
npm run start      # Start Express server with nodemon (local only)
npm run lint       # ESLint (airbnb config)
```

Netlify deploy runs `npm run build && npm run export` — the `/out` directory is the published artifact.

Node version is pinned to `v14.15.0` via `.nvmrc`. Run `nvm use` before installing deps.

## Architecture

This is a **Next.js static site** exported to flat HTML and deployed on Netlify. There is no server-side rendering in production — `next export` generates the `/out` folder from the routes defined in `next.config.js` → `exportPathMap`.

**Two separate runtime targets exist in the same repo:**

1. **Static site (Netlify)** — the live production site at bewelltherapy.org. Pages in `pages/` are statically exported. No API routes used.

2. **Express server (legacy/dev)** — `server/index.js` wraps Next.js with Express and adds an email contact endpoint. `serverless.yml` deploys this to AWS Lambda + API Gateway, but this path is not the current production deployment.

**Key data files — most content changes go here:**

- [`components/ourStaff/staffInfo.js`](components/ourStaff/staffInfo.js) — the `employees` array. Each entry has `name`, `certs`, `headshotPath`, `headshotPosition`, and `modalInfo.info` (array of paragraph strings). Staff headshots go in `public/img/our-staff/`. New images must be under ~4.3 MB or the static export will 500.
- [`components/constants.js`](components/constants.js) — `services`, `hours`, address, phone number. Edit here to update the services page or office hours.

**Page/layout structure:**

- `pages/` — one directory per route (`/`, `/about-us`, `/our-staff`, `/our-services`, `/forms`). Each page uses the `Default` layout from `layouts/default.js`.
- `layouts/default.js` — wraps every page: `<Meta>` → `<Navbar>` → `<main>{children}</main>` → `<Footer>`.
- `layouts/meta.js` — per-page `<head>` tags (title, OG, etc.).
- `components/nav/navbar.js` — switches between `desktopNavbar` and `mobileNavbar` using the `useResize` hook.
- `components/modal/` — reusable modal + `useModal` hook, used on the Our Staff and Our Services pages.

**Contact form (Express path only):**

`server/contact/index.js` sends email via nodemailer. Behavior is controlled by the `CURRENT_STAGE` env var (`production` vs anything else). Dev uses port 2525 (Mailtrap-style); prod uses `PROD_SERVICE`/`PROD_HOST`. These env vars are not used by the static Netlify build.

## Environment

Copy `.env.example` to `.env` for local Express server development. The static export does not require any env vars.

ESLint uses the airbnb config with three rules relaxed: `react/jsx-filename-extension`, `react/prop-types`, and `react/jsx-props-no-spreading`.
