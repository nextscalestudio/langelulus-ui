# Spec: UI Primitives

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Shared low-level UI components used across all pages: Button, Badge, Toast notification, loading Skeleton, and Modal wrapper. Build these before any feature components.

---

## 2. Visual Design

| Component | Style |
| --------- | ----- |
| Button primary | bg `#0000ff`, text white, hover darken, Times New Roman |
| Button secondary | border `1px solid #000`, text `#000`, hover bg `#000` text white |
| Button ghost | no border, no bg, text `#000`, hover text `#0000ff` |
| Badge | small pill, bg `#0000ff`, text white, 12px font |
| Toast success | border-left `4px solid #0000ff`, white bg, black text |
| Toast error | border-left `4px solid #ff0000` |
| Skeleton | `#e5e7eb` animated pulse block |
| Modal | white bg, centered overlay, dark backdrop `rgba(0,0,0,0.5)` |

---

## 3. TypeScript Interfaces

```typescript
// Button props
type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

// Toast
type ToastType = 'success' | 'error' | 'info'

// Modal
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}
```

---

## 4. Data / Config

No static data needed.

---

## 5. Files to Generate

```
src/
└── components/
    └── ui/
        ├── Button.tsx
        ├── Badge.tsx
        ├── Toast.tsx           ← component + useToast hook
        ├── Skeleton.tsx
        └── Modal.tsx
```

---

## 6. Behavior

- `Button`: accepts `variant`, `size`, `disabled`, `loading` (shows spinner), `onClick`, `className`, `type` props. Renders `<button>` element.
- `Toast`: `useToast()` hook exposes `toast.success(msg)`, `toast.error(msg)`, `toast.info(msg)`. Toast appears bottom-right, auto-dismisses after 3s.
- `Skeleton`: accepts `className` for size. Renders `<div>` with pulse animation.
- `Modal`: traps focus, closes on backdrop click and `Escape` key. Uses React portal.

---

## 7. Acceptance Criteria

- [ ] `Button` renders all three variants with correct Tailwind classes
- [ ] `Button` with `loading` prop shows a spinner and is disabled
- [ ] `useToast()` triggers a toast that disappears after 3 seconds
- [ ] `Skeleton` has animated pulse
- [ ] `Modal` closes on backdrop click and Escape key
- [ ] All interactive elements have `aria-label` or `aria-*` attributes
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/05-ui-primitives.spec.md

Implement all files in Section 5, bottom-up:
1. src/components/ui/Skeleton.tsx
2. src/components/ui/Badge.tsx
3. src/components/ui/Button.tsx
4. src/components/ui/Modal.tsx
5. src/components/ui/Toast.tsx

Verify Section 7 after generating — mark ✅ or ❌
```
