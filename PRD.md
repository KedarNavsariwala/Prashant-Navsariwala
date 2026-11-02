# Project Requirements Document
## Prashant Navsariwala: Professional Portfolio

| Field | Value |
| --- | --- |
| Document version | 1.4 (Draft) |
| Date | 1 November 2026 |
| Owner | Kedar Navsariwala |
| Subject | Prashant Navsariwala, Automotive Product Design & Development Professional |
| Status | Draft, pending answers to §13 |
| Repository | `Prashant Navsariwala` (GitHub) |
| Source of truth for facts | `Prashant Navsariwala Resume.pdf` (in repo root) |
| Design reference | Figma, `Prashant-Navsariwala-Portfolio`, fileKey `LTgAGY4vxtBm0dKKOS2FYy` |

---

## 1. Summary

Build a **single-page, parallax- and motion-driven portfolio website** for Prashant Navsariwala, an automotive product design and development professional with 30 years in the automobile industry.

The site presents his full professional history (career timeline, vehicle programmes, patent, certifications, education) as a continuous scrolling narrative rather than a résumé in HTML form. It is built on this machine, uses the supplied brand assets and typography, and is deployed as a static site.

**One-line brief:** A quiet, editorial, black-and-white scroll story that makes 30 years of vehicle design feel like a film, not a CV.

---

## 2. Goals and non-goals

### 2.1 Goals

| # | Goal | Success looks like |
| --- | --- | --- |
| G1 | Present the complete professional history in one scroll | A visitor understands role, scale and impact without downloading the PDF |
| G2 | Make the work (vehicles) the visual centrepiece | All 6 supplied vehicle assets used at high quality, never cropped badly |
| G3 | Feel crafted, not templated | Typography-led layout, restrained palette, purposeful motion |
| G4 | Fast and accessible | Loads under 2 s on 4G, WCAG 2.2 AA, fully usable with motion disabled |
| G5 | Easy to keep current | All copy lives in one data file; adding a project or role is a data edit |
| G6 | Shareable | Correct OG/Twitter cards, JSON-LD `Person`, clean URLs |

### 2.2 Non-goals

- No CMS, admin panel, login, or database.
- No blog, case-study sub-pages, or multi-page routing in v1.
- No contact form backend; contact is outbound links (LinkedIn, email).
- No dark mode in v1 (palette is defined so it can be added later).
- No WebGL *dependency*. WebGL is allowed anywhere in the project (owner decision, 1 Nov 2026); v1 uses it only in the Selected Work stage (§5.2). Every WebGL surface must degrade to a static fallback, because all rendering happens on the visitor's device.
- No analytics beyond privacy-friendly page views (optional, see §13).

---

## 3. Audience

| Audience | What they need | Implication |
| --- | --- | --- |
| Recruiters / hiring managers (OEM, Tier-1) | Role, years, scope, programme names, current title | Facts above the fold and in the timeline |
| Peers and industry network | Credibility: patent, certifications, vehicle programmes | Patent and certifications get their own moment |
| Leadership / board reviewers | Leadership scale (CoC, HoD, GM) | Numbers and org-scope language, not task lists |
| Press / general visitors | A clear, memorable impression | Hero and showroom carry the story |

Primary device split assumed: **mobile-first**, with the desktop experience as the showcase. Both must be excellent.

---

## 4. Content: facts from the résumé

> **Rule:** every factual claim on the site must trace to `Prashant Navsariwala Resume.pdf`. Where the résumé is ambiguous, do not invent; see §13.

### 4.1 Identity

| Field | Value |
| --- | --- |
| Name | Prashant Navsariwala |
| Title | Automotive Product Design and Development Professional |
| Location | Pune, Maharashtra, India |
| LinkedIn | `https://www.linkedin.com/in/prashant-navsariwala-560b4335` |
| Company | Tata Motors (`tatamotors.com`) |
| Top skills | Product Development · Program Management · Project Planning |
| Specialties | Project Leadership · Automobile Body Design & Development · Planning · Program Management & Execution |

### 4.2 Summary (résumé wording, to be edited for the web)

> Innovative, creative, customer-centric professional with strategic business acumen and a passion for execution excellence, with **30 years of experience in the automobile industry**.
>
> - **25 years**, leading vehicle programmes and Centres of Competence in BIW, Load Body, Closures, Glasses, Sealing, Mechanisms, Exteriors, Interiors, Cockpit, Seating & Restraints systems
> - **1.5 years**, Manufacturing Engineering
> - **3.5 years**, Body (Sheet Metal) Production
> - **1 year**, Central Quality Assurance

### 4.3 Experience

| Period | Organisation | Role | Location | Notes |
| --- | --- | --- | --- | --- |
| Feb 2014 – Present | Tata Motors | General Manager (Body & Trims Engg.) | Pune | CoC, Body & Trims (Commercial Vehicles) |
| Feb 2012 – Feb 2014 | Mahindra & Mahindra Ltd, Automotive Sector | DGM, Projects (Product Development) | Mahindra World City, Chennai | Project Leader, Mahindra Jeeto |
| Aug 1994 – Feb 2012 | Mahindra & Mahindra | D.G.M., Product Development (Body Systems) | - | HoD for Design & Development of Body Systems; 17 y 7 m total tenure |
| 2002 – 2004 | Mahindra & Mahindra | Manager, Vehicle Engineering | - | Design, development and implementation of **Bolero XL & XLS**; conceptualising **Xylo** |
| 1999 – 2000 | Mahindra & Mahindra | Senior Engineer, Central Quality Assurance | Nashik | NOVA-C management, manufacturing audits, launch sampling, quality planning for body manufacturing |

**Total experience:** 30 years. **Leadership tenure:** 25 years. **Mahindra tenure:** 17 years 7 months.

### 4.4 Vehicle programmes

Named in the résumé: **Mahindra Maxx · Bolero XL · Xylo · Maxximo (greenfield) · Minivan · Mahindra Jeeto · Tata Signa** (and "etc.").

Assets supplied for **6** of these (§9). *Minivan has no asset.*

### 4.5 Patent

| Field | Value |
| --- | --- |
| Title | Impact Absorbing Structure for Vehicles |
| Publication | WO/2009/113096 |
| Date | 17 September 2009 |

### 4.6 Certifications

