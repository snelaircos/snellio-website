import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schemas'
import JsonLd          from '@/components/seo/JsonLd'
import LandingHero     from '@/components/sections/LandingHero'
import LandingFaq      from '@/components/sections/LandingFaq'
import LandingInternalLinks from '@/components/sections/LandingInternalLinks'
import Cta             from '@/components/sections/Cta'
import Button          from '@/components/ui/Button'
import Container       from '@/components/ui/Container'

export const metadata: Metadata = buildMetadata({
  title:       'Planningssoftware voor monteurs | Snellio',
  description: 'Plan werkorders, wijs monteurs toe en houd altijd overzicht met Snellio. Planningssoftware voor monteurs en installatiebedrijven met Google Calendar sync, realtime status en directe koppeling aan klantdossiers. Start 14 dagen gratis.',
  path:        '/planningssoftware-monteurs',
})

// ── Data ──────────────────────────────────────────────────────────────────────

const features = [
  {
    icon:  '📅',
    title: 'Werkorders inplannen',
    desc:  'Maak werkorders aan en plan ze direct in op datum en tijdstip. Kies de klant, installatie en het type handeling — alle relevante informatie staat al klaar vanuit het klantdossier.',
  },
  {
    icon:  '👷',
    title: 'Monteurs toewijzen',
    desc:  'Wijs elke werkorder toe aan de juiste monteur. De monteur ziet zijn opdrachten direct in de app op zijn tablet of telefoon. Geen WhatsApp, geen bellen — gewoon een heldere taakopdracht.',
  },
  {
    icon:  '🗓',
    title: 'Planningsoverzicht per dag en week',
    desc:  'Bekijk alle geplande werkorders per dag, per week en per monteur in één overzicht. Direct inzicht in wie waar is, wat er open staat en waar nog capaciteit is.',
  },
  {
    icon:  '🔗',
    title: 'Koppeling met klant en installatie',
    desc:  'Elke werkorder is gekoppeld aan een klant, locatie en installatie. De monteur ziet ter plaatse direct de technische specificaties, servicehistorie en eerdere werkbonnen van die installatie.',
  },
  {
    icon:  '🗺',
    title: 'Google Calendar sync',
    desc:  'Werkorders worden automatisch als afspraken aangemaakt in de Google Calendar van de toegewezen monteur — inclusief klantadres en telefoonnummer. Per monteur instelbaar.',
    badge: 'Automatisch',
  },
  {
    icon:  '🔔',
    title: 'Status per werkorder',
    desc:  'Monteur markeert de werkorder als onderweg, bezig of afgerond. U ziet de voortgang realtime in het planningsoverzicht, zonder bellen of appen.',
  },
  {
    icon:  '📊',
    title: 'Realtime inzicht voor de eigenaar',
    desc:  'Altijd overzicht over openstaande opdrachten, afgeronde werkorders en te factureren diensten. Geen verrassingen aan het einde van de week.',
  },
  {
    icon:  '🧾',
    title: 'Van planning naar factuur',
    desc:  'Zodra de werkorder is afgerond en de werkbon ondertekend, maakt u in één klik een factuur aan met iDEAL of Wero betaallink via Mollie. Geen dubbele invoer.',
  },
]

const problemen = [
  {
    title: 'Planning via telefoon of WhatsApp',
    desc:  'Afspraken worden mondeling of via berichten verdeeld. Na een week is niets meer terug te vinden en niemand weet meer precies wie wat wanneer deed.',
  },
  {
    title: 'Dubbel ingeplande monteurs',
    desc:  'Zonder centraal overzicht kunnen twee monteurs tegelijk op hetzelfde adres staan, of één monteur nergens — terwijl de klant al wacht.',
  },
  {
    title: 'Onduidelijke werkorderstatus',
    desc:  'Is die opdracht al uitgevoerd? Is de bon al ondertekend? Moet er nog gefactureerd worden? Zonder systeem weet niemand het zeker.',
  },
  {
    title: 'Verkeerde informatie onderweg',
    desc:  'Monteur rijdt naar het verkeerde adres, heeft het verkeerde gereedschap mee of weet niet wat er eerder gedaan is bij die installatie.',
  },
]

