# Spec: Contact Page

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

The `/contact` page with a contact form (name, email, phone, message), business info panel, and an embedded Google Map.

---

## 2. Visual Design

| Token           | Value                                               |
| --------------- | --------------------------------------------------- |
| Page layout     | 2-col desktop (form left / info + map right), stacked mobile |
| Form heading    | Times New Roman 28px, `#000000`                     |
| Label           | Times New Roman 14px bold, `#000000`                |
| Input           | border `1px solid #000`, h-10, focus ring `#0000ff` |
| Textarea        | same as input, h-32, resize-y                       |
| Submit btn      | Button `primary` "Send Message"                     |
| Info panel bg   | `#000000`                                           |
| Info text       | white, Times New Roman                              |
| Map container   | `h-64`, rounded corners                             |

---

## 3. TypeScript Interfaces

```typescript
interface ContactFormData {
  fullName: string
  email: string
  phone: string
  message: string
}
```

---

## 4. Data / Config

Business info (hardcoded):
- Address: (placeholder — fill with real address)
- Phone: (placeholder)
- Email: contact@parfum.vn
- Hours: Mon–Sat 9am–6pm

Google Map: embed via `<iframe>` with a placeholder Google Maps embed URL. ⚠️ Replace with real store coordinates.

---

## 5. Files to Generate

```
src/
└── app/
    └── (shop)/
        └── contact/
            └── page.tsx
```

---

## 6. Behavior

- Client Component (`'use client'`).
- On submit: POST to `/api/contact` (API route to create, accepts form data, logs it — SMTP wired separately in spec 41).
- Validation: all fields required, email format, phone 10 digits.
- On success: show toast "Message sent! We'll reply within 24 hours." and reset form.
- On error: show error toast.
- Google Map: `<iframe>` with `loading="lazy"` attribute.

---

## 7. Acceptance Criteria

- [ ] Route `/contact` renders without errors
- [ ] All 4 fields validate before submission
- [ ] Success toast shown after submit
- [ ] Form resets after success
- [ ] Google Map `<iframe>` renders
- [ ] Page exports `generateMetadata` with title "Contact | Parfum"
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/33-contact.spec.md

Implement:
1. src/app/api/contact/route.ts  (POST — console.log the body for now)
2. src/app/(shop)/contact/page.tsx

Verify Section 7 after generating — mark ✅ or ❌
```
