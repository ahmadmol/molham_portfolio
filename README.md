# Molham Alnaeb — Portfolio

A modern, single-page developer portfolio for **Molham Alnaeb** — Android
Developer specialized in Kotlin, Jetpack Compose, REST APIs, and modern
mobile engineering.

The site is built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind
CSS v4**, and **Framer Motion**, exported as a fully static site and deployed
to **GitHub Pages** under `/molham_portfolio/`.

## Tech stack

- **Next.js 15** — App Router, static export (`output: "export"`)
- **TypeScript** — strict
- **Tailwind CSS v4** — via `@tailwindcss/postcss`
- **Framer Motion** — entry animations, mobile menu, scroll-to-top
- **Geist** — primary font (via `next/font`)
- **No backend** — the contact form uses `mailto:` so submissions are real
  email drafts, not a network request

## Local development

```bash
cd portfolio-site
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Quality checks

```bash
npm run lint   # ESLint (next/core-web-vitals + next/typescript)
npm run build  # Static export into ./out
```

## Deploying to GitHub Pages

This repo is pre-configured for static export:

- `next.config.ts` sets `output: "export"`, `basePath: "/molham_portfolio"`,
  and `assetPrefix: "/molham_portfolio/"`.
- After `npm run build`, the static site is generated in `./out`.
- Publish the contents of `./out` to the `gh-pages` branch (or a Pages
  workflow that uploads `./out` as an artifact).

To set a custom canonical URL for metadata, define
`NEXT_PUBLIC_SITE_URL` before building.

## Project structure

```
portfolio-site/
├── public/                 # Static assets (og-image, favicon, etc.)
├── src/
│   ├── app/                # Next.js App Router (layout, page, globals.css)
│   ├── components/
│   │   ├── sections/       # Page sections (Hero, About, Skills, …)
│   │   ├── ui/             # Reusable primitives (Button, Badge, …)
│   │   └── LoadingAnimation.tsx
│   ├── data/portfolio.ts   # Typed source of truth for all content
│   └── types/css.d.ts
├── next.config.ts
└── package.json
```

All visible text — including names, projects, skills, and contact details —
comes from `src/data/portfolio.ts`, which is sourced from
`portfolio-content.md` in the repository root. To update content, edit the
data file (or its source) and rebuild.

## Design system

- **Palette**: deep navy base (`#050A18`) with emerald accent (`#10B981`).
  Tokens are defined in `src/app/globals.css` (`@theme inline` block).
- **Typography**: Geist Sans (UI) + Geist Mono (code/kickers), tight tracking
  on display sizes.
- **Surfaces**: `.surface-card` provides a consistent panel style across
  About, Experience, Skills, Projects, Education, and Contact.
- **Motion**: All Framer Motion components respect
  `prefers-reduced-motion` and switch to a static presentation.

## Contact form

The contact form does **not** POST anywhere. Submitting it opens the user's
default email client with a pre-filled `mailto:` draft. The UI is honest
about this: it tells the user "Submitting opens your email app — no data is
stored on a server" and shows a fallback link to the email address if the
mail client fails to open.

## Accessibility

- Skip-to-content link
- Visible focus rings on all interactive elements
- `aria-current`, `aria-expanded`, `aria-controls` on nav controls
- Form fields wired with `aria-invalid` and `aria-describedby`
- Status messages announced via `role="status"` + `aria-live="polite"`
- Full keyboard support, including Escape-to-close on the mobile menu

## License

© Molham Alnaeb. All rights reserved.
