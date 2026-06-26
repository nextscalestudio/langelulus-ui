# Spec: Product Listing Page

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

The `/products` page displaying all products in a responsive grid. Includes a page header with result count, sorting control, and the ProductCard grid. Filters are added in spec 17.

---

## 2. Visual Design

| Token          | Value                                           |
| -------------- | ----------------------------------------------- |
| Page bg        | `#ffffff`                                       |
| Page pad       | `py-10 px-4`                                    |
| Page heading   | Times New Roman, 36px, `#000000`                |
| Result count   | 14px, `#6b7280` — "Showing X products"          |
| Sort select    | border `1px solid #000`, Times New Roman, 14px  |
| Grid           | 2-col mobile, 3-col tablet, 4-col desktop, gap-6|
| No results     | centered message, `#6b7280`                     |

---

## 3. TypeScript Interfaces

```typescript
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'newest'
```

---

## 4. Data / Config

Reads from `src/data/products.ts`. Supports URL search params:
- `?category=women`
- `?collection=noir`
- `?sort=price-asc`
- `?q=rose` (keyword search)

---

## 5. Files to Generate

```
src/
└── app/
    └── (shop)/
        └── products/
            ├── page.tsx
            └── loading.tsx
```

---

## 6. Behavior

- `page.tsx` is a Server Component that reads `searchParams` for filtering/sorting.
- Filtering runs on the product array (no API call — static data).
- `loading.tsx` renders a grid of `<Skeleton>` cards (same grid layout).
- Exports `generateMetadata()` with title "Products | Parfum".
- Sort options: Default, Price: Low to High, Price: High to Low, Name A–Z, Newest.

---

## 7. Acceptance Criteria

- [ ] Route `/products` renders all products
- [ ] `?category=X` filters to matching category
- [ ] `?collection=X` filters to matching collection
- [ ] `?sort=price-asc` sorts correctly
- [ ] `?q=X` filters by keyword across name, brand, tags, description
- [ ] Result count shows correct number
- [ ] `loading.tsx` shows skeleton grid
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/16-product-listing.spec.md

Implement all files in Section 5, bottom-up:
1. src/app/(shop)/products/loading.tsx
2. src/app/(shop)/products/page.tsx

Verify Section 7 after generating — mark ✅ or ❌
```
