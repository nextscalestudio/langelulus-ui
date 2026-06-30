/**
 * Generates branded gradient PNG placeholder images for every missing
 * public/images/** asset referenced in the L'ANGELULUS codebase.
 *
 * Run: node scripts/gen-placeholders.mjs
 * Requires only Node.js built-ins (fs, path, zlib).
 */

import { deflateSync } from 'zlib'
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')

// ── CRC-32 ────────────────────────────────────────────────────────────────────

const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[i] = c
  }
  return t
})()

function crc32(buf) {
  let c = 0xffffffff
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

// ── PNG primitives ─────────────────────────────────────────────────────────────

function pngChunk(type, data) {
  const t = Buffer.from(type, 'ascii')
  const lenBuf = Buffer.allocUnsafe(4)
  lenBuf.writeUInt32BE(data.length, 0)
  const crcBuf = Buffer.allocUnsafe(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([t, data])), 0)
  return Buffer.concat([lenBuf, t, data, crcBuf])
}

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t)
}

function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff]
}

/**
 * Creates a valid PNG file buffer with a top→bottom linear gradient.
 * @param {number} width
 * @param {number} height
 * @param {string} topHex  '#rrggbb'
 * @param {string} botHex  '#rrggbb'
 */
function makePNG(width, height, topHex, botHex) {
  const top = hexToRgb(topHex)
  const bot = hexToRgb(botHex)

  // IHDR: width(4) height(4) bitDepth(1) colorType(1=RGB=2) compress(1) filter(1) interlace(1)
  const ihdr = Buffer.allocUnsafe(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8   // bit depth
  ihdr[9] = 2   // color type: RGB
  ihdr[10] = 0  // compression: deflate
  ihdr[11] = 0  // filter: adaptive
  ihdr[12] = 0  // interlace: none

  // Raw scanlines: each row = [filter=0, R, G, B, R, G, B, …]
  const rowLen = 1 + width * 3
  const raw = Buffer.allocUnsafe(height * rowLen)
  for (let y = 0; y < height; y++) {
    const t = height === 1 ? 0 : y / (height - 1)
    const r = lerp(top[0], bot[0], t)
    const g = lerp(top[1], bot[1], t)
    const b = lerp(top[2], bot[2], t)
    const base = y * rowLen
    raw[base] = 0 // filter: None
    for (let x = 0; x < width; x++) {
      raw[base + 1 + x * 3] = r
      raw[base + 2 + x * 3] = g
      raw[base + 3 + x * 3] = b
    }
  }

  const idat = deflateSync(raw, { level: 9 })

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // PNG signature
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', idat),
    pngChunk('IEND', Buffer.alloc(0)),
  ])
}

// ── Image catalogue ────────────────────────────────────────────────────────────

const IMAGES = [
  // Hero / page headers
  { path: 'images/hero-bg.jpg',            w: 1200, h: 675, top: '#000000', bot: '#0d0d1a' },
  { path: 'images/about/hero.jpg',         w: 1200, h: 500, top: '#0a0a0a', bot: '#1a1a2e' },
  { path: 'images/brand-intro.jpg',        w:  800, h: 800, top: '#ffffff', bot: '#f0ebe3' },

  // Scent stories (editorial)
  { path: 'images/stories/noir-obsidian.jpg',  w: 800, h: 800, top: '#0a0a0a', bot: '#1a1213' },
  { path: 'images/stories/bloom-celeste.jpg',  w: 800, h: 800, top: '#fff8f5', bot: '#f5e0d8' },
  { path: 'images/stories/aqua-meridian.jpg',  w: 800, h: 800, top: '#eef8ff', bot: '#c0dcf0' },

  // Lifestyle gallery (square crop)
  { path: 'images/gallery/lifestyle-01.jpg', w: 800, h: 800, top: '#f8f8f8', bot: '#e8e8e8' },
  { path: 'images/gallery/lifestyle-02.jpg', w: 800, h: 800, top: '#fdf5ee', bot: '#f0e0cc' },
  { path: 'images/gallery/lifestyle-03.jpg', w: 800, h: 800, top: '#f0f5f8', bot: '#d8e8f0' },
  { path: 'images/gallery/lifestyle-04.jpg', w: 800, h: 800, top: '#111111', bot: '#222222' },
  { path: 'images/gallery/lifestyle-05.jpg', w: 800, h: 800, top: '#0a1a0a', bot: '#1a2e1a' },
  { path: 'images/gallery/lifestyle-06.jpg', w: 800, h: 800, top: '#fff8f0', bot: '#f0e0cc' },
  { path: 'images/gallery/lifestyle-07.jpg', w: 800, h: 800, top: '#0a0a10', bot: '#1a1a28' },
  { path: 'images/gallery/lifestyle-08.jpg', w: 800, h: 800, top: '#f5f5f5', bot: '#e5e5e5' },
  { path: 'images/gallery/lifestyle-09.jpg', w: 800, h: 800, top: '#f8f0f8', bot: '#e8d8e8' },

  // Collections
  { path: 'images/collections/noir.jpg',   w: 600, h: 450, top: '#0a0a0a', bot: '#1e1e1e' },
  { path: 'images/collections/bloom.jpg',  w: 600, h: 450, top: '#fff5f5', bot: '#f5d8d8' },
  { path: 'images/collections/aqua.jpg',   w: 600, h: 450, top: '#eef8ff', bot: '#b8d8f0' },
  { path: 'images/collections/velvet.jpg', w: 600, h: 450, top: '#1a0a2e', bot: '#2d1442' },

  // Blog thumbnails
  { path: 'images/blog/signature-scent.jpg',       w: 800, h: 450, top: '#f8f8f8', bot: '#e8e8e8' },
  { path: 'images/blog/concentration-guide.jpg',   w: 800, h: 450, top: '#f5f8f5', bot: '#e0e8e0' },
  { path: 'images/blog/fragrance-layering.jpg',    w: 800, h: 450, top: '#fff8f0', bot: '#f0e0c8' },
  { path: 'images/blog/fragrance-storage.jpg',     w: 800, h: 450, top: '#f8f5f8', bot: '#e8d8e8' },
]

// ── Generate ───────────────────────────────────────────────────────────────────

let created = 0
for (const img of IMAGES) {
  const dest = join(ROOT, 'public', img.path)
  mkdirSync(dirname(dest), { recursive: true })
  const buf = makePNG(img.w, img.h, img.top, img.bot)
  writeFileSync(dest, buf)
  console.log(`  ✓  ${img.path}  (${img.w}×${img.h})`)
  created++
}

console.log(`\nGenerated ${created} placeholder images.`)
