# Spec: Animations

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Site-wide scroll-triggered entrance animations using Framer Motion. Applied to section headings, cards, and hero elements across all public pages.

---

## 2. Visual Design

| Animation       | Trigger        | Effect                                     |
| --------------- | -------------- | ------------------------------------------ |
| Section heading | scroll into view | fade up — `y: 30 → 0`, `opacity: 0 → 1`, 0.5s |
| Cards (grid)    | scroll into view | stagger fade up — each card 0.1s delay     |
| Hero headline   | page load      | fade in — `opacity: 0 → 1`, 0.8s          |
| Promo strip     | page load      | slide down — `y: -20 → 0`, 0.4s           |
| Page transition | route change   | fade — `opacity: 0 → 1`, 0.3s             |

---

## 3. TypeScript Interfaces

No new interfaces needed.

---

## 4. Data / Config

Framer Motion variants (defined in animation utilities):

```typescript
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}
```

---

## 5. Files to Generate

```
src/
└── lib/
    └── animations.ts          ← variant definitions
```

---

## 6. Behavior

- All animations use `viewport={{ once: true }}` so they trigger only once on first scroll.
- Apply to the following existing components (edit each):
  - `HeroSection.tsx` — `fadeIn` on headline and sub-headline
  - `PromoStrip.tsx` — `slideDown` on mount
  - `BrandIntro.tsx`, `WhyChooseUs.tsx` — `fadeUp` on headings, `stagger` on cards
  - `FeaturedProducts.tsx` — `staggerContainer` + `fadeUp` on each `ProductCard`
  - `CollectionsSection.tsx` — stagger on collection cards
  - `Testimonials.tsx` — `fadeUp` on section heading
  - `FeaturedArticles.tsx` — stagger on post cards
  - `ScentStories.tsx` — `fadeUp` on each story block

- Page transition: wrap `{children}` in `src/app/layout.tsx` with a Framer Motion `<AnimatePresence>` + `<motion.div key={pathname}>`.

---

## 7. Acceptance Criteria

- [ ] Section headings animate up on first scroll into view
- [ ] Grid cards stagger in (0.1s between each)
- [ ] Hero headline fades in on page load
- [ ] Animations do not replay on scroll-up (`once: true`)
- [ ] Page transitions fade between routes
- [ ] No layout shift (CLS) from animations
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/43-animations.spec.md

Implement:
1. src/lib/animations.ts

Then apply animations to the components listed in Section 6 — edit each file to wrap elements with motion.* variants.

Add AnimatePresence page transition to src/app/layout.tsx.

Verify Section 7 after generating — mark ✅ or ❌
```
