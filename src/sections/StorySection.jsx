import { useRef } from 'react'
import { motion } from 'framer-motion'
import { LayoutContainer } from '../components/LayoutContainer'
import { useGsapReveal } from '../hooks/useGsapReveal'
import { FiArrowUpRight } from 'react-icons/fi'

/**
 * About / biography lane — TODO: swap copy and add portrait media later.
 * GSAP scroll reveal targets any child with `data-reveal`.
 */
export function StorySection() {
  const ref = useRef(null)
  useGsapReveal(ref)

  return (
    <section
      ref={ref}
      id="story"
      className="scroll-mt-24 border-t border-white/10 bg-zinc-950 py-24 md:py-32"
    >
      <LayoutContainer>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p
              data-reveal
              className="font-mono text-xs uppercase tracking-[0.35em] text-rose-400/85"
            >
              Inside the camp
            </p>
            <h2
              data-reveal
              className="mt-4 font-display text-5xl leading-none text-white md:text-6xl"
            >
              Built in silence, <span className="text-zinc-500">proven under lights.</span>
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-zinc-400">
            {/* TODO: Replace lorem with real story.*/}
            <p data-reveal>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p data-reveal>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <p data-reveal>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{' '}
              <code className="rounded bg-white/5 px-1 py-0.5 font-mono text-sm text-rose-200">
                src/animations/
              </code>
              .
            </p>
            <motion.a
              data-reveal
              href="#ring"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-red-400 transition hover:text-red-300"
              whileHover={{ x: 2 }}
            >
              Next: ring canvas <FiArrowUpRight className="size-4" aria-hidden />
            </motion.a>
          </div>
        </div>
      </LayoutContainer>
    </section>
  )
}
