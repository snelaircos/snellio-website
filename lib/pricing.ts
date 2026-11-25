// Pure prijsberekeningen voor de marketingsite. Client-safe, geen I/O.
// Dit is uitsluitend presentatie: de app is de bron van waarheid voor
// wat er daadwerkelijk gefactureerd wordt.

import { PLANS, JAAR_MAANDEN_BETAALD, HANDBOEK, type HvacPlan, type HvacPlanId } from './constants'

export function planById(id: HvacPlanId): HvacPlan {
  const plan = PLANS.find(p => p.id === id)
  if (!plan) throw new Error(`Onbekend pakket: ${id}`)
  return plan
}

/**
 * Maandprijs van een pakket voor een team van `monteurs` monteurs.
 * Bedragen excl. btw (prijzen per 1-1-2027):
 * Pro:        €69 met 3 monteurs inbegrepen, daarna €15 per monteur (tot 5).
 * Enterprise: €149 met 8 monteurs inbegrepen, daarna €12 per monteur (tot 15).
 * Basis kent geen extra monteurs (1 monteur, vaste prijs).
 */
export function maandprijsVoorTeam(plan: HvacPlan, monteurs: number): number {
  const extra = plan.monteurs.extra
  if (!extra) return plan.price.month
  const boven = Math.max(0, monteurs - plan.monteurs.inbegrepen)
  return plan.price.month + boven * extra.prijs
}

/** Aantal extra (betaalde) monteurs bovenop het inbegrepen aantal. */
export function extraMonteurs(plan: HvacPlan, monteurs: number): number {
  if (!plan.monteurs.extra) return 0
  return Math.max(0, monteurs - plan.monteurs.inbegrepen)
}

/** Jaarprijs = 10 × maandprijs (12 maanden gebruik, 10 betalen). */
export function jaarprijs(maandprijs: number): number {
  return maandprijs * JAAR_MAANDEN_BETAALD
}

/** Wat 12 losse maanden zouden kosten, ter vergelijking met de jaarprijs. */
export function twaalfMaanden(maandprijs: number): number {
  return maandprijs * 12
}

/** €1.290 / €57,50 — Nederlandse notatie zonder afhankelijkheid van Intl-locale. */
export function fmtEuro(bedrag: number): string {
  const negatief = bedrag < 0
  const abs = Math.abs(bedrag)
  const heel = Math.floor(abs)
  const cent = Math.round((abs - heel) * 100)
  const heelStr = heel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  const decimalen = cent > 0 ? `,${cent.toString().padStart(2, '0')}` : ''
  return `${negatief ? '-' : ''}€${heelStr}${decimalen}`
}

/**
 * Regel over het BRL 100-handboek op een pakketkaart: alleen bij jaarbetaling,
 * voor alle pakketten, ook Enterprise (HANDBOEK, besluit 25-11-2026).
 */
export function handboekRegel(plan: HvacPlan, annual: boolean): { tekst: string; inbegrepen: boolean } {
  if (!HANDBOEK.pakketten.includes(plan.id)) return { tekst: HANDBOEK.regel.vanafBasis, inbegrepen: false }
  return annual
    ? { tekst: HANDBOEK.regel.inbegrepen, inbegrepen: true }
    : { tekst: HANDBOEK.regel.alleenJaar, inbegrepen: false }
}
