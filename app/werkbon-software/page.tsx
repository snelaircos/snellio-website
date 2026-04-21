import type { Metadata }   from 'next'
import { buildMetadata }   from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'
import JsonLd from '@/components/seo/JsonLd'
import LandingHero                  from '@/components/sections/LandingHero'
import LandingFeatures              from '@/components/sections/LandingFeatures'
import LandingProblemsVsOplossingen from '@/components/sections/LandingProblemsVsOplossingen'
import LandingFaq                   from '@/components/sections/LandingFaq'
import LandingInternalLinks         from '@/components/sections/LandingInternalLinks'
import Cta                          from '@/components/sections/Cta'
import Button                       from '@/components/ui/Button'
import Container                    from '@/components/ui/Container'

export const metadata: Metadata = buildMetadata({
  title:       'Werkbon software voor installateurs | Snellio',
  description: 'Werkbon software en digitale werkbon app voor installateurs en HVAC bedrijven. Klanthandtekening op tablet, BRL100-rapportage, PDF-generatie en directe facturatie via iDEAL. Start 14 dagen gratis.',
  path:        '/werkbon-software',
})

const features = [
  { icon: '✍️', title: 'Digitale handtekening ter plaatse',  desc: 'Klant ondertekent de werkbon direct op uw tablet of telefoon. PDF wordt automatisch gegenereerd en verstuurd.', badge: 'Populair' },
  { icon: '📄', title: 'BRL100 rapport automatisch',          desc: 'Elke koeltechnische handeling levert automatisch een BRL100-compliant rapport op. Direct print-klaar voor inspectie.' },
  { icon: '🔧', title: 'Koeltechnische handelingen',           desc: 'Inbedrijfstelling, lektest, drukproef, vacumeren, afpompen — alle handelingen met de vereiste meetvelden.' },
  { icon: '📷', title: "Foto's & bijlagen",                    desc: "Voeg foto's en documenten toe aan werkorders. Altijd beschikbaar in het klantdossier." },
  { icon: '🧾', title: 'Direct factureren vanuit werkbon',     desc: 'Van werkbon naar factuur in één klik. iDEAL of Wero betaallink via Mollie meegestuurd.' },
  { icon: '📤', title: 'Automatisch e-mailen naar klant',     desc: 'Werkbon PDF wordt direct na ondertekening per e-mail verstuurd. Geen uitprinten, geen postvak.' },
]

const stappen = [
  { icon: '1', title: 'Maak een werkorder aan',            desc: 'Kies de klant, installatie en type handeling. Velden worden automatisch ingevuld vanuit het klantdossier.' },
  { icon: '2', title: 'Voer de handelingen in',            desc: 'Vul koeltechnische meetwaarden in: druk, temperatuur, hoeveelheid koudemiddel, lektest-resultaat.' },
  { icon: '3', title: 'Klant tekent direct op het scherm', desc: 'Handtekening op tablet of telefoon. Datum en naam worden vastgelegd.' },
  { icon: '4', title: 'PDF klaar & verstuurd',              desc: 'BRL100-rapport en werkbon worden automatisch gegenereerd en direct naar de klant gemaild.' },
]

const problemen = [
  { title: 'Werkbonnen op papier invullen',         desc: 'Papier raakt zoek, leesfouten en handmatig scannen kost kostbare werktijd.' },
  { title: 'Rapporten handmatig opstellen',          desc: 'BRL100-documenten handmatig invullen kost uren per week aan administratie.' },
  { title: 'Klant ondertekent een losse bon',        desc: 'Geen digitale vastlegging, archivering is onbetrouwbaar en niet traceerbaar.' },
  { title: 'Factuur apart invoeren',                 desc: 'Informatie overtypen van de werkbon naar het boekhoudprogramma — dubbel werk.' },
]

const oplossingen = [
  { title: 'Digitale werkbon op tablet of telefoon',  desc: 'Altijd bij de hand, geen papier nodig. Alles direct ingevuld op locatie.' },
  { title: 'BRL100-rapport automatisch gegenereerd',  desc: 'Vul de handelingen in — het rapport is klaar. Geen extra werk, geen fouten.' },
  { title: 'Digitale handtekening met tijdstempel',   desc: 'Juridisch geldig, altijd terug te vinden in het digitale archief.' },
  { title: 'Factuur aanmaken vanuit de werkbon',      desc: 'Eén klik — factuurregels overgenomen, iDEAL betaallink toegevoegd.' },
]

