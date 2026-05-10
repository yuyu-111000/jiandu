interface Props {
  tools: { label: string; onClick: () => void; active?: boolean }[]
}

export default function PanelToolbar({ tools }: Props) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {tools.map((tool, i) => (
        <button
          key={i}
          onClick={tool.onClick}
          style={{
            fontSize: 11, border: '1px solid var(--line)', borderRadius: 'var(--radius-full)',
            padding: '5px 8px', color: '#5d5044', background: '#fff',
            cursor: 'pointer',
            fontWeight: tool.active ? 700 : 400,
          }}
        >
          {tool.label}
        </button>
      ))}
    </div>
  )
}
