import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Carousel } from 'react-responsive-3d-carousel'
import { RING_CLIPS } from '../lib/ringMedia'
import 'react-responsive-3d-carousel/dist/styles.css'
import '../styles/motion-lab-carousel.css'

const DRAG_THRESHOLD = 40

/**
 * 3D cover-flow carousel
 */
export function MotionLabCarousel() {
  const rootRef = useRef(null)
  const videosRef = useRef([])
  const dragRef = useRef({ id: null, x0: 0 })
  const [grabbing, setGrabbing] = useState(false)

  const syncVideos = useCallback((index) => {
    videosRef.current.forEach((video, i) => {
      if (!video) return
      if (i === index) {
        const p = video.play()
        if (p !== undefined) p.catch(() => {})
      } else {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [])

  const step = useCallback((dir) => {
    const carousel = rootRef.current?.querySelector('.react-responsive-3d-carousel')
    if (!carousel) return
    carousel.focus()
    carousel.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: dir > 0 ? 'ArrowRight' : 'ArrowLeft',
        bubbles: true,
      }),
    )
  }, [])

  const items = useMemo(
    () =>
      RING_CLIPS.map((clip, i) => (
        <div key={clip.id} className="motion-lab-carousel__frame">
          <video
            ref={(el) => {
              videosRef.current[i] = el
            }}
            className="motion-lab-carousel__video"
            src={clip.src}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={clip.label}
            style={
              clip.zoom
                ? {
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: `${clip.zoom * 100}%`,
                    height: `${clip.zoom * 100}%`,
                    minWidth: '100%',
                    minHeight: '100%',
                    transform: 'translate(-50%, -50%)',
                    objectFit: clip.objectFit,
                    objectPosition: clip.objectPosition,
                  }
                : {
                    objectFit: clip.objectFit,
                    objectPosition: clip.objectPosition,
                  }
            }
          />
        </div>
      )),
    [],
  )

  useEffect(() => {
    syncVideos(0)
  }, [syncVideos])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const onDown = (e) => {
      if (e.button !== 0) return
      const target = e.target.closest('.react-responsive-3d-carousel__arrows button, .react-responsive-3d-carousel__indicators li')
      if (target) return
      dragRef.current = { id: e.pointerId, x0: e.clientX }
      setGrabbing(true)
      root.setPointerCapture(e.pointerId)
    }

    const onUp = (e) => {
      if (dragRef.current.id !== e.pointerId) return
      const dx = e.clientX - dragRef.current.x0
      dragRef.current.id = null
      setGrabbing(false)
      if (root.hasPointerCapture(e.pointerId)) root.releasePointerCapture(e.pointerId)
      if (Math.abs(dx) < DRAG_THRESHOLD) return
      step(dx < 0 ? 1 : -1)
    }

    root.addEventListener('pointerdown', onDown)
    root.addEventListener('pointerup', onUp)
    root.addEventListener('pointercancel', onUp)

    return () => {
      root.removeEventListener('pointerdown', onDown)
      root.removeEventListener('pointerup', onUp)
      root.removeEventListener('pointercancel', onUp)
    }
  }, [step])

  return (
    <div
      ref={rootRef}
      className={`motion-lab-carousel${grabbing ? ' motion-lab-carousel--grabbing' : ''}`}
    >
      <Carousel
        items={items}
        ariaLabel="Session clips"
        startIndex={0}
        containerWidth="100%"
        containerHeight="clamp(300px, 35vw, 420px)"
        containerPadding="0"
        width={0.4}
        aspectRatio={9 / 16}
        align="top"
        perspective={1.15}
        layout="default"
        defaultOption={{
          numOfSlides: 3,
          widthFactor: 0.78,
          depthFactor: 0.85,
          angleFactor: 0.82,
        }}
        autoPlay={false}
        infiniteLoop
        swipeable
        swipeDirection="horizontal"
        focusOnSelect
        showArrows
        showIndicators
        showStatus={false}
        slideWithKeyboard="horizontal"
        transformDuration={750}
        sizeDuration={750}
        transformTimingFn="cubic-bezier(0.4, 0, 0.2, 1)"
        sizeTimingFn="cubic-bezier(0.4, 0, 0.2, 1)"
        pauseOnTransition="transform"
        onChange={(index) => syncVideos(index)}
        onSwipeStart={() => setGrabbing(true)}
        onSwipeEnd={() => setGrabbing(false)}
        arrows={{
          color: '#fafafa',
          hoverColor: '#f43f5e',
          width: '2rem',
          height: '2rem',
        }}
        indicators={{
          color: 'rgba(255,255,255,0.35)',
          activeColor: '#f43f5e',
        }}
      />
    </div>
  )
}
