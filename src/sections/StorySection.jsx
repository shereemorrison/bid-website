import { useRef } from 'react'
import { motion } from 'framer-motion'
import { StoryBlock } from '../components/StoryBlock'
import { LayoutContainer } from '../components/LayoutContainer'
import { heroCtaPrimaryClass, sectionKickerClass } from '../lib/sectionLayout'
import { useStorySectionMotion } from '../hooks/useStorySectionMotion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { FiArrowUpRight } from 'react-icons/fi'

/**
 * Biography lane — titles left, copy in bracket frames right, GSAP split / parallax / scale.
 */
export function StorySection() {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  useStorySectionMotion(ref, reduced)

  return (
    <section
      ref={ref}
      id="story"
      className="scroll-mt-24 border-t border-white/10 bg-zinc-950"
    >
      <StoryBlock
        stackedTitle
        alignTitle="center"
        wideAside
        kicker="The story"
        titleLines={[
          { text: 'Made in the Balkans.' },
          { text: 'Built in Germany.', muted: true },
          { text: 'Forged in Australia.', muted: true },
        ]}
        frameClassName="story-frame--wide"
        paragraphs={[
          {
            text: 'Every setback became another round. Every sacrifice became another reason to keep going.',
          },
          {
            text: 'With a dream bigger than fear, he left everything behind and moved to Australia chasing one goal: to become a professional fighter.',
          },
          { text: 'No shortcuts. No guarantees.' },
          { text: 'Just relentless work, discipline, and belief.' },
          {
            text: 'This isn\u2019t just boxing. This is survival turned into purpose.',
            emphasis: true,
          },
        ]}
      />

      {/* Philosophy — centered quote */}
      <div className="border-b border-white/5 py-5 md:py-8" data-story-philosophy>
        <LayoutContainer>
          <blockquote
            data-reveal
            className="relative mx-auto max-w-4xl border-y border-white/10 px-6 py-6 text-center md:px-8 md:py-9"
          >
            <p className={sectionKickerClass}>Philosophy</p>
            <p className="mt-4 font-display text-2xl uppercase leading-snug tracking-wide text-white md:text-4xl md:leading-tight">
              &ldquo;Champions aren&apos;t made when things are easy.
              <br />
              <span className="text-zinc-500">
                They&apos;re made in silence, sacrifice, and the moments nobody sees.&rdquo;
              </span>
            </p>
          </blockquote>
        </LayoutContainer>
      </div>

      <StoryBlock
        reversed
        wideAside
        stackedTitle
        kicker="Training"
        titleLines={[
          { text: 'No excuses.' },
          { text: 'No days off.', muted: true, nowrap: true },
        ]}
        frameClassName="story-frame--wide"
        paragraphs={[
          {
            text: 'Success isn\u2019t motivation. It\u2019s repetition. Early mornings. Heavy hands. Endless rounds. Training long after the body wants to stop.',
          },
          {
            text: 'Because in this sport, heart matters just as much as power. Every session is about becoming stronger than yesterday — physically and mentally.',
          },
        ]}
      />

      <StoryBlock
        className="border-b-0"
        stackedTitle
        wideAside
        frameClassName="story-frame--wide"
        kicker="What\u2019s next"
        titleLines={[
          { text: 'The fight is' },
          { text: 'just beginning.', muted: true },
        ]}
        paragraphs={[
          {
            text: 'This story was never supposed to be easy. That\u2019s exactly why it matters.',
          },
          {
            text: 'From the Balkans to Australia, every step has been earned through sacrifice, discipline, and relentless belief. And the next chapter is still being written.',
          },
        ]}
        footer={
          <div className="flex flex-wrap items-center gap-4">
            <motion.a
              href="#ring"
              className={`${heroCtaPrimaryClass} inline-flex items-center gap-2`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Enter the ring <FiArrowUpRight className="size-4" aria-hidden />
            </motion.a>
            <motion.a
              href="#merch"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-red-400 transition hover:text-red-300"
              whileHover={{ x: 2 }}
            >
              View merch <FiArrowUpRight className="size-4" aria-hidden />
            </motion.a>
          </div>
        }
      />
    </section>
  )
}
