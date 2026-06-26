import type { Review } from '@/types'

const reviews: Review[] = [
  // p1 - Noir Obsidian
  {
    id: 'r1',
    productId: 'p1',
    author: 'Minh Tuấn',
    rating: 5,
    comment: 'This is absolutely stunning. The oud and leather combination is unlike anything I have tried. Gets compliments every single time I wear it. Worth every cent.',
    createdAt: '2024-02-10T14:30:00Z',
  },
  {
    id: 'r2',
    productId: 'p1',
    author: 'David Nguyen',
    rating: 5,
    comment: 'Noir Obsidian is my signature scent now. Incredibly long-lasting — I can still smell it on my shirt the next morning. The dry-down is divine.',
    createdAt: '2024-03-05T09:15:00Z',
  },
  {
    id: 'r3',
    productId: 'p1',
    author: 'Hùng Phát',
    rating: 4,
    comment: 'Very bold and intense. Not for the faint-hearted, but once you commit to it the projection is incredible. A true statement fragrance.',
    createdAt: '2024-04-18T16:45:00Z',
  },
  // p2 - Noir Eclipse
  {
    id: 'r4',
    productId: 'p2',
    author: 'Thanh Long',
    rating: 5,
    comment: 'A versatile woody scent that works perfectly in the office but transitions seamlessly to evenings out. Elegant and refined.',
    createdAt: '2024-01-22T11:00:00Z',
  },
  {
    id: 'r5',
    productId: 'p2',
    author: 'Anh Khoa',
    rating: 4,
    comment: 'The incense note is subtle and sophisticated. Good longevity and the sillage is just right — present without being overwhelming.',
    createdAt: '2024-02-28T08:30:00Z',
  },
  // p3 - Bloom Sakura
  {
    id: 'r6',
    productId: 'p3',
    author: 'Linh Chi',
    rating: 5,
    comment: 'Absolutely enchanting. Light, delicate and genuinely smells like cherry blossoms in spring. My favourite everyday fragrance.',
    createdAt: '2024-03-20T13:00:00Z',
  },
  {
    id: 'r7',
    productId: 'p3',
    author: 'Phương Anh',
    rating: 5,
    comment: 'Received so many compliments wearing this. It is fresh without being generic — has a real character. Perfect for warmer weather.',
    createdAt: '2024-04-01T10:20:00Z',
  },
  {
    id: 'r8',
    productId: 'p3',
    author: 'Mai Lan',
    rating: 4,
    comment: 'Lovely spring scent. I wish it lasted a little longer but the scent itself is beautiful. Reapplying mid-day is a small price to pay.',
    createdAt: '2024-04-25T15:10:00Z',
  },
  // p4 - Bloom Iris
  {
    id: 'r9',
    productId: 'p4',
    author: 'Hoa Liên',
    rating: 5,
    comment: 'The iris accord is stunning — powdery without being old-fashioned. Feels like wearing a couture dress. Truly exceptional quality.',
    createdAt: '2024-02-14T17:00:00Z',
  },
  {
    id: 'r10',
    productId: 'p4',
    author: 'Thu Hằng',
    rating: 4,
    comment: 'Elegant and refined. The iris is very true to the real flower. A grown-up, sophisticated fragrance for women who know their style.',
    createdAt: '2024-03-30T12:30:00Z',
  },
  // p5 - Soleil Unbound
  {
    id: 'r11',
    productId: 'p5',
    author: 'Nam Khánh',
    rating: 5,
    comment: 'My partner and I both wear this — it smells different on each of us but equally wonderful. A genuinely great unisex fragrance.',
    createdAt: '2024-04-10T09:00:00Z',
  },
  {
    id: 'r12',
    productId: 'p5',
    author: 'Bảo Trâm',
    rating: 4,
    comment: 'The yuzu and cedarwood combination is inspired. Fresh and woody at the same time. Great for travel — it lifts your mood.',
    createdAt: '2024-05-02T11:45:00Z',
  },
  // p6 - Velvet Rose
  {
    id: 'r13',
    productId: 'p6',
    author: 'Ngọc Hân',
    rating: 5,
    comment: 'This is what a rose fragrance should be — bold, complex and deeply beautiful. The patchouli and oud base takes it to another level entirely.',
    createdAt: '2024-01-30T20:00:00Z',
  },
  {
    id: 'r14',
    productId: 'p6',
    author: 'Diệu Linh',
    rating: 5,
    comment: 'I have tried many rose fragrances and this is by far the most impressive. The saffron opening is gorgeous. Absolutely worth the investment.',
    createdAt: '2024-02-20T19:15:00Z',
  },
  {
    id: 'r15',
    productId: 'p6',
    author: 'Quỳnh Như',
    rating: 5,
    comment: 'Heavenly. Lasts all day and into the evening. Every time I wear this, someone asks what I am wearing. A true showstopper.',
    createdAt: '2024-03-15T18:30:00Z',
  },
  // p7 - Aqua Libre
  {
    id: 'r16',
    productId: 'p7',
    author: 'Tùng Lâm',
    rating: 4,
    comment: 'The most realistic aquatic scent I have come across. Not synthetic at all — genuinely smells like the ocean. Perfect for summer.',
    createdAt: '2024-05-15T08:00:00Z',
  },
  {
    id: 'r17',
    productId: 'p7',
    author: 'Trung Hiếu',
    rating: 4,
    comment: 'Clean, fresh and inoffensive in the best possible way. My go-to for the gym and beach days.',
    createdAt: '2024-06-01T07:30:00Z',
  },
  // p8 - Amber Nocturne
  {
    id: 'r18',
    productId: 'p8',
    author: 'Gia Hân',
    rating: 5,
    comment: 'The perfect autumn-winter scent. Warm, cosy and deeply comforting. My husband loves it on me too. Our household favourite.',
    createdAt: '2024-01-05T21:00:00Z',
  },
  {
    id: 'r19',
    productId: 'p8',
    author: 'Việt Anh',
    rating: 5,
    comment: 'Amber Nocturne is dangerously addictive. The tonka and vanilla base is magnificent. This is the fragrance equivalent of a cashmere blanket.',
    createdAt: '2024-02-02T20:15:00Z',
  },
  {
    id: 'r20',
    productId: 'p8',
    author: 'Kiều Oanh',
    rating: 4,
    comment: 'Beautiful warmth and projection. Some may find it a touch sweet but it is beautifully balanced — never cloying. Would absolutely recommend.',
    createdAt: '2024-03-10T19:45:00Z',
  },
]

export default reviews

export function getReviewsByProductId(id: string): Review[] {
  return reviews.filter((r) => r.productId === id)
}
