# Spec: Collections Section (Homepage)

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Homepage section showcasing perfume collections as large visual cards with collection name and a "Explore" CTA. Each card links to the product listing filtered by collection.

---

## 2. Visual Design

| Token         | Value                                             |
| ------------- | ------------------------------------------------- |
| Section bg    | `#000000`                                         |
| Section pad   | `py-16 px-4`                                      |
| Heading       | Times New Roman, 36px, white, centered            |
| Card layout   | 2-col grid, desktop: 3-col                        |
| Card height   | `h-72`                                            |
| Card bg       | collection image with dark overlay                |
| Card title    | Times New Roman, 24px, white, bold                |
| Explore link  | white text with underline, hover `#0000ff`        |

---

## 3. TypeScript Interfaces

```typescript
interface Collection {
  name: string
  slug: string
  description: string
  image: string
}
```

---

## 4. Data / Config

File: `src/data/collections.ts` — export `const collections: Collection[]` with 3–4 items (e.g. "Noir", "Bloom", "Aqua").

---

## 5. Files to Generate

```
src/
├── data/
│   └── collections.ts
└── components/
    └── home/
        └── CollectionsSection.tsx
```

---

## 6. Behavior

- Each card links to `/products?collection=[slug]`.
- Image uses Next.js `<Image>` with `fill` and `object-cover`.

---

## 7. Acceptance Criteria

- [ ] Renders one card per collection from `collections.ts`
- [ ] Each card links to `/products?collection=[slug]`
- [ ] Images use Next.js `<Image>`
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/10-collections.spec.md

Implement:
1. src/data/collections.ts
2. src/components/home/CollectionsSection.tsx

Add to src/app/(shop)/page.tsx after FeaturedProducts.

Verify Section 7 after generating — mark ✅ or ❌
```
