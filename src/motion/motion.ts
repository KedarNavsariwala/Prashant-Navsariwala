import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

/**
 * Loaded only when JavaScript is available and reduced motion is not requested.
 * Every animation is additive: the document is already complete without it.
 */
export function initMotion() {
  // Drop the pre-JS hiding rule in the same tick that GSAP applies its own
  // start states, so nothing flashes and `.from` reads the natural end values.
  document.documentElement.classList.remove('intro-pending')

  gsap.registerPlugin(ScrollTrigger)

  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    anchors: { offset: -(64 + 12) },
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  introSequence()
  heroParallax()
  reveals()
  spine()
  counters()

  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh, { once: true })
  void document.fonts?.ready.then(refresh)
  return lenis
}

function introSequence() {
  const word = document.querySelector<HTMLElement>('.hero__word')
  const lead = document.querySelector<HTMLElement>('[data-word-part="lead"]')
  const trail = document.querySelector<HTMLElement>('[data-word-part="trail"]')
  if (!word || !lead || !trail) return

  // The final split lives in CSS so it works without JavaScript. Read the two
  // half offsets first, then join the word for the opening title moment.
  const leadX = parseFloat(String(gsap.getProperty(lead, 'x')))
  const trailX = parseFloat(String(gsap.getProperty(trail, 'x')))
  const rect = word.getBoundingClientRect()
  const centreOffset = window.innerHeight / 2 - (rect.top + rect.height / 2)

  gsap.set(word, { y: centreOffset, autoAlpha: 0 })
  gsap.set([lead, trail], { x: 0 })

  const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

  timeline
    // 1. The whole word fades in at the centre of the viewport.
    .to(word, { autoAlpha: 1, duration: 0.65, ease: 'power2.out' }, 0)
    // 2. The portrait fades in front of it.
    .from('.hero__portrait', { autoAlpha: 0, scale: 1.04, duration: 0.85 }, 0.55)
    // 3. The word parts and settles behind the portrait.
    .to(word, { y: 0, duration: 1.15, ease: 'power3.inOut' }, 1.3)
    .to(lead, { x: leadX, duration: 1.15, ease: 'power3.inOut' }, 1.3)
    .to(trail, { x: trailX, duration: 1.15, ease: 'power3.inOut' }, 1.3)
    .from('.hero__caption > *', { autoAlpha: 0, y: 8, duration: 0.8, stagger: 0.08 }, 2.2)
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
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
    gsap.set(element, { autoAlpha: 0, y: 24 })
    ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: true,
        })
      },
    })
  })

  gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const children = Array.from(group.children) as HTMLElement[]
    if (!children.length) return
    const stagger = Math.min(5, children.length)
    gsap.set(children, { autoAlpha: 0, y: 24 })
    ScrollTrigger.create({
      trigger: group,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(children, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: stagger > 1 ? 0.06 : 0,
          overwrite: true,
        })
      },
    })
  })

  gsap.from('.contact__title', {
    autoAlpha: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.contact__title', start: 'top 85%', once: true },
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
