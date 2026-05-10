export default function AnnotationPage() {
  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <div className="eyebrow">标注检索</div>
        <h2 style={{ fontSize: 'var(--text-3xl)', margin: 0, lineHeight: 1.2 }}>标注统计</h2>
        <div className="section-desc">按句法结构模式、语法角色进行检索与统计。二期开放。</div>
      </div>

      <div style={{
        padding: 64, textAlign: 'center',
        border: '1px solid var(--line)', borderRadius: 'var(--radius)',
        background: 'var(--surface)', color: 'var(--muted)',
      }}>
        <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>🏗</div>
        <p style={{ fontSize: 'var(--text-lg)' }}>标注检索功能建设中</p>
        <p style={{ fontSize: 'var(--text-sm)' }}>预计二期开放：词性检索 · 语法角色检索 · n+v / v+n 结构检索 · 频次统计图表</p>
      </div>
    </>
  )
}
