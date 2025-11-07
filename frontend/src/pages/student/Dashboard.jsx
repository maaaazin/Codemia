import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  BookOpen, 
  Clock, 
  CheckCircle2,
  TrendingUp,
  FileText,
  Code,
  Calendar,
  Award
} from 'lucide-react'

const StudentDashboard = () => {
  const { user } = useAuth()

  // Mock data
  const stats = [
    { label: 'Assignments Completed', value: '12', icon: CheckCircle2, color: 'text-green-600' },
    { label: 'Average Score', value: '87%', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Pending Assignments', value: '3', icon: Clock, color: 'text-yellow-600' },
    { label: 'Current Rank', value: '#5', icon: Award, color: 'text-purple-600' },
  ]

  const activeAssignments = [
    {
      title: 'Array Manipulation Basics',
      dueDate: 'Nov 10, 2025',
      language: 'Python',
      status: 'submitted',
      score: '95%',
      timeRemaining: '2 days left'
    },
    {
      title: 'Recursion Challenge',
      dueDate: 'Nov 12, 2025',
      language: 'C++',
      status: 'in-progress',
      score: null,
      timeRemaining: '4 days left'
    },
    {
      title: 'Binary Search Implementation',
      dueDate: 'Nov 15, 2025',
      language: 'Java',
      status: 'not-started',
      score: null,
      timeRemaining: '7 days left'
    },
  ]

  const recentSubmissions = [
    {
      assignment: 'Array Manipulation Basics',
      submittedAt: 'Nov 8, 2025',
      score: '95%',
      status: 'accepted',
      language: 'Python'
    },
    {
      assignment: 'Sorting Algorithms',
      submittedAt: 'Nov 5, 2025',
      score: '88%',
      status: 'accepted',
      language: 'Python'
    },
    {
      assignment: 'Data Structures',
      submittedAt: 'Nov 3, 2025',
      score: '92%',
      status: 'accepted',
      language: 'Java'
    },
  ]

  const getStatusBadge = (status) => {
    const variants = {
      'submitted': { variant: 'success', label: 'Submitted' },
      'in-progress': { variant: 'secondary', label: 'In Progress' },
      'not-started': { variant: 'outline', label: 'Not Started' },
      'accepted': { variant: 'success', label: 'Accepted' },
    }
    const config = variants[status] || variants['not-started']
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 -mx-6 -mt-6 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Welcome, {user?.name || 'Student'}!</h1>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Active Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeAssignments.map((assignment, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{assignment.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Due: {assignment.dueDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Code className="w-4 h-4" />
                          {assignment.language}
                        </span>
                      </div>
                      {assignment.score && (
                        <p className="text-sm font-medium text-green-600">
                          Score: {assignment.score}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">{assignment.timeRemaining}</p>
                    </div>
                    <div className="ml-4">
                      {getStatusBadge(assignment.status)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Button size="sm" className="flex-1">
                      {assignment.status === 'not-started' ? 'Start Assignment' : 'Continue'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Submissions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSubmissions.map((submission, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{submission.assignment}</TableCell>
                      <TableCell>{submission.language}</TableCell>
                      <TableCell>{submission.submittedAt}</TableCell>
                      <TableCell className="font-semibold">{submission.score}</TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeAssignments
                .filter(a => a.status !== 'submitted')
                .map((assignment, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="font-medium text-sm mb-1">{assignment.title}</p>
                    <p className="text-xs text-gray-600">{assignment.timeRemaining}</p>
                    <p className="text-xs text-gray-500 mt-1">Due: {assignment.dueDate}</p>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-semibold">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Overall</span>
                  <span className="font-semibold">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard

