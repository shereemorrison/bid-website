# bid-website

Cinematic marketing site for **Stefan Časić** — story, hero video shell, and merch placeholders. Built for scroll-driven motion and room to grow (3D scenes, shaders, real video).

## Stack

| Layer | Tools |
| --- | --- |
| App | [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) |
| Smooth scroll | [Lenis](https://github.com/darkroomengineering/lenis) + [GSAP](https://gsap.com/) ticker sync |
| Scroll animation | [GSAP](https://gsap.com/) + **ScrollTrigger** |
| UI motion | [Framer Motion](https://www.framer.com/motion/) |
| 3D (optional) | [React Three Fiber](https://r3f.docs.pmnd.rs/) + [drei](https://github.com/pmndrs/drei) + [Three.js](https://threejs.org/) — `HeroCanvas` / `HeroScene` |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |

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
  animations/     # GSAP registration + shared triggers (e.g. section reveals)
  assets/         # Static images, video poster frames, etc.
  components/     # Nav, Lenis provider, scroll progress, layout shell
  context/        # App scroll context (Lenis + progress)
  hooks/          # useAppScroll, useGsapReveal, useParallaxScrub, …
  lib/            # Small utils, `athlete.js` name constants, dependency notes
  scenes/         # React Three Fiber scenes (optional / lazy-loaded)
  sections/       # Page sections — add new story blocks here
  shaders/        # Future GLSL (see README inside folder)
  styles/         # Lenis tweaks, layout helpers (imported from index.css)
```

## Deploy

Vercel

---
