/**
 * Motion timings for the whole site (seconds unless noted).
 */

/** GSAP ease strings */
export const EASE = {
  intro: 'power4.inOut',
  reveal: 'power4.out',
  section: 'power3.out',
  fade: 'power2.inOut',
  fadeOut: 'power2.out',
}

/**
 * Iris opener (`HeroOpening`).
 * Rough sequence after `window` load:
 *   hold → label fades → window grows (1.45s) → overlay fades (from 0.92s) → onComplete
 */
export const HERO_OPENING = {
  holdBeforeStart: 0.5,
  labelFade: 0.35,
  windowGrow: 1.45,
  windowGrowDelay: 0.08,
  overlayFade: 0.55,
  overlayFadeAt: 0.92,
  initialSize: { width: '36vmin', height: '20vmin' },
}

/**
 * Hero copy reveal order: kicker → Stefan → Časić → tagline → both buttons (together)
 */
export const HERO_COPY = {
  selectors: {
    all: '[data-hero-kicker], [data-hero-line], [data-hero-tagline], [data-hero-ctas], [data-hero-aside], [data-hero-scroll]',
    lines: '[data-hero-kicker], [data-hero-line], [data-hero-tagline]',
    ctas: '[data-hero-ctas]',
    chrome: '[data-hero-aside], [data-hero-scroll]',
  },
  hidden: { lineY: 48, ctaY: 18 },
  reveal: {
    lineDuration: 0.88,
    lineStagger: 0.08,
    ctaDuration: 0.65,
    ctaOverlap: '-=0.25',
    chromeDuration: 0.55,
    chromeStagger: 0.08,
    chromeOverlap: '-=0.2',
  },
}

/** Scroll-triggered section reveals (`[data-reveal]`) */
export const SECTION_REVEAL = {
  y: 48,
  duration: 0.9,
  stagger: 0.12,
  scrollStart: 'top 80%',
  scrollEnd: 'bottom 20%',
}

/** Hero gradient parallax scrub (ScrollTrigger) */
export const HERO_PARALLAX = {
  layerBackY: 7,
  layerMidY: 12,
  start: 'top bottom',
  end: 'bottom top',
}

/** Lenis smooth scroll */
export const LENIS = {
  lerp: 0.085,
  scrollToLerp: 0.08,
  navOffset: -80,
}

/** Framer Motion / CSS UI (ms where noted) */
export const UI_MOTION = {
  navIntroFadeMs: 500,
  scrollProgressSpring: { stiffness: 200, damping: 30 },
  mobileMenuSpring: { stiffness: 380, damping: 36 },
}
