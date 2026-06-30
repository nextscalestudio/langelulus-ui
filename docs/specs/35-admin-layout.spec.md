# Spec: Admin — Layout + Dashboard

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Protected `/admin` section with a sidebar navigation layout. Dashboard home shows key metric cards (total orders, total products, total customers, revenue) and a recent orders table.

---

## 2. Visual Design

| Token            | Value                                               |
| ---------------- | --------------------------------------------------- |
| Sidebar bg       | `#000000`                                           |
| Sidebar width    | 240px desktop, hidden mobile (hamburger menu)       |
| Sidebar logo     | "PARFUM ADMIN" white, Times New Roman               |
| Nav item         | white 14px, hover `#0000ff`, active = `#0000ff` bg `rgba(0,0,255,0.1)` |
| Content bg       | `#f9f9f9`                                           |
| Metric card      | white bg, border `1px solid #e5e7eb`, shadow-sm     |
| Metric value     | Times New Roman bold 32px, `#0000ff`                |
| Metric label     | 14px `#6b7280`                                      |
| Table header     | bg `#000`, text white, Times New Roman 13px         |
| Table row        | border-b, hover bg `#f0f0f0`                        |

---

## 3. TypeScript Interfaces

```typescript
interface NavItem {
  label: string
  href: string
  icon: string
}
```

---

## 4. Data / Config

Sidebar nav items:
1. Dashboard — `/admin`
2. Products — `/admin/products`
3. Orders — `/admin/orders`
4. Blog — `/admin/blog`
5. Customers — `/admin/customers`
6. Coupons — `/admin/coupons`

Dashboard metrics sourced from `localStorage` (mock): count of orders, products, unique customers.

---

## 5. Files to Generate

```
src/
└── app/
    └── admin/
        ├── layout.tsx          ← admin shell with sidebar
        ├── page.tsx            ← dashboard home
        └── _components/
            └── AdminSidebar.tsx
```

---

## 6. Behavior

- `layout.tsx`: checks session via `auth()` — if no session or `role !== 'admin'`, redirect to `/`.
- `AdminSidebar`: active link highlighted based on current pathname.
- Dashboard `page.tsx`: reads orders/products from localStorage, computes 4 metric values. Shows 5 most recent orders in a table.

---

## 7. Acceptance Criteria

- [ ] `/admin` redirects to `/` if not signed in as admin
- [ ] Sidebar highlights current route
- [ ] Dashboard shows 4 metric cards
- [ ] Recent orders table shows 5 rows
- [ ] Mobile hamburger toggles sidebar visibility
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/35-admin-layout.spec.md

Implement all files in Section 5, bottom-up:
1. src/app/admin/_components/AdminSidebar.tsx
2. src/app/admin/layout.tsx
3. src/app/admin/page.tsx

Verify Section 7 after generating — mark ✅ or ❌
```