- Fundamentals of AI & ML: Introduction to Artificial Intelligence
- Inside Agentic AI: Foundations and Frontiers
- Becoming a DEI Ally and Agent for Change
- Modern Systems Engineering: Model-based Systems Engineering (MBSE)
- Workplace Diversity, Equity, and Inclusion in Action

### 4.7 Education

| Institution | Qualification | Years |
| --- | --- | --- |
| University of Mumbai | B.E., Machine Tools Engineering | 1991 – 1994 |
| NIMS, Pune University | M.B.A., Materials Management | 1996 – 1998 |
| K. J. Somaiya College of Engineering, Mumbai University | B.E., Machine Tools Engineering | 1991 – 1994 |

> ⚠️ The B.E. appears twice with identical dates (once under "University of Mumbai", once under "K. J. Somaiya College"). These are almost certainly the same degree: university and affiliated college. Resolve before publishing; do not print both.

### 4.8 Editorial rules

- Third person is acceptable; first person ("I") is preferred for the narrative voice. **Decide once, apply everywhere.**
- Verbs from the résumé: *led, designed, developed, conceptualised, implemented, launched, managed*.
- No superlatives that the résumé cannot support ("world-class", "award-winning") unless the owner supplies evidence.
- Spell "Tata Signa" as **TATA SIGNA** only in display contexts; use "Tata Signa" in running text. Same for "Mahindra Jeeto".
- Indian English spelling ("organisation", "programme" for vehicle programmes, "program" for software only).

---

## 5. Information architecture

Single page, one route (`/`), anchored sections. Order is the narrative arc: *who → what → proof → how → where next*.

| # | Section | Anchor | Purpose | Primary content |
| --- | --- | --- | --- | --- |
| 0 | Nav | - | Orientation, always reachable | Wordmark + 4 links + "Résumé" |
| 1 | Hero | `#top` | Hook in one screen | "Innovation" display line, name, title, 30 years, portrait, primary CTA |
| 2 | Introduction | `#about` | Who he is, at a glance | 2–3 sentence summary + 4 discipline stats |
| 3 | Impact numbers | `#impact` | Instant credibility | 30 yrs · 25 yrs leadership · 6+ programmes · 1 patent |
| 4 | Selected work | `#work` | The vehicles, as a showroom | Horizontal asset strip; hover/focus lights a spotlight and loads the vehicle into a 3D stage beside its name, type, launch year and a one-line review (§5.2) |
| 5 | Career | `#career` | The full history | Timeline, 1994 → present, 2 organisations / 5 roles, paired with a sticky column of workplace photography that crossfades per role (§5.3) |
| 6 | Patent | `#patent` | Differentiator | WO/2009/113096, date, one-line plain-English explanation |
| 7 | Credentials | `#credentials` | Depth | 5 certifications + education |
| 8 | Contact / footer | `#contact` | Next step | LinkedIn, email, location, résumé download |

### 5.1 Section notes

**Nav.** Fixed, height ≤ 64 px, background transparent over hero then white with a hairline rule after scroll. Links: About · Work · Career · Contact. "Résumé ↗" downloads the PDF. Mobile: wordmark + menu button; menu is a full-screen white overlay with large serif links.

**Hero.** Recreates the Figma composition: oversized italic serif "Innovation" bleeding past the left edge, portrait centred and overlapping the wordmark, small caps eyebrow ("Vehicle Design Leader"), one-line descriptor, CTA. Keep the hero at ~100 vh on desktop, ~90 vh mobile. The portrait must sit *above* the wordmark in z-order and *below* the nav.

**Introduction.** The 30-year summary, then the four disciplines as a row (25 / 1.5 / 3.5 / 1 years). These four numbers are the most distinctive fact on the résumé; give them room.

**Impact numbers.** Full-bleed `#D9D9D9` band. Four figures, count-up on entry. Each has a one-line caption. This band is the only place large numerals appear.

**Selected work.** The centrepiece: a **showroom**, not a gallery. A single horizontal strip of vehicle cut-outs; hovering or focusing one lights a spotlight over it and loads that vehicle into a 3D stage alongside its spec panel. Full architecture in §5.2, motion in §7.3.

**Career.** A vertical spine on the left with role cards to the right, and a **sticky media column** beside the timeline carrying workplace photography that crossfades per role (§5.3). Group by organisation: Mahindra (1994–2014) then Tata Motors (2014–present). Reverse-chronological is conventional, but a forward-chronological "1994 → today" build reads better with scroll-driven line drawing. **Recommend forward-chronological for the scroll narrative**; confirm in §13.

**Patent.** A short, quiet, typographic section. Patent number set in Inter tabular figures, title in Instrument Serif. One sentence explaining the idea in plain language (to be written by the owner or approved by him).

**Credentials.** Certifications as a two-column list; education below. Keep it compact; this is a credibility footnote, not a headline.

**Contact.** Large serif "Let's talk." + LinkedIn + email + location. Footer line: name, year, "Built with care in Pune".

### 5.2 Selected Work: showroom architecture

The section is a **showroom**, not a gallery: a rail of vehicles, a lit stage, and a spec sheet. The metaphor is a car on a turntable under a spotlight, with its specification beside it.

#### 5.2.1 Layout

```
┌──────────────────────────────────────────────────────────────┐
│  SELECTED WORK                                     01 / 06   │  eyebrow + index
├────────────────────────────────────┬─────────────────────────┤
│                                    │  Mahindra Jeeto         │
│                                    │  LCV · MINI TRUCK       │
│          [ 3D STAGE ]              │  LAUNCHED 2015          │
│      turntable + spotlight         │  ───────────────────    │
│                                    │  "One-sentence review…" │
├────────────────────────────────────┴─────────────────────────┤
│   ▢      ▢      ▢      ▢      ▢      ▢                       │  asset strip
└──────────────────────────────────────────────────────────────┘
```

- **Stage** takes 60–65 % of the content width on desktop, minimum 16:9, vertically centred.
- **Spec panel** is docked right, 320–380 px, top-aligned with the stage.
- **Strip** is a single row spanning the full content width beneath both, 120–160 px tall, items evenly distributed. It never wraps.
- **Mobile order:** stage (full width, 4:3) → spec panel → strip (horizontally scrollable, 88 px items, edge fades).

#### 5.2.2 The strip

