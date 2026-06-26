# Spec: Admin — Customers + Coupons

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Two admin sub-pages: `/admin/customers` (read-only list of unique customers from orders) and `/admin/coupons` (CRUD for discount coupons).

---

## 2. Visual Design

| Token          | Value                                              |
| -------------- | -------------------------------------------------- |
| Customers cols | Name | Email | Orders | Total Spent | Last Order |
| Coupon cols    | Code | Type | Value | Min Order | Expires | Actions |
| Discount badge | % or ₫ suffix on value                            |
| Expired badge  | red pill                                           |
| Active badge   | green pill                                         |

---

## 3. TypeScript Interfaces

Uses `Coupon`, `Order` from `src/types/index.ts`.

```typescript
interface CustomerSummary {
  email: string
  name: string
  orderCount: number
  totalSpent: number
  lastOrderDate: string
}
```

---

## 4. Data / Config

Customers: derived from `localStorage` key `parfum-orders` — group by `recipient.email`.

Coupons: persisted in `localStorage` key `admin-coupons`. Initialized from `src/data/coupons.ts`.

---

## 5. Files to Generate

```
src/
└── app/
    └── admin/
        ├── customers/
        │   └── page.tsx
        └── coupons/
            ├── page.tsx
            └── _components/
                └── CouponFormDrawer.tsx
```

---

## 6. Behavior

**Customers page:**
- Read-only table. No add/edit/delete.
- Search by name or email.
- `totalSpent` formatted in VND.

**Coupons page:**
- CRUD with drawer form.
- Form: code (uppercase enforced), discountType, discountValue, minOrderValue (optional), expiresAt (optional date input).
- "Expired" badge shown if `expiresAt < now`.
- Delete requires `window.confirm()`.

---

## 7. Acceptance Criteria

- [ ] `/admin/customers` shows unique customers derived from orders
- [ ] Customer search filters by name and email
- [ ] `/admin/coupons` shows all coupons from localStorage
- [ ] Add coupon form enforces uppercase code
- [ ] Expired coupons show red badge
- [ ] Coupon delete requires confirmation
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/39-admin-customers.spec.md

Implement all files in Section 5, bottom-up:
1. src/app/admin/customers/page.tsx
2. src/app/admin/coupons/_components/CouponFormDrawer.tsx
3. src/app/admin/coupons/page.tsx

Verify Section 7 after generating — mark ✅ or ❌
```
