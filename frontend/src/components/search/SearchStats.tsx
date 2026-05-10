import StatsCard from '../common/StatsCard'

interface Props {
  total: number
  sources: number
  locations: number
}

export default function SearchStats({ total, sources, locations }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
      <StatsCard value={total} label="命中条目" />
      <StatsCard value={sources} label="文献来源" />
      <StatsCard value={locations} label="出土地点" />
    </div>
  )
}
