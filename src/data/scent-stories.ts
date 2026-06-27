interface ScentStory {
  title: string
  body: string
  image: string
  productSlug: string
}

export const scentStories: ScentStory[] = [
  {
    title: 'The Obsidian Night',
    body: "Some scents are worn. Others are inhabited. Midnight Bamboo opens with a spark of black pepper and cardamom — sharp, electric, alive. Then comes the descent: oud and bamboo settle like smoke at the edge of a forest, until only the ghost of amber and musk remains. This is not a fragrance for the faint-hearted. It is a declaration.",
    image: '/images/stories/noir-obsidian.jpg',
    productSlug: 'midnight-bamboo',
  },
  {
    title: 'Where Flowers Dare',
    body: "Honey Jasmine was born from a single afternoon in a garden just before the warmth of evening. Jasmine, honey, and a whisper of rose — it is the scent of confidence worn lightly. Neither loud nor shy, it moves with you, leaves a trail others turn around to find.",
    image: '/images/stories/bloom-celeste.jpg',
    productSlug: 'honey-jasmine',
  },
  {
    title: 'The Open Sea',
    body: "Blue Horizon is what freedom smells like. Notes of sea salt and bergamot open onto a heart of driftwood and iris, drying down to cedarwood and clean white musk. Wear it in summer. Wear it in winter. It carries its own weather.",
    image: '/images/stories/aqua-meridian.jpg',
    productSlug: 'blue-horizon',
  },
]
