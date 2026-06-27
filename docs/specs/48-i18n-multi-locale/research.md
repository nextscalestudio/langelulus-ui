# Research: Multi-locale with next-intl

## 1. Library Selection

**Decision**: `next-intl ^3` (App Router native).  
**Rationale**: First-class Next.js 14 App Router support via `getRequestConfig` (RSC-compatible), typed `useTranslations` hook, built-in locale-aware `Link`/`redirect`/`useRouter`, and `localePrefix: 'as-needed'` for clean URLs. No config-file hacks needed.  
**Alternatives considered**:
- `next-i18next` — designed for Pages Router, requires `serverSideTranslations` wrapper on every page; not suitable.
- Hand-rolled dictionary approach — workable for small projects but loses type-safety, no middleware routing, no ICU message formatting.

---

## 2. URL / Prefix Strategy

**Decision**: `localePrefix: 'as-needed'` — default locale (`vi`) gets no prefix, secondary locale (`en`) gets `/en/...`.  

| URL              | Locale |
| ---------------- | ------ |
| `/products`      | vi     |
| `/en/products`   | en     |
| `/about/story`   | vi     |
| `/en/about/story`| en     |

**Rationale**: Target market is Vietnamese; cleaner URLs for the majority. `/en/` prefix only where needed.  
**Alternatives**: Equal prefixes (`/vi/...` and `/en/...`) — rejected because it adds a redundant `/vi/` segment for 90%+ of traffic.

---

## 3. App Directory Restructure

**Decision**: Move all public-facing routes under `src/app/[locale]/`. Keep admin and API outside.

```
src/app/
├── [locale]/
│   ├── layout.tsx           ← adds NextIntlClientProvider + html lang attribute
│   └── (shop)/              ← public storefront (unchanged group)
│       ├── page.tsx
│       ├── products/
│       ├── about/
│       │   ├── page.tsx
│       │   ├── story/
│       │   ├── philosophy/
│       │   ├── perfumers/
│       │   ├── certifications/
│       │   └── catalogue/
│       ├── blog/
│       ├── cart/
│       ├── checkout/
│       ├── contact/
│       └── policy/
├── admin/                   ← stays at root (no locale param)
├── api/                     ← stays at root
└── layout.tsx               ← root layout (html/body only, no NextIntl)
```

**Rationale**: admin and API routes never need localization. Keeping them at root avoids `/en/admin` URLs and simplifies auth middleware.

---

## 4. Admin Route Exclusion from Middleware

**Decision**: Middleware matcher excludes `/admin/**`, `/api/**`, `/_next/**`, and static assets.

```ts
export const config = {
  matcher: ['/((?!api|_next|admin|images|fonts|favicon\\.ico|downloads).*)']
}
```

**Rationale**: NextAuth callbacks live at `/api/auth/**`; excluding `/api` prevents middleware interference. Admin is excluded so session-protected routes don't need locale wrapping.

---

## 5. Internal Link Migration

**Decision**: Replace `next/link` with next-intl's locale-aware `Link` **only in components that render storefront links**. Admin and API files keep standard `next/link`.

| File type          | Import source                              |
| ------------------ | ------------------------------------------ |
| Storefront components | `@/i18n/navigation` → `{ Link }`       |
| Admin components   | `next/link` (unchanged)                    |
| NavLinks.tsx       | `@/i18n/navigation` → `{ Link, useRouter }`|

**Migration scope**: NavLinks, Footer, ProductCard, any `<Link href="/products">` in storefront.

---

## 6. Navbar — Keeping Server + Client Split

**Decision**: `Navbar.tsx` stays a server component. `NavLinks.tsx` (already client) switches to next-intl `Link` + `useTranslations`. A new `LocaleSwitcher.tsx` client component handles locale toggle.

```
Navbar.tsx (server)
├── <NavLinks />    ← client, uses useTranslations + next-intl Link
└── <LocaleSwitcher /> ← client, uses useRouter + useLocale from next-intl
```

**Locale switcher behavior**: Calls `router.replace(pathname, { locale: newLocale })` — stays on the same page, just switches locale.

---

## 7. Metadata Localization

**Decision**: Each page's `generateMetadata()` receives `params: { locale: string }` and calls next-intl's `getTranslations({ locale, namespace: 'meta' })`.

```ts
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' })
  return { title: t('productsTitle') }
}
```

---

## 8. Translation File Organization

**Decision**: Flat namespaced JSON in `messages/vi.json` and `messages/en.json`.

Namespaces:
- `nav` — all navbar labels and dropdown sub-labels
- `meta` — page titles and descriptions
- `localeSwitcher` — switcher UI labels
- `about` — About section page headings and CTAs (Phase A)

Product names, blog content, policy text remain in data files (Phase B, future).

---

## 9. TypeScript Type Safety

next-intl v3 supports type-safe messages via `src/i18n.d.ts`:

```ts
// src/i18n.d.ts
import en from '../messages/en.json'
declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof en
  }
}
```

This makes `t('nav.home')` type-checked — typos become compile errors.

---

## 10. Cookie Persistence

**Decision**: next-intl middleware automatically sets the `NEXT_LOCALE` cookie when a user explicitly navigates to a locale-prefixed URL or when `LocaleSwitcher` changes locale. No manual cookie handling needed.
