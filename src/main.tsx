import React from 'react'
import { createRoot } from 'react-dom/client'
import './kaika/tokens.css'
import './kaika/bundle.css'
import './app.css'

// The Kaika bundle is a classic script that reads window.React when it
// evaluates, so React has to be on window before it loads.
;(window as unknown as { React: typeof React }).React = React
await import('./kaika/bundle.js')
const { default: App } = await import('./App')

createRoot(document.getElementById('root')!).render(<App />)
