# Animations

| File | Role |
| --- | --- |
| `timings.js` | **Single source of truth** — durations, eases, staggers, scroll positions |
| `registerGsap.js` | ScrollTrigger plugin registration (imported from `main.jsx`) |
| `heroOpening.js` | Iris opener timeline |
| `heroCopyReveal.js` | Hero headline / CTAs after intro |
| `revealSection.js` | Scroll-triggered `[data-reveal]` fades |
| `storyReveal.js` | Story lane split text, title scale scrub, bracket parallax |

Sections stay thin: pass a `ref` into hooks under `src/hooks/` that call into these modules.
