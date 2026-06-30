# Spec: Checkout — Payment Selection + Order Submission

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Step 2 of checkout: payment method selection (COD or bank transfer with account details), order summary review, and final "Place Order" button that submits the order.

---

## 2. Visual Design

| Token              | Value                                               |
| ------------------ | --------------------------------------------------- |
| Step heading       | Times New Roman 24px, `#000000` "Payment Method"    |
| Method card        | border `1px solid #e5e7eb`, selected = `border-accent` bg `rgba(0,0,255,0.03)` |
| Radio indicator    | custom circle, filled `#0000ff` when selected       |
| COD icon           | truck SVG, `#0000ff`                                |
| Bank transfer info | box bg `#f9f9f9`, monospace bank account details    |
| Place Order btn    | Button `primary`, full width                        |
| Back btn           | ghost Button "← Back to Info"                       |
| Loading state      | spinner on button, disabled during submission       |

---

## 3. TypeScript Interfaces

Uses `Order`, `RecipientInfo`, `CartItem` from `src/types/index.ts`.

---

## 4. Data / Config

Bank transfer details (hardcoded — ⚠️ replace with real account):
- Bank: Vietcombank
- Account number: 1234567890
- Account name: PARFUM CO. LTD
- Branch: Ho Chi Minh City

---

## 5. Files to Generate

```
src/
├── components/
│   └── checkout/
│       └── PaymentSelector.tsx
└── app/
    └── api/
        └── orders/
            └── route.ts           ← POST handler, saves order to localStorage (mock)
```

---

## 6. Behavior

- Defaults to COD selected.
- When "Bank Transfer" selected: shows bank account detail box with "Copy account number" button.
- "Place Order" click: POST to `/api/orders` with `Order` payload.
- API route saves order to `localStorage` key `parfum-orders` (⚠️ mock — no real DB).
- On success: clear cart, navigate to `/checkout/confirmation?orderId=[id]`.
- On error: show error toast "Order failed. Please try again."

---

## 7. Acceptance Criteria

- [ ] COD and bank transfer are selectable; only one active at a time
- [ ] Bank details box shows only when "Bank Transfer" selected
- [ ] "Copy account number" copies to clipboard and shows toast "Copied!"
- [ ] "Place Order" button shows spinner and disables during submission
- [ ] On success: cart is cleared and user navigates to confirmation page
- [ ] Error state shows toast
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/28-checkout-payment.spec.md

Implement all files in Section 5, bottom-up:
1. src/app/api/orders/route.ts
2. src/components/checkout/PaymentSelector.tsx

Wire PaymentSelector into src/app/(shop)/checkout/page.tsx as Step 2.

Verify Section 7 after generating — mark ✅ or ❌
```
