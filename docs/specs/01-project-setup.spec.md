# Spec: Project Setup

**Project:** Perfume Shop
**Version:** 1.1
**Status:** Ready for implementation
**Source:** Project brief

---

## 1. Overview

Bootstrap the Next.js 14 project: Tailwind brand config, global styles, root layout with font, and all shared TypeScript interfaces used across every future spec.

---

## 2. Visual Design

| Token            | Value                                             |
| ---------------- | ------------------------------------------------- |
| Background       | `#ffffff`                                         |
| Accent           | `#0000ff`                                         |
| Secondary        | `#000000`                                         |
| Font             | Times New Roman                                   |
| Tailwind classes | `bg-accent`, `text-accent`, `bg-secondary`, `text-secondary`, `font-serif` |

---

## 3. TypeScript Interfaces

File: `src/types/index.ts`

```typescript
// --- Scent & Product ---

export interface ScentNote {
  top: string[];
  middle: string[];
  base: string[];
}

export interface ScentProfile {
  family: string;
  notes: ScentNote;
  style: string;
  occasion: string[];
  emotionalDescription: string;
  targetAudience: string;
  feeling: string;
}

export interface ProductSpecs {
  volume: string;
  concentration: string;   // EDP | EDT | EDC | Parfum
  origin: string;
  longevity: string;
  sillage: string;
  gender: 'Male' | 'Female' | 'Unisex';
}

export interface UsageGuide {
  sprayPositions: string[];
  longevityTips: string[];
  storageTips: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  shortDescription: string;
  description: string;
  price: number;              // VND
  images: string[];
  availableVolumes: string[]; // ["30ml", "50ml", "100ml"]
  inStock: boolean;
  category: string;
  collection?: string;
  tags: string[];
  specs: ProductSpecs;
  scentProfile: ScentProfile;
  usageGuide: UsageGuide;
  rating: number;             // 0–5
  reviewCount: number;
  isFeatured: boolean;
  relatedProductIds: string[];
}

// --- Cart ---

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume: string;
}

// --- Orders ---

export interface RecipientInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  note?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  recipient: RecipientInfo;
  paymentMethod: 'cod' | 'bank_transfer';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  createdAt: string;
}

// --- Reviews ---

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar?: string;
  rating: number;   // 1–5
  comment: string;
  images?: string[];
  createdAt: string;
}

// --- Blog ---

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}

// --- Coupons ---

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  expiresAt?: string;
}
```

---

## 4. Data / Config

File: `tailwind.config.ts`

```typescript
theme: {
  extend: {
    colors: {
      background: '#ffffff',
      accent: '#0000ff',
      secondary: '#000000',
    },
    fontFamily: {
      serif: ['Times New Roman', 'Times', 'serif'],
    },
  },
}
```

---

## 5. Files to Generate

```
tailwind.config.ts
src/
├── types/
│   └── index.ts
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
```

---

## 6. Behavior

- `globals.css`: base font `Times New Roman`, background `#ffffff`, color `#000000`, box-sizing reset.
- `layout.tsx`: root layout with `<html lang="en">`, `<head>` metadata title "Parfum", `font-serif` class on `<body>`. Slots for Navbar + Footer (added in specs 02–03).
- `page.tsx`: minimal placeholder — centered `<h1>` "Welcome to Parfum" in accent blue.

---

## 7. Acceptance Criteria

- [ ] `tsc --noEmit` passes with zero errors
- [ ] `bg-accent`, `text-accent`, `bg-secondary`, `text-secondary` resolve as Tailwind classes
- [ ] `font-serif` maps to Times New Roman
- [ ] All interfaces in Section 3 are exported from `src/types/index.ts`
- [ ] Root layout sets `lang="en"` and title "Parfum"
- [ ] Homepage renders without runtime errors

---

## 8. Claude Code Prompt

```
@docs/CLAUDE.md @docs/specs/01-project-setup.spec.md

Implement all files in Section 5, bottom-up:
1. src/types/index.ts
2. tailwind.config.ts
3. src/app/globals.css
4. src/app/layout.tsx
5. src/app/page.tsx

Verify Section 7 after generating — mark ✅ or ❌
```
