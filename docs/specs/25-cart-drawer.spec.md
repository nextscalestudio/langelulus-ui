# Spec: Cart Drawer

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Slide-in drawer from the right side, triggered by the cart icon in the navbar. Shows cart items with quantity controls, subtotal, and a "Proceed to Checkout" CTA.

---

## 2. Visual Design

| Token            | Value                                             |
| ---------------- | ------------------------------------------------- |
| Drawer width     | `w-full max-w-sm` (384px)                         |
| Drawer position  | fixed right-0, full height, z-50                  |
| Overlay          | dark backdrop `rgba(0,0,0,0.4)`, click to close   |
| Drawer bg        | `#ffffff`                                         |
| Header           | Times New Roman bold 20px, border-b `#e5e7eb`     |
| Item image       | 80×80px, `object-cover`, border `1px solid #e5e7eb` |
| Item name        | Times New Roman, 14px, `#000000`                  |
| Item price       | Times New Roman bold, 14px, `#0000ff`             |
| Qty controls     | `− N +` row, 28px buttons                         |
| Remove btn       | `×` icon, `text-gray-400` hover `text-red-500`    |
| Subtotal row     | bold, border-t `#e5e7eb`, Times New Roman 16px    |
| Checkout btn     | Button `primary`, full width                      |

---

## 3. TypeScript Interfaces

Uses `CartItem` from `src/types/index.ts`. No new interfaces.

---

## 4. Data / Config

Reads from `useCartStore()` for items, subtotal.

---

## 5. Files to Generate

```
src/
└── components/
    └── cart/
        ├── CartDrawer.tsx
        └── CartDrawerItem.tsx
```

---

## 6. Behavior

- Drawer open/close state lives in a Zustand `useUIStore()` (create a minimal UI store with `isCartOpen: boolean`, `openCart()`, `closeCart()`).
- Cart icon in Navbar calls `openCart()`.
- Overlay click and `Escape` key call `closeCart()`.
- Quantity `+` / `−` call `updateQuantity()`. At 0, item is removed.
- "Proceed to Checkout" navigates to `/checkout` and closes drawer.
- Empty state: centered message "Your cart is empty" + "Continue Shopping" link to `/products`.

---

## 7. Acceptance Criteria

- [ ] Drawer slides in from right on cart icon click
- [ ] Backdrop closes drawer on click
- [ ] `Escape` key closes drawer
- [ ] Quantity changes persist in cart store
- [ ] Item removed when quantity reaches 0
- [ ] Subtotal renders in VND format
- [ ] Empty state shown when cart is empty
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/25-cart-drawer.spec.md

Implement all files in Section 5, bottom-up:
1. Create src/lib/store/ui-store.ts (isCartOpen, openCart, closeCart)
2. src/components/cart/CartDrawerItem.tsx
3. src/components/cart/CartDrawer.tsx

Wire CartDrawer into src/app/layout.tsx (render at root level).
Wire openCart() into src/components/layout/CartIconButton.tsx.

Verify Section 7 after generating — mark ✅ or ❌
```
