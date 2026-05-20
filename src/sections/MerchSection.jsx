import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FiShoppingBag } from 'react-icons/fi'
import { LayoutContainer } from '../components/LayoutContainer'
import { SectionGrid, SectionMain, SectionAside } from '../components/SectionGrid'
import { BracketFrame } from '../components/BracketFrame'
import { sectionKickerClass, sectionPadClass, sectionTitleClass } from '../lib/sectionLayout'
import { useGsapReveal } from '../hooks/useGsapReveal'
import { cn } from '../lib/cn'

const products = [
  {
    name: 'Fight Night Hoodie',
    price: '$68',
    hint: 'Plush mid-weight · embossed patch',
  },
  {
    name: 'Corner Towel',
    price: '$24',
    hint: 'Jacquard weave · camp colors',
  },
  {
    name: 'Training Tee',
    price: '$36',
    hint: 'Breathable blend · motion cut',
  },
]

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
                Product imagery, variants, and checkout wiring arrive here. Keep commerce isolated
                from cinematic sections for easier code splitting.
              </p>
            </BracketFrame>
          </SectionAside>
        </SectionGrid>

        <ul className="mt-8 grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-3 lg:mt-10 lg:gap-7">
          {products.map((p) => (
            <motion.li
              key={p.name}
              data-reveal
              layout
              className={cn(
                'group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/45 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]',
              )}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            >
              <div className="mb-6 flex aspect-[4/3] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-600">
                <FiShoppingBag
                  className="size-10 opacity-40 transition group-hover:opacity-70"
                  aria-hidden
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
