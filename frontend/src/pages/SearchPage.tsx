import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/common/SearchBar'
import FilterSidebar from '../components/common/FilterSidebar'
import StatsCard from '../components/common/StatsCard'
import ResultCard from '../components/common/ResultCard'
import StatsChart from '../components/search/StatsChart'
import { searchItems, locationOptions, periodOptions } from '../mocks/data'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([])

  const results = useMemo(
    () => searchItems(query, { locations: selectedLocations, periods: selectedPeriods }),
    [query, selectedLocations, selectedPeriods],
  )

  const handleSearch = (q: string) => {
    setQuery(q)
    setSearchParams(q ? { q } : {})
  }

  const locationFilterOptions = locationOptions.map(l => ({
    value: l.value,
    label: `${l.label} (${l.count})`,
    checked: selectedLocations.includes(l.value),
  }))

  const periodFilterOptions = periodOptions.map(p => ({
    value: p.value,
    label: `${p.label} (${p.count})`,
    checked: selectedPeriods.includes(p.value),
  }))

  const toggleLocation = (value: string) => {
    setSelectedLocations(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value],
    )
  }

  const togglePeriod = (value: string) => {
    setSelectedPeriods(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value],
    )
  }

  const locationDistribution = useMemo(() => {
    return locationOptions.map(l => ({
      name: l.label,
      count: results.filter(r => r.location === l.value).length,
    }))
  }, [results])

  const uniqueSources = useMemo(() => [...new Set(results.map(r => r.source))], [results])
  const uniqueLocations = useMemo(() => [...new Set(results.map(r => r.location))], [results])

  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <div className="eyebrow">全文检索</div>
        <h2 style={{ fontSize: 'var(--text-3xl)', margin: '0 0 6px', lineHeight: 1.2 }}>检索与统计</h2>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
        <SearchBar onSearch={handleSearch} initialValue={initialQuery} />
        <button
          onClick={() => {
            setQuery('')
            setSelectedLocations([])
            setSelectedPeriods([])
          }}
          style={{
            border: '1px solid var(--line)', borderRadius: 'var(--radius-full)',
            padding: '8px 11px', fontSize: 12, background: '#f9f4eb',
            color: '#4c4137', cursor: 'pointer', flexShrink: 0,
          }}
        >
          重置
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 16 }}>
        <div>
          <FilterSidebar title="出土地点" options={locationFilterOptions} onToggle={toggleLocation} />
          <div style={{ height: 12 }} />
          <FilterSidebar title="时期" options={periodFilterOptions} onToggle={togglePeriod} />
        </div>

        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 14 }}>
            <StatsCard value={results.length} label="命中条目" />
            <StatsCard value={uniqueSources.length} label="文献来源" />
            <StatsCard value={uniqueLocations.length} label="出土地点" />
          </div>

          {results.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              <StatsChart data={locationDistribution} title="按出土地点分布" />
              <div className="note">
                统计图表与当前检索条件实时联动。点击图表项可进一步缩小结果集。
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gap: 10 }}>
            {results.map(item => (
              <ResultCard
                key={item.id}
                title={`${item.code}：${item.title}`}
                snippet={item.text}
                sources={[item.location, `页 ${item.pageNumber}`, item.period]}
                highlight={query || undefined}
              />
            ))}
            {results.length === 0 && (
              <div className="tile" style={{ textAlign: 'center', color: 'var(--muted)' }}>
                未检索到匹配结果
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
