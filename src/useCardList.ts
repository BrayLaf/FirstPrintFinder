import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { LIST_MAX_CARDS, type Entry } from './parseList'
import { fetchPrintings, isBasicLand, resolveNames, type Card, type ListCard } from './scryfall'

export interface ListEntry extends Entry {
  /** Pulling mode: copies found in the binder, 0 to qty. Unset = not checked yet. */
  found?: number
}

// Only names, counts and marks are saved; printings are looked up again on load
// so binder rules and new sets always apply.
interface Saved {
  cards: ListEntry[]
  missing: Entry[]
}

function readSaved(): Saved {
  try {
    const saved = JSON.parse(localStorage.getItem('fpf-list') ?? 'null')
    if (Array.isArray(saved?.cards) && Array.isArray(saved?.missing)) return saved
  } catch { /* storage unavailable or corrupt */ }
  return { cards: [], missing: [] }
}

function mergeInto<T extends Entry>(list: T[], add: Entry[]): T[] {
  const next = list.map((e) => ({ ...e }))
  for (const a of add) {
    const prev = next.find((e) => e.name.toLowerCase() === a.name.toLowerCase())
    if (prev) prev.qty += a.qty
    else next.push({ ...a } as T)
  }
  return next
}

const OFFLINE = 'Scryfall could not be reached. Try again.'

export function useCardList() {
  const [saved] = useState(readSaved)
  const [cards, setCards] = useState<ListEntry[]>(saved.cards)
  const [missing, setMissing] = useState<Entry[]>(saved.missing)
  // Lookups await the network, so by the time they read this the latest render has landed.
  const cardsRef = useRef(cards)
  cardsRef.current = cards
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)
  // Printings by lowercased card name. A ref so queued jobs see the latest.
  const prints = useRef(new Map<string, Card[]>())
  const [version, rerender] = useReducer((n: number) => n + 1, 0)
  // Lookups run one at a time so requests stay paced and merges don't race.
  const queue = useRef(Promise.resolve())
  const run = useCallback((job: () => Promise<void>) => {
    queue.current = queue.current.then(job).finally(() => setBusy(null))
  }, [])

  useEffect(() => {
    try { localStorage.setItem('fpf-list', JSON.stringify({ cards, missing })) } catch { /* ignore */ }
  }, [cards, missing])

  const loadPrints = useCallback(async (names: string[]) => {
    const todo = names.filter((n) => !isBasicLand(n) && !prints.current.has(n.toLowerCase()))
    if (!todo.length) return
    setBusy(`Looking up printings… 0 / ${todo.length}`)
    try {
      const found = await fetchPrintings(todo, (done) => setBusy(`Looking up printings… ${done} / ${todo.length}`))
      const empty: string[] = []
      for (const [k, v] of found) v.length ? prints.current.set(k, v) : empty.push(k)
      // Resolved but no printings came back: hand it to the user to search.
      if (empty.length) {
        const gone = new Set(empty)
        setMissing((ms) => mergeInto(ms, cardsRef.current.filter((c) => gone.has(c.name.toLowerCase()))))
        setCards((cs) => cs.filter((c) => !gone.has(c.name.toLowerCase())))
      }
      rerender()
    } catch {
      setError(OFFLINE)
    }
  }, [])

  const add = useCallback((entries: Entry[], fixing?: string) => run(async () => {
    setError(null)
    setNote(null)
    const take = entries.slice(0, LIST_MAX_CARDS)
    if (entries.length > take.length) setNote(`Only the first ${LIST_MAX_CARDS} names were added.`)
    setBusy(`Matching ${take.length} card name${take.length === 1 ? '' : 's'}…`)
    let resolved: Awaited<ReturnType<typeof resolveNames>>
    try {
      resolved = await resolveNames(take.map((e) => e.name), (done) => setBusy(`Matching card names… ${done} / ${take.length}`))
    } catch {
      setError(OFFLINE)
      return
    }
    const qtyOf = new Map(take.map((e) => [e.name, e.qty]))
    const found = resolved.found.map(({ input, name }) => ({ name, qty: qtyOf.get(input) ?? 1 }))
    const unknown = resolved.missing.map((name) => ({ name, qty: qtyOf.get(name) ?? 1 }))
    setCards((cs) => mergeInto(cs, found))
    setMissing((ms) => mergeInto(fixing ? ms.filter((m) => m.name !== fixing) : ms, unknown))
    await loadPrints(found.map((f) => f.name))
  }), [run, loadPrints])

  const retry = useCallback(() => run(async () => {
    setError(null)
    await loadPrints(cards.map((c) => c.name))
  }), [run, loadPrints, cards])

  // Saved list: fetch its printings once on load.
  useEffect(() => { run(() => loadPrints(saved.cards.map((c) => c.name))) }, [run, loadPrints, saved])

  const setQty = useCallback((name: string, qty: number) => {
    setCards((cs) => (qty < 1
      ? cs.filter((c) => c.name !== name)
      : cs.map((c) => (c.name === name ? { ...c, qty, found: c.found === undefined ? undefined : Math.min(c.found, qty) } : c))))
  }, [])

  const setFound = useCallback((name: string, found: number | undefined) => {
    setCards((cs) => cs.map((c) => (c.name === name
      ? { ...c, found: found === undefined ? undefined : Math.max(0, Math.min(found, c.qty)) }
      : c)))
  }, [])

  const clearMarks = useCallback(() => setCards((cs) => cs.map(({ found: _, ...c }) => c)), [])

  const dropMissing = useCallback((name: string) => setMissing((ms) => ms.filter((m) => m.name !== name)), [])

  const clear = useCallback(() => {
    setCards([])
    setMissing([])
    setError(null)
    setNote(null)
  }, [])

  // Cards whose printings are still loading are left out of `ready`.
  const { ready, pending, total } = useMemo(() => {
    const ready: ListCard[] = []
    let pending = 0
    for (const c of cards) {
      const p = prints.current.get(c.name.toLowerCase())
      if (isBasicLand(c.name)) ready.push({ ...c, prints: [] })
      else if (p) ready.push({ ...c, prints: p })
      else pending++
    }
    return { ready, pending, total: cards.reduce((n, c) => n + c.qty, 0) }
  }, [cards, version])

  return { cards, ready, pending, total, missing, busy, error, note, add, retry, setQty, setFound, clearMarks, dropMissing, clear }
}
