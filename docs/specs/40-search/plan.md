# Plan: Global Search (Spec 40)

## Tech Stack
- Next.js 14 App Router
- TypeScript strict
- Tailwind CSS
- Zustand (ui-store)
- React hooks (`useEffect`, `useRef`, `useState`, `useCallback`)

## Architecture

### State — `src/lib/store/ui-store.ts`
Add `isSearchOpen`, `openSearch`, `closeSearch` to the existing UIStore alongside cart state.

### Components
| File | Type | Purpose |
|------|------|---------|
| `src/components/layout/SearchIconButton.tsx` | client | Magnifying glass button in Navbar; calls `openSearch()` |
| `src/components/layout/SearchModal.tsx` | client | Full-screen modal with debounced search, grouped results, keyboard nav |

### Search Logic (in SearchModal)
- Debounce: 200ms via `useRef<setTimeout>`
- Sources: `src/data/products.ts`, `src/data/blog-posts.ts`, static pages array
- Grouping: Products → Articles → Pages, max 4 per group
- Keyboard: `↑`/`↓` moves flat highlight index, `Enter` navigates, `Escape` closes

### Integration Points
- `src/components/layout/Navbar.tsx` — import `SearchIconButton`, render before `CartIconButton`
- `src/app/layout.tsx` — import `SearchModal`, render after `CartDrawer`
