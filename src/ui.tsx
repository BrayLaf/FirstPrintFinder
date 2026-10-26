// Small pieces shared by the Card and List tabs.

export const RARITY_VARIANT = {
  common: 'neutral', uncommon: 'info', rare: 'warning', mythic: 'danger', special: 'accent', bonus: 'accent',
} as const

// Same utility classes the Kaika Button uses, so an <a> can look like one.
const LINK_BTN =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-sans font-medium h-10 px-4 text-sm no-underline select-none transition-[background-color,border-color,color] duration-base ease-bloom focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas'
export const LINK_PRIMARY = `${LINK_BTN} bg-accent text-accent-fg hover:bg-accent-hover active:bg-accent-press shadow-sm`
export const LINK_SECONDARY = `${LINK_BTN} bg-surface-raised text-fg border border-strong hover:border-accent hover:text-fg-accent`

export const fmtDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

export function BinderToggle({ on, onChange }: { on: boolean; onChange: (on: boolean) => void }) {
  return (
    <label className="binder">
      <input type="checkbox" checked={on} onChange={(e) => onChange(e.target.checked)} />
      <span>
        Binder mode
        <small>Only known sets: skips sets older than Legends, the old Edition sets and special products</small>
      </span>
    </label>
  )
}
