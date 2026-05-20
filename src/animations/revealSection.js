import { gsap } from './registerGsap'
import { EASE, SECTION_REVEAL } from './timings'

/**
 * Fade/slide reveal for `[data-reveal]` children inside a section root.
 */
export function revealSection(root, selector = '[data-reveal]') {
  const els = root.querySelectorAll(selector)
  if (!els.length) return

  gsap.from(els, {
    y: SECTION_REVEAL.y,
    opacity: 0,
    duration: SECTION_REVEAL.duration,
    stagger: SECTION_REVEAL.stagger,
    ease: EASE.section,
    scrollTrigger: {
      trigger: root,
      start: SECTION_REVEAL.scrollStart,
      end: SECTION_REVEAL.scrollEnd,
      toggleActions: 'play none none reverse',
    },
  })
}
