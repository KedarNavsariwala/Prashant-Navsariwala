import { mkdir, readFile, writeFile, copyFile, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

/**
 * Turns the read-only transparent PNGs in /Assets into AVIF + WebP derivatives.
 * Transparent pixels are defringed first (their RGB is bled from the nearest
 * opaque neighbour) so no pale halo appears when the cut-out sits on #D9D9D9.
 */

const config = JSON.parse(await readFile('media.config.json', 'utf8'))
const outDir = 'public/media'
await mkdir(outDir, { recursive: true })

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`

async function defringe(source) {
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info

  for (let pass = 0; pass < 4; pass += 1) {
    const before = Buffer.from(data)
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const index = (y * width + x) * channels
        if (before[index + 3] !== 0) continue

        let r = 0
        let g = 0
        let b = 0
        let count = 0

        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            const nx = x + dx
            const ny = y + dy
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
            const n = (ny * width + nx) * channels
            if (before[n + 3] === 0) continue
            r += before[n]
            g += before[n + 1]
            b += before[n + 2]
            count += 1
          }
        }

        if (count > 0) {
          data[index] = Math.round(r / count)
          data[index + 1] = Math.round(g / count)
          data[index + 2] = Math.round(b / count)
        }
      }
    }
  }

  return sharp(data, { raw: { width, height, channels } })
}

const total = []

for (const [key, image] of Object.entries(config.images)) {
  const original = await sharp(image.source).metadata()
  const hasTransparency =
    original.hasAlpha === true && !(await sharp(image.source).stats()).isOpaque
  const source = hasTransparency ? await defringe(image.source) : sharp(image.source)
  const clean = await source.png().toBuffer()
  const meta = await sharp(clean).metadata()

  for (const width of image.widths) {
    const height = Math.round((meta.height / meta.width) * width)
    const resized = sharp(clean).resize({ width, height, fit: 'fill' })

    const avif = join(outDir, `${image.base}-${width}.avif`)
    const webp = join(outDir, `${image.base}-${width}.webp`)

    await resized.clone().avif({ quality: 58, effort: 6 }).toFile(avif)
    await resized.clone().webp({ quality: 82, effort: 5 }).toFile(webp)

    const avifSize = (await stat(avif)).size
    const webpSize = (await stat(webp)).size
    total.push({ file: avif, size: avifSize })
    console.log(`${key.padEnd(9)} ${String(width).padStart(5)}w  avif ${kb(avifSize).padStart(7)}  webp ${kb(webpSize).padStart(7)}`)
  }
}

await mkdir('public', { recursive: true })
await copyFile('Prashant Navsariwala Resume.pdf', join('public', 'resume.pdf'))

const sum = total.reduce((acc, entry) => acc + entry.size, 0)
console.log(`\n${total.length} AVIF files, ${kb(sum)} total; resume.pdf copied.`)
