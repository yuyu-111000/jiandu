import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/common/SearchBar'
import Chip from '../components/common/Chip'
import StatsCard from '../components/common/StatsCard'
import { getStats, locationOptions, periodOptions, slipItems } from '../mocks/data'

export default function DashboardPage() {
  const navigate = useNavigate()
  const stats = getStats()
  const recentItems = slipItems.slice(0, 5)

  return (
    <>
      <section className="card" style={{ padding: 32, marginBottom: 28 }}>
        <div className="eyebrow">资料总览</div>
        <h2 style={{ fontSize: 'var(--text-3xl)', margin: '0 0 12px', lineHeight: 1.2 }}>出土简牍数据库</h2>
        <p style={{ color: 'var(--muted)', maxWidth: 720, margin: '0 0 20px' }}>
          检索、浏览法律案例类出土简牍资料，支持图文对照阅读、全文检索、条件筛选与统计。
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            className="btn primary"
            onClick={() => navigate('/reader')}
            style={{
              border: '1px solid var(--ink)', background: 'var(--ink)', color: '#fff',
              borderRadius: 'var(--radius-full)', padding: '10px 16px',
              fontSize: 14, fontWeight: 700, cursor: 'pointer',
            }}
          >进入图文阅读</button>
          <button
            onClick={() => navigate('/search')}
            style={{
              border: '1px solid var(--line-strong)', background: 'var(--surface)',
              borderRadius: 'var(--radius-full)', padding: '10px 16px',
              fontSize: 14, fontWeight: 700, color: '#3b3127', cursor: 'pointer',
            }}
          >全文检索</button>
          <button
            onClick={() => navigate('/admin')}
            style={{
              border: '1px solid var(--line-strong)', background: 'var(--surface)',
              borderRadius: 'var(--radius-full)', padding: '10px 16px',
              fontSize: 14, fontWeight: 700, color: '#3b3127', cursor: 'pointer',
            }}
          >后台管理</button>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
        <StatsCard value={stats.totalItems} label="简牍条目" />
        <StatsCard value={stats.totalSources} label="文献来源" />
        <StatsCard value={stats.totalAnnotations} label="标注现象" />
      </div>

      <div style={{ marginBottom: 32 }}>
        <SearchBar onSearch={(q) => navigate(`/search?q=${encodeURIComponent(q)}`)} placeholder="输入关键词 / 简牍编号 / 文献来源" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        <div className="tile">
          <Chip label="按出土地点浏览" variant="badge" />
          <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {locationOptions.filter(l => l.count > 0).map(loc => (
              <Chip key={loc.value} label={`${loc.label} (${loc.count})`} />
            ))}
          </div>
        </div>
        <div className="tile">
          <Chip label="按时期浏览" variant="badge" />
          <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {periodOptions.filter(p => p.count > 0).map(p => (
              <Chip key={p.value} label={`${p.label} (${p.count})`} />
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="section-head">
          <div>
            <h3>最近条目</h3>
            <div className="section-desc">数据库最新入库简牍资料</div>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          {recentItems.map(item => (
            <div
              key={item.id}
              onClick={() => navigate(`/reader/${item.id}`)}
              style={{
                border: '1px solid var(--line)', borderRadius: 14, padding: 14,
                background: '#fff', cursor: 'pointer',
                display: 'grid', gap: 6,
              }}
            >
              <h5 style={{ margin: 0, fontSize: 15 }}>{item.code} · {item.title}</h5>
              <p style={{ margin: 0, color: '#5f554c', fontSize: 13 }}>{item.text.slice(0, 40)}……</p>
              <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ background: '#f3eadc', borderRadius: 'var(--radius-full)', padding: '3px 8px' }}>{item.location}</span>
                <span style={{ background: '#f3eadc', borderRadius: 'var(--radius-full)', padding: '3px 8px' }}>{item.period}</span>
                <span style={{ background: '#f3eadc', borderRadius: 'var(--radius-full)', padding: '3px 8px' }}>{item.source}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
