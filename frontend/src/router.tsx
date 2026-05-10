import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import ReaderPage from './pages/ReaderPage'
import SearchPage from './pages/SearchPage'
import AdminPage from './pages/AdminPage'
import AnnotationPage from './pages/AnnotationPage'
import AIAnalysisPage from './pages/AIAnalysisPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/reader/:itemId" element={<ReaderPage />} />
      <Route path="/reader" element={<ReaderPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/annotation" element={<AnnotationPage />} />
      <Route path="/ai-analysis" element={<AIAnalysisPage />} />
    </Routes>
  )
}
