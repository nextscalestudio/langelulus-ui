# Spec: Featured Products Section (Homepage)

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Homepage section displaying 4–6 featured products in a responsive grid using the `ProductCard` component.

---

## 2. Visual Design

| Token       | Value                                      |
| ----------- | ------------------------------------------ |
| Section bg  | `#ffffff`                                  |
| Section pad | `py-16 px-4`                               |
| Heading     | Times New Roman, 36px, centered, `#000000` |
| Subheading  | Times New Roman, 16px, centered, `#0000ff` |
| Grid        | 2-col mobile, 4-col desktop, gap-6         |
| View all    | Ghost button linking to `/products`        |

---

## 3. TypeScript Interfaces

Uses `Product` from `src/types/index.ts`. No new interfaces.

---

## 4. Data / Config

Reads from `src/data/products.ts` — filters `products.filter(p => p.isFeatured)`, takes first 6.

---

## 5. Files to Generate

```
src/
└── components/
    └── home/
        └── FeaturedProducts.tsx
```

---

## 6. Behavior

- Filters `isFeatured: true` products from static data.
- Renders `<ProductCard>` for each.
- "View All" button at bottom links to `/products`.

---

## 7. Acceptance Criteria

- [ ] Shows only `isFeatured: true` products (max 6)
- [ ] Grid is 2-column on mobile, 4-column on desktop
- [ ] "View All" links to `/products`
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/09-featured-products.spec.md

Implement:
1. src/components/home/FeaturedProducts.tsx

Then add it to src/app/(shop)/page.tsx after WhyChooseUs.

Verify Section 7 after generating — mark ✅ or ❌
```
