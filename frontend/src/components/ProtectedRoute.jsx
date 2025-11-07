import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'teacher') {
      return <Navigate to="/teacher/dashboard" replace />
    }
    return <Navigate to="/student/dashboard" replace />
  }

  return children
}

export default ProtectedRoute

