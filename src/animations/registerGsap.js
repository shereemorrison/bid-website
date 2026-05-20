/**
 * Central GSAP plugin registration.
 * Import this once (from main.jsx) so ScrollTrigger-aware timelines work everywhere.
 *
 * Put shared ScrollTrigger timelines / scrubbed effects under `src/animations/`
 * (e.g. section reveals) so sections stay thin; pair with hooks in `src/hooks/`.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
