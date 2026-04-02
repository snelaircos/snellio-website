const items = [
  { icon: '🔒', label: 'EU-servers',         sub: 'Data in Europa' },
  { icon: '📄', label: 'BRL100 compliant',   sub: 'Alle rapporten' },
  { icon: '❄️', label: 'F-gas 2024/573',     sub: 'Volledig conform' },
  { icon: '⚡', label: '5 min setup',         sub: 'Geen installatie' },
  { icon: '🇳🇱', label: 'NL support',         sub: 'Persoonlijk contact' },
  { icon: '🔄', label: 'Altijd up-to-date',  sub: 'Gratis updates' },
]

export default function SocialProof() {
  return (
    <div className="border-y border-[var(--border)] bg-[rgba(15,33,51,.5)] py-10 px-[5%] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {items.map(item => (
            <div key={item.label} className="flex flex-col items-center text-center gap-1.5">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-semibold text-white text-xs">{item.label}</span>
              <span className="font-mono text-[.58rem] text-[var(--muted2)] uppercase tracking-wide">{item.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
