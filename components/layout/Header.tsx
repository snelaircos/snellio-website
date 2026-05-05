'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS, SITE } from '@/lib/constants'
import Button from '@/components/ui/Button'

const AUTOMOTIVE_NAV = [
  { label: 'Hoe het werkt', href: '/automotive#hoe'      },
  { label: 'Features',      href: '/automotive#features' },
  { label: 'Prijzen',       href: '/automotive#prijzen'  },
  { label: 'FAQ',           href: '/automotive#faq'      },
] as const

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isAutomotive = pathname?.startsWith('/automotive')
  const navItems     = isAutomotive ? AUTOMOTIVE_NAV : NAV_ITEMS
  const signupHref   = isAutomotive ? '/registreren?vertical=automotive' : '/registreren'

  // Light theme op /automotive (matched de redesign), donker op de rest van de site.
  const headerBg     = isAutomotive ? 'bg-[rgba(255,255,255,.92)] border-[rgba(15,33,51,.08)]' : 'bg-[rgba(10,26,40,.9)] border-[var(--border)]'
  const navText      = isAutomotive ? 'text-[#0f2133] hover:text-[#0090b8]' : 'text-[var(--text2)] hover:text-[var(--cyan)]'
  const hamburgerBg  = isAutomotive ? 'bg-[#0f2133]' : 'bg-white'
  const hamburgerHov = isAutomotive ? 'hover:bg-[#f4f7fa]' : 'hover:bg-[var(--navy3)]'
  const mobileMenuBg = isAutomotive ? 'bg-white border-[rgba(15,33,51,.08)]' : 'bg-[var(--navy2)] border-[var(--border)]'
  const stickyCtaBg  = isAutomotive ? 'bg-white border-[rgba(15,33,51,.08)]' : 'bg-[var(--navy2)] border-[var(--border)]'

  return (
    <header className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b ${headerBg}`}>
      <nav className="mx-auto flex items-center justify-between px-[5%] h-16 max-w-7xl" aria-label="Hoofdnavigatie">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" aria-label={SITE.name}>
          <Image
            src="/logo.png"
            alt="Snellio"
            width={130}
            height={38}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 list-none" role="list">
          {navItems.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-[.88rem] font-medium transition-colors ${navText}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={SITE.appUrl}
            className={`text-sm font-medium transition-colors ${navText}`}
          >
            Inloggen
          </Link>
          <Button href={signupHref} size="sm">
            Gratis starten →
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors ${hamburgerHov}`}
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={open}
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${hamburgerBg} ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${hamburgerBg} ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${hamburgerBg} ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className={`md:hidden border-t px-[5%] py-6 flex flex-col gap-5 ${mobileMenuBg}`}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`font-medium text-base transition-colors ${navText}`}
            >
              {item.label}
            </Link>
          ))}
          <hr className={isAutomotive ? 'border-[rgba(15,33,51,.08)]' : 'border-[var(--border)]'} />
          <Link href={SITE.appUrl} className={`font-medium transition-colors ${navText}`}>
            Inloggen
          </Link>
          <Button href={signupHref} className="w-full justify-center">
            Start 14 dagen gratis →
          </Button>
        </div>
      )}

      {/* Sticky mobiel CTA */}
      <div className={`md:hidden fixed bottom-0 inset-x-0 z-50 p-4 border-t ${stickyCtaBg}`}>
        <Button href={signupHref} className="w-full justify-center">
          Gratis starten →
        </Button>
      </div>
    </header>
  )
}
