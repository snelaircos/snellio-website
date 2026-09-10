// Pure prijsberekeningen voor de marketingsite. Client-safe, geen I/O.
// Dit is uitsluitend presentatie: de app is de bron van waarheid voor
// wat er daadwerkelijk gefactureerd wordt.

import { PLANS, JAAR_MAANDEN_BETAALD, type HvacPlan, type HvacPlanId } from './constants'

export function planById(id: HvacPlanId): HvacPlan {
  const plan = PLANS.find(p => p.id === id)
  if (!plan) throw new Error(`Onbekend pakket: ${id}`)
  return plan
}

/**
 * Maandprijs van een pakket voor een team van `monteurs` monteurs.
 * Pro:        €69 met 2 monteurs inbegrepen, daarna €20 per monteur.
 * Enterprise: €129 met 5 monteurs inbegrepen, daarna €10 per monteur.
 * Starter/Basis kennen geen extra monteurs (1 monteur, vaste prijs).
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
