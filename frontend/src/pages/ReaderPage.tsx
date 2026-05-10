import { useState } from 'react'
import { useParams } from 'react-router-dom'
import CatalogTree from '../components/reader/CatalogTree'
import TextPanel from '../components/reader/TextPanel'
import ImagePanel from '../components/reader/ImagePanel'
import { getItemById, slipItems } from '../mocks/data'

export default function ReaderPage() {
  const { itemId } = useParams<{ itemId: string }>()
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [showOnlyText, setShowOnlyText] = useState(false)

  const selectedItem = itemId ? getItemById(Number(itemId)) : slipItems[0]
  const currentItem = selectedItem || slipItems[0]

  const currentIndex = slipItems.findIndex(i => i.id === currentItem.id)
  const prevItem = currentIndex > 0 ? slipItems[currentIndex - 1] : null
  const nextItem = currentIndex < slipItems.length - 1 ? slipItems[currentIndex + 1] : null

  const handlePrev = () => {
    if (prevItem) {
      window.history.replaceState(null, '', `/reader/${prevItem.id}`)
      window.location.reload()
    }
  }

  const handleNext = () => {
    if (nextItem) {
      window.history.replaceState(null, '', `/reader/${nextItem.id}`)
      window.location.reload()
    }
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div className="eyebrow">图文对照阅读</div>
          <h2 style={{ fontSize: 'var(--text-3xl)', margin: 0, lineHeight: 1.2 }}>{currentItem.code} · {currentItem.title}</h2>
        </div>
        <span style={{ fontSize: 12, color: '#fff', background: 'var(--accent)', padding: '5px 10px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>P0 核心</span>
      </div>

      <div style={{
        border: '1px solid var(--line)', borderRadius: 'var(--radius)',
        overflow: 'hidden', background: 'var(--surface)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: showOnlyText ? '1fr' : '190px 1fr 1fr', minHeight: 560 }}>
          {!showOnlyText && (
            <div style={{ background: '#f7efe2', borderRight: '1px solid var(--line)', padding: 16 }}>
              <CatalogTree />
            </div>
          )}

          <div style={{ padding: 18, borderRight: showOnlyText ? 'none' : '1px solid var(--line)', minWidth: 0 }}>
            <TextPanel
              item={currentItem}
              showAnnotations={showAnnotations}
              onToggleAnnotations={() => setShowAnnotations(!showAnnotations)}
            />
          </div>

          {!showOnlyText && (
            <div style={{ padding: 18, minWidth: 0 }}>
              <ImagePanel
                pageNumber={currentItem.pageNumber}
                onPrev={handlePrev}
                onNext={handleNext}
                hasPrev={!!prevItem}
                hasNext={!!nextItem}
              />
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button
          onClick={() => setShowOnlyText(!showOnlyText)}
          style={{
            fontSize: 11, border: '1px solid var(--line)', borderRadius: 'var(--radius-full)',
            padding: '5px 8px', background: '#fff', color: '#5d5044', cursor: 'pointer',
          }}
        >
          {showOnlyText ? '图文并列' : '仅文字'}
        </button>
        <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
          <span style={{ background: 'var(--annot-noun-bg)', borderBottom: '2px solid var(--annot-noun-line)', padding: '1px 3px', borderRadius: 'var(--radius-xs)' }}>名词 n</span>
          <span style={{ background: 'var(--annot-verb-bg)', borderBottom: '2px solid var(--annot-verb-line)', padding: '1px 3px', borderRadius: 'var(--radius-xs)' }}>动词 v</span>
          <span style={{ outline: '2px solid var(--annot-subject-outline)', borderRadius: 'var(--radius-xs)', padding: '1px 3px' }}>主语 subject</span>
        </div>
      </div>
    </>
  )
}
