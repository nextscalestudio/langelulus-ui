import Image from 'next/image'
import { galleryImages } from '@/data/gallery'

export default function LifestyleGallery() {
  return (
    <section className="bg-bg py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-[36px] text-secondary text-center mb-12">
          Life in Scent
        </h2>

        <div className="columns-2 md:columns-3 gap-4">
          {galleryImages.map((image) => (
            <div
              key={image.src}
              className="group relative break-inside-avoid mb-4 overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={800}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {image.caption && (
                <div className="absolute inset-0 bg-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="font-serif text-white text-center px-4">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
