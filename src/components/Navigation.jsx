import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiShoppingBag, FiX } from 'react-icons/fi'
import { HiOutlineFire } from 'react-icons/hi'
import { cn } from '../lib/cn'
import { ATHLETE_FULL_NAME, ATHLETE_SURNAME_UPPER } from '../lib/athlete'
import { LENIS, UI_MOTION } from '../animations/timings'
import { useAppScroll } from '../hooks/useAppScroll'

const links = [
  { href: '#story', label: 'Story' },
  { href: '#ring', label: 'Ring' },
  { href: '#merch', label: 'Merch' },
]

/**
 * Fixed **top-right** menu bar (does not scroll). Horizontal glass pill: logo + Story · Ring · Merch · Shop.
 */
export function Navigation({ className, introVisible = true }) {
  const { lenis } = useAppScroll()
  const [mobileOpen, setMobileOpen] = useState(false)

  const go = useCallback(
    (hash) => {
      const sel = hash.replace('#', '')
      const el = document.getElementById(sel)
      if (lenis && el) {
        lenis.scrollTo(el, { offset: LENIS.navOffset, lerp: LENIS.scrollToLerp })
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      setMobileOpen(false)
    },
    [lenis],
  )

  const barSurface = cn(
    'flex items-center gap-3 rounded-2xl border border-white/15 bg-black/20 py-2 pl-3 pr-2 shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-md supports-[backdrop-filter]:bg-black/12 sm:gap-4 sm:py-2.5 sm:pl-4 sm:pr-3',
    introVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
  )

  const navLinks = (
    <nav
      className="hidden items-center gap-5 whitespace-nowrap sm:flex md:gap-6"
      aria-label="Page sections"
    >
      {links.map((l) => (
        <motion.a
          key={l.href}
          href={l.href}
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-300 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] transition hover:text-white md:text-[11px]"
          onClick={(e) => {
            e.preventDefault()
            go(l.href)
          }}
          whileTap={{ scale: 0.98 }}
        >
          {l.label}
        </motion.a>
      ))}
    </nav>
  )

  return (
    <>
      <header
        className={cn(
          'pointer-events-none fixed top-3 z-[200] transition-opacity sm:top-4',
          'right-[var(--page-gutter)]',
          className,
        )}
        style={{ transitionDuration: `${UI_MOTION.navIntroFadeMs}ms` }}
        aria-label="Site navigation"
      >
        <div className={barSurface}>
          <a
            href="#top"
            className="group flex shrink-0 items-center gap-1.5 border-r border-white/10 pr-3 font-display text-sm uppercase tracking-[0.16em] text-white drop-shadow-md sm:gap-2 sm:pr-4 sm:text-base"
            onClick={(e) => {
              e.preventDefault()
              go('#top')
            }}
          >
            <HiOutlineFire
              className="size-5 shrink-0 text-red-500 transition group-hover:scale-110 sm:size-6"
              aria-hidden
            />
            <span className="sr-only" lang="sr-Latn">
              {ATHLETE_FULL_NAME} — home
            </span>
            <span aria-hidden lang="sr-Latn" className="hidden sm:inline">
              {ATHLETE_SURNAME_UPPER}
            </span>
          </a>

          {navLinks}

          <motion.a
            href="#merch"
            className="hidden size-9 shrink-0 items-center justify-center rounded border border-dashed border-white/35 bg-black/25 text-zinc-200 transition hover:border-red-500/50 hover:text-red-300 sm:flex"
            aria-label="Shop"
            onClick={(e) => {
              e.preventDefault()
              go('#merch')
            }}
            whileTap={{ scale: 0.96 }}
          >
            <FiShoppingBag className="size-3.5" aria-hidden />
          </motion.a>

          <button
            type="button"
            className="rounded-lg border border-white/20 p-2 text-zinc-200 sm:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <FiX className="size-4" /> : <FiMenu className="size-4" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[210] bg-black/70 backdrop-blur-sm sm:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', ...UI_MOTION.mobileMenuSpring }}
              className="absolute right-0 top-0 flex h-full w-[min(18rem,88vw)] flex-col border-l border-white/10 bg-[#060304]/95 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-red-400">
                  Menu
                </span>
                <button type="button" aria-label="Close" onClick={() => setMobileOpen(false)}>
                  <FiX className="size-5 text-zinc-300" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="font-mono text-sm uppercase tracking-widest text-zinc-300"
                    onClick={(e) => {
                      e.preventDefault()
                      go(l.href)
                    }}
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#merch"
                  className="font-mono text-sm uppercase tracking-widest text-red-400"
                  onClick={(e) => {
                    e.preventDefault()
                    go('#merch')
                  }}
                >
                  Shop
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
