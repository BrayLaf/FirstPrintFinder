import { useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from 'react'
import { Badge, Button, Card, CardContent } from './kaika'
import { CardCombo } from './CardCombo'
import { parseList, type Entry } from './parseList'
import { COLOR_LABEL, groupForBinders, imageOf, scgSearchUrl, type Placed, type SetGroup } from './scryfall'
import { BinderToggle, CaseBadge, CaseNote, fmtDate, LINK_PRIMARY, LINK_SECONDARY, RARITY_VARIANT } from './ui'
import type { ListEntry, useCardList } from './useCardList'

type List = ReturnType<typeof useCardList>
/** Sorting: build a list and see what shares a binder. Pulling: mark cards found / not found. */
type Mode = 'sort' | 'pull'

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

function readPair(): boolean {
  try { return localStorage.getItem('fpf-list-pair') === '1' } catch { return false }
}

function readMode(): Mode {
  try { return localStorage.getItem('fpf-list-mode') === 'pull' ? 'pull' : 'sort' } catch { return 'sort' }
}

/**
 * Plain-text reply for the customer. Unmarked cards are left out; a card with
 * only some copies found shows up in both sections.
 */
function customerMessage(cards: ListEntry[]): string {
  const marked = cards.filter((c) => c.found !== undefined).sort((a, b) => a.name.localeCompare(b.name))
  const lines = (count: (c: ListEntry) => number) => {
    const out = marked.filter((c) => count(c) > 0).map((c) => `- ${count(c)}x ${c.name}`)
    return out.length ? out.join('\n') : '- None'
  }
  return `Cards we had:\n${lines((c) => c.found!)}\n\nWe didn't have:\n${lines((c) => c.qty - c.found!)}`
}

export function ListView({ list, binder, setBinder }: { list: List; binder: boolean; setBinder: (on: boolean) => void }) {
  const [mode, setMode] = useState<Mode>(readMode)
  // Pair pulling: two panes over the same list, each with its own scroll and open card.
  const [pairOn, setPairOn] = useState(readPair)
  const [side, setSide] = useState<'a' | 'b'>('a')
  const pair = mode === 'pull' && pairOn
  // Last card added by search, highlighted in its binder group.
  const [recent, setRecent] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  // A "Not recognized" line being replaced through the search box.
  const [fixing, setFixing] = useState<Entry | null>(null)
  const [paste, setPaste] = useState('')
  const [pasteOpen, setPasteOpen] = useState(list.total === 0 && list.missing.length === 0)
  const [confirmClear, setConfirmClear] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const groups = useMemo(() => groupForBinders(list.ready, binder), [list.ready, binder])

  const marks = useMemo(() => new Map(list.cards.map((c) => [c.name, c.found])), [list.cards])

  useEffect(() => {
    try { localStorage.setItem('fpf-list-mode', mode) } catch { /* ignore */ }
  }, [mode])

  // Bring the panes to the top of the screen when pair pulling starts.
  useEffect(() => {
    if (pair) document.querySelector('.pair')?.scrollIntoView({ block: 'start' })
  }, [pair])

  useEffect(() => {
    try { localStorage.setItem('fpf-list-pair', pairOn ? '1' : '0') } catch { /* ignore */ }
  }, [pairOn])

  useEffect(() => {
    if (!confirmClear) return
    const t = setTimeout(() => setConfirmClear(false), 3000)
    return () => clearTimeout(t)
  }, [confirmClear])

  useEffect(() => {
    if (!recent) return
    const t = setTimeout(() => setRecent(null), 6000)
    return () => clearTimeout(t)
  }, [recent])

  const addSearched = (name: string) => {
    list.add([{ name, qty: fixing?.qty ?? 1 }], fixing?.name)
    setRecent(name.toLowerCase())
    setQuery('')
    setFixing(null)
    searchRef.current?.focus({ preventScroll: true })
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
  const caseCount = { case: 0, maybe: 0 }
  for (const g of groups) for (const c of g.cards) if (c.caseFlag) caseCount[c.caseFlag.tier] += c.qty
  const unmarkedNames = list.cards.filter((c) => c.found === undefined).map((c) => c.name).sort((a, b) => a.localeCompare(b))
  const counts = { found: 0, missing: 0, open: 0 }
  for (const c of list.cards) {
    if (c.found === undefined) counts.open += c.qty
    else { counts.found += c.found; counts.missing += c.qty - c.found }
  }

  return (
    <>
      <section className={`search list-add${pair ? ' is-pair' : ''}`}>
        <div className="mode" role="group" aria-label="List mode">
          <Button variant={mode === 'sort' ? 'primary' : 'secondary'} size="sm" aria-pressed={mode === 'sort'} onClick={() => setMode('sort')}>
            Sorting
          </Button>
          <Button variant={mode === 'pull' ? 'primary' : 'secondary'} size="sm" aria-pressed={mode === 'pull'} onClick={() => setMode('pull')}>
            Pulling
          </Button>
          {mode === 'pull' && (
            <Button variant={pairOn ? 'primary' : 'secondary'} size="sm" aria-pressed={pairOn} onClick={() => setPairOn(!pairOn)}>
              Pair pulling
            </Button>
          )}
          <small>
            {mode === 'sort'
              ? 'Search cards to see which binder they go in and what else is in it.'
              : pair
                ? 'Two people, one list: one starts at the top, one at the bottom. Marks are shared.'
                : 'Mark each card found or not found, then copy the message for the customer.'}
          </small>
        </div>

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

      {mode === 'pull' && unmarkedNames.length > 0 && (
        <p className="unmarked-warning" role="status">
          <strong>{plural(unmarkedNames.length, 'card')} not marked found or not found:</strong> {unmarkedNames.join(', ')}
        </p>
      )}

      {list.total > 0 && (
        <div className="list-summary">
          {mode === 'pull' ? (
            <span>
              <strong>✓ {counts.found} found</strong> · <strong>✕ {counts.missing} not found</strong> · {counts.open} to check
              {' · '}<a href="#message">Message ↓</a>
            </span>
          ) : (
            <span>{plural(list.total, 'card')} · {plural(groups.length, 'group')}</span>
          )}
          {(caseCount.case > 0 || caseCount.maybe > 0) && (
            <span className="case-count">
              {caseCount.case > 0 && <>▲ {caseCount.case} case</>}
              {caseCount.case > 0 && caseCount.maybe > 0 && ' · '}
              {caseCount.maybe > 0 && <>△ {caseCount.maybe} maybe case</>}
            </span>
          )}
          <Button
            variant={confirmClear ? 'danger' : 'ghost'} size="sm"
            onClick={() => { if (confirmClear) { list.clear(); setConfirmClear(false); setPasteOpen(true) } else setConfirmClear(true) }}
          >
            {confirmClear ? 'Tap again to clear' : 'Clear list'}
          </Button>
        </div>
      )}

      {pair ? (
        <div className="pair">
          <div className="pair-switch mode" role="group" aria-label="Pane">
            <Button variant={side === 'a' ? 'primary' : 'secondary'} size="sm" aria-pressed={side === 'a'} onClick={() => setSide('a')}>Person A (top)</Button>
            <Button variant={side === 'b' ? 'primary' : 'secondary'} size="sm" aria-pressed={side === 'b'} onClick={() => setSide('b')}>Person B (bottom)</Button>
          </div>
          {(['a', 'b'] as const).map((p) => (
            <PairPane
              key={p} id={p} title={p === 'a' ? 'Person A · from the top' : 'Person B · from the bottom'}
              active={side === p} fromEnd={p === 'b'} ready={groups.length > 0} open={counts.open}
            >
              {groups.map((g) => (
                <SetSection
                  key={g.key} group={g} pane={p} onQty={list.setQty} recent={recent}
                  marks={marks} onFound={list.setFound}
                />
              ))}
            </PairPane>
          ))}
        </div>
      ) : (
        groups.map((g) => (
          <SetSection
            key={g.key} group={g} pane="" onQty={list.setQty} recent={recent}
            marks={mode === 'pull' ? marks : null} onFound={list.setFound}
          />
        ))
      )}

      {mode === 'pull' && list.total > 0 && (
        <MessageBox
          text={customerMessage(list.cards)} unmarked={counts.open} unrecognized={list.missing.length}
          onReset={list.clearMarks}
        />
      )}

      {empty && !list.busy && <p className="note">Paste a decklist or search for cards to start a list.</p>}
    </>
  )
}

/** One person's scrolling pane. The bottom pane starts scrolled to the end. */
function PairPane({ id, title, active, fromEnd, ready, open, children }: {
  id: string; title: string; active: boolean; fromEnd: boolean; ready: boolean; open: number; children: ReactNode
}) {
  const body = useRef<HTMLDivElement>(null)
  const placed = useRef(false)
  // Wait for the cards to load, then jump to the end once; later adds don't move it.
  useEffect(() => {
    const el = body.current
    if (!fromEnd || !ready || placed.current || !el) return
    el.scrollTop = el.scrollHeight
    placed.current = true
  }, [fromEnd, ready])
  return (
    <section className={`pair-pane${active ? ' on' : ''}`} aria-label={title}>
      <header className="pair-head">
        <strong>{title}</strong>
        <span>{open === 0 ? 'All marked ✓' : `${open} to check`}</span>
      </header>
      <div className="pair-body" ref={body} data-pane={id}>{children}</div>
    </section>
  )
}

function MessageBox({ text, unmarked, unrecognized, onReset }: { text: string; unmarked: number; unrecognized: number; onReset: () => void }) {
  const [copied, setCopied] = useState(false)
  const box = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      // Clipboard blocked: select the text so it can be copied by hand.
      box.current?.select()
    }
  }

  return (
    <section className="message" id="message" aria-labelledby="message-h">
      <h2 id="message-h">Message for the customer</h2>
      {unmarked > 0 && <p className="hint">{plural(unmarked, 'card')} not marked yet, left out of the message.</p>}
      {unrecognized > 0 && <p className="hint">{plural(unrecognized, 'unrecognized line')} left out.</p>}
      <textarea ref={box} readOnly value={text} rows={Math.min(16, text.split('\n').length + 1)} aria-label="Message text" />
      <div className="paste-actions">
        <Button variant="primary" onClick={copy}>{copied ? 'Copied ✓' : 'Copy message'}</Button>
        <Button variant="ghost" onClick={onReset}>Reset marks</Button>
      </div>
    </section>
  )
}

