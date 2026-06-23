# Axis Architects — Studio Website

A premium, editorial-grade architecture portfolio for **Axis Architects — Architects & Engineers** (Lucknow, est. 2005). Built on **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, and **Lenis** smooth scrolling. **Hero video slideshow**, category-based projects index, animated stat counters, **sketch→photo hover on the homepage category cards** (plain photos on sub-pages), lightbox project galleries, dark/light theme.

## Live URLs

| | URL |
|---|---|
| 🌐 **Production** | https://axis-archi-work.vercel.app |
| 📦 **GitHub repo** | https://github.com/shivam5600/Axis_Archi_Work |
| ▲ **Vercel project** | `axis-archi-work` (team `kumarshivamiitbhu-7050s-projects`) |

> **Self-contained.** This `web/` folder runs anywhere with Node 18+ — no references outside it, no external services required.
>
> A clean, no-credentials sibling copy lives at `../web-shareable/` (regenerated on demand via `scripts/sync-shareable.sh`). See [AGENTS.md](AGENTS.md) for the working rules.

---

## 1. Run it (any of three ways)

You only need **Node 18+** installed.

### Easiest — Python launcher
```bash
python3 app.py
```
Auto-installs npm dependencies the first time, starts the dev server on `http://localhost:3000`, opens your browser. Flags: `--build` (production build + start) · `--port 4000` · `--no-browser`.

### Bash launcher
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

## 2. Folder structure

```
web/
├── app/                              # Next.js App Router
│   ├── layout.jsx                    # fonts, smooth scroll, navbar, footer, cursor, preloader
│   ├── globals.css                   # theme tokens, sketch effect, grain, reveals
│   ├── page.jsx                      # Homepage (video hero → categories → about → stats → testimonials → merged dark CTA)
│   ├── projects/page.jsx             # Projects index (all categories, plain photos, portrait 4:5)
│   ├── projects/[slug]/page.jsx      # Individual project detail
│   ├── about/page.jsx
│   ├── contact/page.jsx + layout.jsx # form + map; layout exports metadata
│   ├── not-found.jsx
│   ├── icon.png                      # favicon (auto-served)
│   └── apple-icon.png                # apple touch icon
│
├── components/
│   ├── HeroSlideshow.jsx             # VIDEO hero — desktop full-bleed / mobile 16:9 band; poster-first, full-length playback, play/pause toggle
│   ├── Navbar.jsx                    # logo, dropdown, theme toggle, mobile drawer
│   ├── Footer.jsx                    # dark 4-column footer
│   ├── Preloader.jsx                 # full-screen splash with progress
│   ├── SmoothScroll.jsx              # Lenis (skipped on touch / reduced-motion)
│   ├── Cursor.jsx                    # event-delegated mouse-follow cursor
│   ├── Reveal.jsx                    # IntersectionObserver reveals
│   ├── SketchImage.jsx               # sketch→photo hover (sketchSrc = provided art, home cards); mode="static" = plain photo (sub-pages)
│   ├── Marquee.jsx                   # looping headline strip (unused — removed from homepage)
│   ├── Lightbox.jsx                  # click-to-zoom gallery
│   ├── Services.jsx                  # 6-tile grid with custom SVG icons
│   ├── Stats.jsx                     # animated counters
│   ├── Testimonials.jsx              # 3 quote cards
│   ├── ProjectGrid.jsx               # editorial mosaic (legacy — used by Lightbox preview)
│   └── SectionHeader.jsx             # consistent section header bar
│
├── data/projects.json                # studio + categories + slideshow (videos) + 19 projects
├── data/links.js                     # EDITABLE social links (single source: Instagram / FB / LinkedIn / WhatsApp)
├── lib/projects.js                   # helpers: getProjects, getProject, getRelated, projectsByCategory; merges links.js social
│
├── public/
│   ├── videos/hero/  township.mp4 · hospitality.mp4 (+ *-poster.jpg)   # hero VIDEO slideshow
│   └── images/
│       ├── brand/       logo.png            # cropped brand mark (1702 × 1100)
│       ├── categories/  <cat>-sketch.jpg + <cat>-photo.jpg   # homepage card hover art (team-provided)
│       ├── about/       founder-namit-tandon.jpg
│       └── projects/    commercial/ hospitality/ institutional/ residential/ township/ offices/   # client photos only
│
├── scripts/sync-shareable.sh         # regenerate ../web-shareable/
├── app.py · run.sh                   # one-shot launchers
├── package.json · next.config.mjs · tailwind.config.js · postcss.config.js · jsconfig.json
├── README.md · AGENTS.md
```

---

## 3. Add or edit content

All studio info, services, stats, testimonials, contact, slideshow, categories and projects live in **`data/projects.json`**. Edit the file, save, the site updates everywhere.

### Add a new project

1. Drop new images into `public/images/projects/<category>/`.
2. Append a project under `"projects"` in `data/projects.json`:

```json
{
  "slug": "your-new-project",
  "title": "Your New Project",
  "category": "residential",
  "type": "Residential",
  "year": "2025",
  "location": "Locality, Lucknow",
  "area": "5,000 sq ft",
  "status": "Completed",
  "cover": "/images/projects/residential/your-new-project-01.jpg",
  "images": [
    "/images/projects/residential/your-new-project-01.jpg",
    "/images/projects/residential/your-new-project-02.jpg"
  ],
  "summary": "One sentence that lives on the index card.",
  "description": "A paragraph for the project page."
}
```

3. The new project automatically appears in its category section on `/projects` and gets its own page at `/projects/your-new-project`.