const uitgebreideFeatures = [
  { icon: '📋', title: 'Werkorder typen',              desc: 'Inbedrijfstelling, periodieke service, storingsdienst, lektest, vacumeren, koudemiddel bijvullen of aftappen — elk type heeft zijn eigen velden.' },
  { icon: '🌡', title: 'Meetwaarden vastleggen',        desc: 'Begin- en eindtemperatuur, hoge- en lagedrukzijde, omgevingstemperatuur, einddruk vacumeren en standtijd — alles in het juiste formaat.' },
  { icon: '🔏', title: 'Digitale handtekening',         desc: 'Klant en monteur ondertekenen op het scherm. Datum, tijdstip en naam worden automatisch vastgelegd.' },
  { icon: '📁', title: 'Archief per klant',             desc: 'Alle werkbonnen, BRL100-rapporten en foto\'s worden opgeslagen per klant en installatie. Direct opvraagbaar bij elke volgende service.' },
  { icon: '🔗', title: 'Koppeling aan installatie',     desc: 'Elke werkbon is gekoppeld aan een specifieke installatie: type, merk, koudemiddel, capaciteit en serienummer.' },
  { icon: '📧', title: 'Automatisch verzenden',         desc: 'Werkbon PDF gaat direct na ondertekening naar de klant. E-mailadres aanpasbaar, verzending desgewenst uit te stellen.' },
]

const doelgroepen = [
  { icon: '🔧', type: 'Airco installateur',         desc: 'Installeert dagelijks split-units bij particulieren en bedrijven. Heeft behoefte aan snelle digitale werkbonnen en BRL100-rapporten zonder papierwerk.' },
  { icon: '♨️', type: 'Warmtepomp installateur',    desc: 'Werkt aan inbedrijfstellingen en servicebeurten van warmtepompen. Wil koeltechnische handelingen digitaal vastleggen conform BRL100/BRL200.' },
  { icon: '❄️', type: 'Koeltechnisch monteur',       desc: 'Voert lektests, drukproeven en vacumeringen uit. Heeft uitgebreide koeltechnische velden nodig en correcte F-gas documentatie.' },
  { icon: '🏢', type: 'HVAC installatiebedrijf',    desc: 'Heeft meerdere monteurs in het veld. Wil overzicht over alle werkorders, eenduidige werkbonnen per monteur en gestandaardiseerde rapportage.' },
]

const voordelen = [
  { icon: '⏱', title: 'Tijdsbesparing', stat: '2–4 uur/week',
    items: ['Geen papieren werkbonnen meer invullen', 'Geen handmatig BRL100-rapport opstellen', 'Geen werkbonnen scannen of archiveren', 'Factuur klaar zodra de bon ondertekend is'] },
  { icon: '✅', title: 'Minder fouten',  stat: '0 dubbele invoer',
    items: ['Klantgegevens automatisch ingevuld', 'Meetwaarden direct gekoppeld aan rapport', 'Geen overtypen van werkbon naar factuur', 'Alle documenten in één centraal archief'] },
  { icon: '📊', title: 'Meer overzicht', stat: 'Altijd inzicht',
    items: ['Status per werkorder in real-time', 'Historiek per klant en installatie', 'Openstaande en afgeronde opdrachten', 'BRL100-documenten direct beschikbaar'] },
]

