# Why these dependencies exist

| Package | Purpose in this project |
| --- | --- |
| **react** / **react-dom** | UI composition; functional components + hooks. |
| **vite** | Fast dev/build; lazy chunk loading for WebGL scenes. |
| **tailwindcss** / **@tailwindcss/vite** | Utility-first styling + responsive layout tokens (`@theme`). |
| **gsap** + **ScrollTrigger** | Timeline-based intro, scrubbed parallax, scroll-driven fades. |
| **lenis** | Buttery inertial scrolling without fighting ScrollTrigger (sync via `gsap.ticker`). |
| **three** | Core 3D engine used by React Three Fiber. |
| **@react-three/fiber** | Declarative Three.js in React; sane suspense boundaries for WebGL. |
| **@react-three/drei** | Helpers: lights, camera controls, environment maps—less boilerplate. |
| **framer-motion** | Micro-interactions (nav, product cards) where GSAP timelines would be heavy. |
| **react-icons** | Consistent vector icons without importing entire icon packs manually. |
