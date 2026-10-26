# First Print Finder

In-house tool for the owner's card store: search a Magic card, see the set it was first printed in (that decides which binder it goes in). Used by a few coworkers who are new to Magic. Vite + React 18 + TypeScript, static, deployed to Vercel. No backend; the browser calls the Scryfall API directly.

See `README.md` for the binder rules and the list of known gaps to confirm at the store.

## Commands

- `npm run dev` — dev server on :5173 (add `-- --host` to reach it from a phone on the LAN)
- `npm run build` — `tsc --noEmit` then `vite build`. Run it after every change; it is the only check (no test suite).

## Where things live

- `src/scryfall.ts` — API client and all first-printing logic (`pickFirst`, `isBinderSet`, `NO_BINDER`/`EXTRA_BINDER_SETS`). Business rules go here, not in components.
- `src/commanderBox.ts` — card names the store keeps in the Commander quick-pull box. The user edits this list.
- `src/App.tsx`, `src/app.css` — the shell, Card tab and styles. `src/ListView.tsx` is the List tab; `src/CardCombo.tsx` is the autocomplete box both tabs use; `src/ui.tsx` holds shared bits (link-button classes, rarity badge variants, binder toggle).
- `src/useCardList.ts` — List tab state, persisted to `localStorage` (`fpf-list`). Called in `App`, not `ListView`, because Kaika's `TabPanel` unmounts inactive tabs.
- `src/parseList.ts` — decklist / CSV parser. List grouping, color and row order (`groupForBinders`, `colorOf`) live in `src/scryfall.ts` with the other binder rules.
- `src/kaika/` — vendored copy of the Kaika design system (tokens, CSS, compiled bundle). Source of truth is the "Kaika" claude.ai artifact; don't hand-edit these files, re-pull from the artifact instead.
- `src/kaika.ts` — typed wrappers over `window.Kaika.*`.

## Non-obvious things

- The Kaika bundle is a classic script that reads `window.React` when it evaluates. `src/main.tsx` sets `window.React` and then loads the bundle and `App` with dynamic `import()` + top-level await (hence `build.target: 'es2022'`). Keep that order; importing `App` statically breaks it.
- Kaika's `Button` always renders a `<button>`. Link buttons are `<a>` tags that copy its Tailwind utility classes from the bundle (see `LINK_BTN` in `App.tsx`). Only utilities the bundle already uses exist; a new Tailwind class won't compile. Style anything else with the CSS variables from `tokens.css` (`var(--color-*)`, `--space-*`, `--radius-*`).
- First printing is computed client-side from all printings (earliest paper, non-promo). Do not switch to Scryfall's `is:firstprinting`; it can pick promos/digital.
- Scryfall's `!"name"` search matches any card face, so prepared-spell cards (`layout: "prepare"`, e.g. "Emeritus of Ideation // Ancestral Recall") come back for the spell's name. `fetchResult` filters them out unless searched by full name.
- Scryfall rejects requests with a generic user agent. Browsers are fine; a Node script needs a custom `User-Agent` header or it gets a 400.
- Scryfall asks for ~50-100ms between requests. Autocomplete is debounced at 120ms and aborts stale requests; keep it that way. `get()` also paces every request 100ms apart, which list lookups rely on.
- List lookups: names resolve through `POST /cards/collection` (75 per call; it finds "Fire" but not "Fire // Ice", so lookups use the front face), then printings come from OR'd `!"name"` searches. Scryfall silently drops terms from long OR queries (~80 names gave wrong totals), so `fetchPrintings` batches 20.
- Result images use Scryfall's transparent `png`, not `large`, because the JPG has white corners baked in.
- The set name of the first printing is the most important thing on the page. It must stay the largest text in the result and visible without scrolling on a phone.

## Verifying UI changes

Check every visual change in Claude in Chrome against `http://localhost:5173`, including phone width, before calling it done. Chrome won't shrink the window below ~500px, so test mobile by loading the app in an `<iframe>` of the target width (390px, and 320px for tight spots) on a blank same-origin page and measuring inside it (`scrollWidth` vs `clientWidth` catches sideways overflow). If the Chrome extension isn't connected, say so rather than implying it was checked.

## Conventions

- Keep logic changes small and covered by checking real cards (Dark Ritual → Ice Age, Terror → Anthologies, Shivan Dragon → Magic 2010, Sol Ring → Commander box, Ancestral Recall → no prepared-spell cards).
- Update the README's "Known gaps" section when a binder rule changes or a new open question comes up.
- Preferences and settings are stored in `localStorage` (`fpf-theme`, `fpf-binder`), always inside try/catch.
