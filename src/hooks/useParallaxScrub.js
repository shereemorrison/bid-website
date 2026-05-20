import { useLayoutEffect } from 'react'
import { gsap } from '../animations/registerGsap'

/**
 * Reusable scrubbed parallax: tie translateY (%) to scroll while a trigger spans the viewport.
 */
export function useParallaxScrub(ref, options = {}) {
  const {
    triggerRef,
    yPercent = 0,
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
  } = options

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const trigger = triggerRef?.current ?? el

    const t = gsap.to(el, {
      yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
      },
    })

    return () => {
      t.scrollTrigger?.kill()
      t.kill()
    }
  }, [ref, triggerRef, yPercent, start, end, scrub])
}
