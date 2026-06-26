# Spec: Scent Stories Section (Homepage)

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Homepage editorial section telling the brand's "scent story" — a visually rich alternating layout of image + text blocks, one per featured scent narrative.

---

## 2. Visual Design

| Token           | Value                                              |
| --------------- | -------------------------------------------------- |
| Section bg      | `#ffffff`                                          |
| Section pad     | `py-20 px-4`                                       |
| Heading         | Times New Roman, 36px, centered, `#000000`         |
| Story layout    | alternating: image-left/text-right, then flip      |
| Story title     | Times New Roman italic, 28px, `#0000ff`            |
| Story body      | Times New Roman, 16px, `#000000`, line-height 1.8  |
| Story image     | `aspect-square`, `object-cover`, 50% width desktop |
| Read more link  | `text-accent` underline → product detail page      |

---

## 3. TypeScript Interfaces

```typescript
interface ScentStory {
  title: string
  body: string
  image: string
  productSlug: string
}
```

---

## 4. Data / Config

File: `src/data/scent-stories.ts` — export `const scentStories: ScentStory[]` with 2–3 items.

---

## 5. Files to Generate

```
src/
├── data/
│   └── scent-stories.ts
└── components/
    └── home/
        └── ScentStories.tsx
```

---

## 6. Behavior

- Alternating layout: even index = image-left, odd index = image-right. On mobile, always image-top.
- "Read more" links to `/products/[productSlug]`.

---

## 7. Acceptance Criteria

- [ ] Even/odd rows alternate image position on desktop
- [ ] Mobile: image always above text
- [ ] "Read more" links to correct product detail URL
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/11-scent-stories.spec.md

Implement:
1. src/data/scent-stories.ts
2. src/components/home/ScentStories.tsx

Add to src/app/(shop)/page.tsx after CollectionsSection.

Verify Section 7 after generating — mark ✅ or ❌
```
