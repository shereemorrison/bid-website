import { useRef } from 'react'
import { motion } from 'framer-motion'
import { LayoutContainer } from '../components/LayoutContainer'
import { SectionGrid, SectionMain, SectionAside, SectionFull } from '../components/SectionGrid'
import { BracketFrame } from '../components/BracketFrame'
import { sectionKickerClass, sectionTitleClass } from '../lib/sectionLayout'
import { useGsapReveal } from '../hooks/useGsapReveal'
import { FiArrowUpRight } from 'react-icons/fi'

/**
 * About / biography lane — asymmetric columns + bracket frame on body copy.
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
        <SectionGrid>
          <SectionMain>
            <p data-reveal className={sectionKickerClass}>
              Inside the camp
            </p>
            <h2 data-reveal className={sectionTitleClass}>
              Built in silence, <span className="text-zinc-500">proven under lights.</span>
            </h2>
          </SectionMain>

          <SectionAside className="lg:pt-1">
            <BracketFrame align="right" className="font-mono text-[13px] text-zinc-400 md:text-sm">
              <div className="space-y-5">
                {/* TODO: Replace lorem with real story. */}
                <p data-reveal>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p data-reveal>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p data-reveal>
                  Motion beats belong in{' '}
                  <code className="rounded bg-white/5 px-1 py-0.5 font-mono text-[0.85em] text-rose-200">
                    src/animations/
                  </code>
                  .
                </p>
              </div>
            </BracketFrame>
          </SectionAside>

          <SectionFull className="mt-4 lg:mt-8">
            <motion.a
              data-reveal
              href="#ring"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-red-400 transition hover:text-red-300"
              whileHover={{ x: 2 }}
            >
              Next: ring canvas <FiArrowUpRight className="size-4" aria-hidden />
            </motion.a>
          </SectionFull>
        </SectionGrid>
      </LayoutContainer>
    </section>
  )
}
