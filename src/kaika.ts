// Typed handles onto the Kaika bundle, which registers itself on window.Kaika
// (see main.tsx: React must be on window before the bundle loads).
import type { ComponentType, HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes } from 'react'
import type * as K from './kaika/types'

declare global {
  interface Window {
    Kaika: Record<string, ComponentType<any>>
  }
}

const k = () => window.Kaika
const pick = <P,>(name: string) => k()[name] as ComponentType<P>

type Div = HTMLAttributes<HTMLElement>

export const Button = pick<K.ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>>('Button')
export const Input = pick<K.InputProps & InputHTMLAttributes<HTMLInputElement>>('Input')
export const Badge = pick<K.BadgeProps>('Badge')
export const Card = pick<K.CardProps>('Card')
export const CardHeader = pick<Div>('CardHeader')
export const CardTitle = pick<Div>('CardTitle')
export const CardDescription = pick<Div>('CardDescription')
export const CardContent = pick<Div>('CardContent')
export const CardFooter = pick<Div>('CardFooter')
export const KaikaMark = pick<K.KaikaMarkProps>('KaikaMark')
export const Tabs = pick<K.TabsProps>('Tabs')
export const TabList = pick<Div>('TabList')
export const Tab = pick<Div & { value: string; disabled?: boolean }>('Tab')
export const TabPanel = pick<Div & { value: string }>('TabPanel')
