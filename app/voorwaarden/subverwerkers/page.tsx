import type { Metadata }   from 'next'
import Link                from 'next/link'
import { buildMetadata }   from '@/lib/metadata'
import Container           from '@/components/ui/Container'
import { VOORWAARDEN }     from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  title:       'Subverwerkers',
  description: 'De subverwerkers van Snellio (bijlage 2 bij de algemene voorwaarden), versie 2.0.',
  path:        '/voorwaarden/subverwerkers',
})

// Bijlage 2. Locaties/mechanismen geverifieerd 05-09-2026: VPS = Hostinger
// (whois: HOSTINGER-HOSTING, DE), WhatsApp rechtstreeks via Meta Cloud API
// (graph.facebook.com, geen tussenpartij), Resend = opslag VS + DPF-
// gecertificeerd, Anthropic = SCC's via Commercial Terms DPA.
const SUBVERWERKERS = [
  { naam: 'Supabase',                          doel: 'Database, authenticatie, opslag',                          locatie: 'EU',            mechanisme: 'n.v.t.' },
  { naam: 'Hostinger',                         doel: 'Hosting van de applicatie',                                locatie: 'EU (Duitsland)', mechanisme: 'n.v.t.' },
  { naam: 'Mollie',                            doel: 'Betalingsverwerking, incasso, betaallinks',                locatie: 'EU',            mechanisme: 'n.v.t.' },
  { naam: 'Resend',                            doel: 'Transactionele e-mail',                                    locatie: 'VS',            mechanisme: 'EU-US Data Privacy Framework en standaardcontractbepalingen' },
  { naam: 'Google (Workspace, Calendar)',      doel: 'Agenda-synchronisatie van werkorders, e-mail',             locatie: 'EU/VS',         mechanisme: 'EU-US Data Privacy Framework' },
  { naam: 'Meta Platforms (WhatsApp Business)', doel: 'Berichtenverkeer via WhatsApp',                           locatie: 'EU/VS',         mechanisme: 'Standaardcontractbepalingen' },
  { naam: 'Anthropic',                         doel: 'AI-functies: beantwoorden van berichten, tekstvoorstellen', locatie: 'VS',            mechanisme: 'Standaardcontractbepalingen' },
  { naam: 'UptimeRobot',                       doel: 'Beschikbaarheidsmonitoring (geen persoonsgegevens)',       locatie: 'EU/VS',         mechanisme: 'n.v.t.' },
]

export default function SubverwerkersPage() {
  return (
    <div className="pt-32 pb-24 px-[5%]">
      <Container narrow>
        <p className="font-mono text-[.65rem] text-[var(--accent)] uppercase tracking-[.14em] mb-3">Juridisch</p>
        <h1 className="font-outfit font-black text-[var(--text)] text-4xl mb-2">Subverwerkers</h1>
        <p className="text-[var(--muted2)] text-sm mb-12">
          Bijlage 2 bij de <Link href="/voorwaarden" className="underline hover:text-[var(--accent)]">algemene voorwaarden</Link> · versie {VOORWAARDEN.versie} · {VOORWAARDEN.datum}
        </p>

        <div className="text-[var(--text2)] text-sm leading-relaxed space-y-4 mb-8">
          <p>
            Snellio schakelt voor de levering van de Dienst de onderstaande subverwerkers in, zoals bedoeld in artikel 5 van de{' '}
            <Link href="/voorwaarden/verwerkersovereenkomst" className="text-[var(--accent)] hover:underline">verwerkersovereenkomst</Link>.
            Een nieuwe of gewijzigde subverwerker wordt ten minste 30 dagen vooraf aangekondigd.
          </p>
        </div>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse min-w-[640px]">
            <thead>
              <tr className="text-left text-[var(--muted2)] uppercase tracking-wider text-xs border-b border-[var(--border)]">
                <th className="py-2.5 pr-4 font-semibold">Subverwerker</th>
                <th className="py-2.5 pr-4 font-semibold">Doel</th>
                <th className="py-2.5 pr-4 font-semibold">Locatie verwerking</th>
                <th className="py-2.5 font-semibold">Doorgiftemechanisme</th>
              </tr>
            </thead>
            <tbody>
              {SUBVERWERKERS.map(s => (
                <tr key={s.naam} className="border-b border-[var(--border)] align-top">
                  <td className="py-2.5 pr-4 text-[var(--text)] font-medium whitespace-nowrap">{s.naam}</td>
                  <td className="py-2.5 pr-4 text-[var(--text2)]">{s.doel}</td>
                  <td className="py-2.5 pr-4 text-[var(--text2)] whitespace-nowrap">{s.locatie}</td>
                  <td className="py-2.5 text-[var(--text2)]">{s.mechanisme}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-[var(--text2)] text-sm leading-relaxed space-y-4">
          <p>De WhatsApp-koppeling loopt rechtstreeks via de WhatsApp Business Cloud API van Meta; er is geen tussenpartij.</p>
          <p>Anthropic gebruikt gegevens die via de API worden verwerkt standaard niet voor het trainen van eigen modellen.</p>
          <p>Optionele koppelingen die de Klant zelf activeert en die dan onder zijn eigen verantwoordelijkheid vallen: boekhoudpakketten (WeFact, Moneybird, Exact Online).</p>
        </div>
      </Container>
    </div>
  )
}
