# bid-website

Cinematic marketing site for **Stefan Časić** — hero video, story, ring placeholder, and merch. Scroll-driven motion via GSAP + Lenis.

## Stack

| Layer | Tools |
| --- | --- |
| App | [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) |
| Smooth scroll | [Lenis](https://github.com/darkroomengineering/lenis) + [GSAP](https://gsap.com/) ticker sync |
| Scroll animation | [GSAP](https://gsap.com/) + **ScrollTrigger** |
| UI motion | [Framer Motion](https://www.framer.com/motion/) (nav, cards, scroll bar) |
| Typography | [Jersey 25](https://fonts.google.com/specimen/Jersey+25) (display) + [VT323](https://fonts.google.com/specimen/VT323) (UI/body), [DM Sans](https://fonts.google.com/specimen/DM+Sans) as glyph fallback |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |

### Motion timings

All durations, eases, and scroll positions are centralized in **`src/animations/timings.js`**. Section timelines live beside it (`heroOpening.js`, `heroCopyReveal.js`, `revealSection.js`). See **`src/animations/README.md`**.

## Hero video & opening

- Video file at **`public/hero.mp4`**

## Typography & “techno” shell

Headlines use a **bitmap-style** face; body and chrome use a **monospace pixel** face.

## Prerequisites

- **Node.js** 20+ recommended (matches current Vite / ecosystem)
- **npm** (or use your own client; lockfile is npm)

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint |

## Project layout

```
src/
  animations/     # timings.js + GSAP timelines (intro, hero copy, scroll reveals)
  components/     # Nav, Lenis, layout grid, opening overlay
  context/        # App scroll context (Lenis + progress)
  hooks/          # useGsapReveal, useHeroCopyReveal, useParallaxScrub, …
  lib/            # athlete copy, hero media URL, section typography classes
  sections/       # Hero, Story, Ring, Merch
  shaders/        # Future GLSL placeholder
  styles/         # Lenis, layout container, CRT overlay
```

## Deploy

Vercel

---
