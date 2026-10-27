# First Print Finder

Search a Magic card and see which set it was first printed in. Built for the store counter, where the answer decides which binder a card goes in.

Vite + React + TypeScript, styled with the Kaika design system (`src/kaika/`). Card data and images come from the [Scryfall API](https://scryfall.com/docs/api) in the browser; there is no backend.

```sh
npm install
npm run dev          # add --host to open it to your phone on the same Wi-Fi
npm run build        # type-checks, then builds to dist/
```

Deploys to Vercel as a plain Vite project (no config needed).

## How "first printing" is decided

All printings of the card are fetched from Scryfall. The first printing is the earliest **paper, non-promo** one. Scryfall's own `is:firstprinting` is not used because it can land on a promo or digital release. A card with only promo or digital printings falls back to the earliest of those, with a warning.

## Binder mode (on by default)

Mirrors how the store files cards: only known sets count. A printing qualifies if it is from Legends (1994-06-01) or later and is an expansion or a Magic 2010 or newer core set, **or** it is in one of these binders:

| Binder | Sets |
| --- | --- |
| Arabian Nights / Antiquities (shared) | ARN, ATQ |
| Core sets (shared) | M10–M15, Magic Origins. Core Set 2019, 2020, 2021 and Foundations each have their own binder |
| Planechase / Battlebond / Game Night / Commander Masters (shared) | HOP, PC2, PCA, BBD, GNT, GN2, GN3, CMM |
| Conspiracy (shared) | CNS, CN2 |
| Mystical Archive (shared) | STA, SOA (Secrets of Strixhaven) |
| Universes Beyond (shared) | Fallout, Doctor Who, Warhammer 40,000 |
| A set's binder, at the front | The commander decks released with a set (New Capenna Commander, MH3 Commander, Final Fantasy Commander, ...), divided from the set. The list is `COMMANDER_PARENT`; add new ones as they release |
| Their own binders | Commander Legends, Commander Legends: Battle for Baldur's Gate; Unglued, Unstable, Unfinity; Time Spiral Timeshifted; Modern Horizons 1–3; Jumpstart, Jumpstart 2022, Foundations Jumpstart; Lord of the Rings; Assassin's Creed; Marvel Universe (MAR); Marvel Super Heroes Commander (MSC, which also holds the Marvel Jumpstart cards) |

Shared binders are divided by set, so the app still names the set and adds "in the … binder". In the List, sets in one shared binder sit next to each other.

Everything else is skipped: the old "Edition" core sets, Portal (all three), Anthologies, Unhinged, Unsanctioned, Duel Decks, From the Vault, other Masters sets, other Commander decks, box sets, promos, and so on. So Goblin Matron files in Urza's Saga, not Portal Second Age. The rules live in `isBinderSet` / `SHARED_BINDERS` / `EXTRA_BINDER_SETS` in `src/scryfall.ts`. If a card has no qualifying printing, the app shows its true first printing and says so.

### Commander box

Cards in `src/commanderBox.ts` (Sol Ring, Arcane Signet) show **Commander box** as the headline in binder mode, with their true first printing below. Add card names to that list as the box changes.

## List tab

Paste a decklist, upload a `.txt`/`.csv`, or search cards one at a time to build a list. Cards are grouped by the binder they're filed in, so a coworker can walk the binders without looking at card images:

- **Groups**: first-print sets oldest first, then **Commander box**, **No binder** (binder mode on, nothing qualifies) and **Basic lands**.
- **Rows** follow binder order: mythic/rare together, then uncommon, then common, then special/bonus (e.g. timeshifted); within each W, U, B, R, G, multicolor, colorless, land; then A–Z. Tap a row for the image, printing details and links.
- **Color** is read from the mana symbols in the mana cost only, not color identity. Hybrid pips count both colors. Split cards use both halves; DFCs and adventures use the front face. No colored pips means Land if it's a land, else Colorless (so no-cost cards like Ancestral Vision are Colorless).
- **Parsing** (`src/parseList.ts`) accepts `4 Card`, `4x Card`, `Card x4` and bare names, ignores set codes, foil marks and section headers, and reads CSVs with a name column. Duplicates merge.
- Lines that don't match a card go to **Not recognized**; "Search" there replaces the line with the card you pick.
- The list (names, counts and marks) is kept in `localStorage` (`fpf-list`); printings are looked up again on each visit.

Two modes (saved as `fpf-list-mode`):

- **Sorting**: a card added by search scrolls into view and is highlighted in its binder group, so you can see what else goes in that binder.
- **Pulling**: for a customer's decklist. Each row gets **Found** (all copies) / **Not found** (none) buttons, and rows with more than one copy also get a "2 of 4 found" counter. The message box at the bottom builds the reply ("Cards we had" / "We didn't have") with a Copy button; a partly found card appears in both sections with its counts. Unmarked cards and unrecognized lines are left out, with a warning. Marks never rely on color alone (two coworkers are colorblind): the pressed button is filled, bold and shows ✓/✕, fully found names are struck through, a partial count is bold, and the row edge is solid for found, dashed for not found, dotted for partly found.

## Known gaps — check at the store

- **Binder list** above was confirmed at the store. Add or remove sets in `SHARED_BINDERS` / `EXTRA_BINDER_SETS` in `src/scryfall.ts`. Not yet confirmed:
  - Other draft-innovation sets (Ravnica: Clue Edition, Mystery Booster Commander), Modern Horizons Timeshifts (H1R/H2R) and Planechase plane cards are skipped.
- **Case cards** ($12+ at Star City Games) go in the case instead of a binder. The app can't tell: Scryfall has no Star City prices, so check the price on the card's Star City Games link.
- **Standalone Commander decks** (e.g. Commander 2011) are skipped like other products. Cards found only there fall to their next qualifying set, or to the true first printing with a note. Commander decks tied to a set are filed with that set (see above).
- **Prepared-spell cards** (Scryfall layout `prepare`, mostly Secrets of Strixhaven, e.g. "Emeritus of Ideation // Ancestral Recall") are separate cards. They are dropped from printings when you search the spell's name, and kept when you search their own name.
- **Commander box list** only has the two cards mentioned so far (`src/commanderBox.ts`).