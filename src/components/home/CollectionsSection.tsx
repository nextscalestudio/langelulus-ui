import Image from 'next/image'
import Link from 'next/link'
import { collections } from '@/data/collections'

export default function CollectionsSection() {
  return (
    <section className="bg-secondary py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-[36px] text-white text-center mb-10">
          Our Collections
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/products?collection=${collection.slug}`}
              className="group relative h-72 overflow-hidden block"
              aria-label={`Explore ${collection.name} collection`}
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                <h3 className="font-serif text-[24px] text-white font-bold text-center">
                  {collection.name}
                </h3>
                <span className="font-serif text-white underline text-sm group-hover:text-accent transition-colors">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
