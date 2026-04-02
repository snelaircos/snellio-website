import Link from 'next/link'
import { type ReactNode } from 'react'

interface ButtonProps {
  href?:     string
  onClick?:  () => void
  variant?:  'primary' | 'ghost' | 'outline'
  size?:     'sm' | 'md' | 'lg'
  children:  ReactNode
  className?: string
  external?: boolean
}

const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400'

const variants = {
  primary: 'bg-gradient-btn text-white shadow-[0_4px_20px_rgba(0,144,184,.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,144,184,.5)]',
  ghost:   'text-[var(--text2)] border border-[var(--border)] hover:border-[var(--cyan)] hover:text-[var(--cyan)]',
  outline: 'text-[var(--cyan)] border border-[var(--cyan)] hover:bg-[var(--cyan)] hover:text-white',
}

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-[.95rem]',
  lg: 'px-9 py-4 text-base',
}

export default function Button({
  href, onClick, variant = 'primary', size = 'md', children, className = '', external,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return external
      ? <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{children}</a>
      : <Link href={href} className={cls}>{children}</Link>
  }

  return <button onClick={onClick} className={cls}>{children}</button>
}
