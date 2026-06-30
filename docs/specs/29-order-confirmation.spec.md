# Spec: Order Confirmation Page

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

The `/checkout/confirmation` page shown after a successful order. Displays order ID, summary of items, payment method, recipient details, and next-step instructions.

---

## 2. Visual Design

| Token            | Value                                            |
| ---------------- | ------------------------------------------------ |
| Page bg          | `#ffffff`                                        |
| Success icon     | large checkmark SVG, `#0000ff`, 64px             |
| Heading          | Times New Roman, 32px, `#000000` "Order Placed!" |
| Order ID         | monospace, 14px, `#6b7280`                       |
| Summary box      | border `1px solid #e5e7eb`, pad 24px             |
| Continue btn     | Button `primary` "Continue Shopping" → `/products` |
| Bank transfer box| bg `#f9f9f9` with payment instructions (if method = bank_transfer) |

---

## 3. TypeScript Interfaces

Uses `Order` from `src/types/index.ts`. No new interfaces.

---

## 4. Data / Config

Order data read from `localStorage` by `orderId` from URL query param (`?orderId=xxx`).

---

## 5. Files to Generate

```
src/
└── app/
    └── (shop)/
        └── checkout/
            └── confirmation/
                └── page.tsx
```

---

## 6. Behavior

- Client Component (`'use client'`). Reads `orderId` from `useSearchParams()`.
- Loads order from `localStorage` key `parfum-orders`.
- If order not found: show "Order not found" message + link to home.
- If `paymentMethod === 'bank_transfer'`: show bank details box with transfer instructions.
- Page does not allow browser back to checkout (push `/` on back).

---

## 7. Acceptance Criteria

- [ ] Route `/checkout/confirmation?orderId=X` renders order details
- [ ] Order ID, items, totals, and recipient info all visible
- [ ] Bank transfer instructions shown only for bank_transfer orders
- [ ] "Continue Shopping" links to `/products`
- [ ] Invalid orderId shows fallback message
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/29-order-confirmation.spec.md

Implement:
1. src/app/(shop)/checkout/confirmation/page.tsx

Verify Section 7 after generating — mark ✅ or ❌
```
