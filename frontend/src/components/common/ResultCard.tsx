interface Props {
  title: string
  snippet: string
  sources: string[]
  highlight?: string
}

export default function ResultCard({ title, snippet, sources, highlight }: Props) {
  const renderSnippet = () => {
    if (!highlight) return snippet

    const parts = snippet.split(highlight)
    return parts.map((part, i) => {
      if (i === 0) return part
      return [
        <mark key={`m-${i}`} className="mark">{highlight}</mark>,
        part,
      ]
    })
  }

  return (
    <div style={{
      border: '1px solid var(--line)', borderRadius: 14,
      padding: 14, background: '#fff',
      display: 'grid', gap: 8,
    }}>
      <h5 style={{ margin: 0, fontSize: 15 }}>{title}</h5>
      <p style={{ margin: 0, color: '#5f554c', fontSize: 13 }}>
        {highlight ? renderSnippet() : snippet}
      </p>
      <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {sources.map((s, i) => (
          <span key={i} style={{ background: '#f3eadc', borderRadius: 'var(--radius-full)', padding: '3px 8px' }}>{s}</span>
        ))}
      </div>
    </div>
  )
}
