import { gsap } from './registerGsap'
import { EASE, HERO_OPENING } from './timings'

/**
 * Small window → full viewport, then fade overlay.
 * Call via `scheduleHeroOpening` so the pre-roll hold runs first.
 */
export function runHeroOpening({ root, windowEl, label, onComplete }) {
  const { initialSize } = HERO_OPENING

  gsap.set(windowEl, {
    width: initialSize.width,
    height: initialSize.height,
    willChange: 'width, height',
  })

  const tl = gsap.timeline({
    defaults: { ease: EASE.intro },
    onComplete: () => {
      document.body.style.overflow = ''
      gsap.set(windowEl, { clearProps: 'willChange,width,height' })
      onComplete()
    },
  })

  if (label) {
    tl.to(label, { opacity: 0, duration: HERO_OPENING.labelFade, ease: EASE.fadeOut }, 0)
  }

  tl.to(
    windowEl,
    { width: '100vw', height: '100vh', duration: HERO_OPENING.windowGrow },
    HERO_OPENING.windowGrowDelay,
  )

  tl.to(
    root,
    { opacity: 0, duration: HERO_OPENING.overlayFade, ease: EASE.fade },
    HERO_OPENING.overlayFadeAt,
  )

}

/** Waits `HERO_OPENING.holdBeforeStart`, then runs the iris timeline */
export function scheduleHeroOpening(opts) {
  return gsap.delayedCall(HERO_OPENING.holdBeforeStart, () => runHeroOpening(opts))
}
