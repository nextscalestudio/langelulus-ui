# Perfume Shop — Claude Project Rules

## Stack

- Next.js 14 (App Router)
- TypeScript strict
- Tailwind CSS
- NextAuth.js v5 (Google provider only)
- Zustand (cart state)
- Framer Motion (animations)

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `tsc --noEmit` — type check (must pass before any task is done)
- `npm run lint` — ESLint

## Brand

- Background: `#ffffff`
- Accent: `#0000ff` (blue)
- Secondary: `#000000` (black)
- Font: Times New Roman — mapped as `font-serif` in `tailwind.config.ts`

## Design Tokens

All brand colors live as CSS custom properties in `src/app/globals.css` — update them there only:

```css
:root {
  --color-bg:        #ffffff;
  --color-accent:    #0000ff;
  --color-secondary: #000000;
}
```

These are wired into `tailwind.config.ts` so Tailwind utilities (`bg-accent`, `text-secondary`, etc.) always stay in sync:

```ts
theme: {
  extend: {
    colors: {
      bg:        'var(--color-bg)',
      accent:    'var(--color-accent)',
      secondary: 'var(--color-secondary)',
    },
  },
}
```

**Rules:**
- Never hardcode brand hex values anywhere — always use the Tailwind token (`text-accent`, `bg-bg`, `border-secondary`)
- To change a brand color, update only `globals.css` `:root` block

## Conventions

- Components: PascalCase, one per file
- Non-component files: kebab-case
- `interface` over `type` for object shapes
- All images: Next.js `<Image>`
- All internal links: Next.js `<Link>`
- No inline styles
- No `any` type
- No `console.log` in production code

## Folder Structure

```
src/
├── app/
│   ├── (shop)/             ← public storefront routes
│   │   ├── page.tsx        ← homepage
│   │   ├── products/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── blog/
│   │   ├── about/
│   │   ├── contact/
│   │   └── policy/
│   ├── admin/              ← protected admin routes
│   └── api/                ← API routes (auth, orders, contact)
├── components/
│   ├── layout/             ← Navbar, Footer
│   ├── home/               ← homepage section components
│   ├── product/            ← ProductCard, ProductGrid, detail sections
│   ├── cart/               ← CartDrawer, CartItem
│   ├── checkout/           ← CheckoutForm, PaymentSelector
│   ├── blog/               ← PostCard, PostDetail
│   ├── admin/              ← admin-specific UI
│   └── ui/                 ← Button, Badge, Toast, Skeleton, Modal
├── lib/
│   ├── store/              ← Zustand stores (cart)
│   └── auth.ts             ← NextAuth config
├── data/
│   ├── products.ts         ← static product data
│   └── blog-posts.ts       ← static blog post data
└── types/
    └── index.ts            ← all shared TypeScript interfaces
```

## Project-Specific Rules

- Cart persists via Zustand with localStorage middleware
- Payment: COD and bank transfer only (no third-party payment gateway)
- Auth: Google only — no email/password
- All prices in VND: `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })`
- Product and blog data is static in `src/data/` until a CMS/database is confirmed
- Admin routes are protected by NextAuth session with `role: 'admin'` check
- SEO: every page exports `generateMetadata()` from `src/app/(shop)/[route]/page.tsx`
- Animations use Framer Motion — no CSS keyframes in JS

## Spec-First Rule

Before implementing any component, check `docs/specs/` for a matching spec.
Implement exactly what the spec says — do not add unlisted features.
After generating, verify every item in the spec's Acceptance Criteria.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
