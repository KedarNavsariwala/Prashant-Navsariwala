import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

/**
 * Loaded only when JavaScript is available and reduced motion is not requested.
 * Every animation is additive: the document is already complete without it.
 */
export function initMotion() {
  gsap.registerPlugin(ScrollTrigger)

  // CSS uses this to opt into the pinned career layout only when the motion
  // chunk actually loaded. Without it, everything stays a readable stack.
  document.documentElement.classList.add('is-motion')

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
  careerStage(navHeight)
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
  // The word and portrait run their own CSS introduction (translate, scale and
  // gap). GSAP must not write transforms to those elements or it freezes the
  // CSS animation and cancels the centring, so only the caption is scroll-linked.
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

type TypedItem = {
  live: HTMLElement
  full: string
  /** Per-character pace, so a long paragraph still lands in about a second. */
  interval: number
}

/**
 * The career section locks under the header while the reader crosses it. CSS
 * sticky does the locking; ScrollTrigger only reports progress. The active
 * milestone crossfades, the image drifts inside its mask, and the copy types
 * itself in on the way down. Scrolling back up restores full copy immediately.
 */
function careerStage(navHeight: number) {
  const section = document.querySelector<HTMLElement>('[data-career]')
  const slides = Array.from(document.querySelectorAll<HTMLElement>('[data-career-slide]'))
  const counter = section?.querySelector<HTMLElement>('[data-career-index]')

  if (!section || !slides.length) return

  const matchMedia = gsap.matchMedia()

  matchMedia.add('(min-width: 900px)', () => {
    const typed = new Map<number, TypedItem[]>()
    const completed = new Set<number>()

    slides.forEach((slide, index) => {
      const items = Array.from(slide.querySelectorAll<HTMLElement>('[data-career-type]'))
        .map((element) => {
          const live = element.querySelector<HTMLElement>('.career__type-live')
          if (!live) return null
          const full = live.textContent ?? ''
          return {
            live,
            full,
            interval: Math.round(Math.min(18, Math.max(7, 1100 / Math.max(1, full.length)))),
          }
        })
        .filter((item): item is TypedItem => item !== null)

      typed.set(index, items)
    })

    let activeIndex = -1
    let typingFrame = 0
    let typingToken = 0

    const cancelTyping = () => {
      if (typingFrame) {
        cancelAnimationFrame(typingFrame)
        typingFrame = 0
      }
      typingToken += 1
    }

    const showFull = (index: number) => {
      cancelTyping()

      typed.get(index)?.forEach((item) => {
        item.live.textContent = item.full
      })

      completed.add(index)
    }

    const typeSlide = (index: number) => {
      if (completed.has(index)) {
        showFull(index)
        return
      }

      const items = typed.get(index)
      if (!items?.length) return

      cancelTyping()
      const run = typingToken
      items.forEach((item) => {
        item.live.textContent = ''
      })

      let itemIndex = 0
      let charIndex = 0
      let last = performance.now()

      const tick = (now: number) => {
        if (run !== typingToken) return

        const item = items[itemIndex]
        if (!item) {
          completed.add(index)
          typingFrame = 0
          return
        }

        const elapsed = now - last
        if (elapsed >= item.interval) {
          const steps = Math.max(1, Math.floor(elapsed / item.interval))
          last = now
          charIndex = Math.min(item.full.length, charIndex + steps)
          item.live.textContent = item.full.slice(0, charIndex)

          if (charIndex >= item.full.length) {
            itemIndex += 1
            charIndex = 0

            if (itemIndex >= items.length) {
              completed.add(index)
              typingFrame = 0
              return
            }
          }
        }

        typingFrame = requestAnimationFrame(tick)
      }

      typingFrame = requestAnimationFrame(tick)
    }

    const setSlide = (index: number) => {
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === index
        slide.classList.toggle('is-active', active)
        if (active) slide.removeAttribute('aria-hidden')
        else slide.setAttribute('aria-hidden', 'true')
      })

      if (counter) counter.textContent = String(index + 1).padStart(2, '0')
    }

    const activate = (index: number, direction: number) => {
      if (index === activeIndex) return

      activeIndex = index
      setSlide(index)

      if (direction > 0) typeSlide(index)
      else showFull(index)
    }

    setSlide(0)
    showFull(0)
    section.style.setProperty('--career-progress', '0')
    slides[0]?.style.setProperty('--career-drift', '9px')

    // Every callback reads the live progress, so a jump into the middle of the
    // section (an anchor, restored scroll position, or a fast fling) lands on
    // the milestone that matches the reader's actual position.
    const sync = (self: ScrollTrigger) => {
      section.style.setProperty('--career-progress', self.progress.toFixed(4))

      const raw = self.progress * slides.length
      const index = Math.min(slides.length - 1, Math.max(0, Math.floor(raw)))
      const local = Math.min(1, Math.max(0, raw - index))

      // Drift the active photograph inside its mask as its own milestone is
      // crossed. Each slide keeps its own offset, so the outgoing image does not
      // jump when the next one takes over.
      slides[index]?.style.setProperty(
        '--career-drift',
        `${((0.5 - local) * 18).toFixed(2)}px`,
      )

      activate(index, self.direction || 1)
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: () => `top ${navHeight}px`,
      end: 'bottom bottom',
      invalidateOnRefresh: true,
      onUpdate: sync,
      onEnter: sync,
      onEnterBack: sync,
      onLeave: sync,
      onLeaveBack: sync,
    })

    return () => {
      trigger.kill()
      cancelTyping()
      slides.forEach((slide) => {
        slide.classList.remove('is-active')
        slide.removeAttribute('aria-hidden')
        slide.style.removeProperty('--career-drift')
      })
      section.style.removeProperty('--career-progress')

      typed.forEach((items) => {
        items.forEach((item) => {
          item.live.textContent = item.full
        })
      })
    }
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
