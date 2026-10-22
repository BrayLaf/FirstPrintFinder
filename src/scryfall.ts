const API = 'https://api.scryfall.com'

export interface Card {
  id: string
  name: string
  layout: string
  set: string
  set_name: string
  set_type: string
  released_at: string
  rarity: 'common' | 'uncommon' | 'rare' | 'mythic' | 'special' | 'bonus'
  collector_number: string
  artist?: string
  type_line?: string
  mana_cost?: string
  games: string[]
  promo: boolean
  digital: boolean
  scryfall_uri: string
  image_uris?: Record<string, string>
  card_faces?: { image_uris?: Record<string, string>; mana_cost?: string }[]
}

interface List<T> {
  data: T[]
  has_more: boolean
  next_page?: string
}

export type Fallback = 'promo-only' | 'digital-only' | null

export interface Result {
  name: string
  prints: Card[]
}

export interface Pick {
  first: Card
  fallback: Fallback
  /** The true earliest printing, when binder mode hides it. */
  earliest: Card | null
  /** Binder mode was on but nothing qualified, so the true first is shown. */
  binderMiss: boolean
}

async function get<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal, headers: { Accept: 'application/json' } })
  if (res.status === 404) throw new NotFoundError()
  if (!res.ok) throw new Error(`Scryfall returned ${res.status}`)
  return res.json()
}

export class NotFoundError extends Error {
  constructor() {
    super('No card found with that name.')
  }
}

export async function autocomplete(q: string, signal: AbortSignal): Promise<string[]> {
  const { data } = await get<{ data: string[] }>(`${API}/cards/autocomplete?q=${encodeURIComponent(q)}`, signal)
  return data
}

/** Resolve a loosely typed name ("lightnin bolt") to the exact card name. */
export async function resolveName(q: string, signal?: AbortSignal): Promise<string> {
  const card = await get<{ name: string }>(`${API}/cards/named?fuzzy=${encodeURIComponent(q)}`, signal)
  return card.name
}

export function imageOf(card: Card, size: 'small' | 'normal' | 'large' | 'png'): string | undefined {
  return card.image_uris?.[size] ?? card.card_faces?.[0]?.image_uris?.[size]
}

const NOT_REGULAR_SET_TYPES = new Set(['promo', 'memorabilia', 'token'])

const isPaper = (c: Card) => c.games.includes('paper') && !c.digital
const isRegularPaper = (c: Card) => isPaper(c) && !c.promo && !NOT_REGULAR_SET_TYPES.has(c.set_type)

// Store binder rule: only known sets count. That means expansions and the Magic 2010+
// core sets, from Legends on. The old "Edition" core sets and every special product
// (Duel Decks, From the Vault, Masters, Commander decks...) are skipped.
const LEGENDS = '1994-06-01'
const MAGIC_2010 = '2009-07-17'
// Products that do have a binder: Portal, Portal Second Age, Portal Three Kingdoms, Anthologies.
const EXTRA_BINDER_SETS = new Set(['por', 'p02', 'ptk', 'ath'])
const isBinderSet = (c: Card) =>
  c.released_at >= LEGENDS &&
  (EXTRA_BINDER_SETS.has(c.set) ||
    c.set_type === 'expansion' ||
    (c.set_type === 'core' && c.released_at >= MAGIC_2010))

/**
 * First printing = the earliest paper printing that isn't a promo.
 * Scryfall's `is:firstprinting` can land on a promo or digital release, so we
 * compute it from the full printing list. Cards that only ever had a promo or
 * digital printing fall back to the earliest of those, flagged for the UI.
 * With `binder` on, sets the store doesn't file separately are skipped.
 */
export function pickFirst(prints: Card[], binder: boolean): Pick {
  const regular = prints.find(isRegularPaper)
  const paper = prints.find(isPaper)
  const plain: Pick = regular
    ? { first: regular, fallback: null, earliest: null, binderMiss: false }
    : paper
      ? { first: paper, fallback: 'promo-only', earliest: null, binderMiss: false }
      : { first: prints[0], fallback: 'digital-only', earliest: null, binderMiss: false }
  if (!binder) return plain
  const filed = prints.find((c) => isRegularPaper(c) && isBinderSet(c))
  if (!filed) return { ...plain, binderMiss: true }
  return { first: filed, fallback: null, earliest: filed.id === plain.first.id ? null : plain.first, binderMiss: false }
}

export async function fetchResult(name: string, signal?: AbortSignal): Promise<Result> {
  const q = `!"${name.replace(/"/g, '\\"')}"`
  let url: string | undefined = `${API}/cards/search?q=${encodeURIComponent(q)}&unique=prints&order=released&dir=asc`
  const prints: Card[] = []
  for (let page = 0; url && page < 8; page++) {
    const list: List<Card> = await get(url, signal)
    prints.push(...list.data)
    url = list.has_more ? list.next_page : undefined
  }
  prints.sort((a, b) => a.released_at.localeCompare(b.released_at))
  // Scryfall matches `!"name"` against every face, so a prepared-spell card like
  // "Emeritus of Ideation // Ancestral Recall" comes back for the spell's name.
  // Those are different cards; keep them only when searched by their own full name.
  const own = prints.filter((c) => c.layout !== 'prepare' || c.name.toLowerCase() === name.toLowerCase())
  const kept = own.length ? own : prints
  return { name: kept[0]?.name ?? name, prints: kept }
}

export const scgSearchUrl = (name: string) =>
  `https://starcitygames.com/search/?search_query=${encodeURIComponent(name)}`
