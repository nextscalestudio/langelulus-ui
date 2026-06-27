# Data Model: Multi-locale (i18n)

There are no new runtime data entities for this feature. The data model is the **translation message schema** — the JSON shape that both locale files must conform to.

---

## Message Schema (TypeScript view)

```typescript
interface Messages {
  nav: {
    home:           string   // "Trang chủ" / "Home"
    products:       string   // "Sản phẩm" / "Products"
    productsAll:    string   // "Tất cả sản phẩm" / "All Products"
    productsNam:    string   // "Nam" / "Men"
    productsNu:     string   // "Nữ" / "Women"
    productsUnisex: string   // "Unisex" / "Unisex"
    about:          string   // "Về chúng tôi" / "About Us"
    aboutStory:     string   // "Câu chuyện" / "Our Story"
    aboutPhilosophy:string   // "Triết lý thương hiệu" / "Brand Philosophy"
    aboutPerfumers: string   // "Nhà sáng tác hương" / "Our Perfumers"
    aboutCerts:     string   // "Chứng nhận" / "Certifications"
    aboutCatalogue: string   // "Catalogue" / "Catalogue"
    blog:           string   // "Blog" / "Blog"
    blogAll:        string   // "Tất cả bài viết" / "All Articles"
    blogGuide:      string   // "Hướng dẫn nước hoa" / "Fragrance Guide"
    blogLifestyle:  string   // "Phong cách sống" / "Lifestyle"
    contact:        string   // "Liên hệ" / "Contact"
    policy:         string   // "Chính sách" / "Policy"
  }
  localeSwitcher: {
    label: string            // "Ngôn ngữ" / "Language"
    vi:    string            // "VI" / "VI"
    en:    string            // "EN" / "EN"
  }
  meta: {
    siteName:         string
    homeTitle:        string
    homeDescription:  string
    productsTitle:    string
    aboutTitle:       string
    aboutStoryTitle:  string
    aboutPhilosophyTitle: string
    aboutPerfumersTitle:  string
    aboutCertsTitle:      string
    aboutCatalogueTitle:  string
    blogTitle:        string
    contactTitle:     string
    policyTitle:      string
  }
  about: {
    overviewHeading:     string
    storyHeading:        string
    philosophyHeading:   string
    perfumersHeading:    string
    certsHeading:        string
    catalogueHeading:    string
    catalogueCtaLabel:   string
    catalogueDescr:      string
  }
}
```

---

## File Locations

```
messages/
├── vi.json   ← source of truth (Vietnamese, complete)
└── en.json   ← must mirror all keys from vi.json (English values)
```

**Validation rule**: Both files must contain identical key sets. Missing keys in `en.json` fall back to `vi` at runtime (next-intl default), but the type declaration in `src/i18n.d.ts` makes gaps a TypeScript error.

---

## i18n Infrastructure Files

These are config/infra, not data entities:

| File                        | Role                                               |
| --------------------------- | -------------------------------------------------- |
| `src/i18n/routing.ts`       | `defineRouting({ locales, defaultLocale, localePrefix })` |
| `src/i18n/navigation.ts`    | Re-exports locale-aware `Link`, `useRouter`, `redirect` |
| `src/i18n/request.ts`       | `getRequestConfig` — loads correct `messages/*.json` per request |
| `src/i18n.d.ts`             | Type declaration wiring `Messages` → next-intl     |
| `middleware.ts`             | `createMiddleware(routing)` + matcher config       |

---

## Locale Enum

```typescript
type Locale = 'vi' | 'en'
// Sourced from routing.locales — do not duplicate as a standalone const
```

---

## Page Props Convention

All locale-parameterised page components receive:

```typescript
interface LocalePageProps {
  params: { locale: string }
  // ...any existing params (e.g. slug for blog detail)
}
```

The existing non-locale `PageProps` types in `src/types/index.ts` remain unchanged.
