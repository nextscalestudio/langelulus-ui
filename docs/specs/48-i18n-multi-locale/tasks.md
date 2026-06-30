# Tasks: Multi-locale Support (Vietnamese + English)

**Input**: Design documents from `docs/specs/48-i18n-multi-locale/`

**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, quickstart.md ✓

**Organization**: Tasks follow the 4-phase dependency graph in plan.md: Infra → Restructure → Components → Validate.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on each other)
- **[Story]**: Which user story this task belongs to (US1=Infra, US2=App Restructure, US3=Components)
- All file paths are relative to repo root

---

## Phase 1: Setup

**Purpose**: Add next-intl dependency to the project

- [X] T001 Install next-intl ^3 via `npm install next-intl` and verify package.json updated

---

## Phase 2: Foundational — i18n Infrastructure

**Purpose**: All i18n config and message files must exist before any route or component work begins

**⚠️ CRITICAL**: Phases 3 and 4 cannot start until this phase is complete

- [X] T002 [P] Create messages/vi.json with all nav, localeSwitcher, meta, and about namespaces per data-model.md
- [X] T003 [P] Create messages/en.json mirroring all keys from vi.json with English values per data-model.md
- [X] T004 [P] Create src/i18n/routing.ts — `defineRouting({ locales: ['vi','en'], defaultLocale: 'vi', localePrefix: 'as-needed' })`
- [X] T005 Create src/i18n/navigation.ts — re-export locale-aware `Link`, `redirect`, `useRouter` from `next-intl/navigation` using routing (depends on T004)
- [X] T006 Create src/i18n/request.ts — `getRequestConfig` that loads `messages/${locale}.json` per request (depends on T004)
- [X] T007 Create src/i18n.d.ts — declare `AppConfig { Messages: typeof en }` for type-safe translation keys (depends on T003)
- [X] T008 Create middleware.ts at repo root — `createMiddleware(routing)` + matcher that excludes `api`, `_next`, `admin`, `images`, `fonts`, `favicon.ico` (depends on T004)

**Checkpoint**: i18n infrastructure complete — app restructure and component work can begin

---

## Phase 3: User Story 1 — App Directory Restructure (P1) 🎯 MVP

**Goal**: All storefront routes served under `src/app/[locale]/` so next-intl can inject the locale param into every page

**Independent Test**: `npm run dev` — both `/` and `/en/` load without errors; admin at `/admin` still works with no locale prefix

### Implementation for User Story 1

- [X] T009 [US1] Create src/app/[locale]/layout.tsx — move root layout content, wrap children with `<NextIntlClientProvider messages={messages}>`, set `<html lang={locale}>`, load messages via `getMessages()` from next-intl (depends on T005, T006)
- [X] T010 [US1] Move src/app/(shop)/page.tsx → src/app/[locale]/(shop)/page.tsx — add `{ params: { locale: string } }` to `generateMetadata()` and use `getTranslations` for meta.homeTitle / meta.homeDescription (depends on T009)
- [X] T011 [P] [US1] Move src/app/(shop)/products/page.tsx → src/app/[locale]/(shop)/products/page.tsx — add locale params + `generateMetadata()` using `meta.productsTitle` (depends on T009)
- [X] T012 [P] [US1] Move src/app/(shop)/blog/page.tsx → src/app/[locale]/(shop)/blog/page.tsx — add locale params + `generateMetadata()` using `meta.blogTitle` (depends on T009)
- [X] T013 [P] [US1] Move src/app/(shop)/contact/page.tsx → src/app/[locale]/(shop)/contact/page.tsx — add locale params + `generateMetadata()` using `meta.contactTitle` (depends on T009)
- [X] T014 [P] [US1] Move src/app/(shop)/policy/page.tsx → src/app/[locale]/(shop)/policy/page.tsx — add locale params + `generateMetadata()` using `meta.policyTitle` (depends on T009)
- [X] T015 [P] [US1] Move src/app/(shop)/about/page.tsx → src/app/[locale]/(shop)/about/page.tsx — add locale params + `generateMetadata()` using `meta.aboutTitle` (depends on T009)
- [X] T016 [P] [US1] Move src/app/(shop)/about/story/page.tsx → src/app/[locale]/(shop)/about/story/page.tsx — add locale params + `generateMetadata()` using `meta.aboutStoryTitle` (depends on T015)
- [X] T017 [P] [US1] Move src/app/(shop)/about/philosophy/page.tsx → src/app/[locale]/(shop)/about/philosophy/page.tsx — add locale params + `generateMetadata()` using `meta.aboutPhilosophyTitle` (depends on T015)
- [X] T018 [P] [US1] Move src/app/(shop)/about/perfumers/page.tsx → src/app/[locale]/(shop)/about/perfumers/page.tsx — add locale params + `generateMetadata()` using `meta.aboutPerfumersTitle` (depends on T015)
- [X] T019 [P] [US1] Move src/app/(shop)/about/certifications/page.tsx → src/app/[locale]/(shop)/about/certifications/page.tsx — add locale params + `generateMetadata()` using `meta.aboutCertsTitle` (depends on T015)
- [X] T020 [P] [US1] Move src/app/(shop)/about/catalogue/page.tsx → src/app/[locale]/(shop)/about/catalogue/page.tsx — add locale params + `generateMetadata()` using `meta.aboutCatalogueTitle` (depends on T015)
- [X] T021 [P] [US1] Move src/app/(shop)/cart/page.tsx → src/app/[locale]/(shop)/cart/page.tsx — add locale params (depends on T009)
- [X] T022 [P] [US1] Move src/app/(shop)/checkout/page.tsx → src/app/[locale]/(shop)/checkout/page.tsx — add locale params (depends on T009)
- [X] T023 [US1] Delete old src/app/(shop)/ directory after all pages have been moved to src/app/[locale]/(shop)/ and verify no orphaned files remain