const oplossingen = [
  {
    title: 'Centrale planning, altijd up-to-date',
    desc:  'Alle werkorders staan in één systeem. Iedereen ziet hetzelfde overzicht, op elk apparaat, altijd actueel.',
  },
  {
    title: 'Juiste monteur op de juiste klus',
    desc:  'Toewijzing per werkorder, direct zichtbaar in de app van de monteur. Google Calendar synct automatisch mee.',
  },
  {
    title: 'Duidelijke status per werkorder',
    desc:  'Van ingepland naar onderweg naar afgerond — elke stap is zichtbaar. Factuur aanmaken zodra de bon getekend is.',
  },
  {
    title: 'Actuele klant- en installatiegegevens',
    desc:  'Monteur heeft direct toegang tot het volledige dossier: adres, installatietype, servicehistorie en eerdere werkbonnen.',
  },
]

const doelgroepen = [
  {
    icon:  '🔧',
    type:  'ZZP met groeiambitie',
    desc:  'Als u wilt groeien van solo naar een kleine ploeg, is een centrale planning essentieel. Snellio groeit mee: begin zonder medewerkers en schakel eenvoudig op naar meerdere monteurs zodra dat nodig is.',
  },
  {
    icon:  '🏢',
    type:  'Klein installatiebedrijf',
    desc:  'Met twee tot vijf monteurs in het veld heeft u overzicht nodig zonder een fulltime planner. Snellio geeft u dat overzicht in een paar minuten per dag.',
  },
  {
    icon:  '🛠',
    type:  'Servicebedrijf',
    desc:  'Periodiek onderhoud, storingen en spoedopdrachten vereisen een flexibele planning. Met Snellio plant u snel in, past u eenvoudig aan en houdt u altijd overzicht over openstaande serviceopdrachten.',
  },
  {
    icon:  '👷',
    type:  'Bedrijf met meerdere monteurs',
    desc:  'Meer monteurs betekent meer coördinatie. Snellio centraliseert de planning zodat iedereen altijd weet wat er van hem verwacht wordt — zonder eindeloos bellen en appen.',
  },
]

const voordelen = [
  {
    icon:  '✅',
    title: 'Minder planningsfouten',
    stat:  'Geen dubbele boekingen',
    items: [
      'Centraal overzicht voor iedereen',
      'Automatische Calendar sync per monteur',
      'Nooit twee monteurs op hetzelfde adres',
      'Altijd de juiste informatie bij de hand',
    ],
  },
  {
    icon:  '⏱',
    title: 'Tijd besparen',
    stat:  '1–2 uur per dag',
    items: [
      'Geen rondbellen om status te checken',
      'Werkorder toewijzen in één klik',
      'Monteur hoeft niets te bevestigen via WhatsApp',
      'Overzicht in seconden, niet in minuten',
    ],
  },
  {
    icon:  '🧘',
    title: 'Meer rust en overzicht',
    stat:  'Altijd in control',
    items: [
      'Realtime inzicht in de voortgang',
      'Direct zien wat er open staat',
      'Facturen aanmaken zodra opdracht klaar is',
      'Geen verrassingen aan het einde van de week',
    ],
  },
]

const stappen = [
  {
    icon:  '1',
    title: 'Werkorder aanmaken',
    desc:  'Kies klant, locatie, installatie en type opdracht. Snellio vult de klantgegevens automatisch in.',
  },
  {
    icon:  '2',
    title: 'Monteur toewijzen',
    desc:  'Selecteer de monteur en kies een datum en tijdstip. De opdracht verschijnt direct in zijn app en agenda.',
  },
  {
    icon:  '3',
    title: 'Monteur voert uit',
    desc:  'Monteur opent de werkorder op zijn tablet, vult de handelingen in en laat de klant tekenen.',
  },
  {
    icon:  '4',
    title: 'Direct factureren',
    desc:  'Na ondertekening maakt u in één klik een factuur aan met betaallink. Klaar.',
  },
]

