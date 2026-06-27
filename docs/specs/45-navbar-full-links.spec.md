# Spec: Navbar — Full Navigation Links

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** User request 2026-06-27

---

## 1. Overview

Extend the existing Navbar's `NAV_LINKS` array to include all primary destination pages: About, Blog, Contact, and Policy. No structural changes to the Navbar component — only the link list grows.

---

## 2. Visual Design

No changes to existing tokens. New links inherit the same style as existing ones:

| Element       | Style                                              |
| ------------- | -------------------------------------------------- |
| Nav links     | Times New Roman, `#000000`, hover `#0000ff`        |
| Mobile        | All links hidden below `md` breakpoint (unchanged) |

---

## 3. Data / Config

Updated `NAV_LINKS` array inside `src/components/layout/Navbar.tsx`:

```typescript
const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About',    href: '/about' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Contact',  href: '/contact' },
  { label: 'Policy',   href: '/policy' },
]
```

---

## 4. Files to Modify

```
src/components/layout/Navbar.tsx   ← update NAV_LINKS only
```

---

## 5. Behavior

- All six links render in the `<ul>` on desktop (`md` and above).
- Mobile behavior unchanged — links hidden, only logo + search + cart + auth visible.
- Active-link highlighting is out of scope (no `usePathname` needed).

---

## 6. Acceptance Criteria

- [ ] All six nav links render on desktop: Home, Products, About, Blog, Contact, Policy
- [ ] Each link navigates to its correct route
- [ ] Mobile: links still hidden below `md` breakpoint
- [ ] No TypeScript errors (`tsc --noEmit` passes)
- [ ] No new files created — only `Navbar.tsx` is modified
