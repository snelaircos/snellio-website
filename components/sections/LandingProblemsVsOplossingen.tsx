interface Item {
  title: string
  desc:  string
}

interface Props {
  problemen:   Item[]
  oplossingen: Item[]
  proLabel?:   string
  opLabel?:    string
  proHeading:  string
  opHeading:   string
}

export default function LandingProblemsVsOplossingen({
  problemen,
  oplossingen,
  proLabel   = 'De huidige werkwijze',
  opLabel    = 'Met Snellio',
  proHeading,
  opHeading,
}: Props) {
  return (
    <section className="py-24 px-[5%] bg-[var(--navy2)]">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 md:gap-16 items-start">

        {/* Problemen */}
        <div className="reveal">
          <p className="font-mono text-[.65rem] text-[var(--orange)] uppercase tracking-[.14em] mb-3">{proLabel}</p>
          <h2 className="font-outfit font-bold text-white leading-tight mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              dangerouslySetInnerHTML={{ __html: proHeading }} />
          <ul className="flex flex-col gap-3.5 list-none">
            {problemen.map(p => (
              <li key={p.title} className="flex items-start gap-4 bg-[rgba(255,80,80,.05)] border border-[rgba(255,80,80,.12)] rounded-xl px-5 py-4">
                <span className="text-[#e05555] font-bold text-lg shrink-0 mt-px">✗</span>
                <div>
                  <p className="font-semibold text-white text-sm mb-1">{p.title}</p>
                  <p className="text-[var(--muted2)] text-[.82rem] leading-relaxed">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Oplossingen */}
        <div className="reveal" style={{ transitionDelay: '120ms' }}>
          <p className="font-mono text-[.65rem] text-[var(--green)] uppercase tracking-[.14em] mb-3">{opLabel}</p>
          <h2 className="font-outfit font-bold text-white leading-tight mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              dangerouslySetInnerHTML={{ __html: opHeading }} />
          <ul className="flex flex-col gap-3.5 list-none">
            {oplossingen.map(o => (
              <li key={o.title} className="flex items-start gap-4 bg-[rgba(18,168,122,.06)] border border-[rgba(18,168,122,.18)] rounded-xl px-5 py-4">
                <span className="text-[var(--green)] font-bold text-lg shrink-0 mt-px">✓</span>
                <div>
                  <p className="font-semibold text-white text-sm mb-1">{o.title}</p>
                  <p className="text-[var(--muted2)] text-[.82rem] leading-relaxed">{o.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
