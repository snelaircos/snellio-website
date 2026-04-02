import { CERTS } from '@/lib/constants'

export default function Certifications() {
  return (
    <div className="border-y border-[var(--border)] bg-[var(--navy3)] py-12 px-[5%]">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-10 md:gap-16">

        <div className="md:max-w-sm shrink-0">
          <h2 className="font-outfit font-bold text-white text-xl mb-2">
            Gebouwd op wet- en regelgeving
          </h2>
          <p className="text-[var(--muted2)] text-sm leading-relaxed">
            Snellio is ontworpen door een BRL100-gecertificeerd installateur.
            Alle rapporten en logboeken voldoen aan de actuele certificatie-eisen.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {CERTS.map(cert => (
            <span
              key={cert}
              className="inline-flex items-center gap-2 bg-[var(--navy)] border border-[var(--border)] text-[var(--text2)] text-xs font-mono px-4 py-2 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
