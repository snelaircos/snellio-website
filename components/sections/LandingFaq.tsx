'use client'

import { useState } from 'react'

interface FaqItem {
  question: string
  answer:   string
}

interface LandingFaqProps {
  items:     FaqItem[]
  heading?:  string
}

export default function LandingFaq({ items, heading = 'Veelgestelde vragen' }: LandingFaqProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 px-[5%] bg-[var(--navy3)]">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">FAQ</p>
          <h2 className="font-outfit font-black text-white tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)' }}>
            {heading}
          </h2>
        </div>

        <dl className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className={`bg-[var(--navy2)] rounded-xl border transition-colors duration-200 overflow-hidden
                ${open === i ? 'border-[rgba(10,187,214,.35)]' : 'border-[var(--border)] hover:border-[rgba(10,187,214,.2)]'}`}
            >
              <dt>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={open === i}
                >
                  <span className="font-outfit font-bold text-white text-[.95rem] leading-snug">
                    {item.question}
                  </span>
                  <span
                    className={`text-[var(--cyan)] text-xl shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
              </dt>
              {open === i && (
                <dd className="px-6 pb-5 text-[var(--text2)] text-[.88rem] leading-relaxed">
                  {item.answer}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
