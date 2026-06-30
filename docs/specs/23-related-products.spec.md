# Spec: Related Products

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Three related product sub-sections at the bottom of the product detail page: same fragrance family, same collection, and frequently bought together — each as a horizontal scroll row of `ProductCard` components.

---

## 2. Visual Design

| Token           | Value                                            |
| --------------- | ------------------------------------------------ |
| Section bg      | `#ffffff`                                        |
| Section heading | Times New Roman bold, 20px, `#000000`            |
| Row layout      | horizontal scroll, `flex gap-4`, hide scrollbar  |
| Card width      | `w-56 flex-shrink-0`                             |

---

## 3. TypeScript Interfaces

Uses `Product` from `src/types/index.ts`. No new interfaces.

---

## 4. Data / Config

Filtering from `products` array:
- **Same fragrance family**: `products.filter(p => p.scentProfile.family === current.scentProfile.family && p.id !== current.id)`
- **Same collection**: `products.filter(p => p.collection === current.collection && p.id !== current.id)`
- **Frequently bought together**: `products.filter(p => current.relatedProductIds.includes(p.id))`

Each row shows max 6 items.

---

## 5. Files to Generate

```
src/
└── components/
    └── product/
        └── RelatedProducts.tsx
```

---

## 6. Behavior

- One component with three named sections.
- Each section only renders if it has at least 1 result.
- Uses `ProductCard` in horizontal scroll.

---

## 7. Acceptance Criteria

- [ ] "Same Fragrance Family" row shows correct filtered products
- [ ] "Same Collection" row shows correct filtered products
- [ ] "Frequently Bought Together" row uses `relatedProductIds`
- [ ] Sections with 0 results are hidden
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/23-related-products.spec.md

Implement:
1. src/components/product/RelatedProducts.tsx

Add to src/app/(shop)/products/[slug]/page.tsx as the last section before Footer.

Verify Section 7 after generating — mark ✅ or ❌
```
