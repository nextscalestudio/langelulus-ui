import type { Metadata } from 'next'
import Image from 'next/image'

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'About Us | Parfum' }
}

interface CoreValue {
  title: string
  description: string
  icon: string
}

const coreValues: CoreValue[] = [
  {
    title: 'Authenticity',
    icon: '✦',
    description:
      'Every fragrance we carry is curated with care — no imitations, no compromises. We source only genuine compositions from trusted perfumers who share our commitment to craft.',
  },
  {
    title: 'Elegance',
    icon: '◈',
    description:
      'From the bottles on our shelves to the words we choose, elegance is the standard we hold ourselves to. Beauty and refinement in every detail.',
  },
  {
    title: 'Connection',
    icon: '◯',
    description:
      'Fragrance is the invisible thread that links memories, people, and moments. We exist to help you find the scent that becomes part of your story.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-64 md:h-96 flex items-center justify-center">
        <Image
          src="/images/about/hero.jpg"
          alt="Langelulus brand hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-secondary/60" />
        <h1 className="relative font-serif text-[48px] text-white text-center leading-tight px-4">
          Our Story
        </h1>
      </div>

      {/* Brand Narrative — white */}
      <section className="bg-bg py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-[16px] text-secondary leading-[1.8] mb-6">
            Langelulus was born from a single belief: that fragrance is not a luxury — it is a
            language. Founded in Hanoi, we set out to bring the world&rsquo;s finest scents to
            Vietnam, pairing them with the warmth and intimacy of a neighbourhood boutique.
          </p>
          <p className="font-serif text-[16px] text-secondary leading-[1.8]">
            Over the years we have grown from a small curated shelf into a destination for
            fragrance lovers across the country. What has never changed is our obsession with
            quality, our reverence for the craft of perfumery, and our desire to help every
            customer find the scent that speaks for them.
          </p>
        </div>
      </section>

      {/* Vision — black */}
      <section className="bg-secondary py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[28px] text-accent mb-6">Vision</h2>
          <p className="font-serif text-[16px] text-white leading-[1.8]">
            To become the leading luxury fragrance destination in Vietnam — a place where
            discovery, education, and beauty come together in a single unhurried experience.
            We envision a future where every Vietnamese household has a signature scent that
            belongs to them alone.
          </p>
        </div>
      </section>

      {/* Mission — white */}
      <section className="bg-bg py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[28px] text-accent mb-6">Mission</h2>
          <p className="font-serif text-[16px] text-secondary leading-[1.8]">
            To connect people with scents that tell their story — through expert curation,
            honest guidance, and a shopping experience that treats fragrance with the same
            seriousness as art. We are here to make the intimidating world of niche perfumery
            feel welcoming, joyful, and deeply personal.
          </p>
        </div>
      </section>

      {/* Core Values — black */}
      <section className="bg-secondary py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-[28px] text-accent text-center mb-12">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="border border-accent p-8 flex flex-col items-center text-center"
              >
                <span className="text-accent text-[32px] mb-4" aria-hidden="true">
                  {value.icon}
                </span>
                <h3 className="font-serif font-bold text-[20px] text-white mb-4">
                  {value.title}
                </h3>
                <p className="font-serif text-[16px] text-white/80 leading-[1.8]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
