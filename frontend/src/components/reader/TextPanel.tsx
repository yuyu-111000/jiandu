import PanelToolbar from '../common/PanelToolbar'
import AnnotatedText from './AnnotatedText'
import type { SlipItem } from '../../mocks/data'

interface Props {
  item: SlipItem
  showAnnotations: boolean
  onToggleAnnotations: () => void
}

export default function TextPanel({ item, showAnnotations, onToggleAnnotations }: Props) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, gap: 12 }}>
        <h4 style={{ margin: 0, fontSize: 15 }}>{item.code} 释文</h4>
        <PanelToolbar
          tools={[
            {
              label: '复制',
              onClick: () => navigator.clipboard?.writeText(item.text),
            },
            {
              label: '仅文字',
              onClick: () => {},
            },
            {
              label: showAnnotations ? '标注：开' : '标注：关',
              onClick: onToggleAnnotations,
              active: showAnnotations,
            },
          ]}
        />
      </div>
      <div
        style={{
          fontSize: 'var(--text-lg)',
          lineHeight: 2.1,
          border: '1px solid var(--line)',
          borderRadius: 14,
          padding: 18,
          background: '#fff',
          minHeight: 410,
          fontFamily: 'var(--font-serif)',
        }}
      >
        <AnnotatedText item={item} showAnnotations={showAnnotations} />
      </div>
    </>
  )
}
