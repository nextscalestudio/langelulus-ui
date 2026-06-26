# Spec: Product Detail — Scent Information

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Accordion section on the product detail page displaying all fragrance profile information: fragrance family, top/middle/base notes, style, occasion, emotional description, target audience, and feeling.

---

## 2. Visual Design

| Token            | Value                                              |
| ---------------- | -------------------------------------------------- |
| Section bg       | `#ffffff`                                          |
| Section border   | `border-t border-b border-gray-200`                |
| Accordion header | Times New Roman bold, 18px, `#000000`, `+` / `−` toggle |
| Notes layout     | 3-col grid (Top / Middle / Base), each a tag list  |
| Note tag         | pill border `1px solid #0000ff`, `text-accent`, 13px |
| Occasion tags    | same pill style                                    |
| Label            | Times New Roman uppercase, 12px, `#6b7280`         |
| Body text        | Times New Roman, 15px, `#000000`, line-height 1.7  |

---

## 3. TypeScript Interfaces

Uses `ScentProfile`, `ScentNote` from `src/types/index.ts`. No new interfaces.

---

## 4. Data / Config

Data flows from `product.scentProfile` passed as prop.

---

## 5. Files to Generate

```
src/
└── components/
    └── product/
        └── ScentInfoSection.tsx
```

---

## 6. Behavior

- Section is an accordion: collapsed by default, expands on header click.
- Renders: fragrance family, top/middle/base notes as tag pills, style, occasion tags, emotional description, target audience, feeling.
- Import and render in `src/app/(shop)/products/[slug]/page.tsx` below `ProductInfo`.

---

## 7. Acceptance Criteria

- [ ] Accordion toggles open/closed on header click
- [ ] Top, Middle, Base notes each render as separate tag pill rows
- [ ] All `ScentProfile` fields are displayed
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/19-product-detail-scent.spec.md

Implement:
1. src/components/product/ScentInfoSection.tsx

Add to src/app/(shop)/products/[slug]/page.tsx below ProductInfo.

Verify Section 7 after generating — mark ✅ or ❌
```