interface RowProps {
  onQty: (name: string, qty: number) => void
  /** Lowercased name of the card just added by search. */
  recent: string | null
  /** Pulling mode: copies found by card name; null in sorting mode. */
  marks: Map<string, number | undefined> | null
  onFound: (name: string, found: number | undefined) => void
}

function SetSection({ group, pane, ...rowProps }: { group: SetGroup; pane: string } & RowProps) {
  const count = group.cards.reduce((n, c) => n + c.qty, 0)
  return (
    <section className="set-group" aria-labelledby={`g-${pane}${group.key}`}>
      <header className="set-head">
        <h2 id={`g-${pane}${group.key}`}>{group.title}</h2>
        <p>{group.sub} · {plural(count, 'card')}</p>
      </header>
      <ul className="rows">
        {group.cards.map((c) => <Row key={c.name} card={c} {...rowProps} />)}
      </ul>
    </section>
  )
}

function Row({ card, onQty, recent, marks, onFound }: { card: Placed } & RowProps) {
  const [open, setOpen] = useState(false)
  const { name, qty, pick, inBox, color, caseFlag } = card
  const first = pick?.first
  const img = first && (imageOf(first, 'png') ?? imageOf(first, 'large'))
  const found = marks?.get(name)
  const mark = found === undefined ? null : found === qty ? 'found' : found === 0 ? 'missing' : 'partial'
  const flash = !!recent && (name.toLowerCase() === recent || name.split(' // ')[0].toLowerCase() === recent)

  const cls = ['row', open && 'open', flash && 'flash', mark && `marked-${mark}`].filter(Boolean).join(' ')
  const toggle = (m: 'found' | 'missing') => onFound(name, mark === m ? undefined : m === 'found' ? qty : 0)

  return (
    <li className={cls}>
      <div className="row-line">
        <button type="button" className="row-main" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className="qty">{qty}×</span>
          <span className="rarity">{first && <Badge variant={RARITY_VARIANT[first.rarity]} size="sm">{first.rarity}</Badge>}</span>
          <span className="color"><span className={`pip pip-${color}`} aria-hidden />{COLOR_LABEL[color]}</span>
          <span className="row-name">{name}</span>
          {caseFlag && <CaseBadge flag={caseFlag} />}
          <span className="chev" aria-hidden>▾</span>
        </button>
        {marks && (
          <div className="marks" role="group" aria-label={`${name}: found or not found`}>
            <button type="button" className="mark mark-found" aria-pressed={mark === 'found'} onClick={() => toggle('found')}>
              <span aria-hidden>✓</span> Found
            </button>
            <button type="button" className="mark mark-missing" aria-pressed={mark === 'missing'} onClick={() => toggle('missing')}>
              <span aria-hidden>✕</span> Not found
            </button>
            {qty > 1 && (
              <div className="found-count">
                <Button
                  variant="secondary" size="sm" iconOnly aria-label={`One fewer ${name} found`}
                  disabled={!found} onClick={() => onFound(name, (found ?? 0) - 1)}
                >−</Button>
                <span aria-live="polite">
                  {mark === 'partial' ? <strong>{found} of {qty} found</strong> : `${found ?? 0} of ${qty} found`}
                </span>
                <Button
                  variant="secondary" size="sm" iconOnly aria-label={`One more ${name} found`}
                  disabled={found === qty} onClick={() => onFound(name, (found ?? 0) + 1)}
                >+</Button>
              </div>
            )}
          </div>
        )}
      </div>
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
            {caseFlag && <CaseNote flag={caseFlag} name={name} />}
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
