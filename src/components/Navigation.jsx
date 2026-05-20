import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { FiMenu, FiShoppingBag } from 'react-icons/fi'
import { HiOutlineFire } from 'react-icons/hi'
import { cn } from '../lib/cn'
import { ATHLETE_FULL_NAME, ATHLETE_SURNAME_UPPER } from '../lib/athlete'
import { useAppScroll } from '../hooks/useAppScroll'

const links = [
  { href: '#story', label: 'Story' },
  { href: '#ring', label: 'Ring' },
  { href: '#merch', label: 'Merch' },
]

/**
 * Fixed shell used across sections — keeps focus on scroll narrative.
 * Framer Motion: subtle hover/tap affordances (lighter than new GSAP timelines per link).
 */
export function Navigation({ className }) {
  const { lenis } = useAppScroll()

  const go = useCallback(
    (hash) => {
      const sel = hash.replace('#', '')
      const el = document.getElementById(sel)
      if (lenis && el) {
        lenis.scrollTo(el, { offset: -80, lerp: 0.08 })
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    [lenis],
  )

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6',
        className,
      )}
    >
      <div
        className="pointer-events-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/10 bg-zinc-950/70 px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl md:px-8"
        role="navigation"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="group flex items-center gap-2 font-display text-xl tracking-[0.2em] text-white md:text-2xl"
          onClick={(e) => {
            e.preventDefault()
            go('#top')
          }}
        >
          <HiOutlineFire
            className="size-6 text-red-500 transition group-hover:scale-110"
            aria-hidden
          />
          <span className="sr-only" lang="sr-Latn">
            {ATHLETE_FULL_NAME} — home
          </span>
          <span aria-hidden lang="sr-Latn">
            {ATHLETE_SURNAME_UPPER}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Page sections">
          {links.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium uppercase tracking-widest text-zinc-400 transition hover:text-white"
              onClick={(e) => {
                e.preventDefault()
                go(l.href)
              }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              {l.label}
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-red-500/80 transition group-hover:scale-x-100" />
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            className="rounded-full border border-white/15 p-2 text-zinc-300 md:hidden"
            aria-label="Open menu (placeholder)"
            whileTap={{ scale: 0.95 }}
          >
            <FiMenu className="size-5" />
          </motion.button>
          <motion.a
            href="#merch"
            className="hidden items-center gap-2 rounded-full bg-red-800 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-red-50 shadow-[0_0_28px_rgba(127,29,29,0.45)] transition hover:bg-red-700 md:inline-flex"
            onClick={(e) => {
              e.preventDefault()
              go('#merch')
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiShoppingBag className="size-4" aria-hidden />
            Shop
          </motion.a>
        </div>
      </div>
    </motion.header>
  )
}
