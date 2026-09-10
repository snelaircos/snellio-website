import { redirect } from 'next/navigation'

// De oude checkout (pakketkeuze + Mollie-mandaat via €0,01-betaling) is
// vervallen: niemand rekent op snellio.nl iets af. Iedereen start via de
// gratis trial op /registreren en kiest zijn abonnement later in de app.
// Oude links (nieuwsbrieven, blogs, Ads) blijven werken via deze redirect.
export default function CheckoutPage() {
  redirect('/registreren')
}
