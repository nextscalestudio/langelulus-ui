# Spec: Checkout — Recipient Form

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Step 1 of checkout: a form collecting recipient information (name, phone, email, address, city, district, ward, note). Uses controlled form with client-side validation.

---

## 2. Visual Design

| Token          | Value                                             |
| -------------- | ------------------------------------------------- |
| Page layout    | 2-col desktop (form 60% / order summary 40%)      |
| Form heading   | Times New Roman, 24px, `#000000` "Recipient Info" |
| Label          | Times New Roman, 14px, `#000000` bold             |
| Input          | border `1px solid #000`, h-10, pad `px-3`, full width |
| Focus ring     | `outline: 2px solid #0000ff`                      |
| Error text     | 12px, `#ef4444` below field                       |
| Required mark  | `*` in `#ef4444`                                  |
| Continue btn   | Button `primary`, full width                      |
| Back link      | ghost link → `/cart`                              |

---

## 3. TypeScript Interfaces

Uses `RecipientInfo` from `src/types/index.ts`.

---

## 4. Data / Config

City/District/Ward: static dropdown arrays (include 5 major cities, placeholder districts/wards). ⚠️ A full GHN/GHTK address API integration is out of scope here — use static lists.

---

## 5. Files to Generate

```
src/
├── app/
│   └── (shop)/
│       └── checkout/
│           └── page.tsx           ← stepper shell (Step 1: Form, Step 2: Payment)
└── components/
    └── checkout/
        ├── RecipientForm.tsx
        └── CheckoutSummary.tsx    ← read-only order summary sidebar
```

---

## 6. Behavior

- `page.tsx` manages checkout step state (`'form' | 'payment'`).
- Step 1 renders `RecipientForm` + `CheckoutSummary`.
- On form submit: validate all required fields → if valid, advance to step 2 (payment).
- `CheckoutSummary`: read-only list of cart items, subtotal, discount, total. Not editable.
- Form state passed via React state (not URL params).

Validation rules:
- Full name: required, min 2 chars
- Phone: required, Vietnamese format (10 digits starting with 0)
- Email: required, valid format
- Address: required
- City, District, Ward: required

---

## 7. Acceptance Criteria

- [ ] All required fields validated before advancing
- [ ] Phone validates Vietnamese 10-digit format
- [ ] Email validates format
- [ ] Error messages appear below each invalid field
- [ ] `CheckoutSummary` shows correct totals
- [ ] "Back" link returns to `/cart`
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/27-checkout-form.spec.md

Implement all files in Section 5, bottom-up:
1. src/components/checkout/CheckoutSummary.tsx
2. src/components/checkout/RecipientForm.tsx
3. src/app/(shop)/checkout/page.tsx

Verify Section 7 after generating — mark ✅ or ❌
```
