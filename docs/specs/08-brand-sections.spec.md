# Spec: Brand Intro + Why Choose Us

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Two homepage sections: a brand introduction block (logo, tagline, short brand story) and a "Why Choose Us" grid of 4 reason cards with icons.

---

## 2. Visual Design

| Token              | Value                                               |
| ------------------ | --------------------------------------------------- |
| Brand intro bg     | `#ffffff`                                           |
| Brand intro layout | 2-col on desktop (image left, text right), stacked mobile |
| Tagline font       | Times New Roman italic, 28px, `#0000ff`             |
| Body text          | Times New Roman, 16px, `#000000`, line-height 1.8  |
| Why choose bg      | `#000000`                                           |
| Card icon          | `#0000ff`, 40px                                     |
| Card title         | Times New Roman, white, 18px bold                   |
| Card body          | Times New Roman, white, 14px, opacity 80%           |
| Grid               | 4 cards, 2-col mobile, 4-col desktop                |

---

## 3. TypeScript Interfaces

```typescript
interface ReasonCard {
  icon: string        // SVG path or emoji
  title: string
  description: string
}
```

---

## 4. Data / Config

Reason cards (hardcoded in component):
1. "Authentic Fragrances" — 100% genuine, imported directly
2. "Free Shipping" — on orders over 500.000 ₫
3. "Easy Returns" — 7-day return policy
4. "Expert Advice" — personal scent consultation

---

## 5. Files to Generate

```
src/
└── components/
    └── home/
        ├── BrandIntro.tsx
        └── WhyChooseUs.tsx
```

---

## 6. Behavior

- Both components are purely presentational — no interactivity.
- Import and render both in `src/app/(shop)/page.tsx` after `HeroSection`.

---

## 7. Acceptance Criteria

- [ ] Brand intro is 2-column on desktop, single-column on mobile
- [ ] "Why Choose Us" shows 4 cards on a black background
- [ ] All text uses Times New Roman
- [ ] Responsive layout verified at 375px and 1280px
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/08-brand-sections.spec.md

Implement all files in Section 5:
1. src/components/home/BrandIntro.tsx
2. src/components/home/WhyChooseUs.tsx

Then add both to src/app/(shop)/page.tsx after HeroSection.

Verify Section 7 after generating — mark ✅ or ❌
```
