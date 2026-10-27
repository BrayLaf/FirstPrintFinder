// Turns a pasted decklist or an uploaded .txt/.csv into card names and counts.
// Accepts "4 Card", "4x Card", "Card x4" and bare names, plus CSV exports with a
// name column. Set codes, collector numbers, foil marks and tags are dropped:
// the first printing is computed later, so the printing a list names doesn't matter.

export interface Entry {
  name: string
  qty: number
}

export const LIST_MAX_CARDS = 300

const SECTION = /^(deck|main ?deck|mainboard|main|sideboard|side|commanders?|companions?|maybeboard|considering|tokens?|about|lands?|creatures?|instants?|sorceries|enchantments?|artifacts?|planeswalkers?|battles?|spells?|other)\b[^a-z]*$/i

function cleanName(raw: string): string {
  return raw
    .replace(/^SB:\s*/i, '') // "1 SB: Card" (the "SB: 1 Card" form is handled in parseLine)
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\^[^^]*\^/g, '') // Archidekt color tags: ^Have,#37d67a^
    .replace(/\[[^\]]*\]/g, '') // [Ramp], [CMM], [foil]
    .replace(/\*[A-Z]+\*/g, '') // *F*, *E*
    .replace(/\s+\([A-Za-z0-9]{2,6}\)(\s+[A-Za-z0-9-]+★?)?\s*$/, '') // (STA) 62
    .replace(/\s+#\S.*$/, '') // #tags
    .replace(/\s+/g, ' ')
    .trim()
}

function parseLine(line: string): Entry | null {
  let s = line.trim().replace(/^SB:\s*/i, '')
  if (!s || s.startsWith('//') || s.startsWith('#') || SECTION.test(s)) return null
  let qty = 1
  const lead = s.match(/^(\d+)\s*x?\s+(.+)$/i)
  const trail = s.match(/^(.+?)\s+x\s*(\d+)$/i) ?? s.match(/^(.+?)\s+(\d+)\s*x$/i)
  if (lead) { qty = +lead[1]; s = lead[2] } else if (trail) { qty = +trail[2]; s = trail[1] }
  const name = cleanName(s)
  return name && qty > 0 ? { name, qty } : null
}

/** Split one CSV line, honoring quoted fields with embedded commas. */
function csvCells(line: string): string[] {
  const cells: string[] = []
  let cur = ''
  let quoted = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++ }
      else if (ch === '"') quoted = false
      else cur += ch
    } else if (ch === '"') quoted = true
    else if (ch === ',') { cells.push(cur); cur = '' }
    else cur += ch
  }
  cells.push(cur)
  return cells.map((c) => c.trim())
}

function parseCsv(lines: string[]): Entry[] | null {
  const header = csvCells(lines[0]).map((h) => h.toLowerCase())
  const nameCol = header.findIndex((h) => h === 'name' || h === 'card name' || h === 'card')
  if (nameCol < 0) return null
  const qtyCol = header.findIndex((h) => ['qty', 'quantity', 'count', 'amount'].includes(h))
  return lines.slice(1).flatMap((line) => {
    const cells = csvCells(line)
    const name = cleanName(cells[nameCol] ?? '')
    const qty = qtyCol >= 0 ? parseInt(cells[qtyCol], 10) || 1 : 1
    return name ? [{ name, qty }] : []
  })
}

/** Parse a list, merging repeated names (case-insensitive) into one entry. */
export function parseList(text: string): Entry[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim())
  if (!lines.length) return []
  const raw = (lines[0].includes(',') && parseCsv(lines)) || lines.map(parseLine).filter((e): e is Entry => !!e)
  const merged = new Map<string, Entry>()
  for (const e of raw) {
    const k = e.name.toLowerCase()
    const prev = merged.get(k)
    if (prev) prev.qty += e.qty
    else merged.set(k, { ...e })
  }
  return [...merged.values()]
}
