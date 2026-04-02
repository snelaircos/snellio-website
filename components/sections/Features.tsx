import { FEATURES } from '@/lib/constants'
import Link from 'next/link'

const highlights = [
  'Werkbonnen + handtekening direct op locatie',
  'Automatische BRL100 rapportage',
  'F-gas registratie volledig compliant',
  'Installatiebeheer per klant',
  'Planning en monteurs in één systeem',
]

export default function Features() {
  return (
    <section className="py-28 px-[5%] bg-[var(--navy3)]" id="functies">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-4">
            Wat Snellio biedt
          </p>
          <h2
            className="font-outfit font-black text-white tracking-tight leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)' }}
          >
            Alles wat een HVAC-bedrijf<br />
            <span className="text-[var(--cyan)]">écht nodig heeft</span>
          </h2>
          <p className="text-[var(--text2)] text-base leading-relaxed mb-8">
            Geen losse tools meer. Snellio combineert alles wat een installateur dagelijks nodig heeft in één overzichtelijk systeem.
          </p>

          {/* Highlight bullets */}
          <ul className="inline-flex flex-col items-start gap-2.5 text-left list-none">
            {highlights.map(item => (
              <li key={item} className="flex items-center gap-3 text-[var(--text2)] text-[.9rem]">
                <span className="w-5 h-5 rounded-full bg-[rgba(18,168,122,.15)] border border-[rgba(18,168,122,.3)] flex items-center justify-center text-[var(--green)] text-xs font-bold shrink-0">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <article
              key={feature.title}
              className="reveal group relative p-7 rounded-2xl bg-[var(--navy2)] border border-[var(--border)] hover:border-[rgba(10,187,214,.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,144,184,.18)]"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                style={{ background: 'rgba(0,144,184,.1)', border: '1px solid rgba(0,144,184,.2)' }}
              >
                {feature.icon}
              </div>
              <h3 className="font-outfit font-bold text-white text-[1.05rem] mb-2.5">
                {feature.title}
              </h3>
              <p className="text-[var(--muted2)] text-[.84rem] leading-relaxed">
                {feature.desc}
              </p>

              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(10,187,214,.06) 0%, transparent 65%)' }}
              />
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <Link
            href="/features"
            className="inline-flex items-center gap-2 text-[var(--cyan)] text-sm font-semibold hover:gap-3 transition-all duration-200"
          >
            Bekijk alle functies
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
