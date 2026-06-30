# Spec: Lifestyle Gallery Section (Homepage)

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Homepage masonry-style photo gallery showcasing lifestyle images of the brand. Acts as a visual brand statement before the footer.

---

## 2. Visual Design

| Token        | Value                                          |
| ------------ | ---------------------------------------------- |
| Section bg   | `#ffffff`                                      |
| Section pad  | `py-16 px-4`                                   |
| Heading      | Times New Roman, 36px, centered, `#000000`     |
| Grid         | CSS masonry — 3-col desktop, 2-col mobile      |
| Image hover  | slight scale-up `scale-105`, dark overlay fade |
| Overlay text | optional caption, white, centered              |

---

## 3. TypeScript Interfaces

```typescript
interface GalleryImage {
  src: string
  alt: string
  caption?: string
}
```

---

## 4. Data / Config

File: `src/data/gallery.ts` — export `const galleryImages: GalleryImage[]` with 6–9 items (use placeholder paths).

---

## 5. Files to Generate

```
src/
├── data/
│   └── gallery.ts
└── components/
    └── home/
        └── LifestyleGallery.tsx
```

---

## 6. Behavior

- CSS `columns-2 md:columns-3` for masonry layout.
- On image hover: dark overlay fades in with caption text (if present).
- Images use Next.js `<Image>` with `width` and `height` props.

---

## 7. Acceptance Criteria

- [ ] Gallery renders all images from `gallery.ts`
- [ ] Masonry layout applies on desktop (3 columns), mobile (2 columns)
- [ ] Hover overlay shows caption if present
- [ ] Images use Next.js `<Image>`
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/14-lifestyle-gallery.spec.md

Implement:
1. src/data/gallery.ts
2. src/components/home/LifestyleGallery.tsx

Add to src/app/(shop)/page.tsx after FeaturedArticles (before Footer).

Verify Section 7 after generating — mark ✅ or ❌
```
