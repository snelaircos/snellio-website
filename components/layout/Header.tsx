'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { NAV_ITEMS, SITE } from '@/lib/constants'
import Button from '@/components/ui/Button'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[rgba(10,26,40,.9)] backdrop-blur-xl border-b border-[var(--border)]">
      <nav className="mx-auto flex items-center justify-between px-[5%] h-16 max-w-7xl" aria-label="Hoofdnavigatie">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" aria-label={SITE.name}>
          <Image
            src="/logo.png"
            alt="Snellio — Software voor installateurs"
            width={130}
            height={38}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 list-none" role="list">
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[var(--text2)] text-[.88rem] font-medium hover:text-[var(--cyan)] transition-colors"
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
            className="text-[var(--text2)] text-sm font-medium hover:text-[var(--cyan)] transition-colors"
          >
            Inloggen
          </Link>
          <Button href="/registreren" size="sm">
            Gratis starten →
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-[var(--navy3)] transition-colors"
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={open}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[var(--navy2)] border-t border-[var(--border)] px-[5%] py-6 flex flex-col gap-5">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-[var(--text2)] font-medium text-base hover:text-[var(--cyan)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <hr className="border-[var(--border)]" />
          <Link href={SITE.appUrl} className="text-[var(--text2)] font-medium hover:text-[var(--cyan)] transition-colors">
            Inloggen
          </Link>
          <Button href="/registreren" className="w-full justify-center">
            Start 30 dagen gratis →
          </Button>
        </div>
      )}

      {/* Sticky mobiel CTA */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 p-4 bg-[var(--navy2)] border-t border-[var(--border)]">
        <Button href="/registreren" className="w-full justify-center">
          Gratis starten →
        </Button>
      </div>
    </header>
  )
}
