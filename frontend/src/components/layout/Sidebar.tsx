import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/dashboard', label: '资料总览', available: true },
  { to: '/reader', label: '图文阅读', available: true },
  { to: '/search', label: '全文检索', available: true },
  { to: '/annotation', label: '标注统计', available: false },
  { to: '/ai-analysis', label: 'AI 分析', available: false },
  { to: '/admin', label: '后台管理', available: true },
]

export default function Sidebar() {
  return (
    <aside style={{
      position: 'sticky', top: 0, height: '100vh', padding: '28px 22px',
      background: 'rgba(255,253,248,.72)', backdropFilter: 'blur(16px)',
      borderRight: '1px solid var(--line)', overflow: 'auto',
    }}>
      <div className="brand" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '26px' }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: 'linear-gradient(135deg, var(--accent), #b88956)',
          display: 'grid', placeItems: 'center', color: '#fff',
          fontWeight: 900, boxShadow: 'var(--shadow)', fontFamily: 'var(--mono)',
        }}>簡</div>
        <div>
          <h1 style={{ fontSize: 17, margin: 0, lineHeight: 1.25, letterSpacing: '.02em' }}>出土简牍数据库</h1>
          <p style={{ fontSize: 12, margin: '4px 0 0', color: 'var(--muted)' }}>法律案例类 · MVP</p>
        </div>
      </div>

      <div style={{ margin: '22px 0 10px', fontSize: 12, color: 'var(--muted)', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Navigation</div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.available ? item.to : '#'}
            onClick={e => { if (!item.available) e.preventDefault() }}
            style={({ isActive }) => ({
              padding: '10px 12px',
              borderRadius: 12,
              fontSize: 14,
              border: '1px solid transparent',
              background: isActive ? '#f1e7d8' : 'transparent',
              borderColor: isActive ? 'var(--line)' : 'transparent',
              color: item.available ? '#3a3129' : 'var(--muted)',
              opacity: item.available ? 1 : 0.5,
              cursor: item.available ? 'pointer' : 'not-allowed',
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div style={{
        marginTop: 24, padding: 14, border: '1px solid var(--line)',
        borderRadius: 14, background: 'var(--surface-2)',
        fontSize: 12, color: 'var(--muted)',
      }}>
        <b>设计原则</b><br />
        学术感、可读性、检索效率优先。视觉上使用纸本底色、墨色文本、竹木色强调色。
      </div>
    </aside>
  )
}
