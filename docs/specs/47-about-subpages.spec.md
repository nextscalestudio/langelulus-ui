# Spec: About — Sub-pages & Nav Dropdown

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for planning
**Source:** User request 2026-06-27

---

## 1. Overview

Expand the single `/about` page into a full sub-section with five distinct routes, each with standalone content. The "About" entry in `NavLinks.tsx` gains a hover dropdown matching the Products/Blog pattern. All content is bilingual (Vietnamese primary, English secondary) stored in data files so it's ready for spec 48 (i18n).

---

## 2. Sub-routes

| Route                     | Label (VI)              | Label (EN)           |
| ------------------------- | ----------------------- | -------------------- |
| `/about`                  | Về chúng tôi            | About Us             |
| `/about/story`            | Câu chuyện              | Our Story            |
| `/about/philosophy`       | Triết lý thương hiệu    | Brand Philosophy     |
| `/about/perfumers`        | Nhà sáng tác hương      | Our Perfumers        |
| `/about/certifications`   | Chứng nhận              | Certifications       |
| `/about/catalogue`        | Catalogue               | Catalogue            |

> `/about` becomes an overview landing page that links to all five sub-routes. The existing spec 15 design (hero + VMV) moves to `/about/story`.

---

## 3. Visual Design (all sub-pages share the same shell)

| Token              | Value                                                   |
| ------------------ | ------------------------------------------------------- |
| Page shell         | Full-width hero banner (h-64 md:h-96) + content below  |
| Banner bg          | Dark overlay over a relevant brand image                |
| Banner heading     | Times New Roman, 48px, white, centered                  |
| Content max-width  | `max-w-4xl mx-auto px-6 py-16`                          |
| Section heading    | Times New Roman, 28px, `text-accent`                    |
| Body text          | Times New Roman, 16px, `leading-relaxed text-secondary` |
| Card grid          | `grid grid-cols-1 md:grid-cols-2 gap-8`                 |
| Card border        | `border border-secondary/20 p-6`                        |
| Divider            | `border-t border-secondary/20 my-12`                    |

---

## 4. TypeScript Interfaces

```typescript
// src/types/index.ts — add these
interface AboutSubPage {
  slug: string
  titleVi: string
  titleEn: string
  descriptionVi: string
  descriptionEn: string
}

interface Perfumer {
  id: string
  name: string
  roleVi: string
  roleEn: string
  bioVi: string
  bioEn: string
  image: string          // placeholder path
  specialties: string[]
}

interface Certification {
  id: string
  nameVi: string
  nameEn: string
  issuerVi: string
  issuerEn: string
  year: number
  descriptionVi: string
  descriptionEn: string
}
```

---

## 5. Data / Config

### `src/data/about.ts`

Export the following constants with bilingual example content:

**`storyContent`** — brand founding narrative  
```
titleVi: "Câu chuyện L'ANGELULUS"
titleEn: "The L'ANGELULUS Story"
— 3 paragraphs (VI + EN) covering: founding (2019, Hanoi), inspiration from Vietnamese botanicals, vision to bring world-class perfumery to Vietnam
```

**`philosophyPrinciples`** — array of 4 principles  
```
1. Authenticity (Chân thực) — no synthetic shortcuts
2. Harmony (Hài hòa) — balance Western perfumery craft with Eastern sensibility  
3. Longevity (Bền vững) — ingredients ethically sourced, packaging minimal
4. Emotion (Cảm xúc) — every fragrance tells a personal story
```

**`perfumers`** — array of 3 `Perfumer` objects  
```
1. Nguyễn Anh Khoa — Lead Perfumer, 12 years, specialties: Woody / Oriental
2. Trần Minh Châu — Perfumer, 7 years, specialties: Floral / Fresh
3. Lê Phương Linh — Junior Perfumer, 3 years, specialties: Gourmand / Aquatic
```
(Use `/images/placeholders/perfumer-1.jpg` etc. for images)

