const base = import.meta.env.BASE_URL ?? '/'
const normalizedBase = base.endsWith('/') ? base : `${base}/`

/** @param {string} path */
function joinPublic(path) {
  const clean = path.startsWith('/') ? path.slice(1) : path
  const encoded = clean.split('/').map((segment) => encodeURIComponent(segment)).join('/')
  return `${normalizedBase}${encoded}`.replace(/\/{2,}/g, '/')
}

/** Motion lab clips in `public/` */
export const RING_CLIPS = [
  {
    id: 'slippery',
    src: joinPublic('Slippery.mov'),
    label: 'Slippery',
    objectPosition: 'center 40%',
    objectFit: 'cover',
  },
  {
    id: 'knockout',
    src: joinPublic('Knockout.mov'),
    label: 'Knockout',
    objectPosition: 'center 40%',
    objectFit: 'cover',
  },
  {
    id: 'session-1',
    src: joinPublic('IMG_1878.MOV'),
    label: 'Session I',
    objectPosition: 'center 10%',
    objectFit: 'cover',
    /** Oversized inside fixed frame — more scene visible, card size unchanged */
    zoom: 1.14,
  },
  {
    id: 'session-2',
    src: joinPublic('IMG_9267.MOV'),
    label: 'Session II',
    objectPosition: 'center 45%',
    objectFit: 'cover',
  },
]
