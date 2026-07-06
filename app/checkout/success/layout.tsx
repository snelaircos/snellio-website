import type { Metadata } from 'next'

// De success-pagina is een client component; metadata (noindex) daarom via
// deze layout. Transactie-bevestiging hoort niet in Google en zou anders
// ook conversietracking kunnen vervuilen via organische bezoekers.
export const metadata: Metadata = {
  title: 'Account aangemaakt | Snellio',
  robots: { index: false, follow: false },
}

export default function CheckoutSuccessLayout({ children }: { children: React.ReactNode }) {
  return children
}
