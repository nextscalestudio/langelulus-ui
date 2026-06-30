# Spec: Google Auth (NextAuth.js)

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Authentication with Google only using NextAuth.js v5. Sign In button in Navbar triggers Google OAuth. Session used to protect admin routes. User avatar shown in Navbar when signed in.

---

## 2. Visual Design

| Token           | Value                                              |
| --------------- | -------------------------------------------------- |
| Sign In button  | existing Navbar button (spec 02) — now wired       |
| Signed-in state | user avatar (32px circle) + "Sign Out" dropdown    |
| Dropdown bg     | white, border `1px solid #e5e7eb`, shadow-md       |
| Sign Out item   | Times New Roman, 14px, hover `text-accent`         |

---

## 3. TypeScript Interfaces

Extend NextAuth session type:

```typescript
// src/types/next-auth.d.ts
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      role?: 'admin' | 'user'
    } & DefaultSession['user']
  }
}
```

---

## 4. Data / Config

Required env vars (add to `.env.local`):
```
AUTH_SECRET=your-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
```

Admin email check: if `session.user.email` matches `ADMIN_EMAIL` env var, assign `role: 'admin'`.

---

## 5. Files to Generate

```
src/
├── auth.ts                          ← NextAuth config
├── middleware.ts                    ← protect /admin routes
├── types/
│   └── next-auth.d.ts
└── app/
    └── api/
        └── auth/
            └── [...nextauth]/
                └── route.ts
```

---

## 6. Behavior

- `auth.ts`: configures GoogleProvider, JWT strategy, adds `role` to token and session.
- `middleware.ts`: redirects unauthenticated requests to `/admin/**` back to `/`.
- Navbar: wire existing Sign In button to call `signIn('google')`. Show avatar + dropdown when signed in.
- Sign Out: calls `signOut()`, clears cart store.

---

## 7. Acceptance Criteria

- [ ] Clicking "Sign In" redirects to Google OAuth
- [ ] After auth, user avatar appears in Navbar
- [ ] "Sign Out" ends session and hides avatar
- [ ] `/admin` route redirects to `/` when not authenticated
- [ ] `session.user.role` is `'admin'` for the configured admin email
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/30-auth.spec.md

Implement all files in Section 5, bottom-up:
1. src/types/next-auth.d.ts
2. src/auth.ts
3. src/app/api/auth/[...nextauth]/route.ts
4. src/middleware.ts
5. Update src/components/layout/Navbar.tsx to wire Sign In/Out and avatar

Verify Section 7 after generating — mark ✅ or ❌
```
