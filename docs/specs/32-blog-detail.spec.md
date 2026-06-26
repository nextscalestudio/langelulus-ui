# Spec: Blog Detail Page

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

The `/blog/[slug]` page showing the full article: hero image, title, meta info, table of contents, article content, social share buttons, comment section, and a sidebar with latest news and related posts.

---

## 2. Visual Design

| Token            | Value                                               |
| ---------------- | --------------------------------------------------- |
| Hero image       | full-width, `aspect-video`, `object-cover`          |
| Category badge   | Badge component, `#0000ff`                          |
| Title            | Times New Roman, 40px, `#000000`                   |
| Meta row         | 14px `#6b7280` — author · date · read time          |
| Share buttons    | icon row (Facebook, Twitter/X, copy link), 36px     |
| TOC              | sticky aside on desktop, collapsible on mobile      |
| TOC link         | 14px, `#6b7280`, active = `#0000ff`                 |
| Article body     | Times New Roman, 17px, line-height 1.9, max-w-prose |
| Comment form     | author name + comment textarea + submit button      |
| Related posts    | 3-col grid, uses `PostCard`                         |

---

## 3. TypeScript Interfaces

Uses `BlogPost` from `src/types/index.ts`. New:

```typescript
interface Comment {
  id: string
  author: string
  body: string
  createdAt: string
}
```

---

## 4. Data / Config

Post data from `getPostBySlug(slug)`. Comments in `localStorage` key `comments-[slug]`.

Related posts: same category, excluding current post, max 3.

---

## 5. Files to Generate

```
src/
├── app/
│   └── (shop)/
│       └── blog/
│           └── [slug]/
│               ├── page.tsx
│               └── loading.tsx
└── components/
    └── blog/
        ├── TableOfContents.tsx
        └── CommentSection.tsx
```

---

## 6. Behavior

- `page.tsx` is a Server Component. Calls `getPostBySlug(params.slug)`. Returns `notFound()` if not found.
- Exports `generateMetadata` with post title and description.
- TOC: parsed from `post.content` by extracting `## Heading` patterns. Each TOC link smooth-scrolls to the section.
- Share buttons: Facebook shares URL, Twitter/X shares URL + title, "Copy Link" copies URL + shows toast.
- Comments: Client Component. Submit saves to localStorage, re-renders list.
- Related posts: server-side filtered from `blogPosts`.

---

## 7. Acceptance Criteria

- [ ] Route `/blog/[slug]` renders correct post
- [ ] Non-existent slug returns 404
- [ ] TOC links scroll to correct headings
- [ ] Facebook and copy-link share buttons work
- [ ] Submitting a comment adds it to the displayed list
- [ ] Related posts show same-category posts (max 3)
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/32-blog-detail.spec.md

Implement all files in Section 5, bottom-up:
1. src/components/blog/TableOfContents.tsx
2. src/components/blog/CommentSection.tsx
3. src/app/(shop)/blog/[slug]/loading.tsx
4. src/app/(shop)/blog/[slug]/page.tsx

Verify Section 7 after generating — mark ✅ or ❌
```
