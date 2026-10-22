import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import {
  Badge, Button, Card, CardContent, CardFooter,
  Input, Tab, TabList, TabPanel, Tabs,
} from './kaika'
import { inCommanderBox } from './commanderBox'
import {
  autocomplete, fetchResult, imageOf, NotFoundError, resolveName, scgSearchUrl,
  pickFirst, type Card as ScryCard, type Result,
} from './scryfall'

type Theme = 'dark' | 'light'
type Status = { kind: 'idle' } | { kind: 'loading' } | { kind: 'error'; message: string }

const RARITY_VARIANT = {
  common: 'neutral', uncommon: 'info', rare: 'warning', mythic: 'danger', special: 'accent', bonus: 'accent',
} as const

// Same utility classes the Kaika Button uses, so an <a> can look like one.
const LINK_BTN =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-sans font-medium h-10 px-4 text-sm no-underline select-none transition-[background-color,border-color,color] duration-base ease-bloom focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas'
const LINK_PRIMARY = `${LINK_BTN} bg-accent text-accent-fg hover:bg-accent-hover active:bg-accent-press shadow-sm`
const LINK_SECONDARY = `${LINK_BTN} bg-surface-raised text-fg border border-strong hover:border-accent hover:text-fg-accent`

const fmtDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

function readTheme(): Theme {
  try {
    const saved = localStorage.getItem('fpf-theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch { /* storage unavailable */ }
  return 'dark'
}

function readBinder(): boolean {
  try { return localStorage.getItem('fpf-binder') !== 'off' } catch { return true }
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [binder, setBinder] = useState(readBinder)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const [result, setResult] = useState<Result | null>(null)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const suggestAbort = useRef<AbortController>()
  const loadAbort = useRef<AbortController>()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('fpf-theme', theme) } catch { /* ignore */ }
  }, [theme])

  useEffect(() => {
    try { localStorage.setItem('fpf-binder', binder ? 'on' : 'off') } catch { /* ignore */ }
  }, [binder])

  const load = useCallback(async (name: string, push = true) => {
    loadAbort.current?.abort()
    const ctl = (loadAbort.current = new AbortController())
    setOpen(false)
    setStatus({ kind: 'loading' })
    try {
      const next = await fetchResult(name, ctl.signal)
      setResult(next)
      setQuery(next.name)
      setStatus({ kind: 'idle' })
      document.title = `${next.name} · First Print Finder`
      if (push) history.pushState(null, '', `?card=${encodeURIComponent(next.name)}`)
    } catch (e) {
      if ((e as Error).name === 'AbortError') return
      setResult(null)
      setStatus({
        kind: 'error',
        message: e instanceof NotFoundError ? `No card named “${name}”.` : 'Scryfall could not be reached. Try again.',
      })
    }
  }, [])

  // Deep links and back/forward.
  useEffect(() => {
    const fromUrl = () => {
      const card = new URLSearchParams(location.search).get('card')
      if (card) { setQuery(card); load(card, false) } else { setResult(null); setQuery('') }
    }
    fromUrl()
    window.addEventListener('popstate', fromUrl)
    return () => window.removeEventListener('popstate', fromUrl)
  }, [load])

  // Debounced autocomplete.
  useEffect(() => {
    const q = query.trim()
    suggestAbort.current?.abort()
    if (q.length < 2 || result?.name === query) { setSuggestions([]); return }
    const ctl = (suggestAbort.current = new AbortController())
    const t = setTimeout(async () => {
      try {
        setSuggestions(await autocomplete(q, ctl.signal))
        setActive(-1)
      } catch { /* aborted or offline: keep the previous list */ }
    }, 120)
    return () => { clearTimeout(t); ctl.abort() }
  }, [query, result])

  const submit = async () => {
    const pick = suggestions[active]
    if (pick) return load(pick)
    const q = query.trim()
    if (!q) return
    try { load(await resolveName(q)) } catch {
      setResult(null)
      setStatus({ kind: 'error', message: `No card named “${q}”.` })
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive((i) => Math.min(i + 1, suggestions.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(i - 1, -1)) }
    else if (e.key === 'Enter') { e.preventDefault(); submit() }
    else if (e.key === 'Escape') setOpen(false)
  }

  const showList = open && suggestions.length > 0

  return (
    <div className="shell">
      <header className="top">
        <div className="brand">
          <span className="brand-name">First Print Finder</span>
        </div>
        <div className="top-actions">
          <a
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-sans font-medium h-8 px-3 text-sm no-underline select-none bg-transparent text-fg-secondary hover:bg-accent-subtle hover:text-fg transition-[background-color,color] duration-base ease-bloom focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            href="https://braydonlafleur.site" target="_blank" rel="noopener noreferrer"
          >
            braydonlafleur.site ↗
          </a>
          <Button
            variant="ghost" size="sm" iconOnly
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </Button>
        </div>
      </header>

      <section className={result ? 'search compact' : 'search'}>
        <p className="eyebrow">Magic: The Gathering</p>
        <h1>Where did this card begin?</h1>
        <div className="combo">
          <Input
            label="Card name"
            placeholder="Start typing, e.g. Lightning Bolt"
            value={query}
            autoFocus
            autoComplete="off"
            spellCheck={false}
            role="combobox"
            aria-expanded={showList}
            aria-controls="suggestions"
            aria-autocomplete="list"
            aria-activedescendant={active >= 0 ? `sug-${active}` : undefined}
            leading={<span aria-hidden>⌕</span>}
            onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onKeyDown={onKeyDown}
          />
          {showList && (
            <ul className="suggestions" id="suggestions" role="listbox">
              {suggestions.map((s, i) => (
                <li
                  key={s} id={`sug-${i}`} role="option" aria-selected={i === active}
                  className={i === active ? 'on' : undefined}
                  onMouseDown={(e) => { e.preventDefault(); load(s) }}
                  onMouseEnter={() => setActive(i)}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
        <label className="binder">
          <input type="checkbox" checked={binder} onChange={(e) => setBinder(e.target.checked)} />
          <span>
            Binder mode
            <small>Only known sets: skips sets older than Legends, the old Edition sets and special products</small>
          </span>
        </label>
      </section>

      <main aria-live="polite">
        {status.kind === 'loading' && <p className="note">Looking up printings…</p>}
        {status.kind === 'error' && <p className="note error">{status.message}</p>}
        {result && status.kind !== 'loading' && <Printings result={result} binder={binder} />}
      </main>

      <footer className="foot">
        Card data and images from <a href="https://scryfall.com" target="_blank" rel="noopener noreferrer">Scryfall</a>.
        Not affiliated with Wizards of the Coast or Star City Games.
      </footer>
    </div>
  )
}

function Printings({ result, binder }: { result: Result; binder: boolean }) {
  const { prints, name } = result
  const inBox = binder && inCommanderBox(name)
  // Box cards report their true first printing; the box is the storage answer.
  const { first, fallback, earliest, binderMiss } = useMemo(() => pickFirst(prints, binder && !inBox), [prints, binder, inBox])
  const paperCount = prints.filter((p) => p.games.includes('paper')).length
  const img = imageOf(first, 'png') ?? imageOf(first, 'large')

  return (
    <>
      <Card variant="raised" glow className="hero">
        <div className="answer">
          <p className="eyebrow accent">{inBox ? 'Store in' : 'First printed in'}</p>
          <h2 className="answer-set">{inBox ? 'Commander box' : first.set_name}</h2>
          <p className="answer-meta">
            <strong>{name}</strong> · {inBox && <>first printed in {first.set_name} · </>}
            {first.released_at.slice(0, 4)} · {first.set.toUpperCase()} #{first.collector_number}
          </p>
        </div>
        {img && <img className="hero-img" src={img} alt={`${name}, ${first.set_name} printing`} width={488} height={680} />}
        <div className="hero-body">
          <CardContent>
            <div className="badges">
              <Badge variant={RARITY_VARIANT[first.rarity]} dot>{first.rarity}</Badge>
              <Badge variant="neutral">{fmtDate(first.released_at)}</Badge>
              {fallback === 'promo-only' && <Badge variant="warning">Promo only</Badge>}
              {fallback === 'digital-only' && <Badge variant="warning">Digital only</Badge>}
            </div>
            {earliest && (
              <p className="hint">
                Earliest printing overall: {earliest.set_name} ({earliest.released_at.slice(0, 4)}), which binder mode skips.
              </p>
            )}
            {binderMiss && (
              <p className="hint">No known set qualifies, so this is the earliest printing overall.</p>
            )}
            {fallback && (
              <p className="hint">
                {fallback === 'promo-only'
                  ? 'This card has no regular paper printing, so this is its earliest promo.'
                  : 'This card has never been printed on paper, so this is its earliest digital printing.'}
              </p>
            )}
            <dl className="facts">
              {first.type_line && (<><dt>Type</dt><dd>{first.type_line}</dd></>)}
              {first.artist && (<><dt>Artist</dt><dd>{first.artist}</dd></>)}
              <dt>Printings</dt><dd>{prints.length} total · {paperCount} in paper</dd>
            </dl>
          </CardContent>
          <CardFooter className="actions">
            <a className={LINK_PRIMARY} href={scgSearchUrl(name)} target="_blank" rel="noopener noreferrer">
              Find on Star City Games ↗
            </a>
            <a className={LINK_SECONDARY} href={first.scryfall_uri} target="_blank" rel="noopener noreferrer">
              View on Scryfall ↗
            </a>
          </CardFooter>
        </div>
      </Card>

      <section className="all" aria-labelledby="all-h">
        <h2 id="all-h">All printings</h2>
        <Tabs defaultValue="all">
          <TabList>
            <Tab value="all">All ({prints.length})</Tab>
            <Tab value="paper">Paper ({paperCount})</Tab>
          </TabList>
          <TabPanel value="all"><Grid prints={prints} firstId={first.id} /></TabPanel>
          <TabPanel value="paper">
            <Grid prints={prints.filter((p) => p.games.includes('paper'))} firstId={first.id} />
          </TabPanel>
        </Tabs>
      </section>
    </>
  )
}

function Grid({ prints, firstId }: { prints: ScryCard[]; firstId: string }) {
  return (
    <ul className="grid">
      {prints.map((p) => (
        <li key={p.id}>
          <a
            className={p.id === firstId ? 'print first' : 'print'}
            href={p.scryfall_uri} target="_blank" rel="noopener noreferrer"
          >
            {imageOf(p, 'small')
              ? <img src={imageOf(p, 'small')} alt="" loading="lazy" width={146} height={204} />
              : <span className="noimg" />}
            <span className="set">{p.set_name}</span>
            <span className="meta">
              {p.released_at.slice(0, 4)} · {p.set.toUpperCase()}
              {p.promo && ' · promo'}
              {p.digital && ' · digital'}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
