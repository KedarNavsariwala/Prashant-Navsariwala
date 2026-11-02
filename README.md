# Prashant Navsariwala

A single-page portfolio: thirty years of automotive body engineering, told as a
quiet editorial scroll story from 1994 to today.

The page is static HTML generated at build time from typed content, with motion
and interaction layered on in the browser. It renders completely without
JavaScript.

## Stack

- Vite + TypeScript, hand-written CSS
- GSAP + ScrollTrigger for scroll motion, Lenis for smooth scrolling
- three.js, deferred, for the planned 3D stage
- Inter and Instrument Serif, self-hosted via Fontsource
- `satori` + `sharp` for the social card, `sharp` for the image pipeline

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Script            | What it does                                                             |
| ----------------- | ------------------------------------------------------------------------ |
| `npm run dev`     | Dev server with the static renderer running on every request              |
| `npm run build`   | Regenerates media and the social card, type-checks, builds to `dist/`     |
| `npm run preview` | Serves the production build locally                                       |
| `npm run media`   | Re-runs only the image and social-card pipeline                           |
| `npm run typecheck` | `tsc --noEmit`                                                          |

## How the page is built

- All copy and data live in `src/content.ts`. Nothing is invented: dates,
  vehicle names, the patent number and the roles come from the résumé and the
  research notes in `research/`.
- `src/render.ts` turns that content into the document head and body.
- `vite.config.ts` injects the rendered markup into `index.html` through a small
  `transformIndexHtml` plugin, so dev and production share one renderer.
- The browser only adds behaviour: `src/nav.ts`, `src/showroom/showroom.ts`,
  `src/career.ts` and the lazy `src/motion/motion.ts` chunk.

## Content and assets

- Portrait and vehicle cut-outs: `Assets/*.png`, listed in `media.config.json`
  with the widths each one needs.
- `scripts/optimize-media.mjs` trims the transparency, defringes the edges and
  writes AVIF + WebP at each width into `public/media/`.
- `scripts/make-og.mjs` renders `public/og.png` and the icons from the same
  content, so the social card never drifts from the page.

Changing a source image or `media.config.json` means running `npm run media`
(or `npm run build`) again and committing the regenerated files in `public/`.

## Motion and accessibility

- Motion is an enhancement. `prefers-reduced-motion: reduce` skips the motion
  chunk entirely and shows the finished composition.
- With JavaScript disabled the page is complete: the hero wordmark is set in
  CSS exactly as it renders, the mobile menu is a native `<details>`, and every
  section is present in the static HTML.
- The showroom is a roving-tabindex listbox: arrow keys change the selected
  vehicle, Enter moves focus to the detail panel, and the panel is announced
  through `aria-live="polite"`.
- Mobile Lighthouse is the target: performance, accessibility, best practices
  and SEO are checked at 390 × 844.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages. The build is fully static; the only
requirement is Node 22 or newer.

Site URL: <https://prashant-navsariwala.github.io/>
