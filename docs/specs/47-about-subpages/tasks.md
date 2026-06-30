# Tasks: About Sub-pages & Nav Dropdown

**Input**: Design documents from `docs/specs/47-about-subpages/`

**Prerequisites**: plan.md ✅, spec.md ✅, data-model.md ✅, research.md ✅, quickstart.md ✅

**Tests**: No test tasks — not requested in spec. Validation via `tsc --noEmit` and quickstart.md.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no shared dependencies)
- **[Story]**: Which user story this task belongs to (US1–US7)
- Exact file paths included in every task description

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify project structure and no new dependencies needed (all static pages, zero new packages).

- [X] T001 Confirm no new npm packages are required — feature uses only existing Next.js, React, Tailwind, `next/image`, `next/link`
- [X] T002 Create directory skeleton: `src/app/(shop)/about/story/`, `philosophy/`, `perfumers/`, `certifications/`, `catalogue/` and `src/components/about/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Type definitions, data file, and shared shell component that ALL sub-pages depend on.

**⚠️ CRITICAL**: No sub-page work can begin until this phase is complete.

- [X] T003 Add `Perfumer`, `Certification`, and `PhilosophyPrinciple` interfaces to `src/types/index.ts`
- [X] T004 Create `src/data/about.ts` with all five bilingual exports: `storyContent` (StorySection), `philosophyPrinciples` (PhilosophyPrinciple[4]), `perfumers` (Perfumer[3]), `certifications` (Certification[4]), `catalogueInfo` (CatalogueInfo)
- [X] T005 Create `src/components/about/AboutPageShell.tsx` — shared server component accepting `title: string`, `subtitle?: string`, `children: React.ReactNode`; renders full-width hero banner (`h-64 md:h-96`, dark overlay, `font-serif text-5xl text-white text-center`) + `max-w-4xl mx-auto px-6 py-16` content wrapper

**Checkpoint**: Types, data, and shell component ready — sub-page and nav work can now begin in parallel.

---

## Phase 3: User Story 1 — NavLinks VI Labels + About Dropdown (Priority: P1)

**Goal**: All nav labels switch to Vietnamese; "Về chúng tôi" gains a hover dropdown with 5 About sub-links matching the existing Products/Blog dropdown pattern.

**Independent Test**: Visit `/` on desktop, hover nav links — all labels are Vietnamese, "Về chúng tôi" shows 5-item dropdown; Products and Blog dropdowns still work.

- [X] T006 [US1] Update `src/components/layout/NavLinks.tsx` — change all `NAV_LINKS` labels to Vietnamese (Trang chủ, Sản phẩm, Về chúng tôi, Blog, Liên hệ, Chính sách) and add `children[]` to the About entry with 5 sub-links: Câu chuyện `/about/story`, Triết lý thương hiệu `/about/philosophy`, Nhà sáng tác hương `/about/perfumers`, Chứng nhận `/about/certifications`, Catalogue `/about/catalogue`

**Checkpoint**: Nav fully bilingual with working About dropdown. Independent from sub-pages.

---

## Phase 4: User Story 2 — `/about` Overview Landing Page (Priority: P1)

**Goal**: `/about` shows a full-bleed hero + 5 clickable sub-section cards that link to each About sub-route.

**Independent Test**: Visit `/about` — hero banner with "Về chúng tôi" visible, 5 cards rendered, each card navigates to correct sub-route, page `<title>` is "Về chúng tôi | Parfum".

- [X] T007 [US2] Create `src/app/(shop)/about/page.tsx` — export `generateMetadata()` returning `{ title: 'Về chúng tôi | Parfum' }`; render `<AboutPageShell title="Về chúng tôi">`; inside render a `grid grid-cols-1 md:grid-cols-2 gap-8` of 5 cards (one per About sub-route), each card a `<Link>` with `border border-secondary/20 p-6` styling, showing the VI label and VI description

**Checkpoint**: `/about` overview page independently functional and correctly linked.

---

## Phase 5: User Story 3 — `/about/story` Sub-page (Priority: P2)

**Goal**: Brand founding narrative displayed in long-form prose using `storyContent` from `src/data/about.ts`.

**Independent Test**: Visit `/about/story` — hero with "Câu chuyện L'ANGELULUS", 3 prose paragraphs visible mentioning 2019 and Hà Nội, page `<title>` is "Câu chuyện | Parfum".

- [X] T008 [P] [US3] Create `src/app/(shop)/about/story/page.tsx` — export `generateMetadata()` returning `{ title: 'Câu chuyện | Parfum' }`; render `<AboutPageShell title={storyContent.headingVi}>`; inside map `storyContent.paragraphsVi` to `<p>` elements with `font-serif text-base leading-relaxed text-secondary`; include a `foundedYear` / `foundedCity` callout line

**Checkpoint**: `/about/story` independently functional.

---

## Phase 6: User Story 4 — `/about/philosophy` Sub-page (Priority: P2)

**Goal**: 4 brand philosophy principles displayed in a 2×2 card grid with ordinal numbers.

**Independent Test**: Visit `/about/philosophy` — hero visible, 4 principle cards in 2-column grid on desktop (1-column mobile), each card shows number, Vietnamese title, Vietnamese description. Principles: Chân thực, Hài hòa, Bền vững, Cảm xúc. Page `<title>` is "Triết lý | Parfum".

- [X] T009 [P] [US4] Create `src/app/(shop)/about/philosophy/page.tsx` — export `generateMetadata()` returning `{ title: 'Triết lý | Parfum' }`; render `<AboutPageShell>`; inside render `grid grid-cols-1 md:grid-cols-2 gap-8` mapping `philosophyPrinciples` to cards with `border border-secondary/20 p-6`; each card shows `principle.number` as a large ordinal, `principle.titleVi` as section heading (`font-serif text-2xl text-accent`), `principle.descriptionVi` as body

**Checkpoint**: `/about/philosophy` independently functional.

---

## Phase 7: User Story 5 — `/about/perfumers` Sub-page (Priority: P2)

**Goal**: 3 perfumer cards, each with placeholder photo on left and bio/specialties on right (desktop), stacked on mobile.

**Independent Test**: Visit `/about/perfumers` — 3 cards visible, each showing `next/image` placeholder, name, role (VI), bio (VI), specialties tags. Layout photo-left/bio-right on md+, stacked on mobile. Names: Nguyễn Anh Khoa, Trần Minh Châu, Lê Phương Linh. Page `<title>` is "Nhà sáng tác hương | Parfum".

- [X] T010 [P] [US5] Create `src/app/(shop)/about/perfumers/page.tsx` — export `generateMetadata()` returning `{ title: 'Nhà sáng tác hương | Parfum' }`; render `<AboutPageShell>`; inside render `space-y-12` list mapping `perfumers`; each item is `flex flex-col md:flex-row gap-8`; image side uses `<Image src={p.image} width={280} height={280} className="object-cover" alt={p.name}>`; bio side shows name (`font-serif text-2xl`), `p.roleVi`, `p.bioVi` (`leading-relaxed text-secondary`), specialties as pill tags, years of experience

**Checkpoint**: `/about/perfumers` independently functional.

---

## Phase 8: User Story 6 — `/about/certifications` Sub-page (Priority: P2)

**Goal**: 4 certification cards in 2×2 grid, each with Vietnamese name, issuer, and year badge.

**Independent Test**: Visit `/about/certifications` — 4 cards in 2-column grid on desktop, each showing VI name, VI issuer, year badge. Certifications: ISO 22716, ECOCERT, Vietnam REACH, IFRA Compliance. Page `<title>` is "Chứng nhận | Parfum".

- [X] T011 [P] [US6] Create `src/app/(shop)/about/certifications/page.tsx` — export `generateMetadata()` returning `{ title: 'Chứng nhận | Parfum' }`; render `<AboutPageShell>`; inside render `grid grid-cols-1 md:grid-cols-2 gap-8` mapping `certifications`; each card `border border-secondary/20 p-6` shows `cert.nameVi` as heading, `cert.issuerVi` as subheading, `cert.year` in a badge span (`text-sm font-semibold`), `cert.descriptionVi` as body text

**Checkpoint**: `/about/certifications` independently functional.

---

## Phase 9: User Story 7 — `/about/catalogue` Sub-page (Priority: P2)

**Goal**: Catalogue page with hero CTA and a download button linking to the placeholder PDF path in a new tab.

**Independent Test**: Visit `/about/catalogue` — hero visible, title "Danh mục sản phẩm L'ANGELULUS 2025", description text, download `<a>` with `href="/downloads/langelulus-catalogue-2025.pdf"` and `target="_blank"`. Page `<title>` is "Catalogue | Parfum".

- [X] T012 [P] [US7] Create `src/app/(shop)/about/catalogue/page.tsx` — export `generateMetadata()` returning `{ title: 'Catalogue | Parfum' }`; render `<AboutPageShell title={catalogueInfo.titleVi}>`; inside render the VI description text, then an `<a href={catalogueInfo.pdfUrl} target="_blank" rel="noopener noreferrer">` download button styled as primary CTA; optionally render a placeholder cover image using `<Image src={catalogueInfo.coverImage} ...>`

**Checkpoint**: `/about/catalogue` independently functional with working download link.

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Type safety validation and final consistency checks.

- [X] T013 Run `npx tsc --noEmit` and fix any type errors — ensure `Perfumer`, `Certification`, `PhilosophyPrinciple` are exported from `src/types/index.ts` and imported correctly in both `src/data/about.ts` and the page files
- [X] T014 Verify all `NAV_LINKS` labels are Vietnamese by inspecting `src/components/layout/NavLinks.tsx` — no English labels remaining
- [X] T015 Confirm `AboutPageShell.tsx` uses only Tailwind tokens (`text-accent`, `text-secondary`, `font-serif`) — no hardcoded hex values, no inline styles
- [ ] T016 Run quickstart.md validation steps manually (or note completion) — nav dropdown, all 6 routes, metadata titles, type check, lint

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup — **BLOCKS all sub-page and nav work**
- **Nav (Phase 3, US1)**: Can start after Foundational — independent from sub-pages
- **Overview (Phase 4, US2)**: Can start after Foundational — independent from sub-pages
- **Sub-pages (Phases 5–9, US3–US7)**: All depend on Foundational — can all run in parallel after T003–T005 complete
- **Polish (Phase 10)**: Depends on all prior phases complete

### User Story Dependencies

- **US1 (NavLinks)**: After Foundational — no dependency on other stories
- **US2 (Overview page)**: After Foundational — no dependency on other stories
- **US3–US7 (Sub-pages)**: After Foundational — all independent of each other, all parallelisable

### Within Each Phase

- T003 (types) before T004 (data) before T005 (shell) — sequential
- T006–T012 can all run in parallel after T005 completes

### Parallel Opportunities

```bash
# After T005 (shell component complete):
T006  # NavLinks
T007  # /about overview
T008  # /about/story
T009  # /about/philosophy
T010  # /about/perfumers
T011  # /about/certifications
T012  # /about/catalogue
# All 7 tasks touch different files — fully parallelisable
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1–2 (T001–T005): types, data, shell
2. Complete Phase 3 (T006): nav update — immediately visible
3. Complete Phase 4 (T007): overview landing
4. **VALIDATE**: nav dropdown works, overview page renders 5 cards
5. Complete Phases 5–9 (T008–T012): all sub-pages in parallel

### Incremental Delivery

1. Foundation ready (T001–T005) → no visible change yet
2. Nav updated (T006) → nav labels switch to VI + About dropdown appears
3. Overview page (T007) → `/about` shows 5 cards
4. Sub-pages (T008–T012) → each sub-route becomes accessible
5. Polish (T013–T016) → type check passes, lint clean

---

## Notes

- [P] tasks touch different files — no conflicts when run in parallel
- No test tasks — spec does not request TDD; validation via `tsc --noEmit` + quickstart.md
- `StorySection` and `CatalogueInfo` are inline constant shapes — no interface needed in `src/types/index.ts`
- All pages are server components — no `'use client'` directive
- `Perfumer.yearsExp` field is in data-model but not in spec interfaces — include it in the type and data for completeness
- Catalogue download `<a>` must use `rel="noopener noreferrer"` with `target="_blank"`
