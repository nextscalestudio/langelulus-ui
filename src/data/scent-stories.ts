interface ScentStory {
  title: string
  body: string
  image: string
  productSlug: string
}

export const scentStories: ScentStory[] = [
  {
    title: 'The Obsidian Night',
    body: 'Some scents are worn. Others are inhabited. Noir Obsidian begins with a spark of black pepper and bergamot — sharp, electric, alive. Then comes the descent: oud and leather settle like smoke after a fire, until only the ghost of vetiver remains. This is not a fragrance for the faint-hearted. It is a declaration.',
    image: '/images/stories/noir-obsidian.jpg',
    productSlug: 'noir-obsidian',
  },
  {
    title: 'Where Flowers Dare',
    body: 'Bloom Céleste was born from a single afternoon in a Provence garden just before rain. Jasmine, peony, and a whisper of white musk — it is the scent of confidence worn lightly. Neither loud nor shy, it moves with you, leaves a trail others turn around to find.',
    image: '/images/stories/bloom-celeste.jpg',
    productSlug: 'bloom-celeste',
  },
  {
    title: 'The Open Sea',
    body: 'Aqua Meridian is what freedom smells like. Notes of sea salt and driftwood open onto a heart of ambergris and cedarwood, drying down to clean skin musk. Wear it in summer. Wear it in winter. It carries its own weather.',
    image: '/images/stories/aqua-meridian.jpg',
    productSlug: 'aqua-meridian',
  },
]
