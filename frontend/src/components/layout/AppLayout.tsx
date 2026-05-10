import { type ReactNode } from 'react'
import Sidebar from './Sidebar'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'var(--sidebar) minmax(900px,1fr)', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ padding: '34px 38px 70px' }}>
        {children}
      </main>
    </div>
  )
}
