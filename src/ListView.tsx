import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import { Badge, Button, Card, CardContent } from './kaika'
import { CardCombo } from './CardCombo'
import { parseList, type Entry } from './parseList'
import { COLOR_LABEL, groupForBinders, imageOf, scgSearchUrl, type Placed, type SetGroup } from './scryfall'
import { BinderToggle, fmtDate, LINK_PRIMARY, LINK_SECONDARY, RARITY_VARIANT } from './ui'
import type { useCardList } from './useCardList'

type List = ReturnType<typeof useCardList>

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

export function ListView({ list, binder, setBinder }: { list: List; binder: boolean; setBinder: (on: boolean) => void }) {
  const [query, setQuery] = useState('')
  // A "Not recognized" line being replaced through the search box.
  const [fixing, setFixing] = useState<Entry | null>(null)
  const [paste, setPaste] = useState('')
  const [pasteOpen, setPasteOpen] = useState(list.total === 0 && list.missing.length === 0)
  const [confirmClear, setConfirmClear] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const groups = useMemo(() => groupForBinders(list.ready, binder), [list.ready, binder])

  useEffect(() => {
    if (!confirmClear) return
    const t = setTimeout(() => setConfirmClear(false), 3000)
    return () => clearTimeout(t)
  }, [confirmClear])

  const addSearched = (name: string) => {
    list.add([{ name, qty: fixing?.qty ?? 1 }], fixing?.name)
    setQuery('')
    setFixing(null)
  }

  const addPasted = (text: string) => {
    const entries = parseList(text)
    if (!entries.length) return
    list.add(entries)
    setPaste('')
    setPasteOpen(false)
  }

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (file) addPasted(await file.text())
  }

  const fix = (m: Entry) => {
    setFixing(m)
    setQuery(m.name)
    searchRef.current?.focus()
    searchRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }

  const empty = list.total === 0 && list.missing.length === 0

  return (
    <>
      <section className="search list-add">
        <CardCombo
          inputRef={searchRef}
          label={fixing ? `Find the card for “${fixing.name}”` : 'Add a card'}
          placeholder="Search a card to add, e.g. Sol Ring"
          value={query}
          onChange={setQuery}
          onSubmit={addSearched}
        />
        {fixing && (
          <p className="hint fixing">
            Pick the right card and it replaces the unrecognized line ({fixing.qty}×).{' '}
            <button type="button" className="text-btn" onClick={() => { setFixing(null); setQuery('') }}>Cancel</button>
          </p>
        )}

        {pasteOpen ? (
          <div className="paste">
            <label htmlFor="paste">Paste a list</label>
            <textarea
              id="paste" rows={6} spellCheck={false} value={paste}
              placeholder={'4 Lightning Bolt\n1x Sol Ring\nCounterspell x2'}
              onChange={(e) => setPaste(e.target.value)}
            />
            <div className="paste-actions">
              <Button variant="primary" disabled={!paste.trim()} onClick={() => addPasted(paste)}>Add to list</Button>
              <label className={`${LINK_SECONDARY} upload`}>
                Upload a file
                <input className="visually-hidden" type="file" accept=".txt,.csv,.dec,text/plain,text/csv" onChange={onFile} />
              </label>
              {!empty && <Button variant="ghost" onClick={() => setPasteOpen(false)}>Close</Button>}
            </div>
            <small className="paste-help">One card per line. Counts like “4 Card”, “4x Card” or “Card x4” work; set codes are ignored.</small>
          </div>
        ) : (
          <Button variant="secondary" className="paste-open" onClick={() => setPasteOpen(true)}>Paste or upload a list</Button>
        )}

        <BinderToggle on={binder} onChange={setBinder} />
      </section>

      <div aria-live="polite">
        {list.busy && <p className="note">{list.busy}</p>}
        {list.error && (
          <p className="note error">
            {list.error}{' '}
            {list.pending > 0 && <button type="button" className="text-btn" onClick={list.retry}>Retry</button>}
          </p>
        )}
        {list.note && <p className="note">{list.note}</p>}
      </div>

      {list.missing.length > 0 && (
        <Card variant="outline" className="missing">
          <CardContent>
            <h2>Not recognized ({list.missing.length})</h2>
            <p className="hint">These lines didn't match a card. Search for the right one, or remove the line.</p>
            <ul>
              {list.missing.map((m) => (
                <li key={m.name}>
                  <span className="missing-name">{m.qty}× {m.name}</span>
                  <Button variant="secondary" size="sm" onClick={() => fix(m)}>Search</Button>
                  <Button variant="ghost" size="sm" iconOnly aria-label={`Remove ${m.name}`} onClick={() => list.dropMissing(m.name)}>✕</Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {list.total > 0 && (
        <div className="list-summary">
          <span>{plural(list.total, 'card')} · {plural(groups.length, 'group')}</span>
          <Button
            variant={confirmClear ? 'danger' : 'ghost'} size="sm"
            onClick={() => { if (confirmClear) { list.clear(); setConfirmClear(false); setPasteOpen(true) } else setConfirmClear(true) }}
          >
            {confirmClear ? 'Tap again to clear' : 'Clear list'}
          </Button>
        </div>
      )}

      {groups.map((g) => <SetSection key={g.key} group={g} onQty={list.setQty} />)}

      {empty && !list.busy && <p className="note">Paste a decklist or search for cards to start a list.</p>}
    </>
  )
}

function SetSection({ group, onQty }: { group: SetGroup; onQty: (name: string, qty: number) => void }) {
  const count = group.cards.reduce((n, c) => n + c.qty, 0)
  return (
    <section className="set-group" aria-labelledby={`g-${group.key}`}>
      <header className="set-head">
        <h2 id={`g-${group.key}`}>{group.title}</h2>
        <p>{group.sub} · {plural(count, 'card')}</p>
      </header>
      <ul className="rows">
        {group.cards.map((c) => <Row key={c.name} card={c} onQty={onQty} />)}
      </ul>
    </section>
  )
}

function Row({ card, onQty }: { card: Placed; onQty: (name: string, qty: number) => void }) {
  const [open, setOpen] = useState(false)
  const { name, qty, pick, inBox, color } = card
  const first = pick?.first
  const img = first && (imageOf(first, 'png') ?? imageOf(first, 'large'))

  return (
    <li className={open ? 'row open' : 'row'}>
      <button type="button" className="row-main" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="qty">{qty}×</span>
        <span className="rarity">{first && <Badge variant={RARITY_VARIANT[first.rarity]} size="sm">{first.rarity}</Badge>}</span>
        <span className="color"><span className={`pip pip-${color}`} aria-hidden />{COLOR_LABEL[color]}</span>
        <span className="row-name">{name}</span>
        <span className="chev" aria-hidden>▾</span>
      </button>
      {open && (
        <div className="row-detail">
          {first && img && <img src={img} alt={`${name}, ${first.set_name} printing`} width={488} height={680} loading="lazy" />}
          <div className="row-info">
            {first ? (
              <p className="row-print">
                <strong>{first.set_name}</strong> · {first.set.toUpperCase()} #{first.collector_number} · {fmtDate(first.released_at)}
              </p>
            ) : (
              <p className="row-print">Basic land: any printing works.</p>
            )}
            {inBox && first && <p className="hint">Kept in the Commander box. First printed in {first.set_name}.</p>}
            {pick?.earliest && (
              <p className="hint">Earliest printing overall: {pick.earliest.set_name} ({pick.earliest.released_at.slice(0, 4)}), which binder mode skips.</p>
            )}
            {pick?.binderMiss && <p className="hint">No known set qualifies, so this is its earliest printing overall.</p>}
            {pick?.fallback === 'promo-only' && <p className="hint">No regular paper printing; this is its earliest promo.</p>}
            {pick?.fallback === 'digital-only' && <p className="hint">Never printed on paper; this is its earliest digital printing.</p>}
            {first?.type_line && <p className="row-type">{first.type_line}</p>}
            <div className="row-qty">
              <Button variant="secondary" size="sm" iconOnly aria-label="One fewer" onClick={() => onQty(name, qty - 1)}>−</Button>
              <span aria-label="Quantity">{qty}</span>
              <Button variant="secondary" size="sm" iconOnly aria-label="One more" onClick={() => onQty(name, qty + 1)}>+</Button>
              <Button variant="ghost" size="sm" onClick={() => onQty(name, 0)}>Remove</Button>
            </div>
            <div className="actions row-links">
              <a className={LINK_PRIMARY} href={scgSearchUrl(name)} target="_blank" rel="noopener noreferrer">Star City Games ↗</a>
              {first && <a className={LINK_SECONDARY} href={first.scryfall_uri} target="_blank" rel="noopener noreferrer">Scryfall ↗</a>}
            </div>
          </div>
        </div>
      )}
    </li>
  )
}
