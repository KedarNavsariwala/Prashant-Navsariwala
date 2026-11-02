import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

/**
 * Loaded only when JavaScript is available and reduced motion is not requested.
 * Every animation is additive: the document is already complete without it.
 */
export function initMotion() {
  gsap.registerPlugin(ScrollTrigger)

  // Anchor jumps land the section flush under the fixed header.
  const navHeight = document.querySelector<HTMLElement>('.nav')?.offsetHeight ?? 64

  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  initAnchors(lenis, navHeight)
  heroParallax()
  reveals()
  spine()
  counters()

  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh, { once: true })
  void document.fonts?.ready.then(refresh)
  return lenis
}

/**
 * One anchor handler, one offset. Lenis's built-in anchor option subtracts the
 * page's scroll-padding and the configured offset twice, and the browser still
 * performs its own hash jump on top. Taking over the click keeps the target
 * exactly under the fixed header.
 */
function initAnchors(lenis: Lenis, navHeight: number) {
  document.addEventListener(
    'click',
    (event) => {
      if (event.defaultPrevented) return
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const element = event.target
      if (!(element instanceof Element)) return

      const link = element.closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link || link.classList.contains('skip-link')) return

      const hash = link.getAttribute('href')
      if (!hash || hash === '#') return

      const section = document.querySelector<HTMLElement>(hash)
      if (!section) return

      event.preventDefault()

      const top = Math.max(0, section.getBoundingClientRect().top + window.scrollY - navHeight)
      lenis.scrollTo(top)

      try {
        history.pushState(null, '', hash)
      } catch {
        // A file:// preview cannot rewrite history; scrolling still works.
      }
    },
    { passive: false },
  )
}

function heroParallax() {
  gsap.to('.hero__word', {
    yPercent: -14,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  })

  gsap.to('.hero__portrait', {
    yPercent: -7,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  })

  gsap.to('.hero__caption', {
    autoAlpha: 0,
    y: -10,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '30% top', scrub: true },
  })
}

function reveals() {
  const singles = gsap.utils.toArray<HTMLElement>('[data-reveal]')
  const groups = gsap.utils.toArray<HTMLElement>('[data-reveal-group]')
  const all = [
    ...singles,
    ...groups.flatMap((group) => Array.from(group.children) as HTMLElement[]),
  ]

  // IntersectionObserver (rather than a scroll listener) is what makes an
  // anchor jump reliable: the target section intersects immediately after the
  // jump, so its content reveals even if the visitor never scrolls through the
  // sections in between.
  if (!('IntersectionObserver' in window)) {
    gsap.set(all, { autoAlpha: 1, y: 0 })
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const target = entry.target as HTMLElement
        observer.unobserve(target)

        const children = target.hasAttribute('data-reveal-group')
          ? (Array.from(target.children) as HTMLElement[])
          : null

        gsap.to(children ?? target, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: children && children.length > 1 ? 0.06 : 0,
          overwrite: true,
        })
      })
    },
    { threshold: 0.15 },
  )

  singles.forEach((element) => {
    gsap.set(element, { autoAlpha: 0, y: 24 })
    observer.observe(element)
  })

  groups.forEach((group) => {
    const children = Array.from(group.children) as HTMLElement[]
    if (!children.length) return
    gsap.set(children, { autoAlpha: 0, y: 24 })
    observer.observe(group)
  })
}

function spine() {
  // The track is a light rule and the ink line grows over it. Scaling the
  // wrapper (not dashing the path) keeps the stroke pixel-crisp at any height.
  gsap.from('.spine', {
    scaleY: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.career__timeline',
      start: 'top 70%',
      end: 'bottom 70%',
      scrub: true,
    },
  })
}

function counters() {
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((element) => {
    const target = Number(element.dataset.count ?? 0)
    if (!Number.isFinite(target)) return

    ScrollTrigger.create({
      trigger: element,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        const value = { current: 0 }
        gsap.to(value, {
          current: target,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            element.textContent = String(Math.round(value.current))
          },
        })
      },
    })
  })
}
