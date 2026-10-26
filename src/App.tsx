import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Badge, Button, Card, CardContent, CardFooter,
  Tab, TabList, TabPanel, Tabs,
} from './kaika'
import { inCommanderBox } from './commanderBox'
import { CardCombo } from './CardCombo'
import { ListView } from './ListView'
import { useCardList } from './useCardList'
import {
  fetchResult, imageOf, NotFoundError, resolveName, scgSearchUrl,
  pickFirst, type Card as ScryCard, type Result,
} from './scryfall'
import { BinderToggle, fmtDate, LINK_PRIMARY, LINK_SECONDARY, RARITY_VARIANT } from './ui'

type Theme = 'dark' | 'light'
type View = 'card' | 'list'
type Status = { kind: 'idle' } | { kind: 'loading' } | { kind: 'error'; message: string }

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
  const [view, setView] = useState<View>('card')
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const loadAbort = useRef<AbortController>()
  // Lives here, not in ListView, so the list and its lookups survive tab switches.
  const list = useCardList()

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
    setStatus({ kind: 'loading' })
    try {
      const next = await fetchResult(name, ctl.signal)
      setResult(next)
      setQuery(next.name)
      setStatus({ kind: 'idle' })
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

  // Deep links and back/forward. ?view=list is the List tab; ?card= is a card.
  useEffect(() => {
    const fromUrl = () => {
      const params = new URLSearchParams(location.search)
      setView(params.get('view') === 'list' ? 'list' : 'card')
      const card = params.get('card')
      if (card) { setQuery(card); load(card, false) } else { setResult(null); setQuery('') }
    }
    fromUrl()
    window.addEventListener('popstate', fromUrl)
    return () => window.removeEventListener('popstate', fromUrl)
  }, [load])

  useEffect(() => {
    if (view === 'list') document.title = 'Binder list · First Print Finder'
    else document.title = result ? `${result.name} · First Print Finder` : 'First Print Finder'
  }, [view, result])

  const switchView = (next: string) => {
    const v: View = next === 'list' ? 'list' : 'card'
    if (v === view) return
    setView(v)
    history.pushState(null, '', v === 'list' ? '?view=list' : result ? `?card=${encodeURIComponent(result.name)}` : location.pathname)
  }

  const submit = async (text: string, exact: boolean) => {
    if (exact) return load(text)
    try { load(await resolveName(text)) } catch {
      setResult(null)
      setStatus({ kind: 'error', message: `No card named “${text}”.` })
    }
  }

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

      <Tabs value={view} defaultValue="card" onValueChange={switchView} className="views">
        <TabList aria-label="Mode">
          <Tab value="card">Card</Tab>
          <Tab value="list">List{list.total > 0 && ` (${list.total})`}</Tab>
        </TabList>

        <TabPanel value="card">
          <section className={result ? 'search compact' : 'search'}>
            <p className="eyebrow">Magic: The Gathering</p>
            <h1>Where did this card begin?</h1>
            <CardCombo
              label="Card name"
              placeholder="Start typing, e.g. Lightning Bolt"
              value={query}
              onChange={setQuery}
              onSubmit={submit}
              quiet={result?.name === query}
              autoFocus
            />
            <BinderToggle on={binder} onChange={setBinder} />
          </section>

          <main aria-live="polite">
            {status.kind === 'loading' && <p className="note">Looking up printings…</p>}
            {status.kind === 'error' && <p className="note error">{status.message}</p>}
            {result && status.kind !== 'loading' && <Printings result={result} binder={binder} />}
          </main>
        </TabPanel>

        <TabPanel value="list">
          <main><ListView list={list} binder={binder} setBinder={setBinder} /></main>
        </TabPanel>
      </Tabs>

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
