# Spec: Featured Articles Section (Homepage)

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Homepage section showing 3 latest blog posts as cards, encouraging visitors to explore the blog.

---

## 2. Visual Design

| Token         | Value                                         |
| ------------- | --------------------------------------------- |
| Section bg    | `#ffffff`                                     |
| Section pad   | `py-16 px-4`                                  |
| Heading       | Times New Roman, 36px, centered, `#000000`    |
| Card layout   | 3-col desktop, 1-col mobile                   |
| Thumbnail     | `aspect-video`, `object-cover`                |
| Category tag  | Badge component, `#0000ff`                    |
| Post title    | Times New Roman bold, 18px, `#000000`         |
| Post excerpt  | 16px, `#6b7280`, 2 lines clamped              |
| Read more     | `text-accent` underline                       |
| View all btn  | secondary Button → `/blog`                    |

---

## 3. TypeScript Interfaces

Uses `BlogPost` from `src/types/index.ts`. No new interfaces.

---

## 4. Data / Config

Reads from `src/data/blog-posts.ts` — takes the 3 most recent posts (sorted by `publishedAt` desc).

---

## 5. Files to Generate

```
src/
└── components/
    └── home/
        └── FeaturedArticles.tsx
```

---

## 6. Behavior

- Each card links to `/blog/[slug]`.
- Excerpt is clamped to 2 lines via `line-clamp-2`.
- "View All Articles" button links to `/blog`.

---

## 7. Acceptance Criteria

- [ ] Shows 3 most recent posts sorted by `publishedAt`
- [ ] Each card links to `/blog/[slug]`
- [ ] "View All" links to `/blog`
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/13-featured-articles.spec.md

Implement:
1. src/components/home/FeaturedArticles.tsx

Add to src/app/(shop)/page.tsx after Testimonials.

Verify Section 7 after generating — mark ✅ or ❌
```
