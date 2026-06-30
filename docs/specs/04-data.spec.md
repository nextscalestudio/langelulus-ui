# Spec: Product + Blog Types & Static Data

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Create the static data layer: sample product and blog post records that power every page until a CMS or database is confirmed.

---

## 2. Visual Design

No UI — data-only spec.

---

## 3. TypeScript Interfaces

All interfaces already defined in `src/types/index.ts` (spec 01). No new types needed.

---

## 4. Data / Config

File: `src/data/products.ts` — export an array of at least 8 `Product` objects covering:
- At least 2 collections (e.g. "Noir", "Bloom")
- At least 2 categories (e.g. "Women", "Men", "Unisex")
- Mix of `isFeatured: true` and `false`
- All `ProductSpecs`, `ScentProfile`, `UsageGuide` fields populated
- Prices in VND (e.g. 1_200_000, 2_500_000)

File: `src/data/blog-posts.ts` — export an array of at least 4 `BlogPost` objects:
- At least 2 categories (e.g. "Fragrance Guide", "Lifestyle")
- `content` field: 3–4 paragraphs of placeholder text

File: `src/data/reviews.ts` — export a `Review[]` with 2–3 reviews per product.

File: `src/data/coupons.ts` — export a `Coupon[]` with 2 sample coupons.

---

## 5. Files to Generate

```
src/
└── data/
    ├── products.ts
    ├── blog-posts.ts
    ├── reviews.ts
    └── coupons.ts
```

---

## 6. Behavior

- `products.ts` exports: `const products: Product[]` and `export default products`
- Also export helper: `export function getProductBySlug(slug: string): Product | undefined`
- `blog-posts.ts` exports: `const blogPosts: BlogPost[]` and `export default blogPosts`
- Also export: `export function getPostBySlug(slug: string): BlogPost | undefined`
- `reviews.ts` exports: `export function getReviewsByProductId(id: string): Review[]`

---

## 7. Acceptance Criteria

- [ ] `tsc --noEmit` passes with zero errors
- [ ] `products` array has ≥ 8 items, all fields populated (no `undefined` on required fields)
- [ ] `blogPosts` array has ≥ 4 items
- [ ] `getProductBySlug` returns the correct product or `undefined`
- [ ] `getPostBySlug` returns the correct post or `undefined`
- [ ] `getReviewsByProductId` returns only reviews for that product

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/04-data.spec.md

Implement all files in Section 5, bottom-up:
1. src/data/coupons.ts
2. src/data/reviews.ts
3. src/data/blog-posts.ts
4. src/data/products.ts

Verify Section 7 after generating — mark ✅ or ❌
```