const faqItems = [
  {
    question: 'Wat is planningssoftware voor monteurs?',
    answer:   'Planningssoftware voor monteurs is een digitaal systeem waarmee installatiebedrijven werkorders kunnen inplannen, toewijzen aan monteurs en bewaken tot de uitvoering en facturatie. Anders dan een papieren agenda of een gedeeld Excel-bestand is de planning altijd actueel, voor iedereen zichtbaar en direct gekoppeld aan klantgegevens, installatiedossiers en werkbonnen.',
  },
  {
    question: 'Werkt de Google Calendar sync automatisch?',
    answer:   'Ja. Zodra u een werkorder aanmaakt en toewijst aan een monteur, verschijnt de afspraak automatisch in de Google Calendar van die monteur — inclusief klantadres en telefoonnummer. Wijzigingen worden automatisch gesynchroniseerd. U kunt dit per monteur instellen en inschakelen.',
  },
  {
    question: 'Kan elke monteur zijn eigen planning zien?',
    answer:   'Ja. Elke monteur heeft zijn eigen login en ziet alleen zijn eigen werkorders en planning. De eigenaar of planner heeft overzicht over alle monteurs. Op die manier werkt iedereen met de juiste informatie zonder dat privacygevoelige klantgegevens onnodig worden gedeeld.',
  },
  {
    question: 'Hoe snel is een werkorder aangemaakt en ingepland?',
    answer:   'Gemiddeld minder dan een minuut. U kiest de klant, de installatie en het type opdracht — Snellio vult de klantgegevens automatisch in. Daarna wijst u een monteur toe, kiest een datum en de werkorder staat ingepland. De monteur ziet het direct in zijn app.',
  },
  {
    question: 'Kan ik de planning ook aanpassen als een monteur ziek is?',
    answer:   'Ja. U kunt werkorders op elk moment herplannen en opnieuw toewijzen aan een andere monteur. De kalender en het overzicht worden direct bijgewerkt. Als Google Calendar sync actief is, ontvangen beide monteurs automatisch een bijgewerkte afspraak.',
  },
  {
    question: 'Werkt Snellio ook voor spoedopdrachten en storingen?',
    answer:   'Ja. Een spoedopdracht aanmaken en direct inplannen duurt minder dan een minuut. U ziet direct welke monteur beschikbaar is en kunt direct toewijzen. De monteur ontvangt de opdracht direct op zijn telefoon of tablet, zonder bellen of appen.',
  },
  {
    question: 'Is planningssoftware beschikbaar in alle pakketten?',
    answer:   'De basisplanning is beschikbaar als optie bij het Basis-pakket. Vanaf het Pro-pakket is meerdere monteurs en volledige planningsfunctionaliteit standaard inbegrepen. Enterprise bevat de volledige planningsmodule inclusief alle functies.',
  },
]

// ── Pagina ────────────────────────────────────────────────────────────────────

