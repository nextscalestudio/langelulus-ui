interface ReasonCard {
  icon: string
  title: string
  description: string
}

const reasons: ReasonCard[] = [
  {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Authentic Fragrances',
    description: '100% genuine, imported directly from the source',
  },
  {
    icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
    title: 'Free Shipping',
    description: 'On all orders over 500.000 ₫',
  },
  {
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    title: 'Easy Returns',
    description: '7-day hassle-free return policy',
  },
  {
    icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
    title: 'Expert Advice',
    description: 'Personal scent consultation with our specialists',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-secondary py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-white text-center text-[32px] mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex flex-col items-center text-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-10 h-10 text-accent shrink-0"
                aria-hidden="true"
              >
                <path d={reason.icon} />
              </svg>
              <h3 className="font-serif text-white text-[18px] font-bold leading-snug">
                {reason.title}
              </h3>
              <p className="font-serif text-white text-[14px] opacity-80 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
