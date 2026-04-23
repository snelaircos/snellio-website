'use client'

import { useEffect } from 'react'

// Observeert alle .reveal elementen en voegt .visible toe zodra ze
// in beeld komen. Elementen die al in viewport zijn bij mount worden
// direct zichtbaar gemaakt (reveals above-the-fold op initial load).
//
// Moet een client component zijn zodat het na React hydration draait —
// een inline <script> loopt tegen hydration mismatches aan.
export default function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    if (els.length === 0) return

    const io = new IntersectionObserver(
      entries => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 60)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' },
    )

    els.forEach(el => io.observe(el))

    return () => io.disconnect()
  }, [])

  return null
}
