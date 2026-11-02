import { vehicles, work } from '../content'
import { createStage3D, type Stage3D } from './stage3d'

/**
 * The showroom rail: one selection shared by the strip, the stage and the spec
 * panel. Hover, focus, tap and arrow keys all resolve to the same state.
 */
export function initShowroom(reducedMotion: boolean) {
  const root = document.querySelector<HTMLElement>('#work')
  if (!root) return

  const stageEl = root.querySelector<HTMLElement>('[data-stage]')
  const panel = root.querySelector<HTMLElement>('[data-panel]')
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-vehicle]'))
  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-stage-img]'))
  const indexLabel = root.querySelector<HTMLElement>('[data-index]')
  const countLabel = root.querySelector<HTMLElement>('[data-spec-count]')
  const nameEl = root.querySelector<HTMLElement>('[data-spec-name]')
  const typeEl = root.querySelector<HTMLElement>('[data-spec-type]')
  const yearEl = root.querySelector<HTMLElement>('[data-spec-year]')
  const reviewEl = root.querySelector<HTMLElement>('[data-spec-review]')

  if (!buttons.length || !panel) return
  const panelEl = panel

  const startIndex = Math.max(
    0,
    vehicles.findIndex((vehicle) => vehicle.id === work.defaultVehicle),
  )

  let stage3d: Stage3D | null = null
  let stage3dPending: Promise<Stage3D | null> | null = null

  const pad = (value: number) => String(value).padStart(2, '0')

  function select(index: number, moveFocusToPanel = false) {
    const vehicle = vehicles[index]
    if (!vehicle) return

    buttons.forEach((button, i) => {
      const isActive = i === index
      button.classList.toggle('is-active', isActive)
      button.setAttribute('aria-pressed', String(isActive))
      button.tabIndex = isActive ? 0 : -1
    })

    slides.forEach((slide) => {
      slide.classList.toggle('is-active', slide.dataset.stageImg === vehicle.id)
    })

    if (indexLabel) indexLabel.textContent = pad(index + 1)
    if (countLabel) countLabel.textContent = pad(index + 1)
    if (nameEl) nameEl.textContent = vehicle.name
    if (typeEl) typeEl.textContent = vehicle.type
    if (yearEl) yearEl.textContent = String(vehicle.launchYear)
    if (reviewEl) reviewEl.textContent = vehicle.review

    if (vehicle.model && stageEl) {
      if (!stage3dPending) {
        stage3dPending = createStage3D(stageEl, { reducedMotion }).then((stage) => {
          stage3d = stage
          return stage
        })
      }
      void stage3dPending.then((stage) => stage?.show(vehicle))
    } else {
      stage3d?.hide()
    }

    if (moveFocusToPanel) panelEl.focus()
  }

  function move(index: number, delta: number) {
    const next = (index + delta + buttons.length) % buttons.length
    select(next)
    buttons[next].focus()
  }

  buttons.forEach((button, index) => {
    button.addEventListener('pointerenter', () => select(index))
    button.addEventListener('focus', () => select(index))
    button.addEventListener('click', () => select(index))

    button.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault()
          move(index, 1)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault()
          move(index, -1)
          break
        case 'Home':
          event.preventDefault()
          select(0)
          buttons[0].focus()
          break
        case 'End':
          event.preventDefault()
          select(buttons.length - 1)
          buttons[buttons.length - 1].focus()
          break
        case 'Enter':
        case ' ':
          event.preventDefault()
          select(index, true)
          break
        default:
          break
      }
    })
  })

  select(startIndex)
}
