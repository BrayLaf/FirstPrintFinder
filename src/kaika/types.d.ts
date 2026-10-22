import * as React from 'react';

/**
 * Avatar — from kaika-design-system@0.1.0.
 */
export interface AvatarProps {
  src?: string;
  /** Full name — used for the alt text and to derive initials. */
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
  status?: "online" | "away" | "offline";
  /** Render as a square (e.g. for org/agent avatars) instead of a circle. */
  square?: boolean;
  className?: string;
}

export declare const Avatar: React.ComponentType<AvatarProps>;

/**
 * Badge — from kaika-design-system@0.1.0.
 */
export interface BadgeProps {
  variant?: "neutral" | "accent" | "positive" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  /** Show a leading status dot. */
  dot?: boolean;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const Badge: React.ComponentType<BadgeProps>;

/**
 * Button — from kaika-design-system@0.1.0.
 * @replaces button
 */
export interface ButtonProps {
  variant?: "danger" | "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Render only an icon; applies square padding and requires aria-label. */
  iconOnly?: boolean;
  /** Optional leading element (icon). */
  leading?: React.ReactNode;
  /** Optional trailing element (icon). */
  trailing?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const Button: React.ComponentType<ButtonProps>;

/**
 * Card — from kaika-design-system@0.1.0.
 */
export interface CardProps {
  variant?: "surface" | "raised" | "outline";
  /** Add the signature sage glow behind the card content. */
  glow?: boolean;
  /** Lift + accent border on hover (for clickable cards). */
  interactive?: boolean;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const Card: React.ComponentType<CardProps>;

/**
 * Input — from kaika-design-system@0.1.0.
 * @replaces input
 */
export interface InputProps {
  label?: string;
  /** Helper or error text shown beneath the field. */
  hint?: string;
  invalid?: boolean;
  /** Leading adornment (icon / prefix). */
  leading?: React.ReactNode;
  /** Trailing adornment (icon / unit). */
  trailing?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const Input: React.ComponentType<InputProps>;

/**
 * KaikaMark — from kaika-design-system@0.1.0.
 */
export interface KaikaMarkProps {
  /** Pixel size of the square mark. */
  size?: number;
  /** Render in a single flat color (uses currentColor) instead of the gradient. */
  mono?: boolean;
  className?: string;
  title?: string;
}

export declare const KaikaMark: React.ComponentType<KaikaMarkProps>;

/**
 * Menu — from kaika-design-system@0.1.0.
 */
export interface MenuProps {
  children: React.ReactNode;
  className?: string;
  /** Start the menu open (uncontrolled). Useful for previews and tests. */
  defaultOpen?: boolean;
}

export declare const Menu: React.ComponentType<MenuProps>;

/**
 * Tabs — from kaika-design-system@0.1.0.
 */
export interface TabsProps {
  /** Controlled active value. */
  value?: string;
  /** Initial value for uncontrolled usage. */
  defaultValue: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export declare const Tabs: React.ComponentType<TabsProps>;

/**
 * Tooltip — from kaika-design-system@0.1.0.
 */
export interface TooltipProps {
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  /** Delay before showing, in ms. */
  delay?: number;
  /** Start visible (uncontrolled). Useful for previews and tests. */
  defaultOpen?: boolean;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}

export declare const Tooltip: React.ComponentType<TooltipProps>;
