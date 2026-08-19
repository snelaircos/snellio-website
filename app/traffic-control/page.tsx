import type { Metadata } from 'next'
import Image              from 'next/image'
import { buildMetadata }  from '@/lib/metadata'
import Container          from '@/components/ui/Container'

export const metadata: Metadata = buildMetadata({
  title:       'Snellio Traffic Control — word de verkeersregisseur',
  description: 'Stem verkeerslichten op elkaar af, bouw de perfecte groene golf en houd de stad in beweging. Binnenkort voor iPhone en iPad.',
  path:        '/traffic-control',
  image:       '/traffic-control/app-icon-1024.png',
})

const features = [
  {
    title: 'Bouw de groene golf',
    text:  'Verschuif de offsets tussen kruispunten zodat elk peloton nét op groen aankomt — en zie het verkeer zonder één stop doorstromen.',
  },
  {
    title: 'Echte VRI-regeling',
    text:  'De lichten werken zoals een echte verkeersregelinstallatie: groen, geel, alles-rood en conflictbewaking. Onveilige situaties bestaan niet.',
  },
  {
    title: 'Stuur live bij',
    text:  'Pas offsets en groentijden aan terwijl het verkeer rijdt. Wijzigingen gaan pas in op een veilig moment — net als bij een echte verkeerscentrale.',
  },
  {
    title: 'Drie leerzame levels',
    text:  'Van je eerste groene golf tot spitsregisseur met wisselende verkeersdrukte. Verdien sterren en ontgrendel het volgende level.',
  },
  {
    title: 'Eerlijke score',
    text:  'Doorstroming, wachttijden en onverwerkte vraag tellen allemaal mee. Een zijweg laten vastlopen levert nooit een topscore op.',
  },
  {
    title: 'Voor iPhone en iPad',
    text:  'Ontworpen voor touch, van klein telefoonscherm tot groot tablet. Alles reageert direct onder je vingers.',
  },
]

const steps = [
  {
    step:  '1',
    title: 'Bekijk het verkeer',
    text:  'Tik op een kruispunt en zie de wachtrijen, fases en wachttijden per richting.',
  },
  {
    step:  '2',
    title: 'Stel de regeling af',
    text:  'Schuif de offset en de groenverdeling tot hoofdweg én zijwegen soepel lopen.',
  },
  {
    step:  '3',
    title: 'Scoor sterren',
    text:  'Start de simulatie, volg het resultaat en verbeter je regeling tot drie sterren.',
  },
]

const screenshots = [
  {
    src:     '/traffic-control/screen-1.png',
    alt:     'Speelveld van Snellio Traffic Control met drie kruispunten en wachtend verkeer',
    caption: 'Drie gekoppelde kruispunten, één corridor — houd alles in beweging.',
  },
  {
    src:     '/traffic-control/screen-2.png',
    alt:     'Kruispuntpaneel met offset- en groentijdregelaars en wachtrijen per richting',
    caption: 'Regel elk kruispunt als een echte verkeerskundige: offset, groentijd en wachtrijen.',
  },
  {
    src:     '/traffic-control/screen-3.png',
    alt:     'Resultaatscherm met score, sterren en verkeersstatistieken',
    caption: 'Na elke ronde: je score, sterren en één concrete verbetertip.',
  },
]

export default function TrafficControlPage() {
  return (
    <div className="pt-32 pb-8">
      {/* Hero */}
      <Container>
        <div className="flex flex-col items-center gap-10 pb-16 text-center lg:flex-row lg:text-left">
          <div className="flex-1">
            <p className="mb-4 inline-block rounded-full border border-green/30 bg-green/10 px-4 py-1.5 text-sm font-medium text-green">
              Binnenkort in de App Store · voor iPhone &amp; iPad
            </p>
            <h1 className="font-outfit text-4xl font-extrabold leading-tight text-navy sm:text-5xl">
              Word de verkeersregisseur
              <span className="block text-green">van de stad</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted lg:pr-8">
              Drie kruispunten, één hoofdweg en een stad vol ongeduldige
              bestuurders. Stem de verkeerslichten op elkaar af, bouw de
              perfecte groene golf en laat niemand onnodig wachten.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-navy lg:justify-start">
              <span className="rounded-lg border border-navy/10 bg-white px-3 py-2 shadow-sm">🚦 Realistische verkeerslichten</span>
              <span className="rounded-lg border border-navy/10 bg-white px-3 py-2 shadow-sm">🌊 Groene golf</span>
              <span className="rounded-lg border border-navy/10 bg-white px-3 py-2 shadow-sm">⭐ Sterren &amp; levels</span>
            </div>
          </div>
          <div className="shrink-0">
            <Image
              src="/traffic-control/app-icon.png"
              alt="App-icoon van Snellio Traffic Control: een groene golf door een kruispunt"
              width={280}
              height={280}
              priority
              className="rounded-[3.5rem] shadow-[0_20px_60px_rgba(18,168,122,0.35)]"
            />
          </div>
        </div>
      </Container>

      {/* Screenshots */}
      <Container className="py-8">
        <h2 className="mb-8 text-center font-outfit text-3xl font-extrabold text-navy">
          Zo speelt het
        </h2>
        <div className="grid gap-8">
          {screenshots.map((shot) => (
            <figure key={shot.src} className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={1600}
                height={739}
                className="w-full"
              />
              <figcaption className="px-5 py-4 text-sm text-muted">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>

      {/* Hoe werkt het */}
      <Container className="py-12">
        <h2 className="mb-8 text-center font-outfit text-3xl font-extrabold text-navy">
          In drie stappen
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green/15 font-outfit text-lg font-bold text-green">
                {item.step}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Features */}
      <Container className="py-12">
        <h2 className="mb-8 text-center font-outfit text-3xl font-extrabold text-navy">
          Waarom Traffic Control?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-green">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{feature.text}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* CTA */}
      <Container className="py-12">
        <div className="rounded-3xl bg-navy px-8 py-12 text-center">
          <h2 className="font-outfit text-3xl font-extrabold text-white">
            Binnenkort beschikbaar
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-snellio-text2">
            Snellio Traffic Control verschijnt binnenkort in de App Store voor
            iPhone en iPad. Vragen of meedenken? We horen graag van je.
          </p>
          <a
            href="mailto:info@snellio.nl"
            className="mt-7 inline-block rounded-xl bg-green px-8 py-4 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Mail info@snellio.nl
          </a>
          <p className="mt-6 text-sm text-snellio-text2">
            <a href="/traffic-control/support" className="underline underline-offset-4 hover:text-white">Support</a>
            {' · '}
            <a href="/traffic-control/privacy" className="underline underline-offset-4 hover:text-white">Privacybeleid</a>
          </p>
        </div>
      </Container>
    </div>
  )
}
