# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NEXTGRES landing site — a static marketing site for a real-time personalization API product. Deployed automatically to Netlify from the `main` branch.

## Commands

- **Dev server:** `npm run dev` (runs Eleventy serve + Sass watch in parallel)
- **Build:** `npm run build` (runs `npx eleventy`)
- **Sass compile:** `npm run css:build`
- **Sass watch:** `npm run css:watch`

No test suite exists (`npm test` is a no-op stub).

## Architecture

**Static site generator:** Eleventy 3.x with Nunjucks templates.

**Directory layout:**
- `src/` — Eleventy input directory
- `src/_includes/` — Nunjucks layouts and partials
- `src/_data/` — Global data files (currently empty; `ga4_id` is set in `.eleventy.js` via env var `GA4_ID`)
- `src/css/styles.scss` — SCSS source compiled to `src/css/styles.css` (Bootstrap 5 + custom styles)
- `src/assets/` — Static images
- `_site/` — Build output (gitignored)

**Template hierarchy:**
- `base.njk` — Root HTML layout. Contains navbar, footer, GA4 tracking, JSON-LD structured data, and client-side analytics event listeners.
- `industry.njk` — Extends `base.njk`. Data-driven layout for industry vertical landing pages. Renders hero, benefits cards, "How It Works" timeline, and CTA from frontmatter data (`headline`, `subheadline`, `body`, `benefits`, `steps`, `ctaText`, `ctaUrl`).
- `howitworks-section.njk` — Shared partial for the alternating-sides timeline. Driven by `steps` array in frontmatter.
- `index.njk` — Homepage. Uses `base.njk` directly (not `industry.njk`) with inline markup.

**Adding a page:** Create a `.njk` file in `src/`. For industry verticals, set `layout: industry.njk` and populate the frontmatter fields — no HTML needed.

**Key patterns:**
- Industry pages are purely data-driven via frontmatter; the `industry.njk` layout handles all markup.
- GA4 analytics are embedded in `base.njk` with funnel tracking for root entry, industry navigation, and beta form submission.
- The `excludeFromSitemap` frontmatter flag removes pages from the generated sitemap.
- Custom Eleventy filters: `jsonify` (JSON.stringify), `excludeFromSitemap` (filters sitemap collection).
- Passthrough copies: `src/css` → `css`, `src/assets` → `assets`, `src/robots.txt` → `/robots.txt`.

## Deployment

Push to `main` → Netlify auto-builds with `npx eleventy` and publishes `_site/`.
