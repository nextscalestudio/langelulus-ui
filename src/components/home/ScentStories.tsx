import Image from 'next/image'
import Link from 'next/link'
import { scentStories } from '@/data/scent-stories'

export default function ScentStories() {
  return (
    <section className="bg-bg py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-[36px] text-secondary text-center mb-16">
          Scent Stories
        </h2>
        <div className="flex flex-col gap-20">
          {scentStories.map((story, index) => (
            <div
              key={story.productSlug}
              className={`flex flex-col md:flex-row gap-10 items-center ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full md:w-1/2 relative aspect-square">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="font-serif italic text-[28px] text-accent mb-4">
                  {story.title}
                </h3>
                <p className="font-serif text-[16px] text-secondary leading-[1.8] mb-6">
                  {story.body}
                </p>
                <Link
                  href={`/products/${story.productSlug}`}
                  className="font-serif text-accent underline hover:opacity-70 transition-opacity"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