- Full-bleed `--surface` (`#D9D9D9`) band with 1 px `--ink-30` rules top and bottom.
- Each item is the transparent PNG cut-out, optically normalised to equal visual mass and baseline-aligned on a common ground line: the Tata Signa truck and the Jeeto mini-truck must not look like the same size.
- **Rest state:** no border, no shadow, no caption.
- **Lit state** (hover or focus): a soft **white pool of light** behind the car, 1.6× its width,
  `radial-gradient(ellipse 60% 100% at 50% 0%, #FFFFFF 0%, rgba(255,255,255,.85) 45%, transparent 72%)`,
  plus a faint white cone rising from the strip's top edge to imply a beam. This is the only spotlight in the design, and it is monochrome by construction, so it needs no new colour.
- Unlit items drop to `opacity .45`. Transition 200 ms ease-out.
- The lit item lifts 6 px, scales to 1.03, and gets a 4 px `--ink` tick under its centre on the strip's bottom rule.
- No text lives in the strip. All text is in the spec panel.

#### 5.2.3 The stage

- **One persistent WebGL canvas**, created once and never re-initialised on selection change.
- **Camera:** fixed 35 mm-equivalent perspective, slightly above the horizon, aimed at the model's centre of mass. No user zoom in v1.
- **Lighting:** studio three-point, key upper-left, fill from the right at 40 %, rim from behind to separate the silhouette from white. Neutral white environment (`RoomEnvironment`), no HDRI download.
- **Floor:** a 1 px contact-shadow ellipse only. No ground plane, no reflections, no gradient backdrop. The model floats on the page background exactly as the PNG cut-outs do, so the 2D and 3D states are visually continuous.
- **Idle:** slow turntable, ~0.15 rad/s.
- **Drag:** orbit yaw ±40°, pitch ±15°, damped; returns to the turntable 3 s after release.
- **Selection change:** 220 ms crossfade, camera unchanged, incoming model scales 1.02 → 1.
- **Off-screen:** the render loop is paused via `IntersectionObserver`. No frames are drawn when the section is not visible.

#### 5.2.4 Spec panel

Exactly four fields, in this order:

| Field | Format | Example |
| --- | --- | --- |
| Model name | Instrument Serif, `--fs-h2` | *Mahindra Jeeto* |
| Type | Inter, eyebrow caps | LCV · MINI TRUCK |
| Launch year | Inter, tabular figures | LAUNCHED 2015 |
| Review | One sentence, Inter, ≤ 18 words | "A last-mile load carrier that traded payload for agility and won its segment on cost of ownership." |

- **Sales figures are deliberately excluded** (owner decision, 1 Nov 2026). The panel never shows units sold, market share or any volume metric, for any vehicle. The figures are inconsistent across sources, only two of six were ever published, and a number invites a comparison the résumé does not support.
- Do not reintroduce sales data as a chart, a stat strip, a tooltip or a "did you know" line. The exclusion is a content rule, not a layout choice.
- Numerals use `font-variant-numeric: tabular-nums`.
- The whole panel is a single `aria-live="polite"` region: one announcement per selection change, not one per field.
- **A default vehicle is selected on load.** The section is complete and readable before any interaction.

#### 5.2.5 Interaction model

| Input | Result |
| --- | --- |
| Pointer hover on a strip item | Spotlights it, loads its model into the stage |
| Pointer leaves the strip | Keeps the last selection; no revert, no flicker |
| Click / tap | Selects that vehicle (the touch path) |
| `Tab` into the strip | Focuses the first item; focus behaves exactly like hover |
| `←` / `→` | Moves selection along the strip |
| `Enter` / `Space` | Confirms selection and moves focus to the spec panel |
| `prefers-reduced-motion` | No turntable, no lift, no dimming; 150 ms opacity swap only |

**Hover is an enhancement, never the only path.** Every hover behaviour has a focus equivalent and a tap equivalent.

#### 5.2.6 Progressive enhancement: shipping before the models exist

The 3D models will be supplied later. The section must ship, and look finished, without them.

- `Vehicle.model` is **optional** in the content module.
- `model` present → the stage renders the GLB.
- `model` absent → the stage renders the **same PNG cut-out**, with the same spotlight, contact shadow and idle scale treatment. It reads as a deliberate 2D state, not a broken one.
- WebGL unavailable, or the GLB fails to load → automatic fall back to the PNG. No error is shown to the visitor.
- Adding a model later is a one-line edit in `src/content.ts`. No layout, CSS or component work.

#### 5.2.7 Content shape

```ts
type Vehicle = {
  id: string;
  name: string;              // "Mahindra Jeeto"
  oem: "Mahindra & Mahindra" | "Tata Motors";
  type: string;              // "LCV · Mini truck"
  launchYear: number;
  review: string;            // one sentence, <= 18 words
  image: string;             // transparent PNG cut-out
  model?: string;            // optional .glb, supplied later
  modelPoster?: string;      // optional still for the loading state
};
```

### 5.3 Career: sticky image architecture

The Career section pairs the timeline with workplace photography. Images never sit *behind* the text, they occupy a **sticky media column** beside it, and crossfade as the active role changes.

#### 5.3.1 Layout

```
┌──────────────────────────────────────────────────────────────┐
│ CAREER                                                       │
├────────────────────────┬─────────────────────────────────────┤
│ ┌────────────────────┐ │ 1994 ● Mahindra & Mahindra          │
│ │                    │ │        DGM, Product Development     │
│ │  workplace image   │ │        (Body Systems) · 1994–2012   │
│ │       3:2          │ │                                     │
│ │   sticky, 45 %     │ │ 1999 ● Senior Engineer, Central QA  │
│ │                    │ │        Nashik · 1999–2000           │
│ │                    │ │                                     │
│ │  Nashik · 2003     │ │ 2002 ● Manager, Vehicle Engineering │
│ └────────────────────┘ │        Bolero XL & XLS · Xylo       │
│                        │                                     │
│                        │ 2012 ● DGM Projects · Chennai       │
│                        │                                     │
│                        │ 2014 ● Tata Motors · Pune           │
└────────────────────────┴─────────────────────────────────────┘
```

- **Media column:** 45 % width, `position: sticky; top: 96px`, image at 3:2, never taller than `100vh - 192px`.
- **Timeline column:** 55 %, spine on its left edge, role cards to the right of it.
- **Mobile (< 768 px):** no sticky. Each role card carries its own 16:9 image above the text. Sticky plus touch scrolling is janky, and one image per card keeps the association obvious.

#### 5.3.2 Image behaviour

