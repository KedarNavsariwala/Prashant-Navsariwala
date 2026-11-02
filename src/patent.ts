/**
 * A very small magnetic pull on the patent sketch: when the pointer is near the
 * image, it leans a few pixels toward the cursor and eases back when it leaves.
 * Transform only, desktop pointers only, and off when motion is reduced.
 */
export function initPatent(reducedMotion: boolean) {
  if (reducedMotion) return
  if (!window.matchMedia('(pointer: fine)').matches) return

  const section = document.querySelector<HTMLElement>('#patent')
  const figure = section?.querySelector<HTMLElement>('[data-magnet]')
  const image = figure?.querySelector<HTMLImageElement>('img')
  if (!section || !figure || !image) return

  const MAX_PULL = 12

  const onMove = (event: PointerEvent) => {
    const rect = figure.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const centreX = rect.left + rect.width / 2
    const centreY = rect.top + rect.height / 2
    const dx = event.clientX - centreX
    const dy = event.clientY - centreY
    const radius = Math.max(rect.width, rect.height) * 0.72 + 120
    const distance = Math.hypot(dx, dy)

    if (distance >= radius) {
      image.style.transform = ''
      return
    }

    const strength = 1 - distance / radius
    const x = Math.max(-MAX_PULL, Math.min(MAX_PULL, dx * 0.09 * strength))
    const y = Math.max(-MAX_PULL, Math.min(MAX_PULL, dy * 0.09 * strength))
    image.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
  }

  const reset = () => {
    image.style.transform = ''
  }

  section.addEventListener('pointermove', onMove, { passive: true })
  section.addEventListener('pointerleave', reset, { passive: true })
  window.addEventListener('blur', reset)
}
