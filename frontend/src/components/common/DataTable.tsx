export interface Column<T> {
  key: string
  title: string
  render?: (row: T) => React.ReactNode
}

interface Props<T> {
  columns: Column<T>[]
  data: T[]
  getRowKey: (row: T) => string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DataTable<T extends Record<string, any>>({ columns, data, getRowKey }: Props<T>) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key} style={{ borderBottom: '1px solid var(--line)', padding: '10px 8px', textAlign: 'left', color: '#6c6258', background: '#fbf7ef' }}>
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={getRowKey(row)}>
            {columns.map(col => (
              <td key={col.key} style={{ borderBottom: '1px solid var(--line)', padding: '10px 8px' }}>
                {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
