# Molham Alnaeb — Mobile Developer portfolio

A single-page, English portfolio built with Next.js 15 App Router, React 19,
strict TypeScript, Tailwind CSS v4, Geist and Framer Motion 12. Static export;
no backend, tracking, external forms or production Node service.

## Develop and validate

Use Node.js 22 (the GitHub Actions version) with npm. From this directory:

```sh
npm ci
npm run dev
npm run lint
npx tsc --noEmit
npm run build
npm run preview
```

Development: `http://localhost:3000/molham_portfolio/`.
Static preview: `http://127.0.0.1:4173/molham_portfolio/`.
`npm start` also runs the static preview. `out/` is the deployment artifact.
The preview intentionally returns 404 outside the repository subpath, so it
catches links that accidentally depend on a root-only development server.
Optional preview environment variables: `PORT` and `OUT_DIR`.

## Content and assets

`src/data/portfolio.ts` is the typed professional-content source of truth.
Update it using verified career information. Project `id` and `visualTheme`
control illustrations explicitly. Empty technologies and absent proof URLs
are intentional: add them only when confirmed. Do not substitute stock or
imagined app screenshots for evidence.

The CV is the exact supplied PDF at
`public/resume/Molham_Alnaeb_CV_2026.pdf`. To replace it, copy the original PDF
unchanged, inspect its contents, confirm download consent, and verify the
published URL returns a PDF. `resumeAsset` in the data file controls its path.
If removing the CV, remove its actions until a real asset is available.

All public URLs use `publicUrl()` in `src/lib/url.ts`. `NEXT_PUBLIC_SITE_URL`
is an HTTP(S) **origin only**, for example `https://ahmadmol.github.io`.
Do not include `/molham_portfolio`, credentials, query strings or fragments;
invalid values deliberately fail the build. The helper adds the subpath once.
Canonical, Open Graph, Twitter and favicon URLs use this same convention.
The branded OG graphic is `public/og-image.png` (1200×630).

## Architecture and interaction

The server page composes Hero → Professional overview → Projects → Experience
→ About → Skills → Education/languages → Contact. Client components are
limited to navigation, contact, section motion and back-to-top.

The mobile menu uses a native modal dialog, explicit focus wrapping, Escape,
backdrop close and scroll restoration. Navigation uses real fragment links.
Motion respects user preferences; static content remains visible without
JavaScript, including React's streamed Suspense export containers.

The contact form validates locally and opens a `mailto:` draft. It does not
send, collect or store messages. Copy-email and a reopen-draft link provide
fallbacks. A configured email application is required for opening a draft.

## Browser QA

`scripts/qa.mjs` uses an available Playwright installation and Edge by default.
It checks all nine planned widths, navigation, keyboard focus, forms, assets,
reduced motion and JavaScript-disabled rendering. It writes screenshots and
JSON evidence into `docs/qa/`. `node scripts/qa-extra.mjs` adds clipboard, blocked-JavaScript, native 200% zoom, contrast and external-link checks. For an externally installed copy, set
`PLAYWRIGHT_MODULE` to its absolute `index.mjs` path. Optional `AXE_SCRIPT`
points to a local axe-core bundle. `BROWSER_CHANNEL` can select another
installed Chromium browser; `QA_URL` and `QA_DIR` customize the target/output.

```sh
npm run preview
# In another terminal, with Playwright available:
npm run qa:browser
```

See `docs/RELEASE_QA.md` for the release checks and security review.
Local screenshots, logs and implementation-session reports are intentionally ignored. `docs/CONTENT_VERIFICATION.md`
records source facts and outstanding owner confirmations.

## GitHub Pages

Production target: https://ahmadmol.github.io/molham_portfolio/

`next.config.ts` keeps `output: "export"`, `basePath` and `assetPrefix`.
The existing workflow builds `out/`, uploads the Pages artifact and deploys
only after a push to `main`. Review and owner approval are required before
committing, pushing or deploying these changes. For release, build on a clean
runner and publish only its fresh `out/` artifact.

Next.js and its ESLint config are patched to 15.5.28. The PostCSS override
keeps transitive PostCSS on a patched 8.x version. The remaining braces
advisory has no patched release and affects local glob tooling; do not feed
untrusted patterns into build/lint tools. See the dated QA report for details.
