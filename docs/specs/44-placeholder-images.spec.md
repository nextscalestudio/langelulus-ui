# Spec: Branded Placeholder Images

**Project:** Perfume Shop (L'ANGELULUS brand)
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Missing asset audit

---

## 1. Overview

22 image paths are referenced in the codebase but missing from `public/images/`.
This spec generates branded gradient PNG placeholders for every missing asset so no
`<Image>` component ever falls back to alt-text in the running app.

It also fixes broken `productSlug` references in `src/data/scent-stories.ts`
which still point to discontinued placeholder products.

---

## 2. Missing Images

| Path | Dimensions | Palette (top → bottom) |
|------|-----------|------------------------|
| `/images/hero-bg.jpg` | 1200 × 675 | `#000000` → `#0d0d1a` |
| `/images/about/hero.jpg` | 1200 × 500 | `#0a0a0a` → `#1a1a2e` |
| `/images/brand-intro.jpg` | 800 × 800 | `#ffffff` → `#f0ebe3` |
| `/images/stories/noir-obsidian.jpg` | 800 × 800 | `#0a0a0a` → `#1a1213` |
| `/images/stories/bloom-celeste.jpg` | 800 × 800 | `#fff8f5` → `#f5e0d8` |
| `/images/stories/aqua-meridian.jpg` | 800 × 800 | `#eef8ff` → `#c0dcf0` |
| `/images/gallery/lifestyle-01.jpg` | 800 × 800 | `#f8f8f8` → `#e8e8e8` |
| `/images/gallery/lifestyle-02.jpg` | 800 × 800 | `#fdf5ee` → `#f0e0cc` |
| `/images/gallery/lifestyle-03.jpg` | 800 × 800 | `#f0f5f8` → `#d8e8f0` |
| `/images/gallery/lifestyle-04.jpg` | 800 × 800 | `#111111` → `#222222` |
| `/images/gallery/lifestyle-05.jpg` | 800 × 800 | `#0a1a0a` → `#1a2e1a` |
| `/images/gallery/lifestyle-06.jpg` | 800 × 800 | `#fff8f0` → `#f0e0cc` |
| `/images/gallery/lifestyle-07.jpg` | 800 × 800 | `#0a0a10` → `#1a1a28` |
| `/images/gallery/lifestyle-08.jpg` | 800 × 800 | `#f5f5f5` → `#e5e5e5` |
| `/images/gallery/lifestyle-09.jpg` | 800 × 800 | `#f8f0f8` → `#e8d8e8` |
| `/images/collections/noir.jpg` | 600 × 450 | `#0a0a0a` → `#1e1e1e` |
| `/images/collections/bloom.jpg` | 600 × 450 | `#fff5f5` → `#f5d8d8` |
| `/images/collections/aqua.jpg` | 600 × 450 | `#eef8ff` → `#b8d8f0` |
| `/images/collections/velvet.jpg` | 600 × 450 | `#1a0a2e` → `#2d1442` |
| `/images/blog/signature-scent.jpg` | 800 × 450 | `#f8f8f8` → `#e8e8e8` |
| `/images/blog/concentration-guide.jpg` | 800 × 450 | `#f5f8f5` → `#e0e8e0` |
| `/images/blog/fragrance-layering.jpg` | 800 × 450 | `#fff8f0` → `#f0e0c8` |
| `/images/blog/fragrance-storage.jpg` | 800 × 450 | `#f8f5f8` → `#e8d8e8` |

---

## 3. Scent Stories Fix

`src/data/scent-stories.ts` references discontinued product slugs. Update:

| Story | Old `productSlug` | New `productSlug` |
|-------|-------------------|-------------------|
| The Obsidian Night | `noir-obsidian` | `midnight-bamboo` |
| Where Flowers Dare | `bloom-celeste` | `honey-jasmine` |
| The Open Sea | `aqua-meridian` | `blue-horizon` |

---

## 4. Implementation

- Generate valid PNG files at every `.jpg` path listed above using pure Node.js
  (`zlib.deflateSync` for IDAT, manual CRC-32). PNG content in a `.jpg` file is
  decoded correctly by Next.js image optimisation (sharp reads magic bytes, not
  the extension).
- Generation script lives in `scripts/gen-placeholders.mjs` (committed so it
  can be re-run if assets are accidentally deleted).

---

## 5. Acceptance Criteria

- [ ] All 22 image files exist in `public/images/` at the paths listed in Section 2
- [ ] No page shows alt-text in place of an image in `npm run dev`
- [ ] `scent-stories.ts` `productSlug` fields match real product slugs
- [ ] `tsc --noEmit` passes with zero errors