const faqItems = [
  {
    question: 'Wat is werkbon software voor installateurs?',
    answer:   'Werkbon software is een digitale oplossing waarmee installateurs werkbonnen volledig digitaal invullen, ondertekenen en archiveren. In plaats van papieren formulieren werkt u via een app of browser op een tablet of smartphone. Snellio is specifiek gebouwd voor airco- en HVAC-installateurs, met koeltechnische handelingen, BRL100-rapportage en directe facturatie standaard ingebouwd.',
  },
  {
    question: 'Hoe werkt de digitale werkbon app?',
    answer:   'U opent Snellio in de browser op uw tablet of telefoon, kiest de klant en installatie, selecteert het type handeling en vult de meetwaarden in. De klant tekent direct op het scherm. Daarna genereert Snellio automatisch een BRL100-rapport én een werkbon PDF, die direct naar de klant worden verstuurd.',
  },
  {
    question: 'Genereert Snellio automatisch BRL100-rapporten?',
    answer:   'Ja. Zodra u de koeltechnische handelingen invult — drukproef, lektest, vacumeren, koudemiddel bijvullen — genereert Snellio automatisch een BRL100-conform rapport. U hoeft niets handmatig op te stellen. Het rapport is direct print-klaar en wordt meegestuurd in de e-mail aan de klant.',
  },
  {
    question: 'Is de digitale handtekening juridisch geldig?',
    answer:   'Ja. De digitale handtekening in Snellio voldoet aan de eIDAS-verordening en is juridisch gelijkwaardig aan een handgeschreven handtekening. Datum, tijdstip en naam van de ondertekenaar worden vastgelegd. Het ondertekende document is altijd terug te vinden in het digitale archief.',
  },
  {
    question: 'Werkt de werkbon app ook op telefoon en tablet?',
    answer:   'Ja. Snellio werkt als webapplicatie die volledig geoptimaliseerd is voor smartphone en tablet. Er is niets te installeren via de App Store of Google Play — u opent gewoon de browser en bent direct aan het werk. Zowel iOS als Android worden ondersteund.',
  },
  {
    question: 'Kan ik direct factureren vanuit de werkbon?',
    answer:   'Ja. Zodra de werkbon is ondertekend, maakt u in één klik een factuur aan. De factuurregels worden automatisch overgenomen. U stuurt de factuur met een iDEAL of Wero betaallink via Mollie — de klant betaalt direct online.',
  },
  {
    question: 'Wat kost werkbon software van Snellio?',
    answer:   'Snellio biedt verschillende pakketten. De Starter (€10/mnd) is geschikt voor ZZP\'ers met digitale werkbonnen en BRL100. Het Basis-pakket (€29/mnd) voegt onbeperkte installaties toe. Pro (€69/mnd) bevat ook F-gassen flesregistratie en meerdere monteurs. Alle pakketten zijn 14 dagen gratis te proberen, zonder creditcard.',
  },
]

