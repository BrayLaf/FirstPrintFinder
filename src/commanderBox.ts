// Cards the store keeps in the Commander quick-pull box instead of a set binder.
// Add a card name per line (case doesn't matter). Binder mode shows "Commander box"
// for these; with binder mode off the app shows the plain first printing.
const COMMANDER_BOX = [
  'Ash Barrens',
  'Command Tower',
  'Evolving Wilds',
  'Terramorphic Expanse',
  'Myriad Landscape',
  'Path of Ancestry',
  'Exotic Orchard',
  "Rogue's Passage",
  'Opal Palace',
  'Temple of the False God',
  'Arcane Signet',
  'Basalt Monolith',
  "Commander's Sphere",
  'Fellwar Stone',
  'Mind Stone',
  'Sol Ring',
  'Swiftfoot Boots',
  'Thought Vessel',
  'Lightning Greaves',
  'Thran Dynamo',
  'Whispersilk Cloak',
  'Worn Powerstone',
  "Trailblazer's Boots",
]

const names = new Set(COMMANDER_BOX.map((n) => n.toLowerCase()))

export const inCommanderBox = (cardName: string) => names.has(cardName.toLowerCase())
