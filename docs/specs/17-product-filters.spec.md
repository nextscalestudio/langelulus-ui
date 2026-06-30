# Spec: Product Filters

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Filter sidebar / drawer for the product listing page. Supports filtering by category, collection, price range, fragrance family (keyword), and sorting. Updates the URL via search params.

---

## 2. Visual Design

| Token            | Value                                             |
| ---------------- | ------------------------------------------------- |
| Desktop layout   | left sidebar 240px wide, sticky `top-20`          |
| Mobile layout    | hidden by default, opens as bottom drawer         |
| Filter heading   | Times New Roman bold, 14px, `#000000` uppercase   |
| Checkbox label   | Times New Roman, 14px, `#000000`                  |
| Active checkbox  | `accent-color: #0000ff`                           |
| Price range      | dual-handle range slider, accent `#0000ff`        |
| Active filter    | blue pill badge with ×                            |
| Clear all link   | `text-accent`, 13px                               |
| Filter button    | mobile only — Button `primary` "Filter (n)"       |

---

## 3. TypeScript Interfaces

```typescript
interface FilterState {
  categories: string[]
  collections: string[]
  priceMin: number
  priceMax: number
  fragranceFamilies: string[]
  sort: SortOption
}
```

---

## 4. Data / Config

Filter options derived dynamically from `products` array:
- Categories: unique `product.category` values
- Collections: unique `product.collection` values (excluding undefined)
- Fragrance families: unique `product.scentProfile.family` values
- Price range: `Math.min/max` of all product prices

---

## 5. Files to Generate

```
src/
└── components/
    └── product/
        ├── ProductFilters.tsx     ← sidebar filter panel
        ├── FilterDrawer.tsx       ← mobile bottom drawer wrapper
        └── ActiveFilters.tsx      ← active filter pills row
```

---

## 6. Behavior

- Filters update URL search params using Next.js `useRouter().push()` — page re-renders with new params.
- "Clear All" resets URL to `/products`.
- Active filter pills appear above the product grid (in `page.tsx`) — clicking × removes that filter from URL.
- Mobile "Filter" button badge shows count of active filters.
- `ProductFilters` is a Client Component (`'use client'`).

---

## 7. Acceptance Criteria

- [ ] Selecting category checkbox adds `?category=X` to URL
- [ ] Selecting collection adds `?collection=X` to URL
- [ ] Price slider updates `?priceMin=X&priceMax=Y` in URL
- [ ] Active filters show as removable pills above the grid
- [ ] "Clear All" resets URL to `/products`
- [ ] Mobile drawer opens/closes correctly
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/17-product-filters.spec.md

Implement all files in Section 5, bottom-up:
1. src/components/product/ActiveFilters.tsx
2. src/components/product/ProductFilters.tsx
3. src/components/product/FilterDrawer.tsx

Then integrate ProductFilters into src/app/(shop)/products/page.tsx as a sidebar, and FilterDrawer for mobile.

Verify Section 7 after generating — mark ✅ or ❌
```
