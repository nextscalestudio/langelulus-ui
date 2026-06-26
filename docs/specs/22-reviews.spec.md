# Spec: Customer Reviews

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Customer review section on the product detail page: overall star rating summary, list of individual reviews with optional photos, and a "Write a Review" form (saves to localStorage for now).

---

## 2. Visual Design

| Token            | Value                                            |
| ---------------- | ------------------------------------------------ |
| Section heading  | Times New Roman, 24px, `#000000`                 |
| Rating summary   | large star score (48px), count text `#6b7280`    |
| Rating bar       | rating distribution bars, blue fill              |
| Review card      | white bg, border-b `1px solid #e5e7eb`, pad `py-4` |
| Author name      | Times New Roman bold, 14px, `#000000`            |
| Date             | Times New Roman, 12px, `#6b7280`                 |
| Comment          | Times New Roman, 15px, `#000000`, line-height 1.7|
| Photo thumbnails | row of 60×60px images, lightbox on click         |
| Write form       | shown on "Write a Review" button click, in Modal |

---

## 3. TypeScript Interfaces

Uses `Review` from `src/types/index.ts`. New:

```typescript
interface NewReviewForm {
  author: string
  rating: number
  comment: string
}
```

---

## 4. Data / Config

Reads from `getReviewsByProductId(product.id)` in `src/data/reviews.ts`. Also checks `localStorage` for user-submitted reviews and merges.

---

## 5. Files to Generate

```
src/
└── components/
    └── product/
        ├── ReviewSection.tsx       ← container with summary + list
        ├── ReviewCard.tsx          ← single review display
        └── ReviewForm.tsx          ← write a review modal form
```

---

## 6. Behavior

- "Write a Review" opens `ReviewForm` in a `<Modal>`.
- On submit: saves review to `localStorage` key `reviews-[productId]`, merges into displayed list, shows toast "Review submitted!".
- Star rating in form: interactive (click to set), 1–5.
- Photos field: optional file input, previews thumbnails inline (stored as base64 in localStorage — ⚠️ not production-ready).
- Rating summary shows distribution bars (5★: N, 4★: N, ...).

---

## 7. Acceptance Criteria

- [ ] Reviews from `getReviewsByProductId` are displayed
- [ ] Overall star rating and distribution bars render correctly
- [ ] "Write a Review" opens Modal
- [ ] Submitted review appears in list after form submission
- [ ] Toast "Review submitted!" shown on save
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/22-reviews.spec.md

Implement all files in Section 5, bottom-up:
1. src/components/product/ReviewCard.tsx
2. src/components/product/ReviewForm.tsx
3. src/components/product/ReviewSection.tsx

Add ReviewSection to src/app/(shop)/products/[slug]/page.tsx below ProductPolicies.

Verify Section 7 after generating — mark ✅ or ❌
```
