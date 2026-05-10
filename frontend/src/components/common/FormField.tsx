import type { ReactNode } from 'react'

interface Props {
  label: string
  children: ReactNode
}

export default function FormField({ label, children }: Props) {
  return (
    <div style={{ marginBottom: 11 }}>
      <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  )
}
