import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Activity, AlertCircle, Send, Clock, CheckCircle2, XCircle } from 'lucide-react'

const TeacherStudentActivity = () => {
  const recentActivity = [
    { id: 1, name: 'Alice Chen', action: 'submitted', assignment: 'Array Manipulation Basics', time: '2 min ago', status: 'success' },
    { id: 2, name: 'Bob Kumar', action: 'attempted', assignment: 'Recursion Challenge', time: '15 min ago', status: 'info' },
    { id: 3, name: 'Carol Zhang', action: 'failed a submission', assignment: 'Binary Search', time: '23 min ago', status: 'error' },
    { id: 4, name: 'David Lee', action: 'submitted', assignment: 'Sorting Algorithms', time: '1 hour ago', status: 'success' },
    { id: 5, name: 'Emma Wilson', action: 'submitted', assignment: 'Array Manipulation Basics', time: '2 hours ago', status: 'success' },
    { id: 6, name: 'Frank Miller', action: 'attempted', assignment: 'Recursion Challenge', time: '3 hours ago', status: 'info' },
  ]

  const studentsNeedHelp = [
    { id: 1, name: 'Frank Lee', issue: '5 failed submissions', priority: 'high', lastActivity: '2 days ago' },
    { id: 2, name: 'Grace Taylor', issue: 'No submission yet', priority: 'medium', lastActivity: '5 days ago' },
    { id: 3, name: 'Henry Brown', issue: '3 consecutive failures', priority: 'high', lastActivity: '1 day ago' },
  ]

  const getStatusDot = (status) => {
    const colors = {
      success: 'bg-green-500',
      info: 'bg-blue-500',
      error: 'bg-red-500',
    }
    return <div className={`w-2 h-2 rounded-full ${colors[status] || 'bg-gray-500'}`} />
  }

  const getStatusIcon = (status) => {
    if (status === 'success') return <CheckCircle2 className="w-4 h-4 text-green-500" />
    if (status === 'error') return <XCircle className="w-4 h-4 text-red-500" />
    return <Clock className="w-4 h-4 text-blue-500" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Activity className="w-8 h-8" />
          Student Activity
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                  {getStatusDot(activity.status)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      <span className="font-semibold">{activity.name}</span> {activity.action} <span className="text-gray-600">{activity.assignment}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(activity.status)}
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Students Need Help */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Students might Need Help
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentsNeedHelp.map((student) => (
                <div
                  key={student.id}
                  className={`p-4 rounded-lg border ${
                    student.priority === 'high'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <p className="font-semibold text-sm mb-1">{student.name}</p>
                  <p className="text-xs text-gray-600 mb-1">{student.issue}</p>
                  <p className="text-xs text-gray-500 mb-2">Last activity: {student.lastActivity}</p>
                  <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                    <Send className="w-3 h-3 mr-1" />
                    Send Mail
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TeacherStudentActivity

