# Spec: Multi-locale Support (Vietnamese + English)

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for planning
**Source:** User request 2026-06-27

---

## 1. Overview

Add full multi-locale support using **next-intl**. Vietnamese (`vi`) is the default locale (no URL prefix). English (`en`) is accessed at `/en/...`. A locale switcher in the Navbar lets users toggle between VI and EN. All UI strings — nav labels, page headings, CTAs, metadata — are extracted into translation JSON files.

---

## 2. Locale Strategy

| Decision            | Choice                                   | Reason                                      |
| ------------------- | ---------------------------------------- | ------------------------------------------- |
| Default locale      | `vi` — no URL prefix (`/products`)       | Target market is Vietnam; cleaner URLs      |
| Secondary locale    | `en` — prefixed (`/en/products`)         | Standard next-intl pathnames config         |
| Detection           | Cookie → `Accept-Language` header → `vi` | Persist user choice across sessions         |
| Locale switcher UI  | Two-letter toggle in Navbar: `VI / EN`   | Compact, consistent with brand minimal style |

---

## 3. Scope of Translation

### Phase A — Navigation & Shell (this spec)
Translate: Navbar labels, Footer links, page `<title>` / meta description templates.

### Phase B — Page content (future)
Product names/descriptions, blog posts, policy text — deferred until CMS is confirmed.

> All `src/data/` bilingual fields added in spec 47 (`titleVi`/`titleEn`, etc.) are the bridge — spec 48 reads the correct field based on the active locale parameter.

---

## 4. Package

```
next-intl   ^3         (App Router support, no breaking changes from 2.x)
```

---

## 5. File Structure Changes

### New files
```
src/
├── i18n/
│   ├── routing.ts          ← defineRouting({ locales, defaultLocale })
│   ├── navigation.ts       ← re-export Link, redirect, useRouter with locale awareness
│   └── request.ts          ← getRequestConfig() — loads messages per request
├── middleware.ts            ← next-intl createMiddleware(routing)
└── messages/
    ├── vi.json             ← Vietnamese translations (source of truth)
    └── en.json             ← English translations
```

### App directory restructure
```
Before:  src/app/(shop)/products/page.tsx
After:   src/app/[locale]/(shop)/products/page.tsx
```

All route groups and pages move under `src/app/[locale]/`. The `[locale]` segment is validated by middleware — invalid locales get a 404.

### Layout update
```
src/app/[locale]/layout.tsx    ← wraps children in <NextIntlClientProvider messages={messages}>
```

---

## 6. TypeScript Interfaces

```typescript
// No new interfaces — next-intl provides its own typed hooks
// Add locale param to page props:
interface LocalePageProps {
  params: { locale: string }
}
```

---

## 7. Translation Keys — `messages/vi.json` (canonical)

```json
{
  "nav": {
    "home":           "Trang chủ",
    "products":       "Sản phẩm",
    "productsAll":    "Tất cả sản phẩm",
    "productsNam":    "Nam",
    "productsNu":     "Nữ",
    "productsUnisex": "Unisex",
    "about":          "Về chúng tôi",
    "aboutStory":     "Câu chuyện",
    "aboutPhilosophy":"Triết lý thương hiệu",
    "aboutPerfumers": "Nhà sáng tác hương",
    "aboutCerts":     "Chứng nhận",
    "aboutCatalogue": "Catalogue",
    "blog":           "Blog",
    "blogAll":        "Tất cả bài viết",
    "blogGuide":      "Hướng dẫn nước hoa",
    "blogLifestyle":  "Phong cách sống",
    "contact":        "Liên hệ",
    "policy":         "Chính sách"
  },
  "localeSwitcher": {
    "label": "Ngôn ngữ",
    "vi":    "VI",
    "en":    "EN"
  },
  "meta": {
    "siteName": "Parfum",
    "homeTitle": "Trang chủ | Parfum",
    "homeDescription": "Nước hoa cao cấp L'ANGELULUS — hương thơm kể câu chuyện của bạn."
  }
}
```

`messages/en.json` mirrors the same keys with English values.

---

## 8. Files to Generate / Modify

```
src/
├── middleware.ts                              ← NEW
├── i18n/
│   ├── routing.ts                            ← NEW
│   ├── navigation.ts                         ← NEW
│   └── request.ts                            ← NEW
├── messages/
│   ├── vi.json                               ← NEW
│   └── en.json                               ← NEW
└── app/
    └── [locale]/                             ← RENAME from root app/ pages
        ├── layout.tsx                        ← wrap with NextIntlClientProvider
        ├── (shop)/
        │   ├── page.tsx                      ← add { params }: LocalePageProps
        │   ├── products/page.tsx
        │   ├── about/page.tsx
        │   ├── about/story/page.tsx
        │   ├── about/philosophy/page.tsx
        │   ├── about/perfumers/page.tsx
        │   ├── about/certifications/page.tsx
        │   ├── about/catalogue/page.tsx
        │   ├── blog/page.tsx
        │   ├── contact/page.tsx
        │   └── policy/page.tsx
        └── admin/                            ← also moved under [locale]
```

Update:
```
src/components/layout/NavLinks.tsx            ← use useTranslations('nav') for all labels
src/components/layout/Navbar.tsx              ← add <LocaleSwitcher /> next to auth button
src/components/layout/LocaleSwitcher.tsx      ← NEW client component (VI / EN toggle)
```

---

## 9. LocaleSwitcher Component

```
Position: right of <NavbarAuthButton />, always visible on desktop
Style:    font-serif text-sm, active locale bold text-accent, separator "/"
Behavior: clicking a locale uses next-intl useRouter().replace() to switch
          locale while staying on the same path
```

---

## 10. Middleware Config

```typescript
// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix: 'as-needed',   // /vi/ omitted, /en/ present
})
```

Middleware matches all paths except `/_next/`, `/api/`, `/images/`, `/fonts/`, `/favicon.ico`.

---

## 11. Acceptance Criteria

- [ ] `/products` serves the page in Vietnamese
- [ ] `/en/products` serves the same page in English
- [ ] Clicking the `EN` switcher in Navbar navigates from `/products` → `/en/products`
- [ ] Clicking the `VI` switcher navigates from `/en/products` → `/products`
- [ ] Locale preference is stored in a cookie (`NEXT_LOCALE`) and persists on refresh
- [ ] All 6 top-level nav labels are translated (VI + EN)
- [ ] All dropdown sub-labels are translated (VI + EN)
- [ ] `generateMetadata()` returns locale-correct `title` and `description`
- [ ] Admin routes (`/admin/...`) are excluded from locale prefix requirements
- [ ] `tsc --noEmit` passes with zero errors
- [ ] `npm run build` completes without errors
