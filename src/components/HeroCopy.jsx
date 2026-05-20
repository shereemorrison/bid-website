import {
  ATHLETE_FIRST_NAME,
  ATHLETE_FULL_NAME,
  ATHLETE_SURNAME,
  ATHLETE_TAGLINE,
} from '../lib/athlete'
import {
  heroCopyClass,
  heroCtaPrimaryClass,
  heroCtaSecondaryClass,
} from '../lib/sectionLayout'

/** Hero intro copy — single section; GSAP reveal runs on parent `#top` in `HeroSection`. */
export function HeroCopy() {
  return (
    <section
      className={heroCopyClass}
      lang="sr-Latn"
      aria-labelledby="hero-page-title"
    >
      <h1 id="hero-page-title" className="hero-copy__sr-title">
        {ATHLETE_FULL_NAME} — Professional Boxer
      </h1>

      <div className="hero-copy__row">
        <span data-hero-kicker className="hero-copy__line">
          Professional Boxer
        </span>
      </div>

      <div className="hero-copy__row">
        <span data-hero-line="given" className="hero-copy__line">
          {ATHLETE_FIRST_NAME}
        </span>
      </div>

      <div className="hero-copy__row">
        <span data-hero-line="family" className="hero-copy__line">
          {ATHLETE_SURNAME}
        </span>
      </div>

      <div className="hero-copy__row">
        <span data-hero-tagline className="hero-copy__line">
          {ATHLETE_TAGLINE}
        </span>
      </div>

      <div className="hero-copy__row hero-copy__row--actions">
        <div className="hero-copy__cta-mask" data-hero-ctas>
          <div className="hero-copy__btn-row">
            <a href="#story" className={`${heroCtaSecondaryClass} hero-copy__btn`}>
              The Story
            </a>
            <a href="#merch" className={`${heroCtaPrimaryClass} hero-copy__btn`}>
              View Merch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
