# Spec: ProductCard Component

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Reusable product card used on the homepage featured section, product listing page, and related products. Displays image, name, price, rating, and an "Add to Cart" button.

---

## 2. Visual Design

| Token            | Value                                         |
| ---------------- | --------------------------------------------- |
| Card bg          | `#ffffff`                                     |
| Card border      | `1px solid #e5e7eb` (light gray)              |
| Hover shadow     | `shadow-md` with slight y-translate           |
| Product name     | Times New Roman, 16px, `#000000`              |
| Price            | Times New Roman, bold, `#0000ff`              |
| Rating stars     | filled `#0000ff`, empty `#e5e7eb`             |
| Add to Cart btn  | Button `primary` from spec 05                 |
| Image aspect     | `aspect-square`, `object-cover`               |

---

## 3. TypeScript Interfaces

Uses `Product` from `src/types/index.ts`. No new interfaces.

---

## 4. Data / Config

No static data. Receives `product: Product` prop.

---

## 5. Files to Generate

```
src/
└── components/
    └── product/
        ├── ProductCard.tsx
        └── StarRating.tsx
```

---

## 6. Behavior

- Card is a Next.js `<Link>` to `/products/[slug]` — the entire card is clickable.
- "Add to Cart" button: `stopPropagation` on click (prevents navigation), calls cart store `addItem()` (wired in spec 24), shows toast "Added to cart".
- Price formatted with `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })`.
- `StarRating`: renders 5 stars, fills based on `rating` prop (supports half-stars via CSS clip).
- If `!product.inStock`: button is disabled, badge "Out of Stock" overlays the image.

---

## 7. Acceptance Criteria

- [ ] Card links to `/products/[slug]`
- [ ] Price renders as VND format (e.g. `1.200.000 ₫`)
- [ ] "Add to Cart" click does not navigate
- [ ] Out-of-stock products show badge and disabled button
- [ ] `StarRating` reflects the `rating` value accurately
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/06-product-card.spec.md

Implement all files in Section 5, bottom-up:
1. src/components/product/StarRating.tsx
2. src/components/product/ProductCard.tsx

Note: cart store (addItem) does not exist yet — use a TODO comment placeholder for the cart call. Wire it in spec 24.

Verify Section 7 after generating — mark ✅ or ❌
```
