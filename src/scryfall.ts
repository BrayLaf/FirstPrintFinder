import { inCommanderBox } from './commanderBox'

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
  card_faces?: { image_uris?: Record<string, string>; mana_cost?: string; type_line?: string }[]
  prices?: { usd?: string | null; usd_foil?: string | null; usd_etched?: string | null }
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

// Scryfall's hard limits: 2/second for search, named and collection, 10/second for
// everything else (autocomplete). A 429 locks the app out for 30 seconds. List
// lookups fire many in a row, so every request waits for its slot.
const nextSlot = { slow: 0, fast: 0 }
async function paced(url: string) {
  const lane = /\/cards\/(search|named|collection)/.test(url) ? 'slow' : 'fast'
  const now = Date.now()
  const wait = nextSlot[lane] - now
  nextSlot[lane] = Math.max(now, nextSlot[lane]) + (lane === 'slow' ? 500 : 100)
  if (wait > 0) await new Promise((r) => setTimeout(r, wait))
}

export class RateLimitError extends Error {
  constructor() {
    super('Scryfall asked us to slow down. Wait 30 seconds, then try again.')
  }
}

async function get<T>(url: string, signal?: AbortSignal, body?: unknown): Promise<T> {
  await paced(url)
  const res = await fetch(url, {
    signal,
    method: body ? 'POST' : 'GET',
    headers: body ? { Accept: 'application/json', 'Content-Type': 'application/json' } : { Accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (res.status === 404) throw new NotFoundError()
  if (res.status === 429) throw new RateLimitError()
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
// core sets from Legends on, plus the products listed below. The old "Edition" core
// sets and every other product (Portal, Anthologies, Duel Decks, Masters, Commander
// decks...) are skipped.
const LEGENDS = '1994-06-01'
const MAGIC_2010 = '2009-07-17'

// Binders that hold several sets, divided by set inside. Sets listed here have a
// binder even when the rule above would skip them (e.g. Arabian Nights predates Legends).
const SHARED_BINDERS: { title: string; sets: string[] }[] = [
  { title: 'Arabian Nights / Antiquities', sets: ['arn', 'atq'] },
  { title: 'Core sets', sets: ['m10', 'm11', 'm12', 'm13', 'm14', 'm15', 'ori'] },
  { title: 'Planechase / Battlebond / Game Night / Commander Masters', sets: ['hop', 'pc2', 'pca', 'bbd', 'gnt', 'gn2', 'gn3', 'cmm'] },
  { title: 'Conspiracy', sets: ['cns', 'cn2'] },
  { title: 'Mystical Archive', sets: ['sta', 'soa'] },
  { title: 'Universes Beyond', sets: ['pip', 'who', '40k'] },
]
const SHARED_BY_SET = new Map(SHARED_BINDERS.flatMap((b) => b.sets.map((s) => [s, b.title] as const)))
// Commander decks released with a set are filed at the front of that set's binder,
// divided from it. Commander code -> [set code, set name], from Scryfall's
// `parent_set_code`. Add new ones as they release.
const COMMANDER_PARENT = new Map<string, [string, string]>([
  ['znc', ['znr', 'Zendikar Rising']], ['khc', ['khm', 'Kaldheim']],
  ['afc', ['afr', 'Adventures in the Forgotten Realms']], ['mic', ['mid', 'Innistrad: Midnight Hunt']],
  ['voc', ['vow', 'Innistrad: Crimson Vow']], ['nec', ['neo', 'Kamigawa: Neon Dynasty']],
  ['ncc', ['snc', 'Streets of New Capenna']], ['dmc', ['dmu', 'Dominaria United']],
  ['brc', ['bro', "The Brothers' War"]], ['onc', ['one', 'Phyrexia: All Will Be One']],
  ['moc', ['mom', 'March of the Machine']], ['ltc', ['ltr', 'The Lord of the Rings: Tales of Middle-earth']],
  ['woc', ['woe', 'Wilds of Eldraine']], ['lcc', ['lci', 'The Lost Caverns of Ixalan']],
  ['mkc', ['mkm', 'Murders at Karlov Manor']], ['otc', ['otj', 'Outlaws of Thunder Junction']],
  ['m3c', ['mh3', 'Modern Horizons 3']], ['blc', ['blb', 'Bloomburrow']],
  ['dsc', ['dsk', 'Duskmourn: House of Horror']], ['fdc', ['fdn', 'Foundations']],
  ['drc', ['dft', 'Aetherdrift']], ['tdc', ['tdm', 'Tarkir: Dragonstorm']],
  ['fic', ['fin', 'Final Fantasy']], ['eoc', ['eoe', 'Edge of Eternities']],
  ['ecc', ['ecl', 'Lorwyn Eclipsed']], ['soc', ['sos', 'Secrets of Strixhaven']],
  ['frc', ['fra', 'Reality Fracture']], ['trc', ['trk', 'Star Trek']],
  ['mdc', ['mdd', 'Marvel: Darkhold Destiny']],
  // Marvel Super Heroes Commander (msc) has its own binder; see below.
])
// Products with a binder of their own (Core Set 2019-2021 and Foundations are covered by the core rule).
const EXTRA_BINDER_SETS = new Set([
  'ugl', 'ust', 'unf', // Un-sets; Unhinged and Unsanctioned have no binder
  'mh1', 'mh2', 'mh3', 'jmp', 'j22', 'j25', 'ltr', 'acr',
  'cmr', 'clb', // Commander Legends, Commander Legends: Battle for Baldur's Gate
  'msc', // Marvel Super Heroes Commander, with its Jumpstart cards
  'mar', // Marvel Universe
])
const isBinderSet = (c: Card) =>
  SHARED_BY_SET.has(c.set) ||
  COMMANDER_PARENT.has(c.set) ||
  EXTRA_BINDER_SETS.has(c.set) ||
  (c.released_at >= LEGENDS &&
    (c.set_type === 'expansion' || (c.set_type === 'core' && c.released_at >= MAGIC_2010)))

/** Name of the shared binder a set is filed in, or null when the set has its own. */
export const sharedBinderOf = (set: string) => COMMANDER_PARENT.get(set)?.[1] ?? SHARED_BY_SET.get(set) ?? null
/** Sets with the same key share a binder: a commander deck keys to its parent set. */
const binderKey = (set: string) => COMMANDER_PARENT.get(set)?.[0] ?? SHARED_BY_SET.get(set) ?? set

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

// Case cards: the store keeps anything $11+ at Star City Games in the case, not a
// binder. Scryfall has no Star City prices and usually runs lower, so $6-18 there is
// "maybe" and $19+ is almost surely the case. Either way, check the Star City link.
const CASE_MAYBE_USD = 6
const CASE_USD = 19

export interface CaseFlag {
  tier: 'maybe' | 'case'
  /** Cheapest non-foil paper price on Scryfall, the one the tier is based on. */
  usd: number
}

/**
 * Case warning from the cheapest paper printing's non-foil price, so "case" means
 * even the cheapest copy is expensive. Foil prices only count for a printing that
 * has no non-foil price (foil-only cards). Null when cheap or unpriced.
 */
export function caseFlagOf(prints: Card[]): CaseFlag | null {
  let usd = Infinity
  for (const c of prints) {
    // Gold-bordered World Championship decks and other memorabilia sell cheap and aren't real copies.
    if (!isPaper(c) || c.set_type === 'memorabilia' || c.set_type === 'token') continue
    const p = parseFloat(c.prices?.usd ?? c.prices?.usd_foil ?? c.prices?.usd_etched ?? '')
    if (p < usd) usd = p
  }
  if (usd < CASE_MAYBE_USD || usd === Infinity) return null
  return { tier: usd >= CASE_USD ? 'case' : 'maybe', usd }
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

// ---- Lists ---------------------------------------------------------------

const BASIC_LANDS = new Set(
  ['Plains', 'Island', 'Swamp', 'Mountain', 'Forest', 'Wastes']
    .flatMap((n) => [n, `Snow-Covered ${n}`])
    .map((n) => n.toLowerCase()),
)
export const isBasicLand = (name: string) => BASIC_LANDS.has(name.toLowerCase())

/** Match list lines to exact card names. Unknown lines get one fuzzy try each. */
export async function resolveNames(
  inputs: string[],
  onProgress?: (done: number) => void,
): Promise<{ found: { input: string; name: string }[]; missing: string[] }> {
  // Look up by front face: the collection endpoint finds "Fire" but not "Fire // Ice".
  const key = (s: string) => s.split(' // ')[0].trim().toLowerCase()
  const byKey = new Map<string, string>()
  for (let i = 0; i < inputs.length; i += 75) {
    const batch = inputs.slice(i, i + 75)
    const { data } = await get<{ data: Card[] }>(`${API}/cards/collection`, undefined, {
      identifiers: batch.map((n) => ({ name: n.split(' // ')[0].trim() })),
    })
    // Full names win over face names, so "Ancestral Recall" never lands on
    // the prepared-spell card "Emeritus of Ideation // Ancestral Recall".
    for (const c of data) byKey.set(c.name.toLowerCase(), c.name)
    for (const c of data) for (const face of c.name.split(' // ')) {
      if (!byKey.has(face.toLowerCase())) byKey.set(face.toLowerCase(), c.name)
    }
    onProgress?.(Math.min(i + 75, inputs.length))
  }
  const found: { input: string; name: string }[] = []
  const missing: string[] = []
  for (const input of inputs) {
    const name = byKey.get(key(input))
    if (name) { found.push({ input, name }); continue }
    try { found.push({ input, name: await resolveName(input) }) } catch (e) {
      if (e instanceof RateLimitError) throw e
      missing.push(input)
    }
  }
  return { found, missing }
}

/**
 * All printings for many exact card names, oldest first. Names are OR'd into one
 * search per batch; Scryfall silently drops terms from very long queries, so
 * batches stay small.
 */
export async function fetchPrintings(names: string[], onProgress?: (done: number) => void): Promise<Map<string, Card[]>> {
  const out = new Map<string, Card[]>(names.map((n) => [n.toLowerCase(), []]))
  for (let i = 0; i < names.length; i += 20) {
    const batch = names.slice(i, i + 20)
    const q = batch.map((n) => `!"${n.replace(/"/g, '\\"')}"`).join(' or ')
    let url: string | undefined = `${API}/cards/search?q=${encodeURIComponent(q)}&unique=prints&order=released&dir=asc`
    for (let page = 0; url && page < 40; page++) {
      const list: List<Card> = await get(url)
      // Keyed by exact name, which also drops prepared-spell cards that only
      // matched on a face (same rule as fetchResult).
      for (const c of list.data) out.get(c.name.toLowerCase())?.push(c)
      url = list.has_more ? list.next_page : undefined
    }
    onProgress?.(Math.min(i + 20, names.length))
  }
  for (const prints of out.values()) prints.sort((a, b) => a.released_at.localeCompare(b.released_at))
  return out
}

export type ColorKey = 'W' | 'U' | 'B' | 'R' | 'G' | 'M' | 'C' | 'L'
export const COLOR_LABEL: Record<ColorKey, string> = {
  W: 'White', U: 'Blue', B: 'Black', R: 'Red', G: 'Green', M: 'Multicolor', C: 'Colorless', L: 'Land',
}
const COLOR_ORDER: ColorKey[] = ['W', 'U', 'B', 'R', 'G', 'M', 'C', 'L']

/**
 * Store color rule: only the mana symbols in the card's mana cost count, not
 * color identity. Split cards use both halves; other two-part cards (DFCs,
 * adventures) use the front face. No colored pips: Land if it's a land, else Colorless.
 */
export function colorOf(c: Card): ColorKey {
  const front = c.card_faces?.[0]
  const cost = (c.layout === 'split' ? c.mana_cost : front?.mana_cost ?? c.mana_cost) ?? ''
  const colors = new Set(cost.match(/[WUBRG]/g))
  if (colors.size > 1) return 'M'
  if (colors.size === 1) return [...colors][0] as ColorKey
  return (front?.type_line ?? c.type_line ?? '').split(' // ')[0].includes('Land') ? 'L' : 'C'
}

// Binders file mythics and rares together, then uncommons, then commons.
const RARITY_RANK: Record<Card['rarity'], number> = { mythic: 0, rare: 0, uncommon: 1, common: 2, special: 3, bonus: 3 }

export interface ListCard {
  name: string
  qty: number
  /** Empty for basic lands, which skip the printing lookup. */
  prints: Card[]
}

export interface Placed extends ListCard {
  pick: Pick | null
  inBox: boolean
  color: ColorKey
  caseFlag: CaseFlag | null
}

export interface SetGroup {
  key: string
  title: string
  /** Shown under the title: year and set code, or what the special group means. */
  sub: string
  cards: Placed[]
}

/**
 * Group a list by the binder each card is filed in: real sets oldest first, then
 * the Commander box, cards with no binder, and basic lands. Inside a group, rows
 * follow binder order: rarity, then WUBRG, then name.
 */
export function groupForBinders(list: ListCard[], binder: boolean): SetGroup[] {
  const sets = new Map<string, SetGroup & { released: string; binderKey: string; front: boolean }>()
  const box: Placed[] = []
  const none: Placed[] = []
  const basics: Placed[] = []
  for (const item of list) {
    if (!item.prints.length) { basics.push({ ...item, pick: null, inBox: false, color: 'L', caseFlag: null }); continue }
    const inBox = binder && inCommanderBox(item.name)
    const pick = pickFirst(item.prints, binder && !inBox)
    const placed: Placed = { ...item, pick, inBox, color: colorOf(pick.first), caseFlag: caseFlagOf(item.prints) }
    if (inBox) { box.push(placed); continue }
    if (pick.binderMiss) { none.push(placed); continue }
    const { set, set_name, released_at } = pick.first
    const shared = binder ? sharedBinderOf(set) : null
    const sub = `${released_at.slice(0, 4)} · ${set.toUpperCase()}${shared ? ` · in the ${shared} binder` : ''}`
    const group = sets.get(set) ?? {
      key: set, title: set_name, sub, released: released_at, cards: [],
      binderKey: binder ? binderKey(set) : set, front: binder && COMMANDER_PARENT.has(set),
    }
    group.cards.push(placed)
    sets.set(set, group)
  }
  // Sets sharing a binder sit together, placed by the oldest of them on the list;
  // a commander deck comes before its set, as it sits at the front of the binder.
  const binderStart = new Map<string, string>()
  for (const g of sets.values()) {
    const k = g.binderKey
    if (!binderStart.has(k) || g.released < binderStart.get(k)!) binderStart.set(k, g.released)
  }
  const groups: SetGroup[] = [...sets.values()].sort((a, b) =>
    binderStart.get(a.binderKey)!.localeCompare(binderStart.get(b.binderKey)!) ||
    a.binderKey.localeCompare(b.binderKey) || Number(b.front) - Number(a.front) ||
    a.released.localeCompare(b.released) || a.title.localeCompare(b.title))
  if (box.length) groups.push({ key: '_box', title: 'Commander box', sub: 'Kept in the Commander quick-pull box', cards: box })
  if (none.length) groups.push({ key: '_none', title: 'No binder', sub: 'No known set qualifies; tap a card to see its earliest printing', cards: none })
  if (basics.length) groups.push({ key: '_basic', title: 'Basic lands', sub: 'Not filed in set binders', cards: basics })
  for (const g of groups) g.cards.sort(binderOrder)
  return groups
}

function binderOrder(a: Placed, b: Placed) {
  const rank = (p: Placed) => (p.pick ? RARITY_RANK[p.pick.first.rarity] : 2)
  return rank(a) - rank(b) || COLOR_ORDER.indexOf(a.color) - COLOR_ORDER.indexOf(b.color) || a.name.localeCompare(b.name)
}

export const scgSearchUrl = (name: string) =>
  `https://starcitygames.com/search/?search_query=${encodeURIComponent(name)}`