export default function PlanningssoftwareMonteurPage() {
  return (
    <>
      <JsonLd schema={[
        breadcrumbSchema([
          { name: 'Home',                       href: '/'                             },
          { name: 'Planningssoftware monteurs', href: '/planningssoftware-monteurs'   },
        ]),
        faqSchema(faqItems),
      ]} />

      {/* ── Hero ── */}
      <LandingHero
        badge="Planningssoftware · Monteurs inplannen · Google Calendar sync"
        heading="Planningssoftware voor monteurs, installateurs"
        headingAccent="en HVAC-bedrijven."
        sub="Werkorders inplannen, monteurs toewijzen en altijd overzicht houden — zonder bellen, zonder WhatsApp, zonder dubbele boekingen."
        ctaPrimary={{ label: 'Start 14 dagen gratis →', href: '/registreren' }}
        ctaSecondary={{ label: 'Bekijk pakketten', href: '/pricing' }}
        trustLine="Geen installatie nodig • Direct starten • Nederlandse support"
        stats={[
          { value: '<span style="color:var(--cyan)">Auto</span>', label: 'Google Calendar sync'  },
          { value: '1<span style="color:var(--cyan)">min</span>', label: 'Werkorder inplannen'   },
          { value: '<span style="color:var(--cyan)">0</span>',    label: 'Dubbele boekingen'     },
        ]}
      />

      {/* ── 1. Intro tekst ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)]">
        <Container narrow>
          <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-4">
            Wat is planningssoftware voor monteurs?
          </p>
          <h2
            className="font-outfit font-black text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)' }}
          >
            Van losse afspraken naar{' '}
            <span className="text-[var(--cyan)]">centrale buitendienst planning</span>
          </h2>
          <div className="text-[var(--text2)] text-[.96rem] leading-[1.85] space-y-4">
            <p>
              De meeste installatiebedrijven beginnen met een eenvoudige planning: een whiteboard, een gedeeld Google-spreadsheet of gewoon bellen en appen. Dat werkt prima als u solo werkt of met één extra monteur. Maar zodra er meer mensen in het veld zijn, meerdere klanten op een dag en wisselende opdrachten, wordt de planning al snel de zwakste schakel in uw bedrijf.
            </p>
            <p>
              Planningssoftware voor monteurs lost dit structureel op. In plaats van losse communicatie heeft u één centraal systeem waar werkorders worden aangemaakt, ingepland en toegewezen. De monteur ziet zijn opdrachten direct op zijn tablet of telefoon, inclusief het klantadres, de installatiegegevens en eventuele opmerkingen. Er wordt niets meer vergeten, er zijn geen misverstanden over wie welke klus doet en u hoeft niet meer te bellen om de status van een opdracht te achterhalen.
            </p>
            <p>
              Snellio is gebouwd voor installateurs en HVAC-bedrijven die willen groeien zonder dat de administratie en planning proportioneel meer tijd gaan kosten. De planningsmodule is direct gekoppeld aan het{' '}
              <a href="/crm-voor-installateurs" className="text-[var(--cyan)] hover:underline font-medium">CRM voor installateurs</a>
              {' '}en de installatiebeheer — zodat een monteur die bij een klant aankomt direct alles ziet wat hij nodig heeft, van adres tot eerdere werkbonnen. Dat bespaart niet alleen tijd, het voorkomt ook fouten en geeft u als eigenaar rust en overzicht over uw bedrijf.
            </p>
          </div>
          <div className="mt-8">
            <Button href="/registreren" size="md">Start 14 dagen gratis →</Button>
          </div>
        </Container>
      </section>

      {/* ── 2. Features ── */}
      <section className="py-24 px-[5%] bg-[var(--navy3)]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Functies
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
            >
              Alles voor uw{' '}
              <span className="text-[var(--cyan)]">monteursplanning</span>
            </h2>
            <p className="text-[var(--text2)] text-base max-w-xl mx-auto mt-4 leading-relaxed">
              Van werkorder aanmaken tot factuur versturen — Snellio beheert de volledige servicecyclus voor installatiebedrijven.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <article
                key={f.title}
                className="reveal group relative bg-[var(--navy2)] border border-[var(--border)] rounded-2xl p-6 hover:border-[rgba(10,187,214,.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,144,184,.12)]"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {'badge' in f && f.badge && (
                  <span className="absolute top-4 right-4 bg-[var(--green)] text-white text-[.6rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                    {f.badge}
                  </span>
                )}
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-outfit font-bold text-white text-[.95rem] mb-2">{f.title}</h3>
                <p className="text-[var(--muted2)] text-[.82rem] leading-relaxed">{f.desc}</p>
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(10,187,214,.05) 0%, transparent 70%)' }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

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
              <span className="text-[var(--cyan)]">afgeronde opdracht</span>
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
      <section className="py-24 px-[5%] bg-[var(--navy3)]">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className="reveal">
            <p className="font-mono text-[.65rem] text-[var(--orange)] uppercase tracking-[.14em] mb-3">
              Zonder planningssoftware
            </p>
            <h2
              className="font-outfit font-bold text-white leading-tight mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Herkenbaar?{' '}
              <span className="text-[var(--orange)]">Zo gaat het zonder systeem.</span>
            </h2>
            <ul className="flex flex-col gap-3.5 list-none">
              {problemen.map(p => (
                <li
                  key={p.title}
                  className="flex items-start gap-4 bg-[rgba(255,80,80,.05)] border border-[rgba(255,80,80,.12)] rounded-xl px-5 py-4"
                >
                  <span className="text-[#e05555] font-bold text-lg shrink-0 mt-px">✗</span>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">{p.title}</p>
                    <p className="text-[var(--muted2)] text-[.82rem] leading-relaxed">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            <p className="font-mono text-[.65rem] text-[var(--green)] uppercase tracking-[.14em] mb-3">
              Met Snellio
            </p>
            <h2
              className="font-outfit font-bold text-white leading-tight mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Met Snellio heeft u{' '}
              <span className="text-[var(--cyan)]">altijd grip op de planning.</span>
            </h2>
            <ul className="flex flex-col gap-3.5 list-none">
              {oplossingen.map(o => (
                <li
                  key={o.title}
                  className="flex items-start gap-4 bg-[rgba(18,168,122,.06)] border border-[rgba(18,168,122,.18)] rounded-xl px-5 py-4"
                >
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

      {/* ── 5. Google Calendar highlight ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)]">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Integratie
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight mb-5"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
            >
              Google Calendar{' '}
              <span className="text-[var(--cyan)]">automatisch bijgewerkt</span>
            </h2>
            <p className="text-[var(--text2)] text-base leading-relaxed max-w-xl mx-auto mb-10">
              Zodra u een werkorder aanmaakt en toewijst, verschijnt de afspraak direct in de Google Calendar van de betreffende monteur — inclusief klantadres, telefoonnummer en installatiegegevens. Wijzigen of annuleren? De agenda past automatisch mee.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-left">
              {[
                {
                  icon: '🔗',
                  title: 'Per monteur instelbaar',
                  desc:  'Koppel Google Calendar per monteur, onafhankelijk van de anderen. Werkt ook als een monteur zijn eigen Google-account gebruikt.',
                },
                {
                  icon: '🔄',
                  title: 'Automatische synchronisatie',
                  desc:  'Aanmaken, wijzigen of annuleren van een werkorder — de agenda van de monteur wordt direct bijgewerkt. Geen handmatig kopiëren.',
                },
                {
                  icon: '📍',
                  title: 'Klantinfo in de afspraak',
                  desc:  'Het klantadres en telefoonnummer staan direct in de agenda-afspraak. De monteur kan vanuit zijn agenda navigeren zonder de app te openen.',
                },
              ].map(item => (
                <div
                  key={item.title}
                  className="reveal bg-[var(--navy3)] border border-[var(--border)] rounded-xl p-5"
                >
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <p className="font-outfit font-bold text-white text-sm mb-1.5">{item.title}</p>
                  <p className="text-[var(--muted2)] text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 6. Doelgroepen ── */}
      <section className="py-24 px-[5%] bg-[var(--navy3)]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Voor wie
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
            >
              Planning software voor{' '}
              <span className="text-[var(--cyan)]">elk installatiebedrijf</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {doelgroepen.map((d, i) => (
              <article
                key={d.type}
                className="reveal flex gap-5 bg-[var(--navy2)] border border-[var(--border)] rounded-2xl p-7 hover:border-[rgba(10,187,214,.25)] transition-all duration-200"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-3xl shrink-0 mt-0.5">{d.icon}</div>
                <div>
                  <h3 className="font-outfit font-bold text-white text-[.95rem] mb-2">{d.type}</h3>
                  <p className="text-[var(--muted2)] text-[.84rem] leading-relaxed">{d.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Voordelen ── */}
      <section className="py-24 px-[5%] bg-[var(--navy2)]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-3">
              Voordelen
            </p>
            <h2
              className="font-outfit font-black text-white tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
            >
              Wat levert centrale planning{' '}
              <span className="text-[var(--cyan)]">concreet op?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {voordelen.map((v, i) => (
              <article
                key={v.title}
                className="reveal bg-[var(--navy3)] border border-[var(--border)] rounded-2xl p-7"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-outfit font-bold text-white text-lg mb-1">{v.title}</h3>
                <p className="font-mono text-[var(--cyan)] text-[.72rem] tracking-wide mb-5">{v.stat}</p>
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
      <section className="py-24 px-[5%] bg-[var(--navy3)]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-4">
              Praktijkvoorbeeld
            </p>
            <h2
              className="font-outfit font-black text-white leading-tight mb-8"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)' }}
            >
              Hoe Airco Totaal de chaos van vier{' '}
              <span className="text-[var(--cyan)]">monteurs in één systeem bracht</span>
            </h2>

            <div className="bg-[var(--navy2)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--cyan)] flex items-center justify-center text-xl shrink-0">
                  🏢
                </div>
                <div>
                  <p className="font-outfit font-bold text-white text-lg">
                    Airco Totaal — installatiebedrijf met 4 monteurs
                  </p>
                  <p className="text-[var(--muted2)] text-sm">
                    Airco-installaties en service in Noord-Holland
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <p className="font-mono text-[.62rem] text-[var(--orange)] uppercase tracking-wide mb-3">
                    Situatie voor Snellio
                  </p>
                  <p className="text-[var(--text2)] text-[.85rem] leading-relaxed">
                    Eigenaar Sandra stuurde vier monteurs aan en deelde de planning wekelijks via een WhatsApp-groep. Elke dag kwamen er aanpassingen: een klant die verzette, een extra spoedopdracht, een monteur die later begon. Elke aanpassing moest handmatig gecommuniceerd worden. Twee keer per maand stond er een monteur voor een gesloten deur omdat het adres niet goed was doorgekomen. De facturatie liep weken achter omdat Sandra niet altijd wist welke opdrachten al afgerond waren en welke nog openstonden.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[.62rem] text-[var(--green)] uppercase tracking-wide mb-3">
                    Situatie met Snellio
                  </p>
                  <p className="text-[var(--text2)] text-[.85rem] leading-relaxed">
                    Na de overstap naar Snellio plant Sandra werkorders digitaal in en wijst ze direct toe aan de juiste monteur. De Google Calendar van elke monteur wordt automatisch bijgewerkt — inclusief klantadres en telefoonnummer. Wijzigingen worden direct gesynchroniseerd, zonder bellen of appen. Sandra ziet realtime welke opdrachten zijn afgerond en maakt facturen aan zodra de werkbon is ondertekend. De achterstand in facturatie is volledig weggewerkt en de gemiddelde betaaltermijn daalde van 28 naar 12 dagen.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border)] flex flex-wrap gap-8">
                {[
                  { label: 'Planningsfouten',   value: '−90%'       },
                  { label: 'Betaaltermijn',      value: '28 → 12 dgn' },
                  { label: 'Planning tijd/week', value: '−5 uur'     },
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
              <Button href="/registreren" size="md">Start 14 dagen gratis →</Button>
              <Button href="/pricing" variant="ghost" size="md">Bekijk pakketten</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 9. SEO tekst ── */}
      <section className="py-20 px-[5%] bg-[var(--navy2)]">
        <Container narrow>
          <p className="font-mono text-[.65rem] text-[var(--cyan)] uppercase tracking-[.14em] mb-4">
            Meer over planningssoftware voor installateurs
          </p>
          <h2
            className="font-outfit font-black text-white leading-tight mb-8"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
          >
            Waarom goede planningssoftware{' '}
            <span className="text-[var(--cyan)]">het verschil maakt</span>
          </h2>
          <div className="text-[var(--text2)] text-[.96rem] leading-[1.9] space-y-5">
            <p>
              Planningssoftware voor monteurs is voor veel installatiebedrijven een van de eerste concrete stappen richting een professionelere bedrijfsvoering. Zolang u solo werkt, is een agenda en een telefoon voldoende. Maar zodra er meerdere monteurs in het veld zijn, wordt de planning al snel een dagelijkse bron van stress: wie doet wat, is iedereen op de juiste locatie, zijn alle klanten geïnformeerd en zijn alle opdrachten uitgevoerd en gefactureerd?
            </p>
            <p>
              Het antwoord op die vragen ligt niet in meer WhatsApp-berichten of een uitgebreider spreadsheet, maar in{' '}
              <a href="/crm-voor-installateurs" className="text-[var(--cyan)] hover:underline font-medium">centrale software voor installateurs</a>
              {' '}die de planning, de klantdossiers en de werkbonnen met elkaar verbindt. Dat is precies wat buitendienst planning software zoals Snellio doet: één systeem voor de volledige servicecyclus, van het aanmaken van een werkorder tot het versturen van de factuur.
            </p>
            <p>
              Monteurs inplannen gaat met Snellio in minder dan een minuut. U maakt een werkorder aan, kiest de klant en installatie, selecteert een monteur en een tijdstip. De monteur ontvangt de opdracht direct op zijn telefoon of tablet en de afspraak verschijnt automatisch in zijn Google Calendar — inclusief het klantadres en telefoonnummer. Rijdt de monteur een andere route? De navigatie-app pakt het adres direct op uit de agendaafspraak.
            </p>
            <p>
              Voor service planning voor installateurs is de koppeling aan klantdossiers en installatiegegevens minstens zo belangrijk als de planning zelf. Een monteur die bij een klant aankomt en direct de servicehistorie, het type installatie en de eerdere meetwaarden kan inzien, werkt efficiënter en maakt minder fouten. Die koppeling ontbreekt bij generieke planningstools, maar is ingebouwd in Snellio. Zo heeft u niet alleen een planning, maar een volledig servicemanagementsysteem.
            </p>
            <p>
              Planning software voor installateurs moet ook schalen met uw bedrijf. Snellio werkt voor een solo-installateur die zijn eerste medewerker aanneemt net zo goed als voor een team van vijf monteurs met een volle agenda. U hoeft niet van systeem te wisselen als uw bedrijf groeit — Snellio groeit gewoon mee. En met de ingebouwde{' '}
              <a href="/werkbon-software" className="text-[var(--cyan)] hover:underline font-medium">werkbon software</a>
              {' '}is de stap van uitgevoerde opdracht naar ondertekende bon en verstuurde factuur nog nooit zo klein geweest.
            </p>
          </div>
        </Container>
      </section>

      {/* ── 10. FAQ ── */}
      <LandingFaq items={faqItems} heading="Veelgestelde vragen over planningssoftware voor monteurs" />

      {/* ── 11. Interne links ── */}
      <LandingInternalLinks
        heading="Meer functies van Snellio"
        links={[
          { href: '/crm-voor-installateurs',  icon: '🏢', title: 'CRM voor installateurs',   desc: 'Klant- en installatiebeheer'          },
          { href: '/werkbon-software',         icon: '📋', title: 'Werkbon software',          desc: 'Digitale werkbonnen met handtekening' },
          { href: '/f-gassen-registratie',     icon: '❄️', title: 'F-gassen registratie',      desc: 'Flesregistratie & F-gas logboek'      },
          { href: '/pricing',                  icon: '💶', title: 'Pakketten & prijzen',        desc: 'Vanaf €10/mnd, 14 dagen gratis'    },
        ]}
      />

      <Cta />
    </>
  )
}
