interface Props {
  label: string
  variant?: 'default' | 'dark' | 'badge'
  style?: React.CSSProperties
}

export default function Chip({ label, variant = 'default', style }: Props) {
  if (variant === 'badge') {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--line)', background: '#f7efe2',
        color: 'var(--accent)', fontSize: 12, fontWeight: 700,
        padding: '4px 9px', ...style,
      }}>
        {label}
      </span>
    )
  }

  return (
    <span style={{
      border: '1px solid var(--line)', borderRadius: 'var(--radius-full)',
      padding: '8px 11px', fontSize: 12,
      background: variant === 'dark' ? 'var(--ink)' : '#f9f4eb',
      color: variant === 'dark' ? '#fff' : '#4c4137',
      borderColor: variant === 'dark' ? 'var(--ink)' : undefined,
      fontWeight: variant === 'dark' ? 700 : 400,
      ...style,
    }}>
      {label}
    </span>
  )
}
