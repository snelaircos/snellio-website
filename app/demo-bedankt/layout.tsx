import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Demo aangevraagd | Snellio',
  description: 'Bedankt voor je demo aanvraag. We nemen binnen 1 werkdag contact op.',
  robots: { index: false },
}

export default function DemoBedanktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
