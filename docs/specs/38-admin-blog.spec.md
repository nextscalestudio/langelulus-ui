# Spec: Admin — Blog Management

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

`/admin/blog` page: CRUD for blog posts. List view with search, add/edit drawer with a simple textarea-based content editor, and delete confirmation.

---

## 2. Visual Design

| Token          | Value                                                |
| -------------- | ---------------------------------------------------- |
| Table cols     | Thumbnail | Title | Category | Date | Status | Actions |
| Published badge| green pill                                           |
| Draft badge    | gray pill                                            |
| Drawer width   | 600px (wider than products for content textarea)     |
| Content field  | `<textarea>` h-64, monospace font — plain text/markdown |

---

## 3. TypeScript Interfaces

Extend `BlogPost` with:

```typescript
interface AdminBlogPost extends BlogPost {
  status: 'published' | 'draft'
}
```

---

## 4. Data / Config

Persisted in `localStorage` key `admin-blog-posts`. Initialized from `src/data/blog-posts.ts`.

---

## 5. Files to Generate

```
src/
└── app/
    └── admin/
        └── blog/
            ├── page.tsx
            └── _components/
                ├── BlogTable.tsx
                └── BlogFormDrawer.tsx
```

---

## 6. Behavior

- Form covers: title, slug (auto-generated from title, editable), description, content, category, tags (comma-separated), thumbnail URL, status (published/draft), readTime.
- Auto-generate slug: `title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')`.
- Save upserts to localStorage, refreshes table.
- Delete requires `window.confirm()`.

---

## 7. Acceptance Criteria

- [ ] Table shows all posts with status badges
- [ ] "Add" opens empty form with auto-slug
- [ ] Editing title auto-updates slug (unless slug was manually edited)
- [ ] Save persists to localStorage and updates table
- [ ] Delete requires confirmation
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/38-admin-blog.spec.md

Implement all files in Section 5, bottom-up:
1. src/app/admin/blog/_components/BlogFormDrawer.tsx
2. src/app/admin/blog/_components/BlogTable.tsx
3. src/app/admin/blog/page.tsx

Verify Section 7 after generating — mark ✅ or ❌
```