- One image per **role**, not per year, five roles, five images.
- The active image belongs to the role whose card crosses **50 % of the viewport**.
- The change is a **400 ms crossfade**: outgoing fades to 0, incoming fades in at scale 1.0. No slide, no wipe, no parallax. The image is evidence, not decoration.
- The pane itself never scrolls; only its content changes. This is the section's single signature motion.
- A caption always sits under the image, `location · year`, Inter, `--fs-small`, `--ink-60`.

#### 5.3.3 Empty state

Workplace photography does not exist yet, and the section must ship without it.

- `Role.image` is optional.
- No image → the pane renders a `--surface` plate with the organisation name in Instrument Serif and the location/year beneath. Same progressive-enhancement rule as the showroom's PNG fallback (§5.2.6).
- Mixed states are fine: roles with photos show photos, roles without show plates. The layout never shifts between the two.

#### 5.3.4 Content shape

```ts
type Role = {
  id: string;
  org: string;              // "Mahindra & Mahindra"
  title: string;            // "DGM, Product Development (Body Systems)"
  start: string;            // "1994-08"
  end: string | null;       // null = present
  location: string;         // "Nashik"
  summary: string;          // 20-35 words
  image?: string;           // optional workplace photo
  imageCaption?: string;    // "Nashik plant · 2003"
};
```

#### 5.3.5 Motion and accessibility

- Crossfade only, 400 ms, `opacity` alone.
- `prefers-reduced-motion`: instant swap, no fade.
- Images are `<img>` with factual alt text ("Body-in-white line at the Nashik plant"), `loading="lazy"`, explicit `width`/`height`, AVIF/WebP.
- Only the **next** image is preloaded; the rest load on approach.
- No information exists only in a photo, every caption is also carried by the role text.

---

## 6. Design system

### 6.1 Colour

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#FFFFFF` | Page background, nav after scroll, cards |
| `--surface` | `#D9D9D9` | Section bands, image plates, dividers, chips |
| `--ink` | `#000000` | All text, rules, icons |
| `--ink-60` | `rgba(0,0,0,0.60)` | Secondary text (captions, meta) |
| `--ink-30` | `rgba(0,0,0,0.30)` | Hairlines, disabled states |
| `--focus` | `#000000` | Focus ring (2 px offset ring) |

Rules:
- No additional hues in v1. Secondary text uses **alpha of black**, not a new grey hex, so the palette stays three values.
- The only permitted accent later: a single warm metallic (suggest `#8A6A3B`) for the patent or CTA hover, **do not add until approved.**
- Black on `#D9D9D9` contrast ≈ 14.9:1; black on white = 21:1. Both pass AAA. Never place `--ink-60` text on `--surface` below 16 px.

### 6.2 Typography

| Role | Family | Weight / style | Notes |
| --- | --- | --- | --- |
| Display / headlines | **Instrument Serif** | 400, italic for emphasis | Hero wordmark, section titles, pull quotes, big numerals optional |
| UI / body | **Inter** | 400, 500, 600 | Everything else: nav, body, labels, tables, captions |
| Eyebrow / labels | Inter | 500, uppercase, `0.08em` tracking, 12–13 px | "VEHICLE DESIGN LEADER" |
| Numerals | Inter | 500–600, `font-variant-numeric: tabular-nums` | Stats, years, patent number |

Type scale (desktop / mobile, rem):

| Token | Desktop | Mobile | Use |
| --- | --- | --- | --- |
| `--fs-display` | 9–14 vw (clamp) | 18 vw | "Innovation" |
| `--fs-h1` | 4.5 | 2.75 | Section titles |
| `--fs-h2` | 2.5 | 1.75 | Sub-sections, project names |
| `--fs-body` | 1.125 | 1.0625 | Body copy, max 68 ch |
| `--fs-small` | 0.875 | 0.875 | Captions, meta |
| `--fs-eyebrow` | 0.8125 | 0.75 | Labels |

Rules:
- Instrument Serif is a **display face only**, never below 24 px, never for body copy.
- Hero display text may be set in `clamp()` and allowed to overflow the container horizontally, but must never cause horizontal page scroll (clip on the section).
- Line height: display 0.9–0.95; headings 1.05; body 1.6.
- Fonts self-hosted via `@fontsource` (Inter 400/500/600, Instrument Serif 400 + italic), subset `latin`, `font-display: swap`, preload the two hero faces only.

### 6.3 Layout and spacing

- 12-column grid, max content width **1280 px**, gutter 24 px, side padding 20 px mobile / 48 px desktop.
- Spacing scale (px): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160. Section vertical padding: 96 mobile / 160 desktop.
- Radii: 0 for structural elements; 999 px only for chips/buttons (matching the glass-button instance in Figma). No drop shadows, depth comes from layout and motion, not elevation.
- Rules/hairlines: 1 px `--ink-30`.

### 6.4 Imagery

- All seven supplied assets are **transparent PNG cut-outs** (32-bit ARGB, alpha = 0 at corners), not white-background photos. This means vehicles and the portrait float on any surface, use them as objects, not as framed photos.
- Vehicles are **4:3 landscape**; the portrait is **3:4 portrait** (699 × 932). Design to these ratios; never upscale beyond 1.5× source.
- Vehicles should be presented at consistent optical size, not consistent bounding-box size, the truck (Tata Signa) and the small LCVs (Jeeto, Maxximo) differ in real-world scale. Normalise by visual mass, and label each with its class so scale is legible.
- Portrait: only the supplied cut-out is approved for v1. No filters, no duotone, no recolouring.
- Backgrounds: `--bg` or `--surface` only. Never place a cut-out across a busy area or across a text baseline.
- Edge quality: the alpha-0 pixels carry non-white RGB; if halos appear on `--surface`, run a 1 px matte/defringe pass rather than adding a white plate behind the image.
- **Workplace photography** (§5.3) is the only natural-colour surface on the site. Keep it unfiltered, no duotone, no heavy grade, no black-and-white conversion. The colour in those photos is the counterpoint to the monochrome system, and the contrast is intentional.
- Crop workplace photos to **3:2** for the desktop sticky pane and **16:9** for the mobile card. Supply at ≥ 1600 px on the long edge.
- Never set text over a photograph. Captions sit below it, on the page background.

---

## 7. Motion and parallax specification

### 7.1 Principles

