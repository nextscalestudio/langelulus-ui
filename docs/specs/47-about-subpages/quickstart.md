# Quickstart: About Sub-pages Validation

## Prerequisites

- Node.js 20+ installed
- Dependencies installed: `npm install`
- Dev server NOT running yet

---

## 1. Start Dev Server

```bash
npm run dev
# Opens at http://localhost:3000
```

---

## 2. Nav Dropdown — Desktop

Open [http://localhost:3000](http://localhost:3000) in a browser at ≥ 768px width.

**Check:**
- [ ] All nav labels are in Vietnamese: Trang chủ, Sản phẩm, Về chúng tôi, Blog, Liên hệ, Chính sách
- [ ] Hovering "Về chúng tôi" shows a dropdown with 5 items:
  - Câu chuyện → `/about/story`
  - Triết lý thương hiệu → `/about/philosophy`
  - Nhà sáng tác hương → `/about/perfumers`
  - Chứng nhận → `/about/certifications`
  - Catalogue → `/about/catalogue`
- [ ] Hovering "Sản phẩm" still shows its own dropdown (unchanged)
- [ ] Hovering "Blog" still shows its own dropdown (unchanged)

---

## 3. Nav — Mobile

Resize browser to < 768px.

**Check:**
- [ ] All nav links hidden (only logo + search + cart + auth visible)
- [ ] No horizontal scroll or layout break

---

## 4. About Overview Page

Navigate to [http://localhost:3000/about](http://localhost:3000/about).

**Check:**
- [ ] Hero banner visible with heading "Về chúng tôi"
- [ ] 5 sub-section cards visible: Câu chuyện, Triết lý thương hiệu, Nhà sáng tác hương, Chứng nhận, Catalogue
- [ ] Each card links to its respective route
- [ ] Page `<title>` is "Về chúng tôi | Parfum"

---

## 5. Sub-page: Our Story

Navigate to [http://localhost:3000/about/story](http://localhost:3000/about/story).

**Check:**
- [ ] Hero banner with heading "Câu chuyện L'ANGELULUS"
- [ ] 3 prose paragraphs visible (brand founding narrative)
- [ ] Founded year (2019) and city (Hà Nội) mentioned
- [ ] Page `<title>` is "Câu chuyện | Parfum"

---

## 6. Sub-page: Philosophy

Navigate to [http://localhost:3000/about/philosophy](http://localhost:3000/about/philosophy).

**Check:**
- [ ] Hero banner visible
- [ ] 4 principle cards in a 2×2 grid on desktop
- [ ] Each card has: number, Vietnamese title, Vietnamese description
- [ ] Principles: Chân thực, Hài hòa, Bền vững, Cảm xúc
- [ ] Page `<title>` is "Triết lý | Parfum"

---

## 7. Sub-page: Perfumers

Navigate to [http://localhost:3000/about/perfumers](http://localhost:3000/about/perfumers).

**Check:**
- [ ] 3 perfumer cards visible
- [ ] Each card: photo (placeholder), name, role, bio, specialties tags
- [ ] Layout: image left + bio right on desktop; stacked on mobile
- [ ] Names: Nguyễn Anh Khoa, Trần Minh Châu, Lê Phương Linh
- [ ] Page `<title>` is "Nhà sáng tác hương | Parfum"

---

## 8. Sub-page: Certifications

Navigate to [http://localhost:3000/about/certifications](http://localhost:3000/about/certifications).

**Check:**
- [ ] 4 certification cards in a 2×2 grid
- [ ] Each card: certification name (VI), issuer (VI), year badge
- [ ] Certifications: ISO 22716, ECOCERT, Vietnam REACH, IFRA Compliance
- [ ] Page `<title>` is "Chứng nhận | Parfum"

---

## 9. Sub-page: Catalogue

Navigate to [http://localhost:3000/about/catalogue](http://localhost:3000/about/catalogue).

**Check:**
- [ ] Hero CTA visible with download button
- [ ] Button `href` = `/downloads/langelulus-catalogue-2025.pdf` (placeholder, 404 expected)
- [ ] Button opens in new tab (`target="_blank"`)
- [ ] Page `<title>` is "Catalogue | Parfum"

---

## 10. Type Check

```bash
npx tsc --noEmit
# Must exit 0 with no errors
```

---

## 11. Lint

```bash
npm run lint
# Must exit 0 with no errors
```
