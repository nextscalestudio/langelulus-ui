# Roadmap — Perfume Shop

## Assumptions

- Next.js 14 App Router, TypeScript strict, Tailwind CSS, Framer Motion
- Static product/blog data in `src/data/` — ⚠️ Confirm: CMS (Sanity/Contentful) or DB (Prisma+Postgres) needed later?
- Cart client-side with Zustand + localStorage
- Payment: COD + bank transfer only (no payment gateway)
- Auth: Google only via NextAuth.js v5
- Admin protected by `role: 'admin'` on NextAuth session
- ⚠️ Hosting not confirmed — Vercel assumed

## Build Order

| #   | Feature                          | Spec file                           | Est. files | Depends on      |
| --- | -------------------------------- | ----------------------------------- | ---------- | --------------- |
| 01  | Project setup + TS interfaces    | 01-project-setup.spec.md            | 5          | —               |
| 02  | Navbar                           | 02-navbar.spec.md                   | 2          | 01              |
| 03  | Footer                           | 03-footer.spec.md                   | 1          | 01              |
| 04  | Product + blog types + data      | 04-data.spec.md                     | 4          | 01              |
| 05  | UI primitives (Button, Toast)    | 05-ui-primitives.spec.md            | 5          | 01              |
| 06  | ProductCard component            | 06-product-card.spec.md             | 2          | 04, 05          |
| 07  | Hero + promo strip               | 07-hero.spec.md                     | 3          | 02, 03          |
| 08  | Brand intro + Why choose us      | 08-brand-sections.spec.md           | 2          | 01              |
| 09  | Featured products (home)         | 09-featured-products.spec.md        | 2          | 06              |
| 10  | Collections section (home)       | 10-collections.spec.md              | 2          | 04              |
| 11  | Scent stories section (home)     | 11-scent-stories.spec.md            | 2          | 04              |
| 12  | Testimonials section (home)      | 12-testimonials.spec.md             | 2          | 01              |
| 13  | Featured articles (home)         | 13-featured-articles.spec.md        | 2          | 04              |
| 14  | Lifestyle gallery (home)         | 14-lifestyle-gallery.spec.md        | 2          | 01              |
| 15  | About page                       | 15-about.spec.md                    | 2          | 02, 03          |
| 16  | Product listing page             | 16-product-listing.spec.md          | 4          | 06              |
| 17  | Product filters                  | 17-product-filters.spec.md          | 4          | 16              |
| 18  | Product detail: main area        | 18-product-detail-main.spec.md      | 5          | 04, 05          |
| 19  | Product detail: scent info       | 19-product-detail-scent.spec.md     | 2          | 18              |
| 20  | Product detail: specs + usage    | 20-product-detail-specs.spec.md     | 2          | 18              |
| 21  | Product detail: policies         | 21-product-detail-policies.spec.md  | 2          | 18              |
| 22  | Customer reviews                 | 22-reviews.spec.md                  | 4          | 18              |
| 23  | Related products                 | 23-related-products.spec.md         | 2          | 06, 18          |
| 24  | Cart: Zustand store              | 24-cart-store.spec.md               | 3          | 04              |
| 25  | Cart drawer                      | 25-cart-drawer.spec.md              | 3          | 24              |
| 26  | Cart page                        | 26-cart-page.spec.md                | 4          | 24, 25          |
| 27  | Checkout: recipient form         | 27-checkout-form.spec.md            | 4          | 24              |
| 28  | Checkout: payment + summary      | 28-checkout-payment.spec.md         | 4          | 27              |
| 29  | Order confirmation page          | 29-order-confirmation.spec.md       | 2          | 28              |
| 30  | Google auth (NextAuth)           | 30-auth.spec.md                     | 4          | 01              |
| 31  | Blog listing page                | 31-blog-listing.spec.md             | 4          | 04              |
| 32  | Blog detail page                 | 32-blog-detail.spec.md              | 5          | 31              |
| 33  | Contact page                     | 33-contact.spec.md                  | 3          | 02, 03          |
| 34  | Policy pages                     | 34-policy-pages.spec.md             | 3          | 02, 03          |
| 35  | Admin: layout + dashboard        | 35-admin-layout.spec.md             | 5          | 30              |
| 36  | Admin: products CRUD             | 36-admin-products.spec.md           | 6          | 35              |
| 37  | Admin: orders management         | 37-admin-orders.spec.md             | 4          | 35              |
| 38  | Admin: blog management           | 38-admin-blog.spec.md               | 4          | 35              |
| 39  | Admin: customers + coupons       | 39-admin-customers.spec.md          | 5          | 35              |
| 40  | Global search                    | 40-search.spec.md                   | 4          | 04, 31          |
| 41  | Social widgets + Google tracking | 41-social-tracking.spec.md          | 3          | 01              |
| 42  | SEO setup                        | 42-seo.spec.md                      | 4          | 01              |
| 43  | Animations                       | 43-animations.spec.md               | 3          | 01              |

## Session Boundaries

Each row = one `claude` session. Run `/clear` between sessions.

## Flagged — Confirm Before Building

⚠️ **04 — Data layer**: Static JSON assumed. Will you use Sanity CMS, Contentful, or Prisma + Postgres? Shapes the entire data layer.
⚠️ **22 — Reviews**: Static mock reviews assumed. A real review system needs a DB + API route.
⚠️ **28 — Payment**: Bank transfer requires showing bank account details. Confirm account info to embed.
⚠️ **32 — Blog comments**: Static comments assumed. Real comments need a DB or a service (e.g., Giscus).
⚠️ **35 — Admin auth**: Admin role must be seeded in the auth provider or DB. Confirm how admin users are designated.
⚠️ **Hosting**: Vercel assumed. If self-hosted, adjust `next.config.ts` output mode and env var strategy.