1. **Motion explains structure.** It reveals hierarchy and depth; it never decorates for its own sake.
2. **The user is always in control.** No scroll-jacking, no hijacked wheel, no auto-advancing carousels. Native scroll remains native; we only *respond* to it.
3. **Transform and opacity only.** No animated `top/left/width/height/filter` in scroll handlers.
4. **One idea per section.** Each section gets at most one signature motion.
5. **Reduced motion is a first-class mode,** not a fallback.

### 7.2 Global behaviour

| Behaviour | Spec |
| --- | --- |
| Smooth scroll | Lenis, `lerp ≈ 0.1`, disabled on touch and when `prefers-reduced-motion` |
| Section reveal | `opacity 0 → 1`, `translateY 24px → 0`, 600 ms, ease `cubic-bezier(.22,1,.36,1)`, triggered at 15 % visibility, once |
| Stagger | Children stagger 60 ms, max 5 items |
| Scroll-linked (parallax) | Driven by `ScrollTrigger` with `scrub: true`; maximum displacement ±12 % of viewport height |
| Cursor | Optional: a 1 px crosshair guide on the showroom strip only. Skip if it adds JS weight |
| Pointer / focus parity | Hover and keyboard focus produce identical states within 200 ms. Nothing in the design responds to hover alone |
| Page load | Hero elements: wordmark 0 → 1 opacity with 8 px rise, portrait 1.04 → 1 scale, 900 ms, staggered 120 ms |

### 7.3 Per-section motion

| Section | Signature motion | Detail |
| --- | --- | --- |
| Hero | Layered parallax | Wordmark moves at 0.2× scroll speed, portrait at 0.08×, eyebrow/CTA fade out by 30 % scroll. Creates depth without 3D |
| Introduction | Line-by-line text reveal | Body copy splits into lines (not characters), each rising 16 px in sequence |
| Impact numbers | Count-up | 0 → value over 1.2 s on entry, `tabular-nums`, no layout shift; number never re-animates on scroll-back |
| Selected work | Showroom lighting + turntable | Hover/focus raises the white spotlight pool (200 ms), lifts the strip item 6 px and dims its siblings to `.45`. The stage crossfades to the new model in 220 ms with the camera fixed. The model idles on a slow turntable (0.15 rad/s) and the render loop pauses off-screen. No pinning and no scroll-jacking, the strip is a rail, not a carousel |
| Career | Spine draw + image crossfade | SVG path `stroke-dashoffset` 1 → 0 across the section; role cards fade in as the line reaches them. The sticky media column crossfades (400 ms, opacity only) when a role crosses 50 % of the viewport. The image pane never moves, only its content changes |
| Patent | Stillness | Deliberately static; only a 400 ms fade. Contrast with the motion around it is the point |
| Credentials | Simple stagger | List items fade/rise, no parallax |
| Contact | Slow rise | Single 40 px rise on the closing statement |

### 7.4 Reduced motion

When `prefers-reduced-motion: reduce`:
- Lenis disabled; native scroll.
- All parallax and count-up removed.
- Reveals become a 200 ms opacity fade with no translation.
- The showroom keeps its layout, but loses the turntable, the lift, the dimming and the crossfade, selection swaps with a 150 ms opacity change. Drag-to-orbit stays, because it is user-initiated.
- Career images swap instantly, with no crossfade.
- No information is conveyed by motion alone.

### 7.5 Performance rules for motion

- Animate only `transform` and `opacity`; promote with `will-change` on the animating element **only while it animates**, then remove.
- One `ScrollTrigger` per element, batched with `ScrollTrigger.batch` where possible.
- `passive: true` on any manual listeners; no listeners inside `scroll` that force layout.
- Target 60 fps on a mid-range Android; degrade by disabling parallax (not by dropping frames).

---

## 8. Technical requirements

### 8.1 Recommended stack

| Layer | Choice | Rationale |
| --- | --- | --- |
| Build | **Vite + TypeScript** | Zero-config, fast, no runtime framework cost |
| Markup | Static HTML generated from a typed content module | One page; no hydration needed |
| Styling | Hand-written CSS with custom properties + cascade layers | Palette and type are simple; a framework would fight the design |
| Motion | **GSAP + ScrollTrigger** (free tier) | Scroll-linked reveals, scrubbing, timeline orchestration |
| 3D | **three.js** (`WebGLRenderer` + `GLTFLoader`) | One persistent canvas, full control of studio lighting, model swap without re-init. Alternative: `@google/model-viewer`, less code, less control over the spotlight look |
| Smooth scroll | **Lenis** | Small, well-behaved, easy to disable |
| Fonts | `@fontsource-variable/inter`, `@fontsource/instrument-serif` | Self-hosted, no third-party request |
| Images | Pre-optimised AVIF + WebP + PNG fallback, `srcset` | Cut-outs need alpha; AVIF/WebP both support it |
| Deploy | GitHub Pages via Actions (or Netlify/Vercel) | Repo already on GitHub; static output |

**Alternative considered:** Astro (great for content, but adds a layer for a single page) and React + Framer Motion (more JS for the same result). Not recommended for v1.

### 8.2 Project structure (proposed)

```
/
├─ Assets/                      # source assets, untouched
│  ├─ *.png                    # transparent cut-outs
│  └─ models/                  # to be supplied: one .glb per vehicle
├─ Prashant Navsariwala Resume.pdf
├─ PRD.md                       # this document
├─ index.html
├─ src/
│  ├─ main.ts                   # bootstraps motion + showroom
│  ├─ content.ts                # ALL copy and data (§4)
│  ├─ motion/
│  │  ├─ hero.ts
│  │  ├─ timeline.ts
│  │  └─ reveal.ts
│  ├─ showroom/
│  │  ├─ stage.ts               # three.js scene, lighting, render loop
│  │  ├─ loader.ts              # GLB cache + PNG fallback
│  │  ├─ strip.ts               # hover / focus / selection state
│  │  └─ panel.ts               # spec panel + aria-live updates
│  ├─ styles/
│  │  ├─ tokens.css             # colour, type, spacing
│  │  ├─ base.css               # reset, typography
│  │  └─ sections/*.css
│  └─ assets/                   # optimised derivatives (generated)
└─ public/
   └─ resume.pdf                # downloadable copy
```

- **All copy lives in `src/content.ts`.** No hard-coded strings in markup. Adding a project = one array entry.
- Source images in `/Assets` are read-only inputs; the build emits optimised derivatives to `src/assets/`. Never edit the originals.

