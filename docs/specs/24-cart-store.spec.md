# Spec: Cart — Zustand Store

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Client-side cart state using Zustand with `persist` middleware (localStorage). Provides `addItem`, `removeItem`, `updateQuantity`, `clearCart`, and coupon helpers used by ProductCard, CartDrawer, CartPage, and Checkout.

---

## 2. Visual Design

No UI — store-only spec.

---

## 3. TypeScript Interfaces

Uses `CartItem`, `Product`, `Coupon` from `src/types/index.ts`.

```typescript
interface CartStore {
  items: CartItem[]
  coupon: Coupon | null
  addItem: (product: Product, volume: string, quantity?: number) => void
  removeItem: (productId: string, volume: string) => void
  updateQuantity: (productId: string, volume: string, quantity: number) => void
  clearCart: () => void
  applyCoupon: (coupon: Coupon) => void
  removeCoupon: () => void
  // Computed (as selectors, not state)
  // itemCount, subtotal, discount, total computed outside store
}
```

---

## 4. Data / Config

Persistence key: `parfum-cart`. Coupon validation against `src/data/coupons.ts`.

Computed helpers (exported pure functions, not Zustand state):
```typescript
export function getItemCount(items: CartItem[]): number
export function getSubtotal(items: CartItem[]): number
export function getDiscount(subtotal: number, coupon: Coupon | null): number
export function getTotal(subtotal: number, discount: number): number
```

---

## 5. Files to Generate

```
src/
└── lib/
    └── store/
        ├── cart-store.ts       ← Zustand store
        └── cart-helpers.ts     ← pure computed helpers
```

---

## 6. Behavior

- `addItem`: if item with same `productId + volume` exists, increment quantity. Otherwise push new CartItem.
- `updateQuantity`: if quantity ≤ 0, remove item.
- `persist` middleware saves `items` and `coupon` to localStorage.
- After creating the store, wire it into `ProductCard` and `ProductInfo` (replace TODO placeholders from specs 06, 18).

---

## 7. Acceptance Criteria

- [ ] `addItem` increments quantity for duplicate product+volume
- [ ] `removeItem` removes correct item by productId + volume
- [ ] `updateQuantity(id, vol, 0)` removes the item
- [ ] Cart persists after page refresh (localStorage)
- [ ] `getSubtotal` returns sum of `item.product.price * item.quantity`
- [ ] `getDiscount` applies percentage or fixed coupon correctly
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/24-cart-store.spec.md

Implement all files in Section 5, bottom-up:
1. src/lib/store/cart-helpers.ts
2. src/lib/store/cart-store.ts

Then wire the store into:
- src/components/product/ProductCard.tsx (replace addItem TODO)
- src/components/product/ProductInfo.tsx (replace addItem TODO)

Also wire item count badge in src/components/layout/CartIconButton.tsx.

Verify Section 7 after generating — mark ✅ or ❌
```
