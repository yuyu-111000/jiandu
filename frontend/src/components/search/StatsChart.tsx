import ReactECharts from 'echarts-for-react'

interface Props {
  data: { name: string; count: number }[]
  title?: string
}

export default function StatsChart({ data, title }: Props) {
  const option = {
    title: title ? { text: title, textStyle: { fontSize: 13, color: 'var(--muted)' }, left: 'center' } : undefined,
    grid: { top: title ? 30 : 10, bottom: 30, left: 10, right: 10 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.name),
      axisLine: { lineStyle: { color: 'var(--line)' } },
      axisTick: { show: false },
      axisLabel: { fontSize: 11, color: 'var(--muted)' },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'var(--line)' } },
      axisLabel: { fontSize: 11, color: 'var(--muted)' },
    },
    series: [{
      type: 'bar',
      data: data.map(d => d.count),
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#C66B3D' },
            { offset: 1, color: '#8E3329' },
          ],
        },
      },
      barMaxWidth: 40,
    }],
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: 'var(--line)',
      textStyle: { color: 'var(--ink)', fontSize: 12 },
    },
  }

  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: 14, background: '#fff', padding: 16, minHeight: 200 }}>
      <ReactECharts option={option} style={{ height: 180 }} />
    </div>
  )
}
