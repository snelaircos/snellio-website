import Link from 'next/link'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

export default function CancelPage() {
  return (
    <Container className="py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Betaling geannuleerd
          </h1>
          <p className="text-gray-600">
            De betaling is geannuleerd. Geen probleem, je kunt het later opnieuw proberen.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/pricing">
            <Button className="w-full">
              Terug naar prijzen
            </Button>
          </Link>
          <Link href="/contact" className="block">
            <Button variant="outline" className="w-full">
              Neem contact op
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  )
}