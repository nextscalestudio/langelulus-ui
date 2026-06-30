# Spec: Cart Page

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Full `/cart` page with a detailed product list, quantity update controls, coupon code input, order summary sidebar, and proceed to checkout button.

---

## 2. Visual Design

| Token             | Value                                              |
| ----------------- | -------------------------------------------------- |
| Page layout       | 2-col desktop (items 60% / summary 40%), stacked mobile |
| Page heading      | Times New Roman, 36px, `#000000`                  |
| Item image        | 100×100px, `object-cover`                         |
| Item name         | Times New Roman bold, 16px                        |
| Volume            | Times New Roman, 14px, `#6b7280`                  |
| Price             | Times New Roman bold, `#0000ff`                   |
| Qty controls      | `− N +` row                                       |
| Remove            | trash icon button, hover `text-red-500`           |
| Coupon input      | border `1px solid #000`, Times New Roman           |
| Apply btn         | Button `secondary`                                |
| Coupon success    | green text badge showing code + discount           |
| Summary box       | border `1px solid #e5e7eb`, pad 24px              |
| Summary rows      | Subtotal / Discount / Total                        |
| Checkout btn      | Button `primary`, full width                      |
| Continue shopping | ghost link → `/products`                          |

---

## 3. TypeScript Interfaces

Uses `CartItem`, `Coupon` from `src/types/index.ts`. No new interfaces.

---

## 4. Data / Config

Reads from `useCartStore()`. Validates coupon against `src/data/coupons.ts`.

---

## 5. Files to Generate

```
src/
└── app/
    └── (shop)/
        └── cart/
            ├── page.tsx
            └── loading.tsx
```

---

## 6. Behavior

- `page.tsx` is a Client Component (`'use client'`).
- Coupon flow: user enters code → click "Apply" → validates against `coupons` array → calls `applyCoupon()` or shows error toast.
- Invalid coupon: toast "Invalid or expired coupon code".
- Updating quantity or removing items updates the store in real time.
- Navigating to `/checkout` with an empty cart redirects to `/products`.

---

## 7. Acceptance Criteria

- [ ] Route `/cart` renders all cart items
- [ ] Quantity controls update the store and re-render totals
- [ ] Removing item updates the list immediately
- [ ] Valid coupon code applies discount and shows summary row
- [ ] Invalid coupon shows error toast
- [ ] Total = Subtotal − Discount, formatted in VND
- [ ] Empty cart redirects to `/products`
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/26-cart-page.spec.md

Implement all files in Section 5, bottom-up:
1. src/app/(shop)/cart/loading.tsx
2. src/app/(shop)/cart/page.tsx

Verify Section 7 after generating — mark ✅ or ❌
```
