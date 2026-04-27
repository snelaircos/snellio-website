'use client'

import { useEffect } from 'react'

// Voegt .visible toe aan alle .reveal elementen.
// - Elementen die al in viewport staan: direct revealed (geen race met observer)
// - Elementen onder de fold: revealed zodra ze in beeld scrollen
//
// Wacht één animation frame zodat layout gesetteld is voordat we
// getBoundingClientRect lezen — voorkomt issues met hydration timing.
export default function ScrollReveal() {
  useEffect(() => {
    let io: IntersectionObserver | null = null

    const raf = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.visible)'))
      if (els.length === 0) return

      const vh = window.innerHeight
      const belowFold: HTMLElement[] = []

      els.forEach(el => {
        const rect = el.getBoundingClientRect()
        const inView = rect.top < vh && rect.bottom > 0
        if (inView) {
          el.classList.add('visible')
        } else {
          belowFold.push(el)
        }
      })

      if (belowFold.length === 0) return

      io = new IntersectionObserver(
        entries => {
          entries.forEach((e, i) => {
            if (e.isIntersecting) {
              setTimeout(() => e.target.classList.add('visible'), i * 60)
              io?.unobserve(e.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -5% 0px' },
      )

      belowFold.forEach(el => io!.observe(el))
    })

    return () => {
      cancelAnimationFrame(raf)
      io?.disconnect()
    }
  }, [])

  return null
}
