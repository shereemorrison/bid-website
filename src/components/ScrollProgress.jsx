import { motion } from 'framer-motion'
import { useAppScroll } from '../hooks/useAppScroll'

/**
 * Thin progress bar driven by Lenis scroll progress (falls back with reduced-motion mode).
 */
export function ScrollProgress() {
  const { scrollProgress } = useAppScroll()

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px] bg-zinc-900/80"
      aria-hidden
    >
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-red-900 via-red-600 to-rose-400"
        initial={false}
        animate={{ scaleX: scrollProgress }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      />
    </div>
  )
}
