export interface FilterOption {
  value: string
  label: string
  checked: boolean
}

interface Props {
  title: string
  options: FilterOption[]
  onToggle: (value: string) => void
}

export default function FilterSidebar({ title, options, onToggle }: Props) {
  return (
    <aside style={{
      border: '1px solid var(--line)', borderRadius: 14,
      padding: 14, background: '#fbf7ef',
    }}>
      <h5 style={{ margin: '0 0 10px' }}>{title}</h5>
      {options.map(opt => (
        <div key={opt.value} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, margin: '9px 0', color: '#4b4036', cursor: 'pointer' }} onClick={() => onToggle(opt.value)}>
          <span style={{
            width: 14, height: 14,
            border: '1px solid #c6b8a6', borderRadius: 4,
            background: opt.checked ? 'var(--accent)' : '#fff',
            borderColor: opt.checked ? 'var(--accent)' : '#c6b8a6',
            boxShadow: opt.checked ? 'var(--shadow-inset)' : undefined,
            flexShrink: 0,
          }} />
          {opt.label}
        </div>
      ))}
    </aside>
  )
}