**`certifications`** — array of 4 `Certification` objects  
```
1. ISO 22716:2007 — GMP Cosmetics, issued 2021
2. ECOCERT Organic — Organic ingredient sourcing, issued 2022
3. Vietnam REACH — Chemical safety compliance, issued 2020
4. IFRA Compliance — International fragrance safety standards, issued 2019
```

**`catalogueInfo`**  
```
titleVi: "Danh mục sản phẩm L'ANGELULUS 2025"
titleEn: "L'ANGELULUS Product Catalogue 2025"
descriptionVi: "Tải xuống danh mục đầy đủ với tất cả các mùi hương, thông số kỹ thuật và bảng giá."
descriptionEn: "Download the complete catalogue with all fragrances, technical specs, and pricing."
pdfUrl: "/downloads/langelulus-catalogue-2025.pdf"  ← placeholder path
```

---

## 6. Files to Generate

```
src/
├── data/
│   └── about.ts                           ← all bilingual content
├── types/
│   └── index.ts                           ← add Perfumer, Certification, AboutSubPage
└── app/
    └── (shop)/
        └── about/
            ├── page.tsx                   ← overview: hero + 5 sub-section cards + links
            ├── story/
            │   └── page.tsx               ← brand founding story (3 paragraphs)
            ├── philosophy/
            │   └── page.tsx               ← 4 principle cards in 2×2 grid
            ├── perfumers/
            │   └── page.tsx               ← 3 perfumer cards with photo + bio
            ├── certifications/
            │   └── page.tsx               ← 4 certification cards
            └── catalogue/
                └── page.tsx               ← hero CTA + download link + preview sections
```

Also update:
```
src/components/layout/NavLinks.tsx         ← add children[] to the About nav item
```

---

## 7. NavLinks Update

Add `children` to the About entry in `NAV_LINKS`:

```typescript
{
  label: 'Về chúng tôi',
  href: '/about',
  children: [
    { label: 'Câu chuyện',           href: '/about/story' },
    { label: 'Triết lý thương hiệu', href: '/about/philosophy' },
    { label: 'Nhà sáng tác hương',   href: '/about/perfumers' },
    { label: 'Chứng nhận',           href: '/about/certifications' },
    { label: 'Catalogue',            href: '/about/catalogue' },
  ],
}
```

> **Nav language unification:** update all `NAV_LINKS` labels to Vietnamese while making this change. Spec 48 (i18n) will make them dynamic.

---

## 8. Per-page Behavior

| Page           | `generateMetadata()` title          | Notes                                             |
| -------------- | ----------------------------------- | ------------------------------------------------- |
| `/about`       | "Về chúng tôi \| Parfum"            | 5 clickable section cards; full-bleed hero         |
| `/about/story` | "Câu chuyện \| Parfum"              | Long-form prose, timeline optional                |
| `/about/philosophy` | "Triết lý \| Parfum"           | 4-card grid, icon or number each principle        |
| `/about/perfumers`  | "Nhà sáng tác hương \| Parfum" | Photo left, bio right on desktop; stacked mobile  |
| `/about/certifications` | "Chứng nhận \| Parfum"     | 4-card grid with issuer + year badge              |
| `/about/catalogue`  | "Catalogue \| Parfum"          | CTA button links to `pdfUrl`; placeholder image preview |

---

## 9. Acceptance Criteria

- [ ] `/about` overview page renders 5 sub-section cards with links
- [ ] `/about/story` renders brand narrative (3 paragraphs)
- [ ] `/about/philosophy` renders 4 principle cards in 2×2 grid
- [ ] `/about/perfumers` renders 3 perfumer cards with name, role, bio
- [ ] `/about/certifications` renders 4 certification cards with issuer + year
- [ ] `/about/catalogue` renders download CTA linked to `pdfUrl`
- [ ] Navbar "Về chúng tôi" dropdown shows all 5 sub-links on hover
- [ ] All `NAV_LINKS` labels are in Vietnamese
- [ ] Every page exports `generateMetadata()` with correct title
- [ ] `tsc --noEmit` passes with zero errors
