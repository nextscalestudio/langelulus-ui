# Spec: Navbar — Dropdown Navigation

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** User request 2026-06-27

---

## 1. Overview

Enhance the Navbar's desktop nav links so that "Products" and "Blog" show a hover dropdown panel with sub-links. Plain links (About, Contact, Policy) remain unchanged. A new `NavLinks` client component handles the interactive state; `Navbar.tsx` stays a server component.

---

## 2. Visual Design

### Nav item with dropdown

| Element          | Style                                                         |
| ---------------- | ------------------------------------------------------------- |
| Parent label     | Times New Roman, `#000000`, hover `#0000ff`, flex + chevron  |
| Chevron icon     | 12×12 SVG, rotates 180° on open                              |
| Dropdown panel   | `bg-white`, `border border-secondary/20`, `shadow-lg`        |
| Dropdown padding | `py-2 min-w-44`                                              |
| Sub-link         | Times New Roman 14px, `#000000`, hover `text-accent bg-gray-50`, `px-4 py-2.5` block |
| Animation        | fade + slide-down: `opacity-0 translate-y-1` → `opacity-100 translate-y-0`, 150 ms |

### Positioning

Dropdown panel is absolutely positioned below the parent link (`top-full left-0`), with a `pt-2` spacer div to prevent gap-triggered close.

---

## 3. TypeScript Interfaces

```typescript
interface NavChild {
  label: string
  href: string
}

interface NavItem {
  label: string
  href: string
  children?: NavChild[]
}
```

---

## 4. Data / Config

Defined inside `src/components/layout/NavLinks.tsx`:

```typescript
const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'All Products', href: '/products' },
      { label: 'Nam',          href: '/products?category=Nam' },
      { label: 'Nữ',           href: '/products?category=Nữ' },
      { label: 'Unisex',       href: '/products?category=Unisex' },
    ],
  },
  { label: 'About',   href: '/about' },
  {
    label: 'Blog',
    href: '/blog',
    children: [
      { label: 'All Articles',     href: '/blog' },
      { label: 'Fragrance Guide',  href: '/blog?category=Fragrance+Guide' },
      { label: 'Lifestyle',        href: '/blog?category=Lifestyle' },
    ],
  },
  { label: 'Contact', href: '/contact' },
  { label: 'Policy',  href: '/policy' },
]
```

---

## 5. Files to Generate / Modify

```
src/components/layout/
├── NavLinks.tsx       ← NEW client component (dropdown logic)
└── Navbar.tsx         ← remove inline NAV_LINKS + <ul>, replace with <NavLinks />
```

---

## 6. Behavior

- **Hover open**: `onMouseEnter` on the `<li>` sets `openIndex` state.
- **Hover close**: `onMouseLeave` on the `<li>` clears `openIndex`.
- **Click outside**: `useEffect` adds a document `mousedown` listener that clears `openIndex`.
- **Keyboard**: `Escape` keydown closes the open dropdown.
- Parent link (e.g. `/products`) remains clickable and navigates even when dropdown exists.
- Mobile: the `<ul>` is still `hidden md:flex` — no change.
- Items without `children` render a plain `<Link>` with no chevron.

---

## 7. Acceptance Criteria

- [ ] Desktop: hovering "Products" shows dropdown with 4 sub-links
- [ ] Desktop: hovering "Blog" shows dropdown with 3 sub-links
- [ ] Home, About, Contact, Policy render as plain links (no chevron, no dropdown)
- [ ] Clicking a parent link navigates to its `href`
- [ ] Clicking a sub-link navigates to its `href`
- [ ] Dropdown closes when clicking outside
- [ ] Dropdown closes on Escape key
- [ ] Chevron rotates 180° when dropdown is open
- [ ] Mobile: all links still hidden below `md` breakpoint
- [ ] `tsc --noEmit` passes with zero errors
