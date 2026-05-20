/**
 * GSAP + ScrollTrigger registration (imported once from `main.jsx`).
 * Timings: `timings.js` · timelines: `heroOpening`, `heroCopyReveal`, `revealSection`.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
