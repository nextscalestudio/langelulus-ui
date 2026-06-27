# Research: About Sub-pages & Nav Dropdown

## 1. Route Architecture

**Decision**: `/about` is a standalone overview landing page; sub-routes are independent pages.  
**Rationale**: No Next.js redirect needed — `/about` shows a 5-card grid linking to each sub-section. Mirrors how large e-commerce brands structure their "About" section.  
**Alternatives considered**: Redirect `/about` → `/about/story` — rejected because users landing on `/about` should get an orientation page, not be silently forwarded.

---

## 2. Bilingual Content Strategy (pre-i18n)

**Decision**: All data objects carry parallel `Vi` / `En` fields (e.g. `titleVi`, `titleEn`). Pages render the `Vi` field directly. Spec 48 (next-intl) will swap to the locale-parameterised field without changing the data shape.  
**Rationale**: Zero migration cost when i18n lands — data files stay identical, only the consumer changes.  
**Alternatives considered**: Single-language content now, translate later — rejected because retro-fitting bilingual fields across data objects is more disruptive than adding them up-front.

---

## 3. Placeholder Images for Perfumers

**Decision**: Use `/images/placeholders/perfumer-[1-3].jpg` paths in data. The `<Image>` component will render with a visible fallback until real assets are supplied.  
**Rationale**: Spec 44 (placeholder images) is already in scope; the same placeholder directory is used consistently.  
**How applied**: Each `Perfumer` object has an `image` field — `next/image` renders it with `width={280} height={280} className="object-cover"`.

---

## 4. Nav Label Language Unification

**Decision**: Update all `NAV_LINKS` labels to Vietnamese simultaneously with the About dropdown change.  
**Mapping**:

| EN (current) | VI (new)          |
| ------------ | ----------------- |
| Home         | Trang chủ         |
| Products     | Sản phẩm          |
| About        | Về chúng tôi      |
| Blog         | Blog              |
| Contact      | Liên hệ           |
| Policy       | Chính sách        |

Blog stays "Blog" — it's a loanword used in Vietnamese.  
**Rationale**: Spec 48 will make labels dynamic; unifying in VI now avoids the mixed-language state visible in the current navbar.

---

## 5. Catalogue Page — PDF Download

**Decision**: The Catalogue page links to `/downloads/langelulus-catalogue-2025.pdf` as a placeholder `<a href>` (not `<Link>`) with `target="_blank"`. No actual PDF is generated.  
**Rationale**: PDF generation is out of scope. The button is a static download link that a content author can swap when the real file is ready.

---

## 6. Shared Page Shell Component

**Decision**: Extract a shared `AboutPageShell` server component with the hero banner + content wrapper. All five sub-pages use it.  
**File**: `src/components/about/AboutPageShell.tsx`  
**Props**: `title: string`, `subtitle?: string`, `children: React.ReactNode`  
**Rationale**: Avoids copy-pasting the banner pattern across 5 files; keeps the about section visually consistent.