### 8.3 Browser support

Last 2 versions of Chrome, Edge, Firefox, Safari (desktop and iOS/Android). No IE. Graceful degradation: if GSAP fails to load, the page must render complete and readable with no motion.

### 8.4 Performance budgets

| Metric | Budget |
| --- | --- |
| LCP (mobile, 4G) | < 2.0 s |
| CLS | < 0.05 |
| INP | < 200 ms |
| Initial JS (gzip) | < 150 KB |
| Total CSS (gzip) | < 25 KB |
| Hero image payload | < 180 KB |
| Workplace photo, per image | < 220 KB (AVIF, 1600 px long edge) |
| 3D model, per vehicle | < 3 MB (Draco or Meshopt compressed, ≤ 25k tris, ≤ 2K textures) |
| 3D models resident at once | 2, current + next prefetched |
| Deferred 3D chunk (three.js + GLTFLoader, gzip) | < 180 KB, imported only as the showroom nears the viewport |
| Lighthouse (mobile) | Performance ≥ 90, Accessibility 100, Best Practices ≥ 95, SEO 100 |

Implementation notes:
- Portrait is the LCP element: preload it, serve AVIF at 700/1050 px widths.
- All vehicle images `loading="lazy"` + `decoding="async"`, with explicit `width`/`height` to reserve space.
- No render-blocking third-party requests.
- **GLBs load on first interaction only**: never on page load. Until then the stage shows the PNG cut-out, so the LCP is never blocked by 3D. The three.js chunk itself is dynamically imported when the showroom first enters the viewport.

### 8.5 Accessibility (WCAG 2.2 AA)

- Semantic landmarks: `header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`.
- Heading order: one `h1` (name), `h2` per section, `h3` per role/project. Never skip levels.
- **Showroom:** each strip item is a `<button>` with `aria-pressed` reflecting selection; focus produces exactly the hover state; `←` / `→` move selection; the spec panel is a single `aria-live="polite"` region so one announcement fires per selection change, not one per field. The WebGL canvas is `aria-hidden="true"`, the panel carries all content, and **no information exists only in the 3D view**. A default vehicle is selected on load, so the section is complete without any interaction.
- **Career images:** factual alt text (place and era, never "image of"); captions are visible text, not alt-only; the crossfade is decorative and carries no information on its own; the pane is not a carousel and has no controls, so it adds no keyboard stops.
- Decorative duplicate text (e.g. the oversized "Innovation" if repeated for effect) gets `aria-hidden="true"`; the accessible name lives in the real heading.
- Visible focus ring on every interactive element: 2 px solid `--ink`, 2 px offset.
- Skip-to-content link as the first focusable element.
- Alt text: portrait = "Portrait of Prashant Navsariwala"; vehicles = "<Programme name>, <vehicle class>, designed at <OEM>", factual, no marketing.
- Test with keyboard only, VoiceOver (Safari/iOS), NVDA (Windows), and at 200 % zoom.

### 8.6 SEO and sharing

- `<title>`: `Prashant Navsariwala, Automotive Product Design & Development`
- Meta description ≤ 155 chars, drawn from §4.2.
- Open Graph + Twitter card, 1200 × 630 image: portrait on white, name in Instrument Serif.
- JSON-LD `Person`: `name`, `jobTitle`, `address` (Pune, IN), `worksFor` (Tata Motors), `alumniOf`, `sameAs` (LinkedIn), `knowsAbout`.
- Canonical URL, `sitemap.xml`, `robots.txt`.
- One `h1` only.

### 8.7 Data privacy

No cookies, no tracking pixels, no third-party embeds in v1. If analytics is added, use a cookieless tool and disclose it in the footer.

### 8.8 Hosting and build

- **Static hosting on GitHub Pages, built by GitHub Actions** on push to the default branch. Owner decision, 1 Nov 2026.
- **All rendering happens client-side.** No server, no API, no runtime compute: the build emits static files and every pixel, including the 3D stage, is produced in the visitor's browser.
- Consequences of client-side-only rendering:
  - WebGL support is the visitor's, not ours → the PNG fallback in §5.2.6 is mandatory, not optional.
  - Every model is downloaded to the visitor → the §8.4 budgets are per-visitor costs, not server costs.
  - There is no server-side gate on any 3D asset; anything shipped is public.
- WebGL is therefore allowed anywhere in the project. v1 confines it to the showroom for performance discipline, not policy.
- Build output: `dist/` with hashed filenames, plus `sitemap.xml`, `robots.txt`, and a `CNAME` only if a custom domain is chosen (Q7).
- Preview builds per pull request via the same workflow; the default branch deploys to production.

---

## 9. Asset inventory

| File | Dimensions | Ratio | Alpha | Role | Used in |
| --- | --- | --- | --- | --- | --- |
| `Assets/Prashant-Navsariwala.png` | 699 × 932 | 3:4 | Yes | Portrait cut-out | Hero, contact, OG image |
| `Assets/Bolero-XL.png` | 1024 × 768 | 4:3 | Yes | Vehicle | Work 02 |
| `Assets/Xylo.png` | 1024 × 768 | 4:3 | Yes | Vehicle | Work 03 |
| `Assets/Maxximo.png` | 1024 × 768 | 4:3 | Yes | Vehicle | Work 04 |
| `Assets/Mahindra-maxx.png` | 800 × 600 | 4:3 | Yes | Vehicle | Work 01 |
| `Assets/Jeeto.png` | 1024 × 768 | 4:3 | Yes | Vehicle | Work 05 |
| `Assets/Tata-Signa.png` | 1045 × 784 | 4:3 | Yes | Vehicle | Work 06 |

Notes:
- `Mahindra-maxx.png` is the smallest source (800 × 600), cap its rendered width at ~800 px or accept mild softness.
- All vehicles are front/three-quarter studio cut-outs on transparency; they will read as floating objects. That is the intended art direction.
- **Missing:** Minivan (named in the résumé, no asset) and any image of the patent, the XLS variant, or workplace/team shots. Do not fabricate substitutes; either omit or request assets (§13).
- Licence/ownership of vehicle imagery should be confirmed before public launch (§13).

### 9.1 3D models (pending)

