import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FiShoppingBag } from 'react-icons/fi'
import { LayoutContainer } from '../components/LayoutContainer'
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
 * Merchandise lane — TODO: hook up Shopify/Snipcart later; Framer Motion handles card lift on hover.
 */
export function MerchSection() {
  const ref = useRef(null)
  useGsapReveal(ref)

  return (
    <section
      ref={ref}
      id="merch"
      className="scroll-mt-24 border-t border-white/10 bg-zinc-950 py-24 md:py-32"
    >
      <LayoutContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              data-reveal
              className="font-mono text-xs uppercase tracking-[0.35em] text-rose-400/85"
            >
              Merch & drops
            </p>
            <h2 data-reveal className="mt-3 font-display text-5xl text-white md:text-6xl">
              Gear with intent
            </h2>
          </div>
          <p
            data-reveal
            className="max-w-md text-zinc-400 md:text-right"
          >
            Product imagery, variants, and checkout wiring arrive here. Keep commerce isolated from
            cinematic sections for easier code splitting.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <motion.li
              key={p.name}
              data-reveal
              layout
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/45 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]',
              )}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            >
              <div className="mb-8 flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-600">
                <FiShoppingBag className="size-10 opacity-40 transition group-hover:opacity-70" aria-hidden />
              </div>
              <h3 className="font-display text-2xl tracking-wide text-white">{p.name}</h3>
              <p className="mt-2 text-sm text-zinc-500">{p.hint}</p>
              <div className="mt-6 flex items-center justify-between text-sm">
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
