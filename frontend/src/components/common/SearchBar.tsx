import { useState, type FormEvent } from 'react'

interface Props {
  onSearch: (query: string) => void
  placeholder?: string
  initialValue?: string
}

export default function SearchBar({ onSearch, placeholder = '输入关键词 / 简牍编号 / 文献来源', initialValue = '' }: Props) {
  const [value, setValue] = useState(initialValue)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(value.trim())
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1, minWidth: 260 }}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1, minWidth: 260, height: 42,
          border: '1px solid var(--line)', borderRadius: 12,
          background: '#fff', padding: '0 14px',
          fontSize: 13, color: 'var(--ink)',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        style={{
          border: '1px solid var(--ink)', background: 'var(--ink)', color: '#fff',
          borderRadius: 'var(--radius-full)', padding: '8px 14px',
          fontSize: 12, fontWeight: 700, cursor: 'pointer',
        }}
      >
        检索
      </button>
    </form>
  )
}
