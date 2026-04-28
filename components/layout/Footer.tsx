import Link from 'next/link'
import { SITE, NAV_ITEMS } from '@/lib/constants'

const legal = [
  { label: 'Privacy',      href: '/privacy'      },
  { label: 'Voorwaarden',  href: '/voorwaarden'  },
  { label: 'Cookiebeleid', href: '/cookiebeleid' },
]

const seoLinks = [
  { label: 'CRM voor installateurs',    href: '/crm-voor-installateurs'    },
  { label: 'Werkbon software',          href: '/werkbon-software'           },
  { label: 'Planningssoftware monteurs', href: '/planningssoftware-monteurs' },
  { label: 'F-gassen registratie',      href: '/f-gassen-registratie'      },
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--navy2)]">
      <div className="mx-auto max-w-7xl px-[5%] py-16 grid md:grid-cols-5 gap-10">

        {/* Merk */}
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2.5 mb-4" aria-label={SITE.name}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--cyan)] to-[var(--accent)] flex items-center justify-center text-base">
              ❄️
            </div>
            <span className="font-outfit font-bold text-white text-lg">Snellio</span>
          </Link>
          <p className="text-[var(--muted2)] text-sm leading-relaxed max-w-xs">
            Software voor service-bedrijven. Eén systeem voor klanten, werkorders, planning en facturatie.
          </p>
          <div className="mt-6">
            <a
              href={`mailto:${SITE.email}`}
              className="text-[var(--muted2)] text-sm hover:text-[var(--cyan)] transition-colors"
            >
              {SITE.email}
            </a>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold text-white text-sm mb-4 tracking-wide">Product</h3>
          <ul className="flex flex-col gap-3 list-none">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <Link href={item.href} className="text-[var(--muted2)] text-sm hover:text-[var(--cyan)] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/registreren" className="text-[var(--cyan)] text-sm font-medium hover:underline">
                Gratis starten →
              </Link>
            </li>
          </ul>
        </div>

        {/* SEO pagina's */}
        <div>
          <h3 className="font-semibold text-white text-sm mb-4 tracking-wide">Software</h3>
          <ul className="flex flex-col gap-3 list-none">
            {seoLinks.map(item => (
              <li key={item.href}>
                <Link href={item.href} className="text-[var(--muted2)] text-sm hover:text-[var(--cyan)] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Juridisch */}
        <div>
          <h3 className="font-semibold text-white text-sm mb-4 tracking-wide">Juridisch</h3>
          <ul className="flex flex-col gap-3 list-none">
            {legal.map(item => (
              <li key={item.href}>
                <Link href={item.href} className="text-[var(--muted2)] text-sm hover:text-[var(--cyan)] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)] mx-auto max-w-7xl px-[5%] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[var(--muted)] text-xs font-mono tracking-wide">
          © {new Date().getFullYear()} {SITE.company} · KvK {SITE.kvk}
        </p>
        <p className="text-[var(--muted)] text-xs">
          {SITE.appUrl}
        </p>
      </div>
    </footer>
  )
}
