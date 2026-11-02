import { roles } from './content'

/**
 * Career media: whichever role card crosses the middle of the viewport owns the
 * sticky pane. Opacity only — the pane itself never moves.
 */
export function initCareer() {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-role]'))
  const panes = Array.from(document.querySelectorAll<HTMLElement>('[data-role-media]'))
  const caption = document.querySelector<HTMLElement>('[data-career-caption]')

  if (!cards.length || !panes.length) return

  const byId = new Map(roles.map((role) => [role.id, role]))
  let activeId = ''

  function setActive(id: string) {
    if (id === activeId) return
    activeId = id

    panes.forEach((pane) => {
      pane.classList.toggle('is-active', pane.dataset.roleMedia === id)
    })

    const role = byId.get(id)
    if (caption && role) {
      caption.textContent = role.location ? `${role.location} · ${role.dates}` : role.dates
    }
  }

  const first = cards[0].dataset.role
  if (first) setActive(first)

  const observer = new IntersectionObserver(
    (entries) => {
      const entering = entries.filter((entry) => entry.isIntersecting)
      if (!entering.length) return
      const last = entering[entering.length - 1].target as HTMLElement
      if (last.dataset.role) setActive(last.dataset.role)
    },
    { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
  )

  cards.forEach((card) => observer.observe(card))
}
