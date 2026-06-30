# Spec: Product Detail — Main Area

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

The top section of `/products/[slug]`: image gallery, product name, short description, price, volume selector, quantity picker, Add to Cart button, Buy Now button, and Wishlist toggle.

---

## 2. Visual Design

| Token             | Value                                              |
| ----------------- | -------------------------------------------------- |
| Layout            | 2-col desktop (gallery left, info right), stacked mobile |
| Gallery main img  | `aspect-square`, `object-cover`, border `1px solid #e5e7eb` |
| Thumbnails        | row of 4 small squares below main, active = blue border |
| Product name      | Times New Roman, 32px, `#000000`                   |
| Price             | Times New Roman bold, 28px, `#0000ff`              |
| Volume btn        | border `1px solid #000`, selected = bg `#000` text white |
| Qty buttons       | `− qty +` row, border `1px solid #000`             |
| Add to Cart btn   | Button `primary`, full width                       |
| Buy Now btn       | Button `secondary`, full width                     |
| Wishlist btn      | heart icon toggle, filled = `#0000ff`              |

---

## 3. TypeScript Interfaces

Uses `Product`, `CartItem` from `src/types/index.ts`. No new interfaces.

---

## 4. Data / Config

Data fetched via `getProductBySlug(slug)` from `src/data/products.ts`.

---

## 5. Files to Generate

```
src/
├── app/
│   └── (shop)/
│       └── products/
│           └── [slug]/
│               ├── page.tsx         ← Server Component, fetches product
│               └── loading.tsx      ← skeleton layout
└── components/
    └── product/
        ├── ProductGallery.tsx       ← image gallery with thumbnails
        └── ProductInfo.tsx          ← price, volume, qty, CTA buttons
```

---

## 6. Behavior

- `page.tsx` is a Server Component. Calls `getProductBySlug(params.slug)`. Returns 404 (`notFound()`) if not found.
- Exports `generateMetadata({ params })` using product name + brand.
- `ProductGallery`: clicking thumbnail swaps main image. Main image supports zoom on hover.
- `ProductInfo` is a Client Component (`'use client'`): manages selected volume state and quantity state.
- "Add to Cart": calls cart store `addItem()` (TODO placeholder until spec 24), shows toast.
- "Buy Now": calls `addItem()` then navigates to `/checkout`.
- Wishlist: toggled in `localStorage` (no backend).

---

## 7. Acceptance Criteria

- [ ] Route `/products/[slug]` renders correct product
- [ ] Non-existent slug returns 404
- [ ] `generateMetadata` sets title to "[Product Name] | Parfum"
- [ ] Thumbnail click swaps main image
- [ ] Volume selection highlights selected volume button
- [ ] Quantity cannot go below 1
- [ ] "Buy Now" navigates to `/checkout` after adding to cart
- [ ] Wishlist toggle persists in `localStorage`
- [ ] `loading.tsx` renders skeleton layout
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/18-product-detail-main.spec.md

Implement all files in Section 5, bottom-up:
1. src/components/product/ProductGallery.tsx
2. src/components/product/ProductInfo.tsx
3. src/app/(shop)/products/[slug]/loading.tsx
4. src/app/(shop)/products/[slug]/page.tsx

Note: cart store addItem() does not exist yet — use TODO placeholder. Wire it in spec 24.

Verify Section 7 after generating — mark ✅ or ❌
```
