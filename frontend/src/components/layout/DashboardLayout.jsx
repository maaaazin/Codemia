import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const DashboardLayout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()

  // Determine current page from URL
  const getCurrentPage = () => {
    const path = location.pathname
    if (path.includes('/dashboard')) return 'dashboard'
    if (path.includes('/assignments')) return 'assignments'
    if (path.includes('/leaderboard')) return 'leaderboard'
    if (path.includes('/activity')) return 'activity'
    if (path.includes('/submissions')) return 'submissions'
    return 'dashboard'
  }

  const handlePageChange = (pageId) => {
    const role = location.pathname.includes('/teacher') ? 'teacher' : 'student'
    
    switch (pageId) {
      case 'dashboard':
        navigate(`/${role}/dashboard`)
        break
      case 'assignments':
        navigate(`/${role}/assignments`)
        break
      case 'leaderboard':
        navigate(`/${role}/leaderboard`)
        break
      case 'activity':
        navigate(`/${role}/activity`)
        break
      case 'submissions':
        navigate(`/${role}/submissions`)
        break
      default:
        navigate(`/${role}/dashboard`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={getCurrentPage()} onPageChange={handlePageChange} />
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout

