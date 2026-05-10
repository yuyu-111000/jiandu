import { catalogs } from '../../mocks/data'

export default function CatalogTree() {
  return (
    <>
      <div style={{ fontSize: 13, fontWeight: 900, marginBottom: 12 }}>目录</div>
      {catalogs.map(source => (
        <div key={source.id} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', margin: '8px 0 6px' }}>
            {source.title}
          </div>
          {source.children?.map(chapter => (
            <div key={chapter.id} style={{ marginLeft: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', margin: '4px 0 6px', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                {chapter.title}
              </div>
              {chapter.items?.map(item => (
                <a
                  key={item.id}
                  href={`/reader/${item.id}`}
                  style={{
                    display: 'block',
                    padding: '8px 9px',
                    borderRadius: 9,
                    fontSize: 12,
                    color: '#4d443b',
                    marginBottom: 5,
                    background: item.id === 1 ? '#fff' : 'transparent',
                    border: item.id === 1 ? '1px solid var(--line)' : '1px solid transparent',
                    fontWeight: item.id === 1 ? 700 : 400,
                  }}
                >
                  {item.code} · {item.title}
                </a>
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
