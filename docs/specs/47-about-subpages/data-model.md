# Data Model: About Sub-pages

All types are added to `src/types/index.ts`. All data is exported from `src/data/about.ts`.

---

## Entities

### `Perfumer`

| Field        | Type       | Notes                                      |
| ------------ | ---------- | ------------------------------------------ |
| `id`         | `string`   | e.g. `'pf1'`                               |
| `name`       | `string`   | Full name (language-neutral)               |
| `roleVi`     | `string`   | Job title in Vietnamese                    |
| `roleEn`     | `string`   | Job title in English                       |
| `bioVi`      | `string`   | 2-sentence bio in Vietnamese               |
| `bioEn`      | `string`   | 2-sentence bio in English                  |
| `image`      | `string`   | Absolute path e.g. `/images/placeholders/perfumer-1.jpg` |
| `specialties`| `string[]` | Language-neutral scent families            |
| `yearsExp`   | `number`   | Years of experience                        |

---

### `Certification`

| Field           | Type     | Notes                              |
| --------------- | -------- | ---------------------------------- |
| `id`            | `string` | e.g. `'cert1'`                     |
| `nameVi`        | `string` | Certification name in Vietnamese   |
| `nameEn`        | `string` | Certification name in English      |
| `issuerVi`      | `string` | Issuing body in Vietnamese         |
| `issuerEn`      | `string` | Issuing body in English            |
| `year`          | `number` | Year issued                        |
| `descriptionVi` | `string` | 1-sentence description in Vietnamese |
| `descriptionEn` | `string` | 1-sentence description in English  |

---

### `PhilosophyPrinciple`

| Field           | Type     | Notes                                |
| --------------- | -------- | ------------------------------------ |
| `id`            | `string` | e.g. `'pp1'`                         |
| `number`        | `number` | Display ordinal (1–4)                |
| `titleVi`       | `string` | Principle name in Vietnamese         |
| `titleEn`       | `string` | Principle name in English            |
| `descriptionVi` | `string` | 2-sentence description in Vietnamese |
| `descriptionEn` | `string` | 2-sentence description in English    |

---

### `StorySection`

Inline object (not an array — single brand story):

| Field            | Type       | Notes                               |
| ---------------- | ---------- | ----------------------------------- |
| `headingVi`      | `string`   | Main heading in Vietnamese          |
| `headingEn`      | `string`   | Main heading in English             |
| `paragraphsVi`   | `string[]` | 3 prose paragraphs in Vietnamese    |
| `paragraphsEn`   | `string[]` | 3 prose paragraphs in English       |
| `foundedYear`    | `number`   | `2019`                              |
| `foundedCity`    | `string`   | `'Hà Nội'`                          |

---

### `CatalogueInfo`

Inline object:

| Field           | Type     | Notes                                         |
| --------------- | -------- | --------------------------------------------- |
| `titleVi`       | `string` | Catalogue title in Vietnamese                 |
| `titleEn`       | `string` | Catalogue title in English                    |
| `descriptionVi` | `string` | Download CTA description in Vietnamese        |
| `descriptionEn` | `string` | Download CTA description in English           |
| `pdfUrl`        | `string` | `/downloads/langelulus-catalogue-2025.pdf`    |
| `coverImage`    | `string` | `/images/placeholders/catalogue-cover.jpg`    |

---

## Relationships

```
src/data/about.ts
  ├── storyContent     → StorySection (1)
  ├── philosophyPrinciples → PhilosophyPrinciple[] (4)
  ├── perfumers        → Perfumer[] (3)
  ├── certifications   → Certification[] (4)
  └── catalogueInfo    → CatalogueInfo (1)

src/types/index.ts
  ├── Perfumer
  ├── Certification
  └── PhilosophyPrinciple
  (StorySection + CatalogueInfo are inlined constants, no interface needed)
```

---

## NavItem (updated)

`NavLinks.tsx` already defines `NavItem` and `NavChild` interfaces locally. No change to types needed — just add `children[]` to the About entry in `NAV_LINKS`.

---

## Validation Rules

- `Perfumer.yearsExp` ≥ 1
- `Certification.year` between 2015 and current year
- `PhilosophyPrinciple.number` 1–4, unique
- `perfumers` array length: exactly 3
- `certifications` array length: exactly 4
- `philosophyPrinciples` array length: exactly 4
