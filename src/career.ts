const MOBILE_QUERY = '(max-width: 899px)'

/**
 * Career on small screens is a native scroll-snap rail. This only keeps the
 * indicator dots in step and gives the rail keyboard controls; the swipe,
 * snapping and layout are CSS.
 */
export function initCareer() {
  const section = document.querySelector<HTMLElement>('[data-career]')
  const track = section?.querySelector<HTMLElement>('[data-career-track]')
  const slides = Array.from(section?.querySelectorAll<HTMLElement>('[data-career-slide]') ?? [])
  const dots = Array.from(section?.querySelectorAll<HTMLElement>('[data-career-dot]') ?? [])

  if (!section || !track || !slides.length) return

  const rail = track
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const mobile = window.matchMedia(MOBILE_QUERY)

  let current = 0
  let observer: IntersectionObserver | null = null

  function setActive(index: number) {
    current = index

    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === index
      dot.classList.toggle('is-active', active)
      if (active) dot.setAttribute('aria-current', 'true')
      else dot.removeAttribute('aria-current')
    })
  }

  function scrollToSlide(index: number) {
    const next = Math.max(0, Math.min(slides.length - 1, index))
    const card = slides[next]
    const trackRect = rail.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    const left =
      rail.scrollLeft +
      cardRect.left -
      trackRect.left -
      (rail.clientWidth - cardRect.width) / 2

    setActive(next)
    rail.scrollTo({
      left,
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
    })
  }

  function onDotClick(event: Event) {
    const target = event.target
    if (!(target instanceof Element)) return

    const dot = target.closest<HTMLElement>('[data-career-dot]')
    if (!dot) return

    const index = Number(dot.dataset.careerDot)
    if (!Number.isInteger(index)) return

    event.preventDefault()
    scrollToSlide(index)
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return

    event.preventDefault()
    scrollToSlide(current + (event.key === 'ArrowRight' ? 1 : -1))
  }

  function teardown() {
    observer?.disconnect()
    observer = null

    dots.forEach((dot) => dot.removeEventListener('click', onDotClick))
    rail.removeEventListener('keydown', onKeyDown)
  }

  function setup() {
    teardown()

    // Desktop motion owns the slides and their aria state.
    rail.tabIndex = mobile.matches ? 0 : -1

    if (!mobile.matches) {
      slides.forEach((slide) => slide.removeAttribute('aria-hidden'))
      return
    }

    slides.forEach((slide) => slide.removeAttribute('aria-hidden'))
    setActive(0)

    dots.forEach((dot) => dot.addEventListener('click', onDotClick))
    rail.addEventListener('keydown', onKeyDown)

    if (!('IntersectionObserver' in window)) return

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visible) return

        const index = slides.indexOf(visible.target as HTMLElement)
        if (index >= 0) setActive(index)
      },
      { root: rail, threshold: 0.55 },
    )

    slides.forEach((slide) => observer?.observe(slide))
  }

  setup()
  mobile.addEventListener('change', setup)
}
