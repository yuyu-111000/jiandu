import { useState } from 'react'
import Chip from '../components/common/Chip'
import FormField from '../components/common/FormField'
import DataTable, { type Column } from '../components/common/DataTable'
import { slipItems, type SlipItem } from '../mocks/data'

const TABS = ['资料管理', '图片管理', '目录管理', '分类字典']

interface FormData {
  code: string
  title: string
  location: string
  text: string
  period: string
  caseType: string
}

const columns: Column<SlipItem>[] = [
  { key: 'code', title: '编号' },
  { key: 'title', title: '标题' },
  { key: 'location', title: '地点' },
  { key: 'pageNumber', title: '页码' },
  {
    key: 'status',
    title: '图文状态',
    render: (row) => (
      <span style={{
        fontSize: 12, borderRadius: 'var(--radius-full)',
        padding: '3px 8px',
        background: row.id % 3 === 0 ? 'var(--status-warn-bg)' : 'var(--status-success-bg)',
        color: row.id % 3 === 0 ? 'var(--status-warn-text)' : 'var(--status-success-text)',
        fontWeight: 700,
      }}>
        {row.id % 3 === 0 ? '待校对' : '已映射'}
      </span>
    ),
  },
  {
    key: 'actions',
    title: '操作',
    render: () => (
      <span style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: 700 }}>编辑 / 校对</span>
    ),
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('资料管理')
  const [form, setForm] = useState<FormData>({
    code: 'J-025',
    title: '盗牛案',
    location: '睡虎地',
    text: '某甲盗牛，吏捕得之……',
    period: '秦',
    caseType: '盗',
  })

  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <div className="eyebrow">后台管理</div>
        <h2 style={{ fontSize: 'var(--text-3xl)', margin: 0, lineHeight: 1.2 }}>资料上传与维护</h2>
        <div className="section-desc">管理员用于上传文字、图片，维护目录和图文映射关系。</div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
        {TABS.map(tab => (
          <Chip
            key={tab}
            label={tab}
            variant={activeTab === tab ? 'dark' : 'default'}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '230px 1fr', gap: 16 }}>
        <div style={{ border: '1px solid var(--line)', borderRadius: 14, padding: 16, background: '#fff' }}>
          <h4 style={{ margin: '0 0 12px' }}>新增 / 编辑条目</h4>
          <FormField label="简牍编号">
            <input
              value={form.code}
              onChange={e => setForm({ ...form, code: e.target.value })}
              style={{
                width: '100%', height: 38, border: '1px solid var(--line)',
                borderRadius: 10, padding: '0 10px', fontSize: 13,
                color: 'var(--ink)', background: '#fff', boxSizing: 'border-box',
              }}
            />
          </FormField>
          <FormField label="标题">
            <input
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              style={{
                width: '100%', height: 38, border: '1px solid var(--line)',
                borderRadius: 10, padding: '0 10px', fontSize: 13,
                color: 'var(--ink)', background: '#fff', boxSizing: 'border-box',
              }}
            />
          </FormField>
          <FormField label="出土地点">
            <input
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              style={{
                width: '100%', height: 38, border: '1px solid var(--line)',
                borderRadius: 10, padding: '0 10px', fontSize: 13,
                color: 'var(--ink)', background: '#fff', boxSizing: 'border-box',
              }}
            />
          </FormField>
          <FormField label="正文">
            <textarea
              value={form.text}
              onChange={e => setForm({ ...form, text: e.target.value })}
              rows={4}
              style={{
                width: '100%', border: '1px solid var(--line)',
                borderRadius: 10, padding: 10, fontSize: 13,
                color: 'var(--ink)', background: '#fff',
                resize: 'vertical', boxSizing: 'border-box',
              }}
            />
          </FormField>
          <FormField label="图片 / 标注文件">
            <div style={{
              height: 38, border: '1px solid var(--line)', borderRadius: 10,
              display: 'flex', alignItems: 'center', padding: '0 10px',
              fontSize: 13, color: 'var(--muted)', background: '#fff',
            }}>
              选择文件上传
            </div>
          </FormField>
          <Chip label="保存" variant="dark" style={{ marginTop: 8, cursor: 'pointer' }} />
        </div>

        <div style={{ border: '1px solid var(--line)', borderRadius: 14, padding: 16, background: '#fff' }}>
          <h4 style={{ margin: '0 0 12px' }}>资料列表</h4>
          <DataTable
            columns={columns}
            data={slipItems}
            getRowKey={(row) => String(row.id)}
          />
        </div>
      </div>
    </>
  )
}
