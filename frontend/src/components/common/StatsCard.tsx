interface Props {
  value: string | number
  label: string
}

export default function StatsCard({ value, label }: Props) {
  return (
    <div style={{
      border: '1px solid var(--line)', borderRadius: 14,
      padding: 14, background: '#fff',
    }}>
      <div style={{ fontSize: 24, fontWeight: 900 }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{label}</div>
    </div>
  )
}
