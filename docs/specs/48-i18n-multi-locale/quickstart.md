# Quickstart: Multi-locale Validation

## Prerequisites

- `npm install` completed (next-intl added)
- Dev server NOT running yet

---

## 1. Start Dev Server

```bash
npm run dev
```

---

## 2. Default Locale (Vietnamese)

Open [http://localhost:3000](http://localhost:3000).

**Check:**
- [ ] Page loads without errors
- [ ] URL stays at `/` (no `/vi/` prefix for default locale)
- [ ] `<html lang="vi">` in page source
- [ ] Navbar shows Vietnamese labels: Trang chủ, Sản phẩm, Về chúng tôi, Blog, Liên hệ, Chính sách
- [ ] LocaleSwitcher shows `VI / EN` with `VI` in blue (accent)

---

## 3. Locale Switch — English

Click `EN` in the LocaleSwitcher.

**Check:**
- [ ] URL changes to `/en`
- [ ] Navbar shows English labels: Home, Products, About Us, Blog, Contact, Policy
- [ ] `<html lang="en">` in page source
- [ ] `VI` now appears in blue, `EN` in normal weight

---

## 4. Locale Persistence

After switching to EN, refresh the page.

**Check:**
- [ ] Still on `/en` — locale preserved in URL
- [ ] Open DevTools → Application → Cookies → `NEXT_LOCALE` = `en`

---

## 5. Locale-aware Navigation

While on `/en`, click "Products" in the navbar.

**Check:**
- [ ] Navigates to `/en/products`
- [ ] Products page shows English metadata title in browser tab

---

## 6. Switch Back to Vietnamese

Click `VI` in LocaleSwitcher while on `/en/products`.

**Check:**
- [ ] Navigates to `/products` (no `/vi/` prefix)
- [ ] Nav labels back to Vietnamese

---

## 7. Direct URL Navigation

Navigate directly to [http://localhost:3000/en/about/story](http://localhost:3000/en/about/story).

**Check:**
- [ ] Page loads in English (heading visible)
- [ ] `<html lang="en">`
- [ ] `<title>` contains English title

---

## 8. Admin Routes (No Locale)

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin).

**Check:**
- [ ] Admin loads normally (no locale prefix)
- [ ] NOT redirected to `/vi/admin` or `/en/admin`
- [ ] Middleware doesn't interfere with admin session

---

## 9. API Routes

Navigate to [http://localhost:3000/api/auth/session](http://localhost:3000/api/auth/session).

**Check:**
- [ ] Returns JSON (no locale redirect)
- [ ] NOT redirected to `/en/api/...`

---

## 10. Unknown Locale 404

Navigate to [http://localhost:3000/fr/products](http://localhost:3000/fr/products).

**Check:**
- [ ] Returns 404 (middleware blocks unknown locale)
- [ ] Does NOT fall through to a page

---

## 11. Dropdown Sub-labels Translated

Hover "Products" dropdown in English locale.

**Check:**
- [ ] Shows: All Products, Men, Women, Unisex (English labels)

Switch to Vietnamese, hover "Sản phẩm".

**Check:**
- [ ] Shows: Tất cả sản phẩm, Nam, Nữ, Unisex

---

## 12. Build Check

```bash
npm run build
# Must complete with 0 errors and 0 TypeScript errors
```

```bash
npx tsc --noEmit
# Must exit 0
```
