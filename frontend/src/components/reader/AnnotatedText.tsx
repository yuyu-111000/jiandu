import type { SlipItem, Annotation } from '../../mocks/data'

interface Props {
  item: SlipItem
  showAnnotations: boolean
}

function getAnnotationStyle(ann: Annotation): React.CSSProperties {
  if (ann.type === 'syntax') {
    if (ann.pos === 'n' && ann.role === 'subject') {
      return { background: 'var(--annot-noun-bg)', borderBottom: '2px solid var(--annot-noun-line)', padding: '1px 3px', borderRadius: 'var(--radius-xs)', outline: '2px solid var(--annot-subject-outline)' }
    }
    if (ann.pos === 'n') {
      return { background: 'var(--annot-noun-bg)', borderBottom: '2px solid var(--annot-noun-line)', padding: '1px 3px', borderRadius: 'var(--radius-xs)' }
    }
    if (ann.pos === 'v') {
      return { background: 'var(--annot-verb-bg)', borderBottom: '2px solid var(--annot-verb-line)', padding: '1px 3px', borderRadius: 'var(--radius-xs)' }
    }
  }
  return { background: 'var(--annot-keyword-bg)', borderBottom: '2px solid var(--annot-keyword-line)', padding: '0 2px', borderRadius: 3 }
}

export default function AnnotatedText({ item, showAnnotations }: Props) {
  if (!showAnnotations || item.annotations.length === 0) {
    return <>{item.text}</>
  }

  const sorted = [...item.annotations].sort((a, b) => a.startPos - b.startPos)

  const segments: (string | { text: string; style: React.CSSProperties })[] = []
  let cursor = 0

  for (const ann of sorted) {
    if (ann.startPos > cursor) {
      segments.push(item.text.slice(cursor, ann.startPos))
    }
    segments.push({
      text: item.text.slice(ann.startPos, ann.endPos),
      style: getAnnotationStyle(ann),
    })
    cursor = ann.endPos
  }

  if (cursor < item.text.length) {
    segments.push(item.text.slice(cursor))
  }

  return (
    <>
      {segments.map((seg, i) =>
        typeof seg === 'string' ? (
          <span key={i}>{seg}</span>
        ) : (
          <span key={i} style={seg.style}>{seg.text}</span>
        ),
      )}
    </>
  )
}
