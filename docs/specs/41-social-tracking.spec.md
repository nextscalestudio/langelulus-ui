# Spec: Social Widgets + Google Tracking

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Fixed social contact widget (Facebook, Messenger, Zalo, phone), Google Analytics integration via `next/script`, and a contact API route wired to send emails (SMTP setup stub).

---

## 2. Visual Design

| Token           | Value                                              |
| --------------- | -------------------------------------------------- |
| Widget position | fixed bottom-right, `z-50`, `bottom-6 right-6`    |
| Widget button   | 48px circle, bg `#0000ff`, white icon              |
| Expand state    | clicking main button reveals 4 social icon buttons stacked above |
| Icon colors     | Facebook `#1877f2`, Messenger `#0084ff`, Zalo `#0068ff`, Phone `#22c55e` |
| Hover tooltip   | label appears to the left of each icon             |

---

## 3. TypeScript Interfaces

```typescript
interface SocialLink {
  name: string
  href: string
  icon: string      // SVG path
  color: string
}
```

---

## 4. Data / Config

Social links (hardcoded — ⚠️ fill with real URLs):
- Facebook: `https://facebook.com/parfum`
- Messenger: `https://m.me/parfum`
- Zalo: `https://zalo.me/0123456789`
- Phone: `tel:0123456789`

Google Analytics ID: `G-XXXXXXXXXX` — read from `NEXT_PUBLIC_GA_ID` env var.
Google Search Console verification: meta tag in `layout.tsx`.

---

## 5. Files to Generate

```
src/
└── components/
    └── ui/
        ├── SocialWidget.tsx
        └── GoogleAnalytics.tsx
```

---

## 6. Behavior

- `SocialWidget`: Client Component. Toggle state for expand/collapse. Each link opens in `target="_blank"`.
- `GoogleAnalytics`: renders `<Script>` tags using `next/script` with `strategy="afterInteractive"`. Only renders if `NEXT_PUBLIC_GA_ID` is set.
- Add `<SocialWidget />` to `src/app/layout.tsx`.
- Add `<GoogleAnalytics />` to `src/app/layout.tsx`.
- Add Google Search Console verification meta tag to root `layout.tsx` `<head>` — value from `NEXT_PUBLIC_GSC_VERIFICATION` env var.
- Contact API route (`src/app/api/contact/route.ts` from spec 33): add Nodemailer stub — log email payload, add TODO for real SMTP credentials.

---

## 7. Acceptance Criteria

- [ ] Social widget appears fixed bottom-right on all pages
- [ ] Clicking main button toggles social icon stack
- [ ] All social links open in new tab
- [ ] `GoogleAnalytics` renders `<Script>` tags only when `NEXT_PUBLIC_GA_ID` is set
- [ ] GSC meta tag renders in `<head>` only when env var is set
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/41-social-tracking.spec.md

Implement all files in Section 5:
1. src/components/ui/GoogleAnalytics.tsx
2. src/components/ui/SocialWidget.tsx

Then:
- Add <SocialWidget /> and <GoogleAnalytics /> to src/app/layout.tsx
- Add GSC meta tag to layout.tsx <head>
- Update src/app/api/contact/route.ts with Nodemailer stub

Verify Section 7 after generating — mark ✅ or ❌
```
