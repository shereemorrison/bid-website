import { useRef } from 'react'
import { motion } from 'framer-motion'
import { LayoutContainer } from '../components/LayoutContainer'
import { SectionGrid, SectionMain, SectionAside } from '../components/SectionGrid'
import { BracketFrame } from '../components/BracketFrame'
import { sectionKickerClass, sectionPadClass, sectionTitleClass } from '../lib/sectionLayout'
import { MERCH_PRODUCTS } from '../lib/merchMedia'
import { useGsapReveal } from '../hooks/useGsapReveal'
import { cn } from '../lib/cn'

/**
 * Merchandise — offset header grid + staggered product cards.
 */
export function MerchSection() {
  const ref = useRef(null)
  useGsapReveal(ref)

  return (
    <section
      ref={ref}
      id="merch"
      className={cn('scroll-mt-24 border-t border-white/10 bg-zinc-950', sectionPadClass)}
    >
      <LayoutContainer>
        <SectionGrid className="lg:items-end">
          <SectionMain>
            <p data-reveal className={sectionKickerClass}>
              Merch & drops
            </p>
            <h2 data-reveal className={sectionTitleClass}>
              Gear with intent
            </h2>
          </SectionMain>
          <SectionAside>
            <BracketFrame
              align="right"
              className="text-xs uppercase leading-snug tracking-[0.14em] text-zinc-500"
            >
              <p data-reveal>
                Small-batch drops. No restocks. When it&apos;s gone, it&apos;s gone — gear built for
                the gym, not the gift shop.
              </p>
            </BracketFrame>
          </SectionAside>
        </SectionGrid>

        <ul className="mt-8 grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-3 lg:mt-10 lg:gap-7">
          {MERCH_PRODUCTS.map((p) => (
            <motion.li
              key={p.id}
              data-reveal
              layout
              className={cn(
                'group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/45 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]',
              )}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            >
              <div className="mb-6 flex aspect-[4/3] shrink-0 overflow-hidden rounded-xl bg-zinc-900">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="font-display text-2xl uppercase tracking-wide text-white">{p.name}</h3>
              <p className="mt-2 flex-1 text-sm text-zinc-500">{p.hint}</p>
              <div className="mt-6 flex shrink-0 items-center justify-between gap-3 border-t border-white/5 pt-4 text-sm">
                <span className="font-semibold text-red-400">{p.price}</span>
                <button
                  type="button"
                  className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white transition hover:border-red-500/50"
                >
                  Notify me
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </LayoutContainer>
    </section>
  )
}
