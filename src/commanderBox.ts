// Cards the store keeps in the Commander quick-pull box instead of a set binder.
// Add a card name per line (case doesn't matter). Binder mode shows "Commander box"
// for these; with binder mode off the app shows the plain first printing.
const COMMANDER_BOX = [
  'Sol Ring',
  'Arcane Signet',
]

const names = new Set(COMMANDER_BOX.map((n) => n.toLowerCase()))

export const inCommanderBox = (cardName: string) => names.has(cardName.toLowerCase())
