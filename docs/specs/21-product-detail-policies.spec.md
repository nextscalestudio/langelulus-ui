# Spec: Product Detail — Sales Policies Section

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Icon-and-text policy strip on the product detail page summarizing shipping, returns, payment, and support policies. Links to the full policy page.

---

## 2. Visual Design

| Token          | Value                                             |
| -------------- | ------------------------------------------------- |
| Section bg     | `#f9f9f9`                                         |
| Section pad    | `py-6 px-4`                                       |
| Layout         | 4-col desktop, 2-col mobile                       |
| Icon           | SVG, 32px, `#0000ff`                              |
| Policy title   | Times New Roman bold, 14px, `#000000`             |
| Policy desc    | Times New Roman, 13px, `#6b7280`                  |
| "Learn more"   | `text-accent`, 12px → `/policy#[section]`         |

---

## 3. TypeScript Interfaces

```typescript
interface PolicyItem {
  icon: string       // SVG path string or icon name
  title: string
  description: string
  href: string
}
```

---

## 4. Data / Config

Hardcoded array in component:
1. Shipping — "Free shipping on orders over 500.000 ₫" → `/policy#shipping`
2. Returns — "7-day return policy" → `/policy#returns`
3. Payment — "COD and bank transfer accepted" → `/policy#payment`
4. Support — "Chat or call for advice" → `/policy#support`

---

## 5. Files to Generate

```
src/
└── components/
    └── product/
        └── ProductPolicies.tsx
```

---

## 6. Behavior

- Purely presentational component.
- "Learn more" links use Next.js `<Link>` with hash anchor.

---

## 7. Acceptance Criteria

- [ ] 4 policy items render with icon, title, description, and link
- [ ] Links are Next.js `<Link>` not `<a>`
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/21-product-detail-policies.spec.md

Implement:
1. src/components/product/ProductPolicies.tsx

Add to src/app/(shop)/products/[slug]/page.tsx below ProductSpecsSection.

Verify Section 7 after generating — mark ✅ or ❌
```
