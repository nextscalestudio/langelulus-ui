# Spec: Global Search

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Site-wide search accessible from the Navbar (search icon). Opens a full-screen modal with a search input that returns results across products, blog posts, and pages in real time.

---

## 2. Visual Design

| Token              | Value                                              |
| ------------------ | -------------------------------------------------- |
| Search icon        | magnifying glass in Navbar, right of cart icon     |
| Modal bg           | `rgba(0,0,0,0.8)` full-screen                      |
| Search input       | white, large (h-14), Times New Roman 18px, centered at top |
| Result group heading| 12px uppercase `#6b7280` — "Products", "Articles", "Pages" |
| Result item        | icon + title + subtitle, hover bg `rgba(255,255,255,0.05)` |
| Product result     | thumbnail 40px + name + price                      |
| Blog result        | article icon + title + category                    |
| Page result        | page icon + label (e.g. "About", "Contact")        |
| No results         | centered "No results for '[query]'"                |
| Keyboard nav       | `↑` `↓` to highlight, `Enter` to navigate         |

---

## 3. TypeScript Interfaces

```typescript
type SearchResultType = 'product' | 'blog' | 'page'

interface SearchResult {
  type: SearchResultType
  title: string
  subtitle?: string
  href: string
  image?: string
}
```

---

## 4. Data / Config

Search sources:
- Products: `src/data/products.ts` — match on `name`, `brand`, `tags`, `description`
- Blog posts: `src/data/blog-posts.ts` — match on `title`, `description`, `tags`
- Pages: static array — About, Contact, Policy (always shown if query length ≥ 2)

---

## 5. Files to Generate

```
src/
└── components/
    └── layout/
        └── SearchModal.tsx
```

---

## 6. Behavior

- Triggered by search icon in Navbar calling `openSearch()` (add to `ui-store.ts`).
- Input debounced 200ms before searching.
- Results grouped by type, max 4 per group.
- Keyboard: `↑`/`↓` moves highlight, `Enter` navigates, `Escape` closes.
- Clicking result navigates and closes modal.
- Empty query: show "Try searching for a product or article".

---

## 7. Acceptance Criteria

- [ ] Search icon in Navbar opens modal
- [ ] Typing shows grouped results within 200ms debounce
- [ ] Product results link to `/products/[slug]`
- [ ] Blog results link to `/blog/[slug]`
- [ ] Keyboard navigation works (↑↓Enter)
- [ ] Escape key closes modal
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/40-search.spec.md

Implement:
1. Add isSearchOpen, openSearch, closeSearch to src/lib/store/ui-store.ts
2. src/components/layout/SearchModal.tsx

Wire SearchModal into src/app/layout.tsx.
Wire search icon in src/components/layout/Navbar.tsx to call openSearch().

Verify Section 7 after generating — mark ✅ or ❌
```
