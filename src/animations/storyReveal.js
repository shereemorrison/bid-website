import { gsap } from './registerGsap'
import { EASE, STORY_MOTION } from './timings'
import { revealSection } from './revealSection'

/**
 * Story lane motion: split text, scrubbed title scale, bracket parallax + entrance.
 */
export function initStorySectionMotion(root) {
  const blocks = root.querySelectorAll('[data-story-block]')
  blocks.forEach((block) => {
    revealSplitInBlock(block)
    scrubStoryTitle(block)
    revealStoryFrames(block)
    parallaxStoryFrames(block)
  })

  const philosophy = root.querySelector('[data-story-philosophy]')
  if (philosophy) revealSection(philosophy, '[data-reveal]')
}

function revealSplitInBlock(block) {
  const splits = block.querySelectorAll('[data-split]')
  splits.forEach((split) => {
    const inners = split.querySelectorAll('.split-text__inner')
    if (!inners.length) return

    const isChars = split.dataset.split === 'chars'
    const { yPercent, rotateX, duration, stagger, charStagger, scrollStart } =
      STORY_MOTION.split

    gsap.from(inners, {
      yPercent,
      rotateX,
      opacity: 0,
      duration,
      stagger: isChars ? charStagger : stagger,
      ease: EASE.reveal,
      scrollTrigger: {
        trigger: split,
        start: scrollStart,
        toggleActions: 'play none none reverse',
      },
    })
  })
}

function scrubStoryTitle(block) {
  const title = block.querySelector('[data-story-title]')
  if (!title) return

  const { scaleFrom, opacityFrom, scrub, scrollStart, scrollEnd } = STORY_MOTION.title

  gsap.fromTo(
    title,
    { scale: scaleFrom, opacity: opacityFrom },
    {
      scale: 1,
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: block,
        start: scrollStart,
        end: scrollEnd,
        scrub,
      },
    },
  )
}

function revealStoryFrames(block) {
  const frames = block.querySelectorAll('[data-story-frame]')
  if (!frames.length) return

  const { yFrom, scaleFrom, duration, stagger, scrollStart } = STORY_MOTION.frame

  gsap.from(frames, {
    y: yFrom,
    scale: scaleFrom,
    opacity: 0,
    duration,
    stagger,
    ease: EASE.section,
    scrollTrigger: {
      trigger: block,
      start: scrollStart,
      toggleActions: 'play none none reverse',
    },
  })
}

function parallaxStoryFrames(block) {
  const frames = block.querySelectorAll('[data-story-frame]')
  const { parallaxDepths, parallaxStart, parallaxEnd } = STORY_MOTION.frame

  frames.forEach((frame, i) => {
    const depth = Number(frame.dataset.parallaxDepth) || parallaxDepths[i] || parallaxDepths[0]

    gsap.to(frame, {
      yPercent: depth,
      ease: 'none',
      scrollTrigger: {
        trigger: block,
        start: parallaxStart,
        end: parallaxEnd,
        scrub: true,
      },
    })
  })
}
