# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NEXTGRES landing site — a static marketing site for a real-time personalization API product. Built on the 11ty Advance theme (Zerostatic). Deployed automatically to Netlify from the `main` branch.

## Commands

- **Dev server:** `npm run dev` or `npm run start` (builds Sass, then watches Sass + Eleventy in parallel)
- **Build:** `npm run build` (cleans `_site/`, builds Sass + Eleventy)
- **Sass compile:** `npm run build:sass`
- **Sass watch:** `npm run watch:sass`

No test suite exists (`npm test` is a no-op stub).

## Architecture

**Static site generator:** Eleventy 3.x with Liquid templates (ESM config).

**Directory layout:**
- `src/` — Eleventy input directory
- `src/_layouts/` — Liquid layout files (default, home, basic, service, project, team, contact, list)
- `src/_includes/` — Reusable Liquid partials (framework/ for core UI, theme/ for custom)
- `src/_data/` — Global data files (site.yml, menu.yml, contact.yml, social.json, env.js, partners.json, authorlist.yml)
- `src/_services/` — Industry vertical pages (markdown with service layout)
- `src/_projects/` — Platform capability pages (markdown with project layout)
- `src/_team/` — Team member pages (markdown with team layout)
- `src/_sass/` — SCSS source compiled to `_site/assets/css/style.css` (Bootstrap 5 + theme styles)
- `assets/` — Static assets (CSS, JS, fonts, images) — passthrough copied to `_site/`
- `_site/` — Build output (gitignored)

**Layout hierarchy:**
- `default.liquid` — Root HTML layout. Contains head, nav, footer, dark mode, analytics.
- `home.liquid` — Extends default. Data-driven homepage with hero, services grid, intro, projects grid, outro sections.
- `service.liquid` — Extends default. Service detail page with hero + sidebar.
- `project.liquid` — Extends default. Project detail page with hero + sidebar.
- `basic.liquid` — Extends default. Simple content page with optional hero.
- `contact.liquid` — Extends default. Contact form page with Netlify form + contact sidebar.
- `team.liquid` — Extends default. Team member detail page.
- `list.liquid` — Extends default. Reusable grid list page (used for services index, team index).

**Content structure:**
- Industry verticals: `src/_services/*.md` with `service` layout. Directory data in `_services.json` sets layout and permalink pattern.
- Capabilities: `src/_projects/*.md` with `project` layout. Shown on homepage via projects grid.
- Team: `src/_team/*.md` with `team` layout.
- Pages: `src/home.md`, `src/about.md`, `src/contact.md`, `src/support.md`, `src/success.md`, `src/services.md`, `src/team.md`

**Adding an industry vertical:** Create a `.md` file in `src/_services/` with frontmatter (title, description, weight, hero config). The `_services.json` handles layout and permalink automatically.

**Key patterns:**
- All configuration is data-driven via `src/_data/site.yml` (branding, colors, features, footer, analytics).
- Navigation is configured in `src/_data/menu.yml` (main menu, footer menus).
- Homepage sections are controlled via frontmatter in `src/home.md` (hero, services, intro, projects, outro).
- GA4 funnel tracking is in `src/_includes/theme/ga4-funnel.liquid`, included in default layout. Uses `ga4_id` global data from env var `GA4_ID`.
- Dark mode toggle is built into the theme (localStorage persistence).
- Contact form uses Netlify Forms with honeypot, form name "beta".
- The `excludeFromSitemap` frontmatter flag removes pages from `sitemap.liquid`.
- Custom Eleventy filters: `jsonify`, `excludeFromSitemap`, `sortByWeight`, `sortByTitle`.

## Deployment

Push to `main` → Netlify runs `npm run build` and publishes `_site/`. URL redirects from old paths (e.g., `/saas-solutions` → `/services/saas-solutions/`) are configured in `netlify.toml`.
