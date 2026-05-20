import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../animations/registerGsap'
import { scheduleHeroOpening } from '../animations/heroOpening'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Reveal: centred window on hero video → full bleed → overlay fades out.
 * @see https://www.awwwards.com/inspiration/loading-animation-teletech
 */
export function HeroOpening({ onComplete }) {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef(null)
  const windowRef = useRef(null)
  const labelRef = useRef(null)

  useLayoutEffect(() => {
    if (reduced) {
      onComplete()
      return
    }

    const root = rootRef.current
    const win = windowRef.current
    if (!root || !win) return

    const labelAtMount = labelRef.current
    document.body.style.overflow = 'hidden'

    let delayed = null

    const start = () => {
      delayed = scheduleHeroOpening({
        root,
        windowEl: win,
        label: labelRef.current,
        onComplete,
      })
    }

    if (document.readyState === 'complete') {
      start()
    } else {
      window.addEventListener('load', start, { once: true })
    }

    return () => {
      window.removeEventListener('load', start)
      delayed?.kill()
      gsap.killTweensOf([root, win])
      if (labelAtMount) gsap.killTweensOf(labelAtMount)
      document.body.style.overflow = ''
    }
  }, [reduced, onComplete])

  if (reduced) return null

  return (
    <div
      ref={rootRef}
      className="pointer-events-auto fixed inset-0 z-[300] flex items-center justify-center overflow-hidden"
      aria-busy="true"
      aria-live="polite"
    >
      <div
        ref={windowRef}
        className="pointer-events-none shrink-0 rounded-[2px] bg-transparent shadow-[0_0_0_120vmax_#060304]"
        aria-hidden
      />
      <p
        ref={labelRef}
        className="pointer-events-none absolute z-10 font-mono text-[11px] uppercase tracking-[0.55em] text-red-500/95"
      >
        Loading
      </p>
    </div>
  )
}
