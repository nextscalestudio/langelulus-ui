import type { BlogPost } from '@/types'

const blogPosts: BlogPost[] = [
  {
    id: 'bp1',
    slug: 'how-to-choose-your-signature-scent',
    title: 'How to Choose Your Signature Scent',
    description: 'A practical guide to finding the fragrance that perfectly expresses who you are.',
    content: `Finding your signature scent is one of the most personal journeys in the world of beauty. Unlike clothes or accessories, fragrance becomes part of you — it mingles with your skin chemistry to create something uniquely yours. The first step is understanding the fragrance families: floral, oriental, woody, and fresh. Each family evokes a different mood and suits different personalities.

When testing a new fragrance, patience is essential. Spray it on your wrist, then wait at least 15 minutes for the top notes to fade and the true heart of the scent to emerge. A fragrance that smells divine in the bottle can transform dramatically on your skin, and that transformation is what you are really evaluating.

Consider the occasions you will wear the fragrance. A light, citrus-forward scent works beautifully for daytime and office settings, while a deep oriental or woody composition makes a statement for evenings out. Building a small wardrobe of two or three complementary fragrances gives you the flexibility to match the mood of any moment.

Finally, trust your instincts. The right signature scent is the one that makes you feel most like yourself — and that you reach for without thinking. Give yourself permission to explore, and do not rush the decision. The perfect fragrance will find you.`,
    thumbnail: '/images/blog/signature-scent.jpg',
    category: 'Fragrance Guide',
    tags: ['beginners', 'tips', 'fragrance-family'],
    publishedAt: '2024-03-15T09:00:00Z',
    readTime: 5,
  },
  {
    id: 'bp2',
    slug: 'understanding-fragrance-concentration',
    title: 'EDP vs EDT: Understanding Fragrance Concentration',
    description: 'Decode the alphabet soup on your perfume bottle and learn what it means for longevity and projection.',
    content: `Walk into any perfume boutique and you will encounter a confusing array of abbreviations — EDT, EDP, EDC, Parfum. These labels describe the concentration of aromatic compounds dissolved in the fragrance, and they have a profound impact on how long a scent lasts and how far it projects.

Eau de Cologne (EDC) contains the lowest concentration, typically 2–4%, making it the lightest and most fleeting option. It is ideal for a quick refresh on a warm day but requires frequent reapplication. Eau de Toilette (EDT) steps up to 5–15%, offering a moderate longevity of three to five hours — the classic choice for everyday wear.

Eau de Parfum (EDP) ranges from 15–20% concentration and is the sweet spot for most fragrance lovers. It lasts six to eight hours comfortably and provides a richer, more complex scent experience. Parfum, or Extrait de Parfum, sits at the top of the pyramid with 20–30% concentration. Just a small dab lasts all day and develops beautifully across the fragrance's full arc of top, heart, and base notes.

Choosing between concentrations is not purely about longevity — it also affects the character of the scent itself. Higher concentrations tend to foreground the base notes, giving the fragrance a warmer, more intimate quality. If you prefer a subtle, airy presence, EDT may serve you better even if you need to reapply.`,
    thumbnail: '/images/blog/concentration-guide.jpg',
    category: 'Fragrance Guide',
    tags: ['edp', 'edt', 'concentration', 'guide'],
    publishedAt: '2024-04-02T09:00:00Z',
    readTime: 4,
  },
  {
    id: 'bp3',
    slug: 'fragrance-layering-art',
    title: 'The Art of Fragrance Layering',
    description: 'Discover how combining multiple scents creates a truly one-of-a-kind fragrance experience.',
    content: `Fragrance layering is the practice of wearing two or more scents simultaneously to create a composition that is entirely your own. What started as a niche technique among perfume connoisseurs has become one of the most exciting trends in modern fragrance. The key is understanding which scent families complement rather than clash with each other.

The simplest approach is to layer within the same fragrance house, as perfumers often design collections to work together. A woody base layered with a fresh citrus top creates a vibrant yet grounded combination that reads as both sophisticated and approachable. Florals pair beautifully with musks, amplifying the softness of each while adding depth and longevity.

When layering, apply the heavier, longer-lasting scent first as your base, then add the lighter, more volatile scent on top. This ensures the base anchors the composition while the lighter notes add brightness and freshness. You can also experiment with applying different scents to different pulse points — one on the wrists, another on the neck — letting them blend naturally in your aura.

Do not be afraid to experiment. Some of the most celebrated fragrance discoveries have come from happy accidents. Keep a simple notebook of combinations that work and those that do not, and over time you will develop an intuitive sense for what harmonizes with your unique skin chemistry.`,
    thumbnail: '/images/blog/fragrance-layering.jpg',
    category: 'Lifestyle',
    tags: ['layering', 'tips', 'creative'],
    publishedAt: '2024-05-10T09:00:00Z',
    readTime: 5,
  },
  {
    id: 'bp4',
    slug: 'caring-for-your-fragrance-collection',
    title: 'How to Store and Care for Your Fragrance Collection',
    description: 'Protect your fragrance investment with these essential storage tips that keep your scents fresh for years.',
    content: `Fragrance is a delicate art form, and the molecules that create those beautiful scents are surprisingly vulnerable to environmental factors. Light, heat, and humidity are the three enemies of any fragrance collection. Understanding how to protect your bottles from these elements can extend the life and integrity of your scents by years.

Direct sunlight is the most damaging culprit. Ultraviolet rays break down fragrance molecules and cause oxidation, which fundamentally alters the scent profile. Always store your fragrances away from windows and direct light. A drawer, a closed cabinet, or even the original box provides excellent protection. Contrary to popular instinct, the bathroom — with its fluctuating humidity and temperature — is one of the worst places to keep perfume.

Temperature consistency matters as much as keeping things cool. Extreme temperature swings cause the liquid to expand and contract, gradually degrading the fragrance over time. A stable, room-temperature environment is ideal. If you have an impressive collection you want to preserve for the long term, a dedicated fragrance fridge set to around 12–15°C is the gold standard.

Keep the bottle closed when not in use. Exposure to air accelerates oxidation, especially in partially used bottles. If you have a particularly precious fragrance you use sparingly, consider decanting small amounts into a portable atomizer so the main bottle stays sealed. With proper care, a quality fragrance can remain beautiful and true for five years or more.`,
    thumbnail: '/images/blog/fragrance-storage.jpg',
    category: 'Lifestyle',
    tags: ['storage', 'care', 'collection'],
    publishedAt: '2024-06-01T09:00:00Z',
    readTime: 4,
  },
]

export default blogPosts

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
