# Spec: Blog Listing Page

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

The `/blog` page with a featured latest post hero, a category filter tab row, and a grid of post cards. Includes a sidebar (desktop) showing latest posts and categories.

---

## 2. Visual Design

| Token           | Value                                              |
| --------------- | -------------------------------------------------- |
| Featured post   | full-width banner, dark overlay, post title white 32px |
| Category tabs   | horizontal scroll tabs, active = bg `#0000ff` white text |
| Grid            | 3-col desktop, 1-col mobile, gap-6                 |
| Post card       | thumbnail `aspect-video`, category badge, title, excerpt 2-line, date |
| Sidebar         | 280px desktop only                                 |
| Sidebar heading | Times New Roman bold 16px, border-b `#000`         |
| Pagination      | numbered pages, active = `#0000ff`, border others  |

---

## 3. TypeScript Interfaces

Uses `BlogPost` from `src/types/index.ts`. No new interfaces.

---

## 4. Data / Config

Reads from `src/data/blog-posts.ts`. Supports `?category=X` URL param for filtering.

---

## 5. Files to Generate

```
src/
├── app/
│   └── (shop)/
│       └── blog/
│           ├── page.tsx
│           └── loading.tsx
└── components/
    └── blog/
        ├── PostCard.tsx
        └── BlogSidebar.tsx
```

---

## 6. Behavior

- Featured post = most recent post (first in sorted array).
- `?category=X` filters the grid (not the featured banner).
- Pagination: 6 posts per page via `?page=N` URL param (client-side slice).
- `BlogSidebar`: shows 5 latest posts (links only) and all category chips.
- Exports `generateMetadata` with title "Blog | Parfum".

---

## 7. Acceptance Criteria

- [ ] Route `/blog` renders all posts
- [ ] Featured banner shows most recent post
- [ ] Category tab filters grid correctly
- [ ] 6 posts per page with pagination controls
- [ ] Sidebar shows 5 latest posts and categories
- [ ] Each card links to `/blog/[slug]`
- [ ] `loading.tsx` shows skeleton layout
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/31-blog-listing.spec.md

Implement all files in Section 5, bottom-up:
1. src/components/blog/PostCard.tsx
2. src/components/blog/BlogSidebar.tsx
3. src/app/(shop)/blog/loading.tsx
4. src/app/(shop)/blog/page.tsx

Verify Section 7 after generating — mark ✅ or ❌
```
