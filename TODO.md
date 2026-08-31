# TODO — Modern Portfolio (Next.js 15)

> Living checklist. All items below are implemented as of the current build.

## Core

- [x] Add framer-motion dependency
- [x] Define typed portfolio data from `portfolio-content.md` in `src/data/portfolio.ts`
- [x] Create reusable UI primitives in `src/components/ui`
- [x] Create section components in `src/components/sections`:
  - Hero
  - About
  - Experience Timeline
  - Skills
  - Featured Projects
  - Education
  - Contact
  - Footer
- [x] Compose all sections and anchors in `src/app/page.tsx`

## UI / UX pass

- [x] Establish Navy (#050A18) + Emerald (#10B981) design tokens
- [x] Refined typography scale, font feature settings, and selection styling
- [x] Reusable card surface (`surface-card`, `surface-card-hover`)
- [x] Animated entry sequences (Framer Motion) honoring `prefers-reduced-motion`
- [x] Accessible focus rings across interactive elements
- [x] Scroll-spy nav with active section indicator + keyboard support
- [x] Mobile menu with overlay, body scroll lock, and Escape-to-close
- [x] Skills cards with animated proficiency rings
- [x] Experience timeline with status pills and current-role dot
- [x] Project cards with category-aware visual header (no fake screenshots)
- [x] Contact form opens the user's mail client via `mailto:` (no fake "sent" state)
- [x] Honest contact copy: explains that submit opens an email draft, not a network call
- [x] Scroll-to-top FAB with proper focus styles
- [x] Updated OG image and metadata for GitHub Pages compatibility

## Accessibility

- [x] Skip-to-content link
- [x] All interactive controls reachable by keyboard
- [x] `aria-current`, `aria-expanded`, `aria-controls`, `aria-invalid`, `aria-describedby`
- [x] Live regions for form status messages
- [x] Reduced-motion fallback on every animated element

## Quality gates

- [x] `npm ci`
- [x] `npm run lint`
- [x] `npm run build`
