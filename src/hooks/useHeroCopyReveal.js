import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../animations/registerGsap'
import {
  setHeroCopyHidden,
  showHeroCopyInstant,
  revealHeroCopy,
} from '../animations/heroCopyReveal'

/**
 * Hides hero copy on mount; reveals once when `introComplete` (after iris opener).
 */
export function useHeroCopyReveal(rootRef, introComplete, reduced) {
  const revealed = useRef(false)

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ctx = gsap.context(() => setHeroCopyHidden(), el)
    return () => ctx.revert()
  }, [rootRef])

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return

    if (reduced) {
      const ctx = gsap.context(() => showHeroCopyInstant(), el)
      return () => ctx.revert()
    }

    if (!introComplete || revealed.current) return
    revealed.current = true

    const ctx = gsap.context(() => revealHeroCopy(), el)
    return () => ctx.revert()
  }, [rootRef, introComplete, reduced])
}
