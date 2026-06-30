# Spec: Real L'ANGELULUS Product Data

**Project:** Perfume Shop (L'ANGELULUS brand)
**Version:** 1.0
**Status:** Implemented
**Source:** product-part1.pdf — brand product brief

---

## 1. Overview

Replace placeholder product data in `src/data/products.ts` and `src/data/reviews.ts` with
real L'ANGELULUS brand products extracted from the official design brief PDF.

All 9 products have been extracted, photographed (cropped from PDF renders), and wired up
to the static data layer.

---

## 2. Product Catalogue

| # | ID | Slug | Name | Category | Collection | Gender | Price (VND) |
|---|-----|------|------|----------|------------|--------|-------------|
| 1 | p1 | blue-horizon | Blue Horizon | Nam | Aqua | Male | 1,650,000 |
| 2 | p2 | honey-jasmine | Honey Jasmine | Nữ | Bloom | Female | 1,450,000 |
| 3 | p3 | silent-moss | Silent Moss | Unisex | Aqua | Unisex | 1,550,000 |
| 4 | p4 | midnight-bamboo | Midnight Bamboo | Unisex | Noir | Unisex | 1,750,000 |
| 5 | p5 | rose-velvet | Rose Velvet | Nữ | Bloom | Female | 1,350,000 |
| 6 | p6 | woody-amber | Woody Amber | Nam | Terre | Male | 1,450,000 |
| 7 | p7 | root-man | Root Man | Nam | Terre | Male | 1,650,000 |
| 8 | p8 | lilys-secret | Lily's Secret | Nữ | Bloom | Female | 1,350,000 |
| 9 | p9 | mist-theory | Mist Theory | Unisex | Aqua | Unisex | 1,750,000 |

### Collections

| Collection | Products |
|------------|---------|
| Aqua | Blue Horizon, Silent Moss, Mist Theory |
| Bloom | Honey Jasmine, Rose Velvet, Lily's Secret |
| Noir | Midnight Bamboo |
| Terre | Woody Amber, Root Man |

### Featured Products (isFeatured: true)

Blue Horizon, Honey Jasmine, Rose Velvet, Root Man, Lily's Secret, Mist Theory

---

## 3. Product Images

Source: PDF page renders extracted via `pdfplumber` + `PIL` cropping.

All images are saved as JPEG at 600×795px (portrait) to
`public/images/products/[slug].jpg`.

| Slug | Source PDF Page | Image Type |
|------|-----------------|------------|
| blue-horizon | Page 1 | Isolated bottle render |
| honey-jasmine | Page 5 | Isolated bottle render |
| silent-moss | Page 9 | Isolated bottle render |
| midnight-bamboo | Page 13 | Isolated bottle render |
| rose-velvet | Page 17 | Lifestyle / product shot |
| woody-amber | Page 19 | Isolated bottle render |
| root-man | Page 22 | Isolated bottle render |
| lilys-secret | Page 26 | Isolated bottle render |
| mist-theory | Page 30 | Isolated bottle render |

---

## 4. Scent Families

| Product | Family |
|---------|--------|
| Blue Horizon | Fresh Marine |
| Honey Jasmine | Floral Oriental |
| Silent Moss | Woody Green |
| Midnight Bamboo | Woody Oriental |
| Rose Velvet | Floral |
| Woody Amber | Amber Woody |
| Root Man | Fougère Aromatic |
| Lily's Secret | Fresh Floral |
| Mist Theory | Aromatic Aquatic |

---

## 5. Files Modified

```
src/
└── data/
    ├── products.ts   ← replaced 8 placeholder items with 9 real L'ANGELULUS products
    └── reviews.ts    ← updated all 20 reviews + added 3 reviews for Mist Theory (p9)

public/
└── images/
    └── products/
        ├── blue-horizon.jpg
        ├── honey-jasmine.jpg
        ├── silent-moss.jpg
        ├── midnight-bamboo.jpg
        ├── rose-velvet.jpg
        ├── woody-amber.jpg
        ├── root-man.jpg
        ├── lilys-secret.jpg
        └── mist-theory.jpg
```

---

## 6. Acceptance Criteria

- [x] `tsc --noEmit` passes with zero errors
- [x] `products` array has 9 items, all fields populated
- [x] All 9 products reference existing image files in `public/images/products/`
- [x] Brand is `L'ANGELULUS` on all products
- [x] All prices in VND (1,350,000 – 1,750,000)
- [x] `concentration` is `EDT` on all products (matching PDF brief)
- [x] `origin` is `Vietnam` on all products
- [x] `getProductBySlug` returns correct product for each of the 9 slugs
- [x] `getReviewsByProductId` returns 3 reviews for every product including p9
- [x] `isFeatured: true` on 6 products (covers homepage featured section)
- [x] Collections: Aqua (3), Bloom (3), Noir (1), Terre (2)
- [x] Categories: Nam (3), Nữ (3), Unisex (3) — equal distribution

---

## 7. Claude Code Prompt (for future sessions)

```
@projects/perfume-shop/docs/CLAUDE.md @projects/perfume-shop/docs/specs/44-real-products-data.spec.md

The product data in src/data/products.ts has been replaced with real L'ANGELULUS data.
Images are in public/images/products/[slug].jpg.

Verify that all product listing pages, product detail pages, and the homepage
featured section correctly display L'ANGELULUS products with Vietnamese descriptions.
```
