# Spec: About Page

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Standalone About page with a hero banner, brand narrative, and vision / mission / core values section.

---

## 2. Visual Design

| Token             | Value                                            |
| ----------------- | ------------------------------------------------ |
| Banner height     | `h-64 md:h-96`                                   |
| Banner bg         | dark overlay over brand image                    |
| Banner heading    | Times New Roman, 48px, white                     |
| Section bg        | alternating white / black sections               |
| VMV heading       | Times New Roman, 28px, `#0000ff`                 |
| VMV body          | Times New Roman, 16px, line-height 1.8           |
| Values grid       | 3-col desktop, 1-col mobile                      |
| Value card border | `1px solid #0000ff`                              |

---

## 3. TypeScript Interfaces

```typescript
interface CoreValue {
  title: string
  description: string
  icon: string
}
```

---

## 4. Data / Config

Hardcoded in page (not from data file):
- Vision: "To become the leading luxury fragrance destination in Vietnam..."
- Mission: "To connect people with scents that tell their story..."
- Core values: 3 items — Authenticity, Elegance, Connection

---

## 5. Files to Generate

```
src/
└── app/
    └── (shop)/
        └── about/
            └── page.tsx
```

---

## 6. Behavior

- This is a Next.js App Router page (`page.tsx`), not a component file.
- Exports `generateMetadata()` with title "About Us | Parfum".
- All content rendered as static JSX — no client component needed.

---

## 7. Acceptance Criteria

- [ ] Route `/about` renders without errors
- [ ] Page exports `generateMetadata()` with correct title
- [ ] Vision, Mission, and 3 Core Values are visible
- [ ] Page uses Navbar and Footer from root layout
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/15-about.spec.md

Implement:
1. src/app/(shop)/about/page.tsx

Verify Section 7 after generating — mark ✅ or ❌
```
