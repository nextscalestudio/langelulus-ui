# Plan: Social Widgets + Google Tracking (Spec 41)

## Tech Stack
- Next.js 14 App Router
- TypeScript strict
- Tailwind CSS
- `next/script` for GA tags
- Nodemailer stub (log-only) in contact API

## Architecture

### Components
| File | Type | Purpose |
|------|------|---------|
| `src/components/ui/GoogleAnalytics.tsx` | server/RSC | Renders `<Script>` tags when `NEXT_PUBLIC_GA_ID` is set |
| `src/components/ui/SocialWidget.tsx` | client | Fixed bottom-right expandable social icon stack |

### Integration Points
- `src/app/layout.tsx` — add `<GoogleAnalytics />`, `<SocialWidget />`, GSC meta tag from `NEXT_PUBLIC_GSC_VERIFICATION`
- `src/app/api/contact/route.ts` — log email payload, add TODO for real SMTP
