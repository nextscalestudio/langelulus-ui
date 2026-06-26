# Spec: Customer Testimonials Section (Homepage)

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Homepage social proof section displaying 3–5 customer quotes in a horizontal scroll carousel with star ratings and avatar.

---

## 2. Visual Design

| Token          | Value                                          |
| -------------- | ---------------------------------------------- |
| Section bg     | `#000000`                                      |
| Section pad    | `py-16 px-4`                                   |
| Heading        | Times New Roman, 36px, white, centered         |
| Card bg        | `rgba(255,255,255,0.05)` border `1px solid rgba(255,255,255,0.1)` |
| Quote text     | Times New Roman italic, 16px, white            |
| Author name    | Times New Roman bold, 14px, `#0000ff`          |
| Stars          | `#0000ff`                                      |
| Carousel       | horizontal scroll, snap-x, hide scrollbar      |

---

## 3. TypeScript Interfaces

```typescript
interface Testimonial {
  id: string
  author: string
  avatar?: string
  rating: number
  quote: string
  product: string     // product name they bought
}
```

---

## 4. Data / Config

File: `src/data/testimonials.ts` — export `const testimonials: Testimonial[]` with 5 items.

---

## 5. Files to Generate

```
src/
├── data/
│   └── testimonials.ts
└── components/
    └── home/
        └── Testimonials.tsx
```

---

## 6. Behavior

- Carousel uses CSS `scroll-snap-type: x mandatory` — no JS carousel library.
- Navigation dots shown below (dot = active card).

---

## 7. Acceptance Criteria

- [ ] 5 testimonial cards rendered
- [ ] Carousel snaps to each card on scroll
- [ ] Active dot updates on scroll
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/12-testimonials.spec.md

Implement:
1. src/data/testimonials.ts
2. src/components/home/Testimonials.tsx

Add to src/app/(shop)/page.tsx after ScentStories.

Verify Section 7 after generating — mark ✅ or ❌
```
