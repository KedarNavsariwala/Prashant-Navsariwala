import type * as Three from 'three'
import type { Vehicle } from '../content'

export type Stage3D = {
  show: (vehicle: Vehicle) => void
  hide: () => void
}

type Options = { reducedMotion: boolean }

/**
 * One persistent WebGL canvas for the showroom stage. It is only created when a
 * vehicle actually has a `.glb`; until then the PNG cut-out is the stage.
 * Any failure is silent: the caller keeps the 2D state.
 */
export async function createStage3D(
  host: HTMLElement,
  { reducedMotion }: Options,
): Promise<Stage3D | null> {
  const canvas = host.querySelector<HTMLCanvasElement>('[data-stage-canvas]')
  if (!canvas) return null
  const canvasEl = canvas

  let THREE: typeof import('three')
  let GLTFLoader: typeof import('three/examples/jsm/loaders/GLTFLoader.js').GLTFLoader
  let RoomEnvironment: typeof import('three/examples/jsm/environments/RoomEnvironment.js').RoomEnvironment

  try {
    THREE = await import('three')
    ;({ GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js'))
    ;({ RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js'))
  } catch {
    return null
  }

  const renderer = new THREE.WebGLRenderer({
    canvas: canvasEl,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.02

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)

  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  pmrem.dispose()

  const key = new THREE.DirectionalLight(0xffffff, 2.2)
  key.position.set(-4, 6, 4)
  const fill = new THREE.DirectionalLight(0xffffff, 0.85)
  fill.position.set(5, 2.5, 3)
  const rim = new THREE.DirectionalLight(0xffffff, 1.5)
  rim.position.set(0, 4, -6)
  scene.add(key, fill, rim, new THREE.HemisphereLight(0xffffff, 0xffffff, 0.55))

  const pivot = new THREE.Group()
  scene.add(pivot)

  const target = new THREE.Vector3(0, 0.8, 0)
  const baseAzimuth = 0.44
  const basePolar = 0.3
  const radius = 5.4

  let azimuth = baseAzimuth
  let polar = basePolar
  let userYaw = 0
  let userPitch = 0
  let dragging = false
  let lastX = 0
  let lastY = 0
  let idleSince = 0

  const cache = new Map<string, Three.Group>()
  let current: Three.Group | null = null
  let fade = 1

  const loader = new GLTFLoader()

  function resize() {
    const width = host.clientWidth || 1
    const height = host.clientHeight || 1
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host)
  resize()

  let raf = 0
  let visible = false
  const clock = new THREE.Clock()

  function frame() {
    raf = requestAnimationFrame(frame)
    const delta = Math.min(clock.getDelta(), 0.05)

    if (!reducedMotion) pivot.rotation.y += delta * 0.15

    if (idleSince && performance.now() - idleSince > 3000) {
      userYaw += (0 - userYaw) * Math.min(1, delta * 2.4)
      userPitch += (0 - userPitch) * Math.min(1, delta * 2.4)
    }

    azimuth += (baseAzimuth + userYaw - azimuth) * Math.min(1, delta * 9)
    polar += (basePolar + userPitch - polar) * Math.min(1, delta * 9)

    const cosPolar = Math.cos(polar)
    camera.position.set(
      target.x + Math.sin(azimuth) * cosPolar * radius,
      target.y + Math.sin(polar) * radius,
      target.z + Math.cos(azimuth) * cosPolar * radius,
    )
    camera.lookAt(target)

    if (fade < 1) {
      fade = Math.min(1, fade + delta / 0.22)
      pivot.traverse((object) => {
        const mesh = object as Three.Mesh
        const material = mesh.material as Three.Material | Three.Material[] | undefined
        const list = Array.isArray(material) ? material : material ? [material] : []
        list.forEach((entry) => {
          entry.opacity = fade
        })
      })
    }

    renderer.render(scene, camera)
  }

  function start() {
    if (raf) return
    clock.getDelta()
    raf = requestAnimationFrame(frame)
  }

  function stop() {
    if (!raf) return
    cancelAnimationFrame(raf)
    raf = 0
  }

  const visibility = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    },
    { threshold: 0.01 },
  )
  visibility.observe(host)

  function onPointerDown(event: PointerEvent) {
    dragging = true
    lastX = event.clientX
    lastY = event.clientY
    idleSince = 0
    canvasEl.setPointerCapture(event.pointerId)
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragging) return
    const dx = event.clientX - lastX
    const dy = event.clientY - lastY
    lastX = event.clientX
    lastY = event.clientY
    userYaw = Math.max(-0.7, Math.min(0.7, userYaw + dx * 0.005))
    userPitch = Math.max(-0.26, Math.min(0.26, userPitch - dy * 0.004))
  }

  function onPointerUp(event: PointerEvent) {
    if (!dragging) return
    dragging = false
    idleSince = performance.now()
    if (canvasEl.hasPointerCapture(event.pointerId)) canvasEl.releasePointerCapture(event.pointerId)
  }

  canvasEl.addEventListener('pointerdown', onPointerDown)
  canvasEl.addEventListener('pointermove', onPointerMove)
  canvasEl.addEventListener('pointerup', onPointerUp)
  canvasEl.addEventListener('pointercancel', onPointerUp)

  function normalise(model: Three.Group) {
    const initial = new THREE.Box3().setFromObject(model)
    const size = initial.getSize(new THREE.Vector3())
    const largest = Math.max(size.x, size.y, size.z) || 1
    model.scale.setScalar(3.4 / largest)

    const scaled = new THREE.Box3().setFromObject(model)
    const centre = scaled.getCenter(new THREE.Vector3())
    model.position.x -= centre.x
    model.position.z -= centre.z
    model.position.y -= scaled.min.y

    model.traverse((object) => {
      const mesh = object as Three.Mesh
      const material = mesh.material as Three.Material | Three.Material[] | undefined
      const list = Array.isArray(material) ? material : material ? [material] : []
      list.forEach((entry) => {
        entry.transparent = true
        entry.opacity = 0
      })
      mesh.castShadow = false
      mesh.receiveShadow = false
    })

    return model
  }

  async function load(url: string) {
    const cached = cache.get(url)
    if (cached) return cached
    const gltf = await loader.loadAsync(url)
    const model = normalise(gltf.scene)
    cache.set(url, model)
    return model
  }

  function hide() {
    host.classList.remove('is-3d')
  }

  function show(vehicle: Vehicle) {
    if (!vehicle.model) {
      hide()
      return
    }

    void load(vehicle.model)
      .then((model) => {
        if (current === model) {
          host.classList.add('is-3d')
          return
        }
        if (current) pivot.remove(current)
        current = model
        pivot.add(model)
        fade = 0
        host.classList.add('is-3d')
        if (visible) start()
      })
      .catch(() => {
        hide()
      })
  }

  return {
    show,
    hide: () => {
      hide()
      if (current) {
        pivot.remove(current)
        current = null
      }
    },
  }
}
