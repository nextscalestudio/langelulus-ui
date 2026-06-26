# Spec: Navbar

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Sticky top navigation bar with brand logo, nav links, a cart icon with item count badge, and a Sign In button. Registered in the root layout so it appears on every page.

---

## 2. Visual Design

| Token           | Value                                          |
| --------------- | ---------------------------------------------- |
| Background      | `#ffffff`                                      |
| Border bottom   | `1px solid #000000`                            |
| Logo text       | "PARFUM" — Times New Roman, `#0000ff`, bold    |
| Nav links       | Times New Roman, `#000000`, hover `#0000ff`    |
| Cart badge      | `#0000ff` circle, white count text, 18×18px    |
| Sign In button  | Border `1px solid #000000`, Times New Roman, hover bg `#000000` hover text `#ffffff` |
| Position        | `sticky top-0 z-50`                            |
| Height          | 64px                                           |

---

## 3. TypeScript Interfaces

No new interfaces — uses nothing from `src/types/index.ts` yet (cart count hardcoded to `0` until spec 08).

---

## 4. Data / Config

Nav links array (defined inside `Navbar.tsx`):

```typescript
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
]
```

---

## 5. Files to Generate

```
src/
└── components/
    └── layout/
        ├── Navbar.tsx
        └── CartIconButton.tsx
```

Also update: `src/app/layout.tsx` — import and render `<Navbar />` above `{children}`.

---

## 6. Behavior

- Cart count is hardcoded to `0` — will be wired to Zustand store in spec 08.
- Sign In button has no `onClick` handler — will be wired to NextAuth in spec 09.
- On mobile (< `md` breakpoint): nav links hidden, only logo + cart icon + Sign In button visible.
- No hamburger drawer needed — mobile just collapses the nav links.

---

## 7. Acceptance Criteria

- [ ] Navbar renders on every page (registered in `src/app/layout.tsx`)
- [ ] Logo text "PARFUM" is blue (`#0000ff`) and uses Times New Roman
- [ ] Cart icon shows a blue badge with count `0`
- [ ] Sign In button is visible and styled (no click handler yet)
- [ ] Nav links "Home" and "Products" are visible on desktop, hidden on mobile
- [ ] All interactive elements have `aria-label`
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/02-navbar.spec.md

Implement all files in Section 5, bottom-up:
1. src/components/layout/CartIconButton.tsx
2. src/components/layout/Navbar.tsx
3. Update src/app/layout.tsx to import and render <Navbar /> above {children}

Verify Section 7 after generating — mark ✅ or ❌
```
