# Axis Architects — Studio Website

A premium, editorial-grade architecture portfolio for **Axis Architects — Architects & Engineers** (Lucknow, est. 2005). Built on **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, and **Lenis** smooth scrolling. Asymmetric grids, scroll-driven reveals, a CSS-only sketch ↔ photo hover effect, animated stat counters, lightbox project galleries, and a calibrated dark/light theme.

> **This `web/` folder is fully self-contained.** Copy or share the folder, install Node 18+, and it runs anywhere — no references to files outside it, no external services required.

---

## 1. Run it (any of three ways)

You only need **Node 18+** installed. Then from inside the `web/` folder:

### Easiest — Python launcher

```bash
python3 app.py
```

This auto-installs npm dependencies (the first time only), starts the dev server on `http://localhost:3000`, and opens your browser.

Flags:
- `python3 app.py --build` — production build, then start
- `python3 app.py --port 4000` — custom port
- `python3 app.py --no-browser`

### Easiest (bash)

```bash
./run.sh           # dev mode
./run.sh build     # production build + serve
```

### Manual

```bash
npm install
npm run dev        # dev server on :3000
npm run build      # production build
npm run start      # production server
```

---

## 2. Folder structure (everything lives inside `web/`)

```
web/
├── app/                     # Next.js App Router
│   ├── layout.jsx           # Root layout: fonts, smooth scroll, navbar, footer, cursor
│   ├── globals.css          # Theme tokens, sketch effect, grain, reveals, cursor
│   ├── page.jsx             # Homepage (Hero → About → Services → Projects → Stats → Testimonials → CTA)
│   ├── exteriors/page.jsx
│   ├── interiors/page.jsx
│   ├── about/page.jsx
│   ├── contact/page.jsx
│   ├── contact/layout.jsx   # Server-side metadata for /contact
│   ├── projects/[slug]/page.jsx
│   └── not-found.jsx
│
├── components/              # Reusable client components
│   ├── Navbar.jsx           # Sticky nav with scroll behaviour, theme toggle, mobile drawer, logo
│   ├── Footer.jsx           # Dark 4-column footer with logo, brand, links, services, contact
│   ├── SmoothScroll.jsx     # Lenis (skipped on touch / reduced-motion)
│   ├── Cursor.jsx           # Event-delegated mouse-follow cursor (skipped on touch)
│   ├── Reveal.jsx           # IntersectionObserver fade / mask reveals
│   ├── SketchImage.jsx      # Photo by default, sketch on hover (lazy-mounted SVG)
│   ├── ProjectGrid.jsx      # Editorial mosaic grid
│   ├── Marquee.jsx          # Looping headline strip
│   ├── Lightbox.jsx         # Click-to-zoom gallery with keyboard navigation
│   ├── Services.jsx         # 6-service grid with custom SVG icons
│   ├── Stats.jsx            # Animated counters (17+, 500+, 06, 100%)
│   ├── Testimonials.jsx     # 3-up testimonial grid
│   └── SectionHeader.jsx    # Consistent section header bar
│
├── data/
│   └── projects.json        # All studio info + project list — your CMS-lite
│
├── lib/
│   └── projects.js          # Helpers: getProjects, getProject, getRelated
│
├── public/images/           # All photographic assets (self-contained)
│   ├── brand/    logo.png
│   ├── exterior/ ext-01.jpg … ext-07.jpg
│   ├── interior/ int-01.jpg … int-07.jpg
│   └── office/   office-01.jpg … office-07.jpg
│
├── app.py                   # Python one-shot launcher
├── run.sh                   # Bash one-shot launcher
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.mjs
└── jsconfig.json
```

---

## 3. Add or edit content

All studio info, services, stats, testimonials, contact details and projects live in **`data/projects.json`**. Edit the file, save, and the site updates everywhere.

### Add a new project

1. Drop the new images into `public/images/exterior/` (or `interior/`).
2. Append a project under `"projects"` in `data/projects.json`:

```json
{
  "slug": "your-new-project",
  "title": "Your New Project",
  "category": "exterior",
  "type": "Residential",
  "year": "2025",
  "location": "Locality, Lucknow",
  "area": "5,000 sq ft",
  "status": "Completed",
  "cover": "/images/exterior/your-new-project-01.jpg",
  "images": [
    "/images/exterior/your-new-project-01.jpg",
    "/images/exterior/your-new-project-02.jpg"
  ],
  "summary": "One sentence that lives on listing cards.",
  "description": "Two or three sentences for the project page."
}
```

3. The new project automatically appears on `/exteriors` (or `/interiors`), the homepage selected-work shelf (if its slug is added to `FEATURED_SLUGS` in `app/page.jsx`), and at `/projects/your-new-project`.

### Featured projects on the homepage

Open `app/page.jsx` and edit the `FEATURED_SLUGS` array near the top. Order matters — the layout cycles through six pre-designed mosaic positions.

### Update studio info

Edit the top-level `"studio"` object in `data/projects.json` — name, tagline, contact, social, services, stats, highlights, testimonials.

### Social links

In `data/projects.json` under `studio.social`. Already wired for Instagram, Facebook, LinkedIn and WhatsApp — point them at your real profiles.

---

## 4. Customisation

### Colour palette

Defined in `tailwind.config.js` and as CSS variables in `app/globals.css`:

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#F5F5F5` | `#0E0E0E` |
| `--fg` | `#111111` | `#F5F5F5` |
| `--accent` | `#CC1F1F` (brand red) | `#E63A3A` |

Change accent: edit both blocks in `app/globals.css` and the `terracotta` / `brand` colours in `tailwind.config.js`.

### Typography

- **Display** — Fraunces (variable serif, used for all headlines)
- **Sans** — Inter Tight (used for body / labels)
- **Mono** — JetBrains Mono (used for eyebrows, captions)

Loaded via `next/font/google` in `app/layout.jsx`. Swap by editing the imports + variable bindings.

### Sketch hover effect

`components/SketchImage.jsx`. Photo is the default state; on hover, an SVG-edge sketch crossfades over. The sketch SVG is **lazy-mounted on first hover** to keep initial paint cheap.

To disable on a specific image, pass `mode="static"`. To tune the look, edit the `feFuncR/G/B` slope/intercept in the component.

### Theme toggle

Stored in `localStorage`. Set by the **Dark/Light** button in the navbar. Respects `prefers-color-scheme` on first load.

### Contact form

Uses a `mailto:` fallback by default. To wire a real backend:

1. Create `app/api/contact/route.js` that POSTs to your provider (Resend, SendGrid, Postmark).
2. Replace the `mailto` line in `app/contact/page.jsx` with `fetch('/api/contact', …)`.

---

## 5. Performance notes

- All images use Next.js `<Image>` with explicit `sizes` for responsive `srcset` + AVIF/WebP.
- The sketch overlay SVG is **lazy-mounted on first hover** — uninteracted images cost nothing extra.
- The custom cursor uses **event delegation** rather than per-element listeners — adding any `<a>`/`<button>` to the page costs nothing.
- Lenis smooth scroll is **skipped on touch devices** and when `prefers-reduced-motion` is set.
- The grain overlay is **static** (painted once) — no animation loop.
- Fonts load via `next/font` self-hosting with `display: swap`.

Production build (with all 12 project pages pre-rendered): **~103 kB First Load JS, all routes static.**

To go further: compress source images. The 21 photos in `public/images/` are full-size (~125 MB total). For production, run them through `npx @squoosh/cli --webp auto public/images/**/*.jpg` or [TinyJPG](https://tinyjpg.com).

---

## 6. Accessibility

- Visible focus states on all interactive elements
- Custom cursor disabled on touch devices
- `prefers-reduced-motion` short-circuits Lenis + animations
- Lightbox supports `Esc`, `←`, `→`
- Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<article>`, `<section>`)

---

## 7. Deploy

The simplest path: push to GitHub and import to **Vercel** — zero configuration.

Other hosts (Netlify, Cloudflare Pages) work as standard Next.js deployments.

---

Designed for **Axis Architects** — Architects & Engineers, Lucknow.
