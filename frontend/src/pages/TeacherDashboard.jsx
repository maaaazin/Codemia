import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/layout/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Users, 
  FileText, 
  TrendingUp, 
  AlertCircle,
  Send,
  Download,
  Mail,
  BarChart3,
  Trophy,
  Medal,
  Eye,
  Edit,
  Trash2,
  ChevronDown
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const TeacherDashboard = () => {
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedBatch, setSelectedBatch] = useState('B1')

  // Mock data
  const metrics = [
    { label: 'Active Assignments', value: '3', icon: FileText, color: 'text-blue-600' },
    { label: 'Students Submitted', value: '28/30', icon: Users, color: 'text-green-600' },
    { label: 'Average Score', value: '85%', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Might Need Help', value: '5', icon: AlertCircle, color: 'text-red-600' },
  ]

  const recentActivity = [
    { name: 'Alice Chen', action: 'submitted', time: '2 min ago', status: 'success' },
    { name: 'Bob Kumar', action: 'attempted', time: '15 min ago', status: 'info' },
    { name: 'Carol Zhang', action: 'failed a submission', time: '23 min ago', status: 'error' },
  ]

  const studentsNeedHelp = [
    { name: 'Frank Lee', issue: '5 failed submissions', priority: 'high' },
    { name: 'Grace Taylor', issue: 'No submission yet', priority: 'medium' },
  ]

  const upcomingAssignments = [
    {
      title: 'Array Manipulation Basics',
      dueDate: 'Nov 10, 2025',
      language: 'Python',
      submissions: '28/30',
      avgScore: '85%',
      status: 'active'
    },
    {
      title: 'Recursion Challenge',
      dueDate: 'Nov 12, 2025',
      language: 'C++',
      submissions: '15/30',
      avgScore: '78%',
      status: 'active'
    },
    {
      title: 'Binary Search Implementation',
      dueDate: 'Nov 15, 2025',
      language: 'Java',
      submissions: '10/30',
      avgScore: '82%',
      status: 'active'
    },
  ]

  const leaderboard = [
    { rank: 1, name: 'Alice Chen', score: '95%', submissions: 12, medal: 'gold' },
    { rank: 2, name: 'Bob Kumar', score: '92%', submissions: 12, medal: 'silver' },
    { rank: 3, name: 'Carol Zhang', score: '89%', submissions: 11, medal: 'bronze' },
  ]

  const getStatusDot = (status) => {
    const colors = {
      success: 'bg-green-500',
      info: 'bg-blue-500',
      error: 'bg-red-500',
    }
    return <div className={`w-2 h-2 rounded-full ${colors[status] || 'bg-gray-500'}`} />
  }

  const getMedalIcon = (medal) => {
    if (medal === 'gold') return <Medal className="w-5 h-5 text-yellow-500" />
    if (medal === 'silver') return <Medal className="w-5 h-5 text-gray-400" />
    if (medal === 'bronze') return <Medal className="w-5 h-5 text-amber-600" />
    return null
  }

  // Render content based on current page
  const renderPageContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <>
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-10 py-4 -mx-6 -mt-6 mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Welcome, {user?.name || 'Teacher'}!</h1>
                <div className="flex items-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        Batch {selectedBatch}
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    
                  </DropdownMenu>
                  
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    + Create Assignment
                  </Button>
                </div>
              </div>
            </header>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                          <p className="text-2xl font-bold">{metric.value}</p>
                        </div>
                        <Icon className={`w-8 h-8 ${metric.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-1 space-y-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {getStatusDot(activity.status)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.name} {activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Students Need Help */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      Students might Need Help
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {studentsNeedHelp.map((student, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          student.priority === 'high'
                            ? 'bg-red-50 border-red-200'
                            : 'bg-yellow-50 border-yellow-200'
                        }`}
                      >
                        <p className="font-semibold text-sm mb-1">{student.name}</p>
                        <p className="text-xs text-gray-600 mb-2">{student.issue}</p>
                        <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                          <Send className="w-3 h-3 mr-1" />
                          Send Mail
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 ">
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Batches
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Assignment Templates
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Full Analytics
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export All Data
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Mail className="w-4 h-4 mr-2" />
                      Bulk Email Students
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Upcoming Assignments */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Upcoming Assignments</CardTitle>
                      <Button variant="link" className="text-sm">View All</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingAssignments.map((assignment, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{assignment.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span>Due: {assignment.dueDate}</span>
                              <span>•</span>
                              <span>{assignment.language}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {assignment.submissions} submissions • Avg Score: {assignment.avgScore}
                            </p>
                          </div>
                          <Badge variant="success" className="ml-4">
                            {assignment.status}
                          </Badge>
                        </div>
                        {index === 0 && (
                          <div className="flex items-center gap-2 flex-wrap pt-2 border-t">
                            <Button variant="outline" size="sm" className="hover:bg-gray-200">
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-gray-200">
                              <BarChart3 className="w-4 h-4 mr-1" />
                              Analytics
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-gray-200">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-gray-200">
                              <FileText className="w-4 h-4 mr-1" />
                              Test Cases
                            </Button>
                            
                            <Button variant="outline" size="sm" className="outline-red-400 text-red-500 hover:bg-gray-200">
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Leaderboard */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        Leaderboard
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rank</TableHead>
                          <TableHead>Student</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Submissions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leaderboard.map((student) => (
                          <TableRow key={student.rank}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getMedalIcon(student.medal)}
                                <span className="font-semibold">{student.rank}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.score}</TableCell>
                            <TableCell>{student.submissions}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )
      
      case 'assignments':
        return (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                          <p className="text-2xl font-bold">{metric.value}</p>
                        </div>
                        <Icon className={`w-8 h-8 ${metric.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-1 space-y-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {getStatusDot(activity.status)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.name} {activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Students Need Help */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      Students might Need Help
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {studentsNeedHelp.map((student, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          student.priority === 'high'
                            ? 'bg-red-50 border-red-200'
                            : 'bg-yellow-50 border-yellow-200'
                        }`}
                      >
                        <p className="font-semibold text-sm mb-1">{student.name}</p>
                        <p className="text-xs text-gray-600 mb-2">{student.issue}</p>
                        <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                          <Send className="w-3 h-3 mr-1" />
                          Send Mail
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 ">
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Batches
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Assignment Templates
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Full Analytics
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export All Data
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Mail className="w-4 h-4 mr-2" />
                      Bulk Email Students
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Upcoming Assignments */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Upcoming Assignments</CardTitle>
                      <Button variant="link" className="text-sm">View All</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingAssignments.map((assignment, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{assignment.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span>Due: {assignment.dueDate}</span>
                              <span>•</span>
                              <span>{assignment.language}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {assignment.submissions} submissions • Avg Score: {assignment.avgScore}
                            </p>
                          </div>
                          <Badge variant="success" className="ml-4">
                            {assignment.status}
                          </Badge>
                        </div>
                        {index === 0 && (
                          <div className="flex items-center gap-2 flex-wrap pt-2 border-t">
                            <Button variant="outline" size="sm" className="hover:bg-gray-200">
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-gray-200">
                              <BarChart3 className="w-4 h-4 mr-1" />
                              Analytics
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-gray-200">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-gray-200">
                              <FileText className="w-4 h-4 mr-1" />
                              Test Cases
                            </Button>
                            
                            <Button variant="outline" size="sm" className="outline-red-400 text-red-500 hover:bg-gray-200">
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )
      
      case 'leaderboard':
        return (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Leaderboard
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Submissions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboard.map((student) => (
                    <TableRow key={student.rank}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getMedalIcon(student.medal)}
                          <span className="font-semibold">{student.rank}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.score}</TableCell>
                      <TableCell>{student.submissions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      
      case 'activity':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    {getStatusDot(activity.status)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.name} {activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  Students might Need Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {studentsNeedHelp.map((student, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      student.priority === 'high'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <p className="font-semibold text-sm mb-1">{student.name}</p>
                    <p className="text-xs text-gray-600 mb-2">{student.issue}</p>
                    <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                      <Send className="w-3 h-3 mr-1" />
                      Send Mail
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="p-6 space-y-6">
        {renderPageContent()}
      </div>
    </div>
  )
}

export default TeacherDashboard

