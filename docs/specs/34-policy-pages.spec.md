# Spec: Policy Pages

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

A single `/policy` page with anchor-linked sections for all 7 policies: returns, warranty, shipping, sales policy, payment, privacy, and terms of use. Includes a sticky sidebar TOC on desktop.

---

## 2. Visual Design

| Token          | Value                                               |
| -------------- | --------------------------------------------------- |
| Page layout    | sidebar TOC 240px + content area, stacked mobile    |
| TOC link       | 14px, `#6b7280`, active = `#0000ff`, bold           |
| Section heading| Times New Roman, 24px, `#000000`, `id` anchor       |
| Body text      | Times New Roman, 16px, line-height 1.8, `#000000`   |
| Divider        | `border-t border-gray-200 my-8`                     |
| Last updated   | 13px `#6b7280` at top of page                       |

---

## 3. TypeScript Interfaces

```typescript
interface PolicySection {
  id: string        // used as anchor
  title: string
  content: string   // plain text, may include newlines for paragraphs
}
```

---

## 4. Data / Config

File: `src/data/policies.ts` — export `const policies: PolicySection[]` with 7 sections:
1. `returns` — Return & Refund Policy
2. `warranty` — Warranty Policy
3. `shipping` — Shipping Policy
4. `sales` — Sales Policy
5. `payment` — Payment Policy
6. `privacy` — Privacy Policy
7. `terms` — Terms of Use

Each with 2–3 paragraphs of placeholder content.

---

## 5. Files to Generate

```
src/
├── data/
│   └── policies.ts
└── app/
    └── (shop)/
        └── policy/
            └── page.tsx
```

---

## 6. Behavior

- Sticky sidebar TOC scrolls with the page (desktop only).
- Clicking TOC link smooth-scrolls to the section anchor.
- Exports `generateMetadata` with title "Policies | Parfum".
- "Last Updated: January 2025" shown at top.

---

## 7. Acceptance Criteria

- [ ] Route `/policy` renders all 7 policy sections
- [ ] Sidebar TOC links scroll to correct anchors
- [ ] TOC is sticky on desktop, hidden on mobile
- [ ] `/policy#shipping` anchor navigates to shipping section
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/34-policy-pages.spec.md

Implement:
1. src/data/policies.ts
2. src/app/(shop)/policy/page.tsx

Verify Section 7 after generating — mark ✅ or ❌
```