### Hero videos (slideshow)

Edit `data.slideshow[]` — each entry is `{ src, video: true, poster, title, type, location }` where `src` is an mp4 under `public/videos/hero/`. **Array order = play order**; the first video eager-loads, the rest lazy. Add an entry + drop the mp4 in — no code change needed. (The homepage Featured-projects section was removed, so there is no `FEATURED_SLUGS` array anymore.)

### Change social / external links

Edit **`data/links.js`** — the single source for footer social links:
```js
export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/axisarchilko/' },
  // Facebook, LinkedIn, WhatsApp …
];
```
Change a URL there and it updates everywhere.

### Update studio info

Edit the top-level `"studio"` object in `data/projects.json` (name, tagline, stats, services, testimonials, contact). **Social links are not here** — they live in `data/links.js`.

---

## 4. Customisation

### Colour palette

Defined in `tailwind.config.js` and as CSS variables in `app/globals.css`:

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#F5F5F5` | `#0E0E0E` |
| `--fg` | `#111111` | `#F5F5F5` |
| `--accent` | `#CC1F1F` (brand red) | `#E63A3A` |
| `--paper` (sketch) | `#efe7d6` | `#1a1a1a` |

### Typography

- **Display** — Fraunces (variable serif)
- **Sans** — Inter Tight
- **Mono** — JetBrains Mono

Loaded via `next/font/google` in `app/layout.jsx`.

### Sketch hover effect

`components/SketchImage.jsx`. Default state shows a stylised **pencil sketch on cream paper** (SVG `feConvolveMatrix` edge filter); on hover, the photo crossfades in. The SVG sketch is **lazy-mounted via IntersectionObserver** so off-screen images cost nothing.

In dark mode the paper turns dark grey and the edge SVG is inverted/screened so the lines render light. Pass `mode="static"` to disable on a specific image.

### Theme toggle

Stored in `localStorage`. Set by the **Dark/Light** button in the navbar. Respects `prefers-color-scheme` on first load.

### Hero slideshow

`components/HeroSlideshow.jsx`. **Two device-specific layouts** chosen at runtime (`matchMedia`), sharing one rotation/video state:
- **Mobile**: video in a **16:9 band** (full frame, no over-crop) with title/meta/controls below.
- **Desktop**: full-bleed `h-[100svh]` with overlay text.

A high-res **poster paints first** (never black); the active slide's video lazy-loads and fades in when it can play. Videos autoplay (muted, `playsInline`) and the slideshow **advances when each video ends** (`onEnded`, full-length) — the CSS progress bar is synced to the real video duration. The rightmost **play/pause toggle** acts on the mounted video (works in the user gesture, iOS Low-Power safe). Keyboard ←/→ supported. Add a video in `data/slideshow[]` — no code change.

### Contact form

Uses a `mailto:` fallback. To wire a real backend:
1. Create `app/api/contact/route.js` that POSTs to your provider (Resend, SendGrid, Postmark).
2. Replace the `mailto` line in `app/contact/page.jsx` with `fetch('/api/contact', …)`.

---

## 5. Performance

- All images use Next.js `<Image>` with explicit `sizes` for responsive `srcset` + AVIF/WebP
- Sketch overlay SVG is lazy-mounted via IntersectionObserver
- Custom cursor uses event delegation (no per-element listeners)
- Lenis smooth scroll skipped on touch + `prefers-reduced-motion`
- Static grain overlay (no animation loop)
- Preloader hides on `window.load` (4.5s safety stop)

Production build: **~103 kB First Load JS, all routes static**, ~17 MB of optimised image assets.

---

## 6. Accessibility

- Visible focus states on all interactive elements
- Custom cursor disabled on touch devices
- `prefers-reduced-motion` short-circuits all animations
- Lightbox + slideshow support `Esc`, `←`, `→`
- Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<article>`, `<section>`)

---

## 7. Deploy

This project is already wired to Vercel — every `git push origin main` automatically rebuilds and replaces production at https://axis-archi-work.vercel.app.

> ⚠️ **Workflow rule:** always test locally first (`npm run dev` or `npm run build`). Push to GitHub or Vercel **only after explicit confirmation**. See [AGENTS.md](AGENTS.md) for the full rule.

### Working with the existing setup

```bash
# Local test
npm run dev                                   # http://localhost:3000
npm run build                                 # verify production build is green

# Push to GitHub (triggers automatic Vercel redeploy of production)
git add . && git commit -m "your message"
git push origin main

# Direct Vercel CLI (alternative — already linked)
npx vercel                                    # preview deploy → throwaway URL
npx vercel --prod                             # promote current code to production
npx vercel ls                                 # list recent deploys
npx vercel logs axis-archi-work.vercel.app    # tail production logs
npx vercel rollback <url>                     # roll back to a previous deploy
```

### Refresh the shareable copy

```bash
bash scripts/sync-shareable.sh
```

Refreshes `../web-shareable/` from the current state of `web/`, stripping `.git`, `.vercel`, `node_modules`, `.next`, `.originals`. The reviewer can then run that folder standalone with `python3 app.py`.

---

## 8. Where the rest of the rules live

- **`AGENTS.md`** — workflow for any AI assistant or collaborator working on this folder (push gates, brand essentials, file conventions, real project list)
- **`data/projects.json`** — single source of truth for all studio + project content
- **`app/globals.css`** — theme tokens, sketch effect, preloader, custom cursor styling
- **`scripts/sync-shareable.sh`** — regenerates the clean distribution mirror

---

Designed for **Axis Architects** — Architects & Engineers, Lucknow.
