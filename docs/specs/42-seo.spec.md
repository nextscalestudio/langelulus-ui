# Spec: SEO Setup

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Site-wide SEO configuration: root metadata defaults in `layout.tsx`, `sitemap.ts`, `robots.ts`, Open Graph tags, and JSON-LD structured data for products.

---

## 2. Visual Design

No UI. SEO is invisible to users.

---

## 3. TypeScript Interfaces

No new interfaces needed.

---

## 4. Data / Config

Root metadata (in `src/app/layout.tsx`):
```typescript
export const metadata: Metadata = {
  title: { default: 'Parfum', template: '%s | Parfum' },
  description: 'Luxury perfumes — discover your signature scent.',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Parfum',
  },
  robots: { index: true, follow: true },
}
```

Sitemap includes: `/`, `/about`, `/contact`, `/policy`, `/blog`, `/products`, and one entry per product slug and blog post slug.

---

## 5. Files to Generate

```
src/
└── app/
    ├── sitemap.ts
    ├── robots.ts
    └── (shop)/
        └── products/
            └── [slug]/
                └── _components/
                    └── ProductJsonLd.tsx   ← JSON-LD for Product schema
```

---

## 6. Behavior

- `sitemap.ts`: Next.js `MetadataRoute.Sitemap` — dynamic routes from `products` and `blogPosts` arrays.
- `robots.ts`: allow all, sitemap URL = `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`.
- `ProductJsonLd`: renders `<script type="application/ld+json">` with Product schema (name, image, description, price, currency, brand).
- Add `ProductJsonLd` to `/products/[slug]/page.tsx`.
- Each route's `page.tsx` already exports `generateMetadata()` (done in prior specs) — this spec only adds the root defaults, sitemap, robots, and structured data.

---

## 7. Acceptance Criteria

- [ ] `GET /sitemap.xml` returns valid XML with all product and blog URLs
- [ ] `GET /robots.txt` returns "Allow: /" and sitemap URL
- [ ] Product detail page `<head>` includes JSON-LD Product schema
- [ ] Root layout metadata includes Open Graph `siteName` and `locale`
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/42-seo.spec.md

Implement all files in Section 5:
1. src/app/robots.ts
2. src/app/sitemap.ts
3. src/app/(shop)/products/[slug]/_components/ProductJsonLd.tsx

Update src/app/layout.tsx with root metadata from Section 4.
Add <ProductJsonLd> to src/app/(shop)/products/[slug]/page.tsx.

Verify Section 7 after generating — mark ✅ or ❌
```
