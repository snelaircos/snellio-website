interface FaqItem {
  question: string
  answer:   string
}

interface LandingFaqProps {
  items:    FaqItem[]
  heading?: string
}

// Server component. Elk antwoord staat in de HTML, standaard dichtgeklapt via
// <details>, zodat rich results en AI-engines dezelfde tekst zien als het
// FAQPage-schema (docs/seo-geo/09-sitewide-sweep.md §1). Geen useState.
export default function LandingFaq({ items, heading = 'Veelgestelde vragen' }: LandingFaqProps) {
  return (
    <section className="py-24 px-[5%] bg-[var(--navy3)]">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">FAQ</p>
          <h2 className="font-outfit font-black text-[var(--text)] tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)' }}>
            {heading}
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {items.map(item => (
            <details
              key={item.question}
              className="group bg-[var(--navy2)] rounded-xl border border-[var(--border)] hover:border-[rgba(10,187,214,.2)] open:border-[rgba(10,187,214,.35)] transition-colors duration-200 overflow-hidden"
            >
              <summary className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="font-outfit font-bold text-[var(--text)] text-[.95rem] leading-snug">
                  {item.question}
                </span>
                <span
                  className="text-[var(--accent)] text-xl shrink-0 transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-[var(--text2)] text-[.88rem] leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
