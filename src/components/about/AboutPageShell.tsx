import Image from 'next/image'

interface AboutPageShellProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function AboutPageShell({ title, subtitle, children }: AboutPageShellProps) {
  return (
    <>
      <div className="relative h-64 md:h-96 flex items-center justify-center">
        <Image
          src="/images/about/hero.jpg"
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-secondary/60" />
        <div className="relative text-center px-4">
          <h1 className="font-serif text-[48px] text-white leading-tight">{title}</h1>
          {subtitle && (
            <p className="font-serif text-lg text-white/80 mt-2">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {children}
      </div>
    </>
  )
}