| File (proposed) | Vehicle | Status |
| --- | --- | --- |
| `Assets/models/mahindra-maxx.glb` | Mahindra Maxx | Not yet created |
| `Assets/models/bolero-xl.glb` | Bolero XL | Not yet created |
| `Assets/models/xylo.glb` | Xylo | Not yet created |
| `Assets/models/maxximo.glb` | Maxximo | Not yet created |
| `Assets/models/jeeto.glb` | Mahindra Jeeto | Not yet created |
| `Assets/models/tata-signa.glb` | Tata Signa | Not yet created |

Delivery requirements, the stage assumes all of these:

| Property | Requirement |
| --- | --- |
| Format | glTF 2.0 binary (`.glb`), Draco or Meshopt compressed |
| Orientation | +Y up, +Z forward, origin at ground centre between the wheels |
| Units | Metres, real-world scale (so all six share one camera) |
| Budget | ≤ 25k triangles, ≤ 2K PBR textures, < 3 MB per file |
| Materials | PBR metallic-roughness; **no baked lighting, no baked shadows** |
| Extras | No cameras or lights exported; a single named root node per vehicle |
| Optional | A `*.poster.webp` still per model for the loading state |

Because the strip is a fixed-height rail, every model is normalised at load time to a common bounding box, not a common scale, the Signa must read as a truck and the Jeeto as a mini-truck.

### 9.2 Workplace photography (pending)

| File (proposed) | Role it illustrates | Status |
| --- | --- | --- |
| `Assets/workplace/mahindra-body-systems.jpg` | DGM, Product Development (Body Systems) | Not yet supplied |
| `Assets/workplace/mahindra-central-qa.jpg` | Senior Engineer, Central QA, Nashik | Not yet supplied |
| `Assets/workplace/mahindra-vehicle-engineering.jpg` | Manager, Vehicle Engineering | Not yet supplied |
| `Assets/workplace/mahindra-projects-chennai.jpg` | DGM Projects, Chennai | Not yet supplied |
| `Assets/workplace/tata-body-trims.jpg` | GM, Body & Trims, Pune | Not yet supplied |

| Property | Requirement |
| --- | --- |
| Format | JPEG or PNG source; AVIF + WebP derivatives generated at build |
| Size | ≥ 1600 px on the long edge, 3:2 landscape (a 16:9 crop is derived for mobile) |
| Content | The place, the work or the team, not a posed portrait; the hero already carries one |
| People | Any identifiable colleague needs their consent before publication |
| Rights | Company photography may need clearance from Mahindra and Tata communications |
| Text | No text burned into the image |

If a role has no image, the pane renders the `--surface` plate from §5.3.3, the section is never blocked on photography.

---

## 10. Content plan per section

Copy is drafted in `src/content.ts`. Drafting guidance:

| Section | Word budget | Tone |
| --- | --- | --- |
| Hero | 12–18 words | Confident, spare. No adjectives stacked |
| Introduction | 60–90 words | Direct, first person, factual |
| Impact captions | 4–6 words each | Labels, not sentences |
| Project entries | 25–40 words each | What it was, what he did, why it mattered |
| Vehicle reviews | 12–18 words, one sentence each | Plain and specific. State the trade-off the vehicle made and why it mattered, no marketing |
| Career roles | 20–35 words each | Scope and outcome, not duties |
| Patent | 25–40 words | Plain English explanation |
| Credentials | List only | No prose |
| Contact | 5–10 words | Warm, brief |

Avoid: "passionate", "seasoned", "results-driven", "dynamic", "synergy", "leveraged". The résumé already says "innovative, creative, customer-centric", keep at most one of those, once.

---

## 11. Milestones

| Phase | Deliverable | Exit criteria |
| --- | --- | --- |
| M0, Foundation | Repo scaffold, tokens, fonts, content module, static sections with no motion | Page reads end-to-end, responsive, Lighthouse ≥ 95 a11y |
| M1, Design pass | Hero, showroom (strip + stage running on the PNG fallback), career timeline with its media column (plate fallback), all laid out at 1440 / 768 / 390 | Matches design intent at all three widths |
| M2, Motion | Hero parallax, spotlight/dim/selection states, reveals, spine draw, career image crossfade, count-up | 60 fps mid-range Android; reduced-motion path complete |
| M2.5, 3D | GLB loader, studio lighting, turntable, orbit, crossfade, fallbacks | Any vehicle with a model renders in the stage; vehicles without one fall back silently |
| M3, Polish | Image optimisation, OG/JSON-LD, keyboard pass, cross-browser QA | All budgets in §8.4 met |
| M4, Launch | Deploy, custom domain (if any), post-launch check | Live URL verified on real devices |

---

## 12. Acceptance criteria

The project is done when all of the following are true:

1. A visitor can learn role, 30 years of experience, current title, all named programmes, the patent, certifications and education **without downloading the PDF**.
2. Every fact matches the résumé; no invented clients, dates, awards or metrics.
3. All 6 vehicle assets and the portrait appear, correctly proportioned, with no visible white plates or halos.
4. The showroom is complete before any interaction: a default vehicle is selected on load and all four spec fields are visible without hovering.
5. Every hover behaviour has a keyboard-focus equivalent and a tap equivalent; the section is fully usable with no pointer device at all.
6. A vehicle with no 3D model renders its PNG cut-out in the stage with no error, no empty frame and no visual regression; a vehicle with a model renders the GLB, and a failed GLB load falls back silently.
7. No sales, volume or market-share figure appears anywhere on the site, in any form, panel, tooltip, stat strip or copy.
8. Page works with JavaScript disabled (content and layout intact, motion and 3D absent).
9. `prefers-reduced-motion` removes all parallax, count-up, turntable, lift, dimming and crossfade.
10. Keyboard-only navigation reaches every link, every strip item, and the résumé download; focus is always visible.
11. Lighthouse mobile ≥ 90 / 100 / ≥ 95 / 100 and budgets in §8.4 met on a throttled 4G profile, with and without a model loaded.
12. No horizontal page scroll at 320 px width.
13. OG card renders correctly in LinkedIn and Slack unfurlers.
14. Copy contains no placeholder text, lorem ipsum, or TODO markers.
15. Career media: a role with no photo renders the plate fallback with no layout shift, a role with a photo crossfades on entry, and every image carries a visible `location · year` caption.

---

## 13. Open questions

