export default function AIAnalysisPage() {
  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <div className="eyebrow">AI 分析</div>
        <h2 style={{ fontSize: 'var(--text-3xl)', margin: 0, lineHeight: 1.2 }}>AI 分析问答</h2>
        <div className="section-desc">基于数据库检索结果回答问题，必须标注出处。三期开放。</div>
      </div>

      <div style={{
        padding: 64, textAlign: 'center',
        border: '1px solid var(--line)', borderRadius: 'var(--radius)',
        background: 'var(--surface)', color: 'var(--muted)',
      }}>
        <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>🤖</div>
        <p style={{ fontSize: 'var(--text-lg)' }}>AI 分析功能建设中</p>
        <p style={{ fontSize: 'var(--text-sm)' }}>预计三期开放：RAG 问答 · 统计分析解释 · AI 辅助标注 · 出处溯源</p>
      </div>
    </>
  )
}