export default function WerkbonSoftwarePage() {
  return (
    <>
      <JsonLd schema={[
        breadcrumbSchema([
          { name: 'Home',             href: '/'                 },
          { name: 'Werkbon software', href: '/werkbon-software' },
        ]),
        faqSchema(faqItems),
      ]} />

      {/* ── Hero ── */}
      <LandingHero
        badge="Digitale werkbonnen · BRL100 compliant · Werkbon app"
        heading="Werkbon software voor installateurs"
        headingAccent="en HVAC bedrijven."
        sub="Geen papieren werkbonnen meer. Klant tekent direct op uw tablet, BRL100-rapport wordt automatisch gegenereerd en de PDF staat direct in de mailbox van uw klant."
        stats={[
          { value: '<span style="color:var(--cyan)">0</span>',     label: 'Papier nodig'         },
          { value: 'BRL<span style="color:var(--cyan)">100</span>', label: 'Automatisch rapport'  },
          { value: '1<span style="color:var(--cyan)">klik</span>',  label: 'Naar factuur'         },
        ]}
        trustLine="Geen installatie nodig • Direct starten • Nederlandse support"
      />

      {/* ── 1. Intro tekst ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)]">
        <Container narrow>
          <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-4">
            Wat is werkbon software?
          </p>
          <h2
            className="font-outfit font-black text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)' }}
          >
            De digitale werkbon app voor{' '}
            <span className="text-[var(--cyan)]">iedere installateur</span>
          </h2>
          <div className="text-[var(--text2)] text-[.96rem] leading-[1.85] space-y-4 max-w-none">
            <p>
              Als installateur of HVAC-bedrijf besteedt u dagelijks tijd aan het invullen van
              werkbonnen, het opstellen van BRL100-rapporten en het archiveren van documenten.
              Papieren werkbonnen raken zoek, handgeschreven meetwaarden zijn moeilijk leesbaar
              en het handmatig opstellen van rapporten kost uren per week.{' '}
              <strong className="text-white">Werkbon software lost dit structureel op.</strong>
            </p>
            <p>
              Snellio is een digitale werkbon app die speciaal is gebouwd voor airco- en
              warmtepompen installateurs, koeltechnische monteurs en HVAC-bedrijven. U vult de
              werkbon in op uw tablet of telefoon, de klant tekent direct op het scherm en het
              BRL100-rapport wordt automatisch gegenereerd. Geen papier, geen scanner, geen
              handmatige rapportage meer.
            </p>
            <p>
              Omdat Snellio is gebouwd door een BRL100-gecertificeerd installateur, bevat de
              software precies de velden die u dagelijks nodig heeft: koeltechnische meetwaarden,
              F-gas registratie, lektestdocumentatie en EPBD-informatie. Alles conform de
              actuele wetgeving — zonder dat u er extra administratietijd aan kwijt bent.
            </p>
            <p>
              De werkbon software is direct te gebruiken zonder installatie. U opent de browser
              op uw tablet of smartphone en bent binnen vijf minuten aan het werk. De eerste
              werkbon kunt u nog dezelfde dag opstellen, ondertekenen en versturen.
            </p>
          </div>
          <div className="mt-8">
            <Button href="/registreren" size="md">Start 14 dagen gratis →</Button>
          </div>
        </Container>
      </section>

      {/* ── 2. Functies overview ── */}
      <LandingFeatures
        label="Functies"
        heading="Alles voor uw digitale"
        accent="werkbon workflow"
        features={features}
      />

      {/* ── 3. Stap-voor-stap ── */}
      <section className="py-24 px-[5%] bg-[var(--navy2)]">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Hoe het werkt
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
            >
              Van werkorder naar{' '}
              <span className="text-[var(--cyan)]">betaalde factuur</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stappen.map((s, i) => (
              <div
                key={s.title}
                className="reveal relative bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-6"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--cyan)] flex items-center justify-center font-outfit font-black text-white text-sm mb-4">
                  {s.icon}
                </div>
                <h3 className="font-outfit font-bold text-white text-sm mb-2">{s.title}</h3>
                <p className="text-[var(--muted2)] text-[.8rem] leading-relaxed">{s.desc}</p>
                {i < stappen.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 text-[var(--muted)] text-lg z-10">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Problemen vs oplossingen ── */}
      <LandingProblemsVsOplossingen
        proHeading="Nog steeds <span style='color:var(--orange)'>werkbonnen op papier?</span>"
        opHeading="Met Snellio is het <span style='color:var(--cyan)'>allemaal digitaal.</span>"
        problemen={problemen}
        oplossingen={oplossingen}
      />

      {/* ── 5. Uitgebreide functionaliteiten ── */}
      <section className="py-24 px-[5%] bg-[var(--navy3)]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Functionaliteiten
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
            >
              Alles wat een digitale werkbon{' '}
              <span className="text-[var(--cyan)]">nodig heeft</span>
            </h2>
            <p className="text-[var(--text2)] text-base max-w-xl mx-auto mt-4 leading-relaxed">
              Snellio bevat alle functies die specifiek zijn voor installateurs en HVAC-bedrijven.
              Geen overbodige functionaliteit — alleen wat u dagelijks nodig heeft.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {uitgebreideFeatures.map((f, i) => (
              <article
                key={f.title}
                className="reveal bg-[var(--navy2)] border border-[var(--border)] rounded-2xl p-6 hover:border-[rgba(10,187,214,.3)] transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-outfit font-bold text-white text-[.95rem] mb-2">{f.title}</h3>
                <p className="text-[var(--muted2)] text-[.82rem] leading-relaxed">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Voor wie ── */}
      <section className="py-24 px-[5%] bg-[var(--navy2)]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Voor wie
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
            >
              Software voor installateurs —{' '}
              <span className="text-[var(--cyan)]">van ZZP tot bedrijf</span>
            </h2>
            <p className="text-[var(--text2)] text-base max-w-xl mx-auto mt-4 leading-relaxed">
              Of u nu solo werkt of een team van monteurs aanstuurt — Snellio past zich aan uw
              bedrijf aan.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {doelgroepen.map((d, i) => (
              <article
                key={d.type}
                className="reveal flex gap-5 bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-6 hover:border-[rgba(10,187,214,.25)] transition-all duration-200"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-3xl shrink-0 mt-0.5">{d.icon}</div>
                <div>
                  <h3 className="font-outfit font-bold text-white text-[.95rem] mb-2">{d.type}</h3>
                  <p className="text-[var(--muted2)] text-[.82rem] leading-relaxed">{d.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Voordelen ── */}
      <section className="py-24 px-[5%] bg-[var(--navy3)]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Voordelen
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
            >
              Wat levert digitale werkbon software{' '}
              <span className="text-[var(--cyan)]">concreet op?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {voordelen.map((v, i) => (
              <article
                key={v.title}
                className="reveal bg-[var(--navy2)] border border-[var(--border)] rounded-2xl p-7"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-outfit font-bold text-white text-lg mb-1">{v.title}</h3>
                <p className="font-mono text-[var(--cyan)] text-[.72rem] tracking-wide mb-5">
                  {v.stat}
                </p>
                <ul className="flex flex-col gap-2.5 list-none">
                  {v.items.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-[.82rem] text-[var(--text2)]">
                      <span className="text-[var(--green)] font-bold shrink-0 mt-px">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Use case ── */}
      <section className="py-24 px-[5%] bg-[var(--navy2)]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-4">
              Praktijkvoorbeeld
            </p>
            <h2
              className="font-outfit font-black text-white leading-tight mb-8"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)' }}
            >
              Hoe Tim zijn werkbon administratie{' '}
              <span className="text-[var(--cyan)]">van 4 uur naar 20 minuten bracht</span>
            </h2>

            <div className="bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--cyan)] flex items-center justify-center text-xl shrink-0">
                  🔧
                </div>
                <div>
                  <p className="font-outfit font-bold text-white text-lg">Tim — Airco installateur ZZP</p>
                  <p className="text-[var(--muted2)] text-sm">
                    Installeert dagelijks 2–3 airco-units en warmtepompen in de regio Utrecht
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-mono text-[.62rem] text-[var(--orange)] uppercase tracking-wide mb-3">
                    Situatie voor Snellio
                  </p>
                  <ul className="flex flex-col gap-2.5 list-none">
                    {[
                      'Papieren werkbonnen per installatie invullen',
                      'BRL100-rapporten handmatig opstellen: 45 min/stuk',
                      'Klant ondertekent papieren bon, thuis inscannen',
                      'Factuur de volgende ochtend apart invoeren',
                      'Wekelijks 3–4 uur kwijt aan administratie',
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-[.82rem] text-[var(--muted2)]">
                        <span className="text-[#e05555] font-bold shrink-0 mt-px">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[.62rem] text-[var(--green)] uppercase tracking-wide mb-3">
                    Situatie met Snellio
                  </p>
                  <ul className="flex flex-col gap-2.5 list-none">
                    {[
                      'Werkbon invullen op tablet: 5 minuten per job',
                      'BRL100-rapport automatisch klaar bij invullen',
                      'Klant tekent op scherm, PDF direct verstuurd',
                      'Factuur aanmaken vanuit werkbon: 1 klik',
                      'Wekelijks nog geen 20 minuten administratie',
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-[.82rem] text-[var(--text2)]">
                        <span className="text-[var(--green)] font-bold shrink-0 mt-px">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--border)] flex flex-wrap gap-8">
                {[
                  { label: 'Tijdsbesparing', value: '3+ uur/week'  },
                  { label: 'Fouten',         value: 'Bijna nul'    },
                  { label: 'Setup tijd',     value: '< 5 minuten'  },
                ].map(s => (
                  <div key={s.label}>
                    <p className="font-outfit font-black text-[var(--cyan)] text-xl">{s.value}</p>
                    <p className="font-mono text-[var(--muted2)] text-[.62rem] uppercase tracking-wide">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="/registreren" size="md">
                Start net als Tim — 14 dagen gratis →
              </Button>
              <Button href="/pricing" variant="ghost" size="md">
                Bekijk pakketten
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 9. SEO tekst ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)]">
        <Container narrow>
          <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-4">
            Meer over werkbon software
          </p>
          <h2
            className="font-outfit font-black text-white leading-tight mb-8"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
          >
            Waarom moderne installateurs kiezen voor{' '}
            <span className="text-[var(--cyan)]">digitale werkbon software</span>
          </h2>
          <div className="prose-snellio space-y-5 text-[var(--text2)] text-[.96rem] leading-[1.9]">
            <p>
              Werkbon software is voor veel installateurs en HVAC-bedrijven nog een relatief nieuw begrip, maar de overstap van papier naar digitaal is één van de meest concrete manieren om tijd te besparen en fouten te voorkomen. Een werkbon is het centrale document bij elke serviceopdracht: het legt vast wat er gedaan is, welke meetwaarden zijn geregistreerd en wie er akkoord mee is gegaan. Als dat document op papier bestaat, is het kwetsbaar — het raakt zoek, het is moeilijk leesbaar en archiveren kost onevenredig veel tijd.
            </p>
            <p>
              Met een digitale werkbon app verandert het hele proces. De monteur opent de app op zijn tablet of telefoon, selecteert de klant en installatie en vult de handelingen in via velden die specifiek zijn gemaakt voor koeltechnisch werk: drukwaarden, temperatuurmetingen, vacuümresultaten, koudemiddelhoeveelheden en lektestuitkomsten. Alles staat in het juiste formaat, op de juiste plek. Er is geen ruimte voor onduidelijke handschriften of vergeten velden, omdat de software alleen verder gaat als de verplichte invoer compleet is.
            </p>
            <p>
              Het verschil met Excel of een Word-sjabloon is fundamenteel. Een spreadsheet of tekstdocument is generiek — het is niet gebouwd voor de specifieke werkwijze van een installateur en biedt geen koppeling aan klantdossiers, installaties of facturatie. U typt gegevens in, slaat het bestand op en moet het vervolgens zelf mailen, archiveren en terugvinden. Bij Snellio is de werkbon onderdeel van een volledig systeem: de klantgegevens zijn al ingevuld, de installatiegegevens zijn bekend en zodra de bon ondertekend is, kunt u in één klik een factuur aanmaken. Niets hoeft dubbel ingevoerd te worden.
            </p>
            <p>
              Voor installatiebedrijven met meerdere monteurs is goede werkbon software nog belangrijker. Zonder centraal systeem werkt iedereen met zijn eigen variant van een formulier, zijn eigen manier van archiveren en zijn eigen manier van communiceren met de klant. Dat leidt tot inconsistentie, gemiste informatie en extra werk voor de administratie. Software voor installateurs brengt structuur: iedere monteur werkt met hetzelfde format, alle documenten komen op dezelfde plek terecht en de eigenaar heeft altijd inzicht in de status van openstaande opdrachten. Combineer dit met de{' '}
              <a href="/planningssoftware-monteurs" className="text-[var(--cyan)] hover:underline font-medium">planningssoftware voor monteurs</a>
              {' '}en u heeft een volledig operationeel systeem.
            </p>
            <p>
              Snellio is als werkbon app specifiek ontworpen voor de HVAC-branche. De software bevat standaard alle koeltechnische velden die nodig zijn voor BRL100-certificering en{' '}
              <a href="/f-gassen-registratie" className="text-[var(--cyan)] hover:underline font-medium">F-gas wetgeving</a>
              {' '}— niet als extra module of add-on, maar als integraal onderdeel van iedere werkbon. Dat betekent dat u na het invullen van de handelingen direct een gecertificeerd rapport kunt genereren, zonder extra stappen. De klant ondertekent op het scherm, de PDF wordt automatisch verstuurd en de werkbon is gearchiveerd in het klantdossier. Van opdracht tot afgerond document duurt het nog geen tien minuten — waar dat vroeger een avond administratie kostte.
            </p>
          </div>
        </Container>
      </section>

      {/* ── 10. FAQ ── */}
      <LandingFaq items={faqItems} heading="Veelgestelde vragen over werkbon software" />

      {/* ── Interne links ── */}
      <LandingInternalLinks
        links={[
          { href: '/crm-voor-installateurs',     icon: '🏢', title: 'CRM voor installateurs',  desc: 'Klant- en installatiebeheer'          },
          { href: '/planningssoftware-monteurs',  icon: '📅', title: 'Planning monteurs',         desc: 'Werkorders inplannen per monteur'      },
          { href: '/f-gassen-registratie',        icon: '❄️', title: 'F-gassen registratie',      desc: 'Flesregistratie & F-gas logboek'       },
          { href: '/pricing',                     icon: '💶', title: 'Pakketten & prijzen',        desc: 'Vanaf €10/maand, 14 dagen gratis'   },
        ]}
      />

      <Cta />
    </>
  )
}
