# Spec: Footer

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Full-width site footer with brand name, copyright notice, and simple navigation links. Registered in the root layout so it appears on every page.

---

## 2. Visual Design

| Token          | Value                                       |
| -------------- | ------------------------------------------- |
| Background     | `#000000`                                   |
| Text color     | `#ffffff`                                   |
| Brand name     | "PARFUM" — Times New Roman, bold, 18px      |
| Nav links      | Times New Roman, `#ffffff`, hover `#0000ff` |
| Copyright      | Times New Roman, `#ffffff`, 12px, opacity 60% |
| Padding        | `py-10 px-6`                                |
| Layout         | Three columns on desktop, stacked on mobile |

---

## 3. TypeScript Interfaces

No new interfaces needed.

---

## 4. Data / Config

Footer links (defined inside `Footer.tsx`):

```typescript
const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
]
```

---

## 5. Files to Generate

```
src/
└── components/
    └── layout/
        └── Footer.tsx
```

Also update: `src/app/layout.tsx` — import and render `<Footer />` below `{children}`.

---

## 6. Behavior

- Three-column layout on desktop:
  - Left: "PARFUM" brand name
  - Center: nav links in a row
  - Right: copyright text
- On mobile: stacked vertically, center-aligned, in the same top-to-bottom order.
- All links use Next.js `<Link>`.

---

## 7. Acceptance Criteria

- [ ] Footer renders on every page (registered in `src/app/layout.tsx`)
- [ ] Background is black (`#000000`), all text is white
- [ ] "PARFUM" brand name is bold and uses Times New Roman
- [ ] Links use Next.js `<Link>` — not `<a>` tags
- [ ] Copyright text reads "© 2024 PARFUM. All rights reserved."
- [ ] Layout is three columns on desktop, stacked on mobile
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/03-footer.spec.md

Implement all files in Section 5, bottom-up:
1. src/components/layout/Footer.tsx
2. Update src/app/layout.tsx to import and render <Footer /> below {children}

Verify Section 7 after generating — mark ✅ or ❌
```
