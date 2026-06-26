# Spec: Hero + Promo Strip

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Full-width homepage hero section with brand background image/video, headline, sub-headline, and CTA button. Below it, a slim promotional strip announcing current discount codes.

---

## 2. Visual Design

| Token           | Value                                                    |
| --------------- | -------------------------------------------------------- |
| Hero height     | `min-h-[80vh]`                                           |
| Hero bg         | dark overlay `rgba(0,0,0,0.4)` over background image     |
| Headline        | Times New Roman, 64px desktop / 36px mobile, white       |
| Sub-headline    | Times New Roman, 20px, white, opacity 80%                |
| CTA button      | Button `primary` from spec 05 — "Shop Now"               |
| Promo strip bg  | `#0000ff`                                                |
| Promo strip text| white, Times New Roman, 14px, centered                   |
| Promo strip h   | 44px                                                     |

---

## 3. TypeScript Interfaces

```typescript
interface PromoItem {
  message: string
  code?: string
}
```

---

## 4. Data / Config

File: `src/data/promos.ts` — export `const promos: PromoItem[]` with 2–3 rotating promo messages.

Hero content (hardcoded in component):
- Headline: "Discover Your Signature Scent"
- Sub-headline: "Luxury perfumes crafted for those who dare to be unforgettable"
- CTA: "Shop Now" → `/products`

---

## 5. Files to Generate

```
src/
├── data/
│   └── promos.ts
└── components/
    └── home/
        ├── HeroSection.tsx
        └── PromoStrip.tsx
```

---

## 6. Behavior

- `HeroSection`: uses Next.js `<Image>` with `fill` and `priority` for the background. Overlay sits above. Content centered vertically.
- `PromoStrip`: cycles through `promos` array every 4 seconds using `useEffect` + `setInterval`. Fades between messages.
- Promo strip appears above the hero (below the navbar).

---

## 7. Acceptance Criteria

- [ ] Hero occupies at least 80vh on desktop
- [ ] Background image loads with priority (LCP optimization)
- [ ] Promo strip cycles messages every 4 seconds
- [ ] "Shop Now" CTA links to `/products`
- [ ] Fully responsive — headline scales on mobile
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/07-hero.spec.md

Implement all files in Section 5, bottom-up:
1. src/data/promos.ts
2. src/components/home/PromoStrip.tsx
3. src/components/home/HeroSection.tsx

Then import both into src/app/(shop)/page.tsx.

Verify Section 7 after generating — mark ✅ or ❌
```
