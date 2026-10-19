# Release QA — 2026-10-19

## Scope

CV-aligned Mobile Developer content, responsive navy/emerald interface,
accessible navigation/contact, real PDF download, correct GitHub Pages
metadata/assets and a reproducible static deployment workflow.

The existing local edits were preserved. A fresh checkout based on
`1de57521dcae36c534ef59771af4f6f752376df0` was used for release because the
older checkout's Git metadata had incompatible Windows ownership. The remote
`main` matched that starting commit during preflight; no conflicts or file
deletions were found. Commit identity follows the repository's existing
`ahmadmol` identity. Owner authorization covers commit, normal push and Pages
verification; no force push or hook bypass is permitted.

## Required checks

Release environment: Windows, Node.js **22.23.3**, npm **10.9.9**.
The Actions workflow also selects Node.js 22 and runs the same checks on Linux.

| Command/check | Result |
|---|---|
| `npm ci` | Passed |
| `npm run lint` | Passed, no errors or warnings |
| `npx tsc --noEmit` | Passed |
| `npm run build` | Passed; static `out/`; first-load JS approximately 150 kB |
| `git diff --check` | Passed |
| Source/lockfile secret-pattern and dependency-origin review | No findings; package sources use the npm registry |
| `npm audit --omit=dev` | Zero findings |
| Static preview under `/molham_portfolio/` | Referenced CSS, scripts, fonts, icon, OG PNG and PDF return 200 |

The fresh build retried a Google Fonts network timeout and completed
successfully; fonts are then served locally in the static output.

## Browser and asset checks

The release export is tested with Edge/Chromium using `scripts/qa.mjs`:

- All nine widths: 320, 375, 390, 430, 768, 1024, 1200, 1440, 1920px.
- No horizontal overflow, runtime exceptions, hydration errors or failed asset requests.
- Skip link, anchor offsets, active section, browser Back, menu focus wrapping,
  Escape/backdrop/resize/anchor close and scroll restoration.
- Form validation/error focus, correct Unicode/ampersand email draft encoding,
  preserved text and truthful status; no email is sent by the website.
- Reduced motion and content visibility with JavaScript disabled.
- One H1, four project cards, two experience entries and no nested controls.
- axe: zero violations in the tested WCAG rules; automated contrast items
  requiring manual review are not represented as an exhaustive accessibility audit.

Earlier implementation QA also verified native 200% browser zoom, blocked
JavaScript, actual clipboard/fallback behavior and rendered token contrast
(minimum 6.73:1 for the tested text/surface combinations). Lighthouse mobile
lab scores with gzip static serving: Performance 93, Accessibility 100,
Best Practices 100, SEO 100. These are lab measurements, not field CWV.

`basePath` and `assetPrefix` remain `/molham_portfolio` and
`/molham_portfolio/`. Canonical and Open Graph URLs use
`https://ahmadmol.github.io/molham_portfolio/`. No server routes or production
Node process are required.

CV asset: `public/resume/Molham_Alnaeb_CV_2026.pdf`.
SHA-256: `91B24623AFC3672D8EC2ED8B3385CF21E4D86206D8F44D8A58F280D21D81B16E`.
This is the unchanged original approved for public download.

## Excluded local material

`.env*`, private keys/credentials, `node_modules/`, `.next/`, `out/`, cache,
logs, test artifacts, editor state and backups are not part of the release.
`docs/qa/` screenshots/raw logs and the long implementation-session report
remain local and ignored. This concise report and `CONTENT_VERIFICATION.md`
retain useful maintenance information without local machine paths.

## Known limits and post-push verification

Five high development-tool findings remain in the unpatched braces /
micromatch / fast-glob / Next ESLint chain. Those tools are not deployed in
the static artifact; production audit is clean. Keep build inputs trusted and
monitor upstream fixes instead of forcing a framework downgrade/major change.

The exact LinkedIn destination matches the CV, but automated HTTP requests
receive 999; this is recorded as an external verification limitation.
Additional project proof links/stack attributions and the older Remocola role
remain pending owner confirmation and are omitted where unverified; see
`CONTENT_VERIFICATION.md`.

After push, verify the workflow for the exact pushed SHA, successful build
and deploy jobs, live content and live static asset/PDF responses. The final
release handoff records the resulting commit SHAs, workflow URL and observed
production status; this preflight report does not imply deployment success.
