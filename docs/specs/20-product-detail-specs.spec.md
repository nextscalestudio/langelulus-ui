# Spec: Product Detail — Specs + Usage Guide

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Two accordion sections on the product detail page: Product Specifications (volume, concentration, origin, longevity, sillage, gender) and Usage Guide (spray positions, longevity tips, storage tips).

---

## 2. Visual Design

| Token           | Value                                               |
| --------------- | --------------------------------------------------- |
| Specs table     | 2-col (label / value), alternating row bg `#f9f9f9` / white |
| Label cell      | Times New Roman, 14px, `#6b7280`, 40% width        |
| Value cell      | Times New Roman, 14px, `#000000`                   |
| Usage section   | numbered list, Times New Roman, 15px, `#000000`    |
| Sub-section     | bold heading 14px uppercase `#0000ff`, margin-top  |

---

## 3. TypeScript Interfaces

Uses `ProductSpecs`, `UsageGuide` from `src/types/index.ts`. No new interfaces.

---

## 4. Data / Config

Data flows from `product.specs` and `product.usageGuide` passed as props.

---

## 5. Files to Generate

```
src/
└── components/
    └── product/
        └── ProductSpecsSection.tsx    ← contains both specs + usage accordion
```

---

## 6. Behavior

- Two separate accordions within one file: "Product Specifications" and "Usage Guide".
- Usage Guide renders 3 sub-lists: Spray Positions, How to Make Scent Last, Storage Tips.
- Both accordions default to collapsed.

---

## 7. Acceptance Criteria

- [ ] "Product Specifications" accordion shows all 6 spec fields in a table
- [ ] "Usage Guide" accordion shows 3 sub-sections
- [ ] Both accordions toggle independently
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/20-product-detail-specs.spec.md

Implement:
1. src/components/product/ProductSpecsSection.tsx

Add to src/app/(shop)/products/[slug]/page.tsx below ScentInfoSection.

Verify Section 7 after generating — mark ✅ or ❌
```
