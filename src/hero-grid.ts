/**
 * A quiet, pointer-free take on React Bits' ShapeGrid for the hero: a square
 * lattice drifting diagonally on white. No hover, click, tilt or glow states.
 * It is drawn on a canvas so the lines stay crisp at any viewport.
 */

const CELL = 44
const LINE = 'rgba(0, 0, 0, 0.06)'
const SPEED = 0.12
const DIAGONAL = Math.SQRT1_2

export function initHeroGrid(reducedMotion: boolean) {
  const host = document.querySelector<HTMLElement>('[data-hero-grid]')
  if (!host) return

  const canvas = document.createElement('canvas')
  canvas.className = 'hero__grid-canvas'
  canvas.setAttribute('aria-hidden', 'true')
  host.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  const mobileQuery = window.matchMedia('(max-width: 767px)')

  let width = 0
  let height = 0
  let ratio = 1
  let offsetX = 0
  let offsetY = 0
  let frame = 0
  let last = 0
  let visible = true
  let animate = !reducedMotion && !motionQuery.matches && !mobileQuery.matches

  const draw = () => {
    if (!width || !height) return

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    ctx.clearRect(0, 0, width, height)
    ctx.strokeStyle = LINE
    ctx.lineWidth = 1
    ctx.beginPath()

    const startX = (((offsetX % CELL) + CELL) % CELL) - CELL
    const startY = (((offsetY % CELL) + CELL) % CELL) - CELL

    for (let x = startX; x <= width + CELL; x += CELL) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
    }

    for (let y = startY; y <= height + CELL; y += CELL) {
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
    }

    ctx.stroke()
  }

  const resize = () => {
    width = Math.max(1, host.clientWidth)
    height = Math.max(1, host.clientHeight)
    ratio = Math.min(window.devicePixelRatio || 1, 2)

    const pixelWidth = Math.round(width * ratio)
    const pixelHeight = Math.round(height * ratio)

    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth
      canvas.height = pixelHeight
    }

    draw()
  }

  const tick = (time: number) => {
    frame = 0
    if (!visible || !animate) return

    if (!last) last = time
    const dt = Math.min(0.05, (time - last) / 1000)
    last = time

    offsetX += DIAGONAL * SPEED * 60 * dt
    offsetY -= DIAGONAL * SPEED * 60 * dt

    draw()
    frame = requestAnimationFrame(tick)
  }

  const start = () => {
    if (!animate || frame || !visible) return
    last = 0
    frame = requestAnimationFrame(tick)
  }

  const stop = () => {
    if (frame) cancelAnimationFrame(frame)
    frame = 0
    last = 0
  }

  const syncMotion = () => {
    animate = !reducedMotion && !motionQuery.matches && !mobileQuery.matches
    if (!animate) stop()
    else start()
  }

  const resizeObserver = new ResizeObserver(() => {
    resize()
    start()
  })
  resizeObserver.observe(host)

  const visibility = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    },
    { threshold: 0 },
  )
  visibility.observe(host)

  motionQuery.addEventListener('change', syncMotion)
  mobileQuery.addEventListener('change', syncMotion)

  resize()
  start()
}