| # | Question | Why it blocks | Default if unanswered |
| --- | --- | --- | --- |
| Q1 | **Email address** for the contact section? The résumé only lists LinkedIn and `tatamotors.com`. | Contact section cannot ship without it | LinkedIn only; label the section "Connect" |
| Q2 | Résumé says **30 years**; the Figma hero says **"25+ Years of Leadership"**. Confirm both figures and where each is used. | Hero copy | 30 years experience / 25 years leading programmes |
| Q3 | Résumé says **"6+ Successful Projects"** but names **7** (incl. Minivan). Ship 6 with assets, or 7 with one imageless entry? | Showroom strip count and the "6+" stat | Ship 6; say "6+ programmes" |
| Q4 | **B.E. listed twice** (University of Mumbai and K. J. Somaiya College, same dates). Confirm the single correct entry. | Education section accuracy | One entry: B.E. Machine Tools Engineering, K. J. Somaiya College of Engineering, University of Mumbai, 1991–1994 |
| Q5 | Are the **vehicle images cleared for public use**? OEM press imagery often has usage terms. | Legal risk on a public site | Ship privately / unlisted until confirmed |
| Q6 | Any **additional assets**, Minivan, XLS, patent drawing, team or plant photography, a second portrait? | Showroom and patent section richness | Build with what exists; leave slots in `content.ts` |
| Q7 | **Domain**, custom domain or `*.github.io`? | Canonical URL, OG, sitemap | GitHub Pages URL |
| Q8 | **Voice**: first person ("I led…") or third person ("Prashant led…")? | Every string on the site | First person |
| Q9 | Should the **résumé PDF** be downloadable publicly, or gated behind a request? | Privacy (phone/email in PDF) | Downloadable, after confirming no personal phone number is exposed |
| Q10 | **Analytics**, none, or cookieless page views? | Footer disclosure | None |
| Q11 | Is the **timeline forward (1994 → today)** or reverse-chronological? | Career section build and scroll direction | Forward |
| Q12 | Do you want the **Figma file updated** to match the built site, or is Figma now superseded by the code? | Whether design work continues in Figma | Code becomes source of truth |
| Q13 | ~~Sales figures~~ **Dropped.** Owner decision, 1 Nov 2026: no first-year sales for any vehicle, anywhere on the site. The research in `research/vehicle-data.md` is retained for reference only and must not be surfaced | - | No sales field exists in the spec panel |
| Q14 | **3D models**, will you supply `.glb`, and do you want animated wheels/doors, or static turntable models? Any `.usdz` for AR on iOS? | Determines loader, animation rig and budget | Static `.glb`, no animation |
| Q15 | ~~Launch years~~ **Resolved.** Maxx 2001 · Bolero XL 2001 · Xylo Jan 2009 · Maxximo Feb 2010 · Jeeto Jun 2015 · Signa Feb 2016 (range). Sourced in `research/vehicle-data.md`. Still open: the Signa asset shows a 4825.TK, a c. 2020 variant | Which Signa year the entry describes | Entry covers the 2016 range launch |
| Q16 | **Vehicle type labels**, the exact taxonomy you want ("LCV · Mini truck", "MUV", "Tipper · ICV")? | The type field is free text and will drift without a fixed list | Draft taxonomy in `content.ts`, reviewed at M1 |
| Q17 | **Review sentences**, do you write them, or should I draft from the résumé for your approval? | They carry factual and reputational risk | I draft, you approve before launch |
| Q18 | **3D on mobile**, full 3D, or PNG-only below 768 px to protect performance? | Affects the mobile budget and the M2.5 scope | Full 3D, with PNG fallback if the device reports low memory |
| Q19 | If the vehicle list grows past 8, does the strip **scroll horizontally** or do we curate it down? | Layout rule in §5.2.1 | Scroll with edge fades |
| Q20 | **Workplace photos**, who supplies them, and are identifiable colleagues consenting? Do Mahindra/Tata need to clear company photography? | Cannot publish photos without consent and rights | Ship the plate fallback (§5.3.3) until cleared |
| Q21 | **How many career images**, one per role (5), or fewer atmospheric shots per organisation/era (2–3)? | Determines the asset request and the crossfade rhythm | One per role |
| Q22 | **Colour treatment** for workplace photos, natural, or ~15 % desaturated to sit closer to the monochrome system? | Sets the grade applied at build | Natural colour |

---

## 14. References

- Résumé: `Prashant Navsariwala Resume.pdf`
- Figma: `https://www.figma.com/design/LTgAGY4vxtBm0dKKOS2FYy/Prashant-Navsariwala-Portfolio`
- LinkedIn: `https://www.linkedin.com/in/prashant-navsariwala-560b4335`
- Patent: WO/2009/113096, Impact Absorbing Structure for Vehicles, 17 Sep 2009
- Fonts: Inter (Rasmus Andersson, OFL), Instrument Serif (Instrument, OFL)
- Vehicle research: `research/vehicle-data.md` (sourced record) · `research/vehicle-data.json` (machine-readable)

---

## 15. Revision history

| Version | Date | Change |
| --- | --- | --- |
| 1.0 | 1 Nov 2026 | Initial draft, content, IA, design system, motion, tech, milestones |
| 1.1 | 1 Nov 2026 | Selected Work re-architected as a **showroom**: horizontal asset strip, hover/focus spotlight, 3D stage with GLB models, five-field spec panel (name, type, launch year, first-year sales, review). Added §5.2, three.js to the stack, 3D budgets, showroom accessibility rules, pending model inventory (§9.1), and Q13–Q19 |
| 1.2 | 1 Nov 2026 | Vehicle research completed (`research/vehicle-data.md`, `.json`), launch years for all six, first-year sales for Xylo and Jeeto, explicit empty state for the other four (Q13/Q15). WebGL restriction lifted; added §8.8 hosting and build (GitHub Actions → GitHub Pages, client-side rendering only) |
| 1.3 | 1 Nov 2026 | Career section gains a **sticky media column** of workplace photography that crossfades per role (§5.3). Added §9.2 photo inventory and delivery requirements, §6.4 colour rules, crossfade motion and reduced-motion handling, a photo budget, accessibility rules, acceptance criterion 15, and Q20–Q22 |
| 1.4 | 1 Nov 2026 | **First-year sales dropped entirely** (owner decision). Spec panel reduced from five fields to four; sales removed from the content type, content plan, acceptance criteria and Q13. Research data retained as reference only, marked retired |

---

*End of document, v1.4 draft.*
