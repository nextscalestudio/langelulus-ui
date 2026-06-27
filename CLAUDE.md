<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->

# Project: Parfum Shop

Next.js 15 perfume e-commerce site with next-intl multi-locale support (vi/en).

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **i18n**: next-intl (`localePrefix: 'always'`)
- **Styling**: Tailwind CSS — brand tokens: `bg-accent` (#0000ff), `bg-secondary` (#000000), `font-serif` (Times New Roman)
- **Auth**: NextAuth v5
- **State**: Zustand (cart, UI stores)
- **Animations**: Framer Motion

## Shell Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npx tsc --noEmit # type check
```

## Route Structure

```
src/app/
├── page.tsx              # redirects / → /vi (default locale)
├── layout.tsx            # root layout (no locale)
├── [locale]/             # all public pages (vi/en)
│   ├── layout.tsx        # validates locale, wraps with NextIntlClientProvider
│   └── (shop)/           # route group (no URL segment)
│       ├── page.tsx      # home
│       ├── products/
│       ├── blog/
│       ├── cart/
│       ├── checkout/
│       ├── about/
│       ├── contact/
│       └── policy/
└── admin/                # admin panel — no locale prefix, excluded from middleware
```

## i18n Rules — CRITICAL

**Always use `@/i18n/navigation` for locale-aware routing. Never use `next/link` or `next/navigation` in shop components.**

```typescript
// CORRECT
import { Link, useRouter, usePathname } from '@/i18n/navigation'

// WRONG — breaks locale prefix
import Link from 'next/link'
import { useRouter } from 'next/navigation'
```

**Locale switcher** must use raw `usePathname` from `next/navigation` and strip the locale prefix manually — next-intl's `usePathname` lags after a locale switch and causes double-prefix bugs (`/en/en/products`):

```typescript
import { usePathname } from 'next/navigation'      // raw path
import { useRouter } from '@/i18n/navigation'       // locale-aware router
// strip prefix before router.replace(stripped, { locale: next })
```

**Exception**: `src/app/admin/` and API routes use regular `next/link` / `next/navigation` — they are excluded from i18n middleware.

## Key Files

| File | Purpose |
|------|---------|
| `src/i18n/routing.ts` | Defines locales `['vi', 'en']`, `defaultLocale: 'vi'`, `localePrefix: 'always'` |
| `src/i18n/navigation.ts` | Exports locale-aware `Link`, `useRouter`, `usePathname`, `redirect` |
| `src/i18n/request.ts` | Server-side locale + message loading |
| `middleware.ts` | next-intl middleware — excludes `api`, `_next`, `admin`, `images`, `fonts` |
| `messages/vi.json` | Vietnamese translations |
| `messages/en.json` | English translations |
| `src/app/page.tsx` | Root redirect to `/${defaultLocale}` |
