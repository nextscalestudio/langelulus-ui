interface Collection {
  name: string
  slug: string
  description: string
  image: string
}

export const collections: Collection[] = [
  {
    name: 'Noir',
    slug: 'noir',
    description: 'Dark, smoky, and commanding — for those who own every room.',
    image: '/images/collections/noir.jpg',
  },
  {
    name: 'Bloom',
    slug: 'bloom',
    description: 'Fresh florals and light powders — delicate beauty in every drop.',
    image: '/images/collections/bloom.jpg',
  },
  {
    name: 'Aqua',
    slug: 'aqua',
    description: 'Clean marine freshness inspired by open water and sea breeze.',
    image: '/images/collections/aqua.jpg',
  },
  {
    name: 'Velvet',
    slug: 'velvet',
    description: 'Warm orientals wrapped in silky musks — intimate and luxurious.',
    image: '/images/collections/velvet.jpg',
  },
]
