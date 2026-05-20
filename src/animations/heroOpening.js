import { gsap } from './registerGsap'
import { HERO_AUDIO_START_EVENT } from '../lib/heroMedia'
import { EASE, HERO_OPENING } from './timings'

function dispatchHeroAudioStart() {
  window.dispatchEvent(new CustomEvent(HERO_AUDIO_START_EVENT))
}

export function runHeroOpening({
  root,
  windowEl,
  loading,
  buttons,
  shockwave,
  flash,
  clickedButton,
  onComplete,
}) {
  const { initialSize } = HERO_OPENING

  gsap.set(windowEl, {
    width: initialSize.width,
    height: initialSize.height,
    willChange: 'width, height',
  })

  if (shockwave) {
    gsap.set(shockwave, {
      width: initialSize.width,
      height: initialSize.height,
      scale: 1,
      opacity: 0.85,
    })
  }

  const tl = gsap.timeline({
    defaults: { ease: EASE.intro },
    onComplete: () => {
      document.body.style.overflow = ''
      gsap.set(windowEl, { clearProps: 'willChange,width,height' })
      if (shockwave) gsap.set(shockwave, { clearProps: 'all' })
      if (flash) gsap.set(flash, { clearProps: 'opacity' })
      onComplete()
    },
  })

  if (clickedButton) {
    tl.fromTo(
      clickedButton,
      { scale: 1, boxShadow: '0 0 0 rgba(220,38,38,0)' },
      {
        scale: 0.94,
        boxShadow: '0 0 28px rgba(220,38,38,0.55)',
        duration: 0.12,
        ease: 'power2.out',
      },
      0,
    )
  }

  if (flash) {
    tl.fromTo(
      flash,
      { opacity: 0 },
      { opacity: HERO_OPENING.flashPeak, duration: 0.1, ease: 'power2.in' },
      0,
    )
    tl.to(flash, { opacity: 0, duration: HERO_OPENING.flashOut, ease: 'power2.out' }, 0.08)
  }

  if (loading) {
    tl.to(
      loading,
      {
        opacity: 0,
        y: -14,
        letterSpacing: '0.72em',
        duration: HERO_OPENING.loadingOut,
        ease: EASE.fadeOut,
      },
      0,
    )
  }

  if (buttons) {
    const btns = buttons.querySelectorAll('button')
    tl.to(
      btns,
      {
        opacity: 0,
        y: 28,
        scale: 0.82,
        filter: 'blur(10px)',
        stagger: HERO_OPENING.buttonStagger,
        duration: HERO_OPENING.buttonOut,
        ease: 'power3.in',
      },
      0,
    )
  }

  const btnCount = buttons?.querySelectorAll('button').length ?? 0
  const squareAt =
    HERO_OPENING.buttonOut +
    Math.max(0, btnCount - 1) * HERO_OPENING.buttonStagger +
    HERO_OPENING.pauseBeforeSquare

  if (shockwave) {
    tl.to(
      shockwave,
      {
        scale: 2.8,
        opacity: 0,
        borderWidth: '1px',
        duration: HERO_OPENING.shockwaveOut,
        ease: 'power2.out',
      },
      0.04,
    )
  }

  tl.to(
    windowEl,
    {
      width: '100vw',
      height: '100vh',
      duration: HERO_OPENING.windowGrow,
      ease: 'power4.inOut',
      onStart: dispatchHeroAudioStart,
    },
    squareAt,
  )

  tl.to(
    root,
    { opacity: 0, duration: HERO_OPENING.overlayFade, ease: EASE.fade },
    HERO_OPENING.overlayFadeAt,
  )

  return tl
}
