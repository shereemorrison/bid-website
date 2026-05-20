import { motion } from 'framer-motion'
import { cn } from '../lib/cn'
import { UI_MOTION } from '../animations/timings'
import { useAppScroll } from '../hooks/useAppScroll'

/**
 * Thin progress bar driven by Lenis scroll progress (falls back with reduced-motion mode).
 */
export function ScrollProgress({ className }) {
  const { scrollProgress } = useAppScroll()

  return (
    <div
      className={cn(
        'pointer-events-none fixed bottom-0 left-0 right-0 z-[60] h-[2px] bg-red-900/40',
        className,
      )}
      aria-hidden
    >
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-red-900 via-red-600 to-rose-400"
        initial={false}
        animate={{ scaleX: scrollProgress }}
        transition={{ type: 'spring', ...UI_MOTION.scrollProgressSpring }}
      />
    </div>
  )
}
