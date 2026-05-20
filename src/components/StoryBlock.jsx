import { LayoutContainer } from './LayoutContainer'
import { SectionGrid } from './SectionGrid'
import { BracketFrame } from './BracketFrame'
import { SplitText } from './SplitText'
import { sectionKickerClass, storyBlockPadClass, sectionTitleClass } from '../lib/sectionLayout'
import { cn } from '../lib/cn'

const frameTextClass =
  'font-mono text-base leading-snug text-zinc-300 md:text-lg md:leading-snug lg:text-xl lg:leading-relaxed'

const frameBodyClass = cn('max-w-[min(100%,38rem)]', frameTextClass)

const frameWideClass = cn('story-frame--wide !max-w-none w-full', frameTextClass)

function StoryTitle({ titleLines, alignRight = false, stacked = false }) {
  return (
    <h2
      data-story-title
      className={cn(
        sectionTitleClass,
        'story-title',
        stacked && 'story-title--stacked',
        alignRight && 'story-title--right',
      )}
    >
      {titleLines.map((line, i) => (
        <span
          key={i}
          className={cn(
            'story-title__line',
            line.muted && 'text-zinc-500',
            line.nowrap && 'story-title__line--nowrap',
          )}
        >
          <SplitText
            text={line.text}
            mode={line.split ?? 'words'}
            data-split={line.split === 'chars' ? 'chars' : 'words'}
          />
        </span>
      ))}
    </h2>
  )
}

function StoryBracket({ paragraphs, frameClass, align, parallaxDepth }) {
  return (
    <BracketFrame
      align={align}
      data-story-frame
      data-parallax-depth={parallaxDepth}
      className={cn(
        frameClass,
        'story-frame story-frame--enter [&>div]:py-3',
        align === 'right' ? 'ml-auto' : 'mr-auto',
      )}
    >
      <div className="space-y-4">
        {paragraphs.map((para) => (
          <p key={para.text}>
            <SplitText
              text={para.text}
              mode={para.split ?? 'words'}
              data-split={para.split === 'chars' ? 'chars' : 'words'}
              emphasis={para.emphasis}
            />
          </p>
        ))}
      </div>
    </BracketFrame>
  )
}

/**
 * Story chapter — title and bracket alternate sides via `reversed` (explicit grid columns).
 */
export function StoryBlock({
  kicker,
  titleLines,
  paragraphs,
  footer,
  className,
  frameClassName,
  reversed = false,
  stackedTitle = false,
  alignTitle = 'start',
  wideAside = false,
  parallaxDepth = 8,
}) {
  const wide = frameClassName === 'story-frame--wide'
  const frameClass = wide ? frameWideClass : frameBodyClass
  const titleOnRight = reversed
  const bracketAlign = titleOnRight ? 'left' : 'right'
  const gridAlign = alignTitle === 'center' ? 'lg:items-center' : 'lg:items-start'

  const titleCol = titleOnRight
    ? 'lg:col-span-5 lg:col-start-8'
    : wideAside
      ? 'lg:col-span-5 lg:col-start-1'
      : 'lg:col-span-7 lg:col-start-1'

  const bracketCol = titleOnRight
    ? wideAside
      ? 'lg:col-span-7 lg:col-start-1'
      : 'lg:col-span-7 lg:col-start-1'
    : wideAside
      ? 'lg:col-span-7 lg:col-start-6'
      : 'lg:col-span-5 lg:col-start-8'

  const titleBlock = (
    <div
      className={cn(
        titleCol,
        'order-1 w-full',
        titleOnRight ? 'lg:order-2' : 'lg:order-1',
        alignTitle === 'center' ? 'self-center' : 'self-start',
        titleOnRight && 'flex flex-col lg:items-end lg:text-right',
      )}
    >
      <p data-story-kicker className={sectionKickerClass}>
        {kicker}
      </p>
      <StoryTitle
        titleLines={titleLines}
        alignRight={titleOnRight}
        stacked={stackedTitle}
      />
      {footer ? (
        <div className={cn('mt-6', titleOnRight && 'flex flex-col items-end')}>{footer}</div>
      ) : null}
    </div>
  )

  const bracketBlock = (
    <div
      className={cn(
        bracketCol,
        'order-2 w-full min-w-0',
        titleOnRight ? 'lg:order-1' : 'lg:order-2',
        alignTitle === 'center' ? 'self-center' : 'self-start',
      )}
    >
      <StoryBracket
        paragraphs={paragraphs}
        frameClass={frameClass}
        align={bracketAlign}
        parallaxDepth={parallaxDepth}
      />
    </div>
  )

  return (
    <div className={cn('border-b border-white/5', storyBlockPadClass, className)} data-story-block>
      <LayoutContainer>
        <SectionGrid className={cn('gap-y-6', gridAlign)}>
          {titleBlock}
          {bracketBlock}
        </SectionGrid>
      </LayoutContainer>
    </div>
  )
}
