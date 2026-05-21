const base = import.meta.env.BASE_URL ?? '/'
const normalizedBase = base.endsWith('/') ? base : `${base}/`

/** @param {string} path */
function joinPublic(path) {
  const clean = path.startsWith('/') ? path.slice(1) : path
  const encoded = clean.split('/').map((segment) => encodeURIComponent(segment)).join('/')
  return `${normalizedBase}${encoded}`.replace(/\/{2,}/g, '/')
}

/** Merch product cards — images in `public/` */
export const MERCH_PRODUCTS = [
  {
    id: 'hoodie',
    name: 'Fightnight Hoodie',
    price: '$68',
    hint: 'Plush mid-weight · embossed patch',
    image: joinPublic('fightnight-hoodie.jpg'),
  },
  {
    id: 'wraps',
    name: 'Wraps',
    price: '$24',
    hint: '180" pro length · hook-and-loop',
    image: joinPublic('wraps.jpg'),
  },
  {
    id: 'training-bag',
    name: 'Training bag',
    price: '$36',
    hint: 'Heavy-duty carry · gym-ready',
    image: joinPublic('training-bag.jpg'),
  },
]
