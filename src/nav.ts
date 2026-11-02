export function initNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]')
  const sentinel = document.querySelector<HTMLElement>('.nav-sentinel')
  const details = document.querySelector<HTMLDetailsElement>('.nav__menu')

  if (nav && sentinel) {
    const observer = new IntersectionObserver(
      ([entry]) => nav.classList.toggle('is-scrolled', !entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(sentinel)
  }

  if (!details) return

  const close = () => {
    details.open = false
  }

  details.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close)
  })

  details.addEventListener('toggle', () => {
    document.documentElement.style.overflow = details.open ? 'hidden' : ''
  })

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !details.open) return
    close()
    details.querySelector('summary')?.focus()
  })

  window.matchMedia('(min-width: 900px)').addEventListener('change', (event) => {
    if (event.matches) close()
  })
}
