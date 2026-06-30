# Spec: Admin — Products CRUD

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

`/admin/products` page: paginated data table of all products with search, add/edit/delete actions. Add/edit uses a slide-in drawer form.

---

## 2. Visual Design

| Token          | Value                                               |
| -------------- | --------------------------------------------------- |
| Page heading   | "Products" Times New Roman 28px                     |
| Add button     | Button `primary` "Add Product" — top right          |
| Search input   | border `1px solid #000`, 240px wide                 |
| Table          | full-width, striped rows, border                    |
| Thumbnail col  | 48×48px image                                       |
| Actions col    | "Edit" (blue link) | "Delete" (red link)            |
| Delete confirm | window.confirm() before deletion                    |
| Drawer         | right-side 480px, full form for add/edit            |

---

## 3. TypeScript Interfaces

Uses `Product` from `src/types/index.ts`. No new interfaces.

---

## 4. Data / Config

Products persisted in `localStorage` key `admin-products`. Initialized from `src/data/products.ts` on first load if key is empty.

---

## 5. Files to Generate

```
src/
└── app/
    └── admin/
        └── products/
            ├── page.tsx
            └── _components/
                ├── ProductsTable.tsx
                └── ProductFormDrawer.tsx
```

---

## 6. Behavior

- Table: 10 rows per page, pagination controls at bottom.
- Search filters by product name in real time.
- "Add Product" opens `ProductFormDrawer` with empty form.
- "Edit" opens drawer pre-filled with product data.
- "Delete" calls `window.confirm()`, removes from localStorage array, refreshes table.
- Form covers: name, brand, price, category, collection, volume options, inStock toggle, description, images (URL inputs).
- On save: validates required fields → upserts in localStorage → closes drawer → shows toast.

---

## 7. Acceptance Criteria

- [ ] Table shows all products with pagination
- [ ] Search filters products by name in real time
- [ ] "Add" opens empty form drawer
- [ ] "Edit" opens pre-filled form
- [ ] Saving updates the table immediately
- [ ] "Delete" requires confirmation and removes row
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/36-admin-products.spec.md

Implement all files in Section 5, bottom-up:
1. src/app/admin/products/_components/ProductFormDrawer.tsx
2. src/app/admin/products/_components/ProductsTable.tsx
3. src/app/admin/products/page.tsx

Verify Section 7 after generating — mark ✅ or ❌
```
