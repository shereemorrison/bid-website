import { gsap } from './registerGsap'
import { EASE, HERO_COPY } from './timings'

const { selectors, hidden, reveal } = HERO_COPY

export function setHeroCopyHidden() {
  gsap.set(selectors.lines, { opacity: 0, y: hidden.lineY })
  gsap.set(selectors.ctas, { opacity: 0, y: hidden.ctaY })
  gsap.set(selectors.chrome, { opacity: 0, y: hidden.lineY })
}

export function showHeroCopyInstant() {
  gsap.set(selectors.all, { opacity: 1, y: 0, clearProps: 'transform,opacity' })
}

/** Lines slide up; buttons fade/slide gently */
export function revealHeroCopy() {
  const tl = gsap.timeline({ defaults: { ease: EASE.reveal } })

  tl.to(selectors.lines, {
    y: 0,
    opacity: 1,
    duration: reveal.lineDuration,
    stagger: reveal.lineStagger,
    ease: 'power2.out',
  })
    .to(
      selectors.ctas,
      {
        y: 0,
        opacity: 1,
        duration: reveal.ctaDuration,
        ease: 'power2.out',
      },
      reveal.ctaOverlap,
    )
    .to(
      selectors.chrome,
      {
        y: 0,
        opacity: 1,
        duration: reveal.chromeDuration,
        stagger: reveal.chromeStagger,
        ease: 'power2.out',
      },
      reveal.chromeOverlap,
    )

  return tl
}
