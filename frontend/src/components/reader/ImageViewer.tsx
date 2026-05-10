interface Props {
  pageNumber: number
  zoom: number
}

export default function ImageViewer({ pageNumber, zoom }: Props) {
  return (
    <div
      style={{
        height: 410,
        border: '1px solid var(--line)',
        borderRadius: 14,
        background: 'linear-gradient(135deg, #e6dccb, #fbf7ef)',
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: 120,
          height: 340,
          borderRadius: 18,
          background: 'linear-gradient(90deg, #8c623a, #b8834d 40%, #744926)',
          boxShadow: '18px 20px 30px rgba(91, 61, 35, 0.24)',
          position: 'relative',
          transform: `scale(${zoom / 100})`,
          transition: 'transform var(--ease)',
        }}
      >
        {/* Bamboo slip texture lines */}
        <div style={{
          position: 'absolute', top: 24, bottom: 24, left: 36,
          width: 1, background: 'rgba(255,255,255,0.24)',
        }} />
        <div style={{
          position: 'absolute', top: 24, bottom: 24, right: 36,
          width: 1, background: 'rgba(255,255,255,0.24)',
        }} />
        <div style={{
          position: 'absolute', inset: '30px 38px',
          writingMode: 'vertical-rl', color: '#23180e',
          fontSize: 20, letterSpacing: '.2em', fontFamily: 'serif',
        }}>
          某甲盗牛吏捕得之
        </div>
      </div>

      <div style={{
        position: 'absolute', right: 14, bottom: 14,
        background: 'rgba(255,255,255,.88)', border: '1px solid var(--line)',
        borderRadius: 'var(--radius-full)', padding: '7px 10px',
        fontSize: 12, color: 'var(--muted)',
      }}>
        {zoom}% · 拖拽 / 缩放
      </div>
    </div>
  )
}