**Checkpoint**: `/` and `/en/` both load; `/admin` unaffected; TypeScript props compile

---

## Phase 4: User Story 2 — Component Translations (P2)

**Goal**: Navbar labels translated via `useTranslations('nav')`, LocaleSwitcher lets users toggle VI/EN

**Independent Test**: Dev server running — switching `EN` in navbar changes labels and URL to `/en/...`; switching `VI` returns to `/...`

### Implementation for User Story 2

- [X] T024 [US2] Create src/components/layout/LocaleSwitcher.tsx — `'use client'` component using `useLocale()` + `useRouter()` from `@/i18n/navigation`; renders `VI / EN` with active locale in `text-accent font-bold`; calls `router.replace(pathname, { locale })` on click (depends on T005)
- [X] T025 [US2] Update src/components/layout/NavLinks.tsx — replace hardcoded Vietnamese strings with `useTranslations('nav')`, replace `next/link` import with `Link` from `@/i18n/navigation` (depends on T005, T002)
- [X] T026 [US2] Update src/components/layout/Navbar.tsx — import and render `<LocaleSwitcher />` to the right of `<NavbarAuthButton />` (depends on T024)
- [X] T027 [P] [US2] Update src/components/layout/Footer.tsx — replace any `next/link` storefront `<Link>` imports with `Link` from `@/i18n/navigation` if Footer contains internal storefront links (depends on T005)

**Checkpoint**: VI/EN toggle works; all nav labels translate; Footer links locale-aware

---

## Phase 5: Polish & Validation

**Purpose**: Verify the entire implementation compiles and builds cleanly

- [X] T028 Run `npx tsc --noEmit` — must exit 0 with zero errors
- [X] T029 Run `npm run build` — must complete with zero errors
- [ ] T030 Manually validate against quickstart.md steps 1–12 (admin route exclusion, cookie persistence, 404 on unknown locale)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — **BLOCKS** Phases 3 and 4
- **Phase 3 (US1 — Restructure)**: Depends on Phase 2 completion; T011–T014 and T015–T022 can run in parallel groups
- **Phase 4 (US2 — Components)**: Depends on Phase 2; can start in parallel with Phase 3 only for T024 (LocaleSwitcher) once T005 is done; T025/T026 need T024; T027 is independent
- **Phase 5 (Polish)**: Depends on Phases 3 and 4 fully complete

### Within Phase 3

- T009 (locale layout) MUST complete before any page move (T010–T022)
- T015 (about/page.tsx) MUST complete before about sub-pages (T016–T020)
- T011–T014 (products, blog, contact, policy) are parallel with each other and with T015 once T009 is done
- T016–T020 (about sub-pages) are parallel with each other once T015 is done
- T021–T022 (cart, checkout) are parallel with each other once T009 is done

### Parallel Opportunities

```bash
# Phase 2 — run in parallel:
T002 vi.json
T003 en.json
T004 routing.ts

# Phase 3 group A — after T009:
T011 products/page.tsx
T012 blog/page.tsx
T013 contact/page.tsx
T014 policy/page.tsx
T015 about/page.tsx
T021 cart/page.tsx
T022 checkout/page.tsx

# Phase 3 group B — after T015:
T016 about/story/page.tsx
T017 about/philosophy/page.tsx
T018 about/perfumers/page.tsx
T019 about/certifications/page.tsx
T020 about/catalogue/page.tsx
```

---

## Implementation Strategy

### MVP Scope (Phases 1–3 only)

1. Complete Phase 1: install next-intl
2. Complete Phase 2: all infra files
3. Complete Phase 3: all routes under [locale]
4. **STOP and VALIDATE**: both `/` and `/en/products` load; admin still works
5. Proceed to Phase 4 once routing is stable

### Incremental Delivery

1. Phases 1 + 2 → i18n infrastructure ready (no visible change)
2. Phase 3 → routing works, pages served under [locale], metadata translates
3. Phase 4 → nav labels translate, locale switcher is interactive
4. Phase 5 → clean build confirmed, ready to ship

---

## Notes

- `[P]` = tasks touch different files, safe to run simultaneously
- T005–T008 are sequential (each builds on T004 routing)
- After Phase 3 completes, delete the old `src/app/(shop)/` directory (T023) — not before
- Admin (`src/app/admin/**`) and API (`src/app/api/**`) routes are **never** moved — do not touch them
- All storefront `<Link>` must import from `@/i18n/navigation`, not `next/link`; admin keeps `next/link`
