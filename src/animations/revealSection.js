import { gsap } from './registerGsap'

/**
 * Fade/slide reveal for section content — use inside gsap.context in a section component.
 *
 * @param {HTMLElement} root - scope root (usually a section ref)
 * @param {string} selector - query within root for animated children
 */
export function revealSection(root, selector = '[data-reveal]') {
  const els = root.querySelectorAll(selector)
  if (!els.length) return

  gsap.from(els, {
    y: 48,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: root,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  })
}
