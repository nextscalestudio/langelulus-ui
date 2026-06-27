# Tasks: Global Search (Spec 40)

## Phase 1 — Store

- [X] Add `isSearchOpen`, `openSearch`, `closeSearch` to `src/lib/store/ui-store.ts`

## Phase 2 — Components

- [X] Create `src/components/layout/SearchIconButton.tsx` (client button that calls `openSearch()`)
- [X] Create `src/components/layout/SearchModal.tsx` (full-screen modal with debounced search, grouped results, keyboard nav)

## Phase 3 — Integration

- [X] Wire `SearchIconButton` into `src/components/layout/Navbar.tsx` (right of cart icon)
- [X] Wire `SearchModal` into `src/app/layout.tsx`

## Phase 4 — Validation

- [X] `tsc --noEmit` passes with zero errors
