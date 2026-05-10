import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export default function Button({ variant = 'secondary', style, ...props }: Props) {
  return (
    <button
      style={{
        border: '1px solid var(--line-strong)',
        background: variant === 'primary' ? 'var(--ink)' : 'var(--surface)',
        color: variant === 'primary' ? 'white' : '#3b3127',
        borderRadius: 'var(--radius-full)',
        padding: '10px 16px',
        fontSize: 14,
        fontWeight: 700,
        cursor: 'pointer',
        borderColor: variant === 'primary' ? 'var(--ink)' : undefined,
        ...style,
      }}
      {...props}
    />
  )
}
