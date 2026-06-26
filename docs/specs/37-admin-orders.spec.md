# Spec: Admin — Orders Management

**Project:** Perfume Shop
**Version:** 1.0
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

`/admin/orders` page: searchable, filterable table of all orders with status update capability and order detail view.

---

## 2. Visual Design

| Token           | Value                                                |
| --------------- | ---------------------------------------------------- |
| Status badge    | pill — pending `#f59e0b`, processing `#3b82f6`, shipped `#8b5cf6`, delivered `#22c55e`, cancelled `#ef4444` |
| Filter tabs     | tab row by status (All, Pending, Processing, etc.)   |
| Detail modal    | full order detail in `<Modal>` — items, recipient, totals |
| Status select   | `<select>` dropdown in detail modal to change status |

---

## 3. TypeScript Interfaces

Uses `Order` from `src/types/index.ts`. No new interfaces.

---

## 4. Data / Config

Reads from `localStorage` key `parfum-orders`.

---

## 5. Files to Generate

```
src/
└── app/
    └── admin/
        └── orders/
            ├── page.tsx
            └── _components/
                ├── OrdersTable.tsx
                └── OrderDetailModal.tsx
```

---

## 6. Behavior

- Tab filter: "All" + one tab per status. Active tab highlights in `#0000ff`.
- Search: filter by order ID or recipient name.
- "View" opens `OrderDetailModal` showing full order.
- Status dropdown in modal saves updated status back to localStorage.
- Date formatted as `DD/MM/YYYY HH:mm`.

---

## 7. Acceptance Criteria

- [ ] Table shows all orders from localStorage
- [ ] Status tab filtering works correctly
- [ ] Search filters by order ID and recipient name
- [ ] "View" opens correct order in modal
- [ ] Changing status in modal updates localStorage and badge
- [ ] `tsc --noEmit` passes with zero errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/37-admin-orders.spec.md

Implement all files in Section 5, bottom-up:
1. src/app/admin/orders/_components/OrderDetailModal.tsx
2. src/app/admin/orders/_components/OrdersTable.tsx
3. src/app/admin/orders/page.tsx

Verify Section 7 after generating — mark ✅ or ❌
```
