import { useEffect, useId, useRef, useState, type KeyboardEvent, type Ref } from 'react'
import { Input } from './kaika'
import { autocomplete } from './scryfall'

interface Props {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  /** `exact` is true when a suggestion was chosen, false for typed text. */
  onSubmit: (text: string, exact: boolean) => void
  /** Hide suggestions, e.g. when the box already shows a loaded card. */
  quiet?: boolean
  autoFocus?: boolean
  inputRef?: Ref<HTMLInputElement>
}

/** Card name box with debounced Scryfall autocomplete. */
export function CardCombo({ label, placeholder, value, onChange, onSubmit, quiet, autoFocus, inputRef }: Props) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const abort = useRef<AbortController>()
  const id = useId()

  useEffect(() => {
    const q = value.trim()
    abort.current?.abort()
    if (q.length < 2 || quiet) { setSuggestions([]); return }
    const ctl = (abort.current = new AbortController())
    const t = setTimeout(async () => {
      try {
        setSuggestions(await autocomplete(q, ctl.signal))
        setActive(-1)
      } catch { /* aborted or offline: keep the previous list */ }
    }, 120)
    return () => { clearTimeout(t); ctl.abort() }
  }, [value, quiet])

  const pick = (name: string, exact: boolean) => {
    setOpen(false)
    setSuggestions([])
    onSubmit(name, exact)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive((i) => Math.min(i + 1, suggestions.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(i - 1, -1)) }
    else if (e.key === 'Enter') {
      e.preventDefault()
      const s = suggestions[active]
      if (s) pick(s, true)
      else if (value.trim()) pick(value.trim(), false)
    }
    else if (e.key === 'Escape') setOpen(false)
  }

  const showList = open && suggestions.length > 0

  return (
    <div className="combo">
      <Input
        ref={inputRef}
        label={label}
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        autoComplete="off"
        spellCheck={false}
        role="combobox"
        aria-expanded={showList}
        aria-controls={`${id}-list`}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${id}-${active}` : undefined}
        leading={<span aria-hidden>⌕</span>}
        onChange={(e) => { onChange(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
      />
      {showList && (
        <ul className="suggestions" id={`${id}-list`} role="listbox">
          {suggestions.map((s, i) => (
            <li
              key={s} id={`${id}-${i}`} role="option" aria-selected={i === active}
              className={i === active ? 'on' : undefined}
              onMouseDown={(e) => { e.preventDefault(); pick(s, true) }}
              onMouseEnter={() => setActive(i)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
