import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Code, Calendar, FileText, Clock } from 'lucide-react'

const StudentAssignments = () => {
  const navigate = useNavigate()
  
  const assignments = [
    {
      id: 1,
      title: 'Array Manipulation Basics',
      dueDate: 'Nov 10, 2025',
      language: 'Python',
      status: 'submitted',
      score: '95%',
      timeRemaining: '2 days left',
      description: 'Practice array operations and manipulations',
      isPastDue: false
    },
    {
      id: 2,
      title: 'Recursion Challenge',
      dueDate: 'Nov 12, 2025',
      language: 'C++',
      status: 'in-progress',
      score: null,
      timeRemaining: '4 days left',
      description: 'Implement recursive solutions for common problems',
      isPastDue: false
    },
    {
      id: 3,
      title: 'Binary Search Implementation',
      dueDate: 'Nov 15, 2025',
      language: 'Java',
      status: 'not-started',
      score: null,
      timeRemaining: '7 days left',
      description: 'Create an efficient binary search algorithm',
      isPastDue: false
    },
    {
      id: 4,
      title: 'Sorting Algorithms',
      dueDate: 'Nov 5, 2025',
      language: 'Python',
      status: 'submitted',
      score: '88%',
      timeRemaining: 'Past due',
      description: 'Implement various sorting algorithms',
      isPastDue: true
    },
  ]

  const getButtonText = (assignment) => {
    if (assignment.isPastDue) {
      return 'Closed'
    }
    if (assignment.status === 'submitted') {
      return 'View Submissions'
    }
    if (assignment.status === 'in-progress') {
      return 'Continue'
    }
    return 'Attempt'
  }

  const handleButtonClick = (assignment) => {
    if (assignment.isPastDue) {
      return // Do nothing for closed assignments
    }
    if (assignment.status === 'submitted') {
      navigate('/student/submissions')
    } else {
      navigate(`/student/assignments/${assignment.id}/attempt`)
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      'submitted': { variant: 'success', label: 'Submitted' },
      'in-progress': { variant: 'secondary', label: 'In Progress' },
      'not-started': { variant: 'outline', label: 'Not Started' },
    }
    const config = variants[status] || variants['not-started']
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <BookOpen className="w-8 h-8" />
        My Assignments
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Assignments List */}
        <div className="lg:col-span-2 space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-xl">{assignment.title}</h3>
                      {getStatusBadge(assignment.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{assignment.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Code className="w-4 h-4" />
                        {assignment.language}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Due: {assignment.dueDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {assignment.timeRemaining}
                      </span>
                    </div>
                    {assignment.score && (
                      <p className="text-sm font-medium text-green-600 mt-2">
                        Your Score: {assignment.score}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t">
                  <Button 
                    className="flex-1"
                    onClick={() => handleButtonClick(assignment)}
                    disabled={assignment.isPastDue}
                    variant={assignment.isPastDue ? 'outline' : 'default'}
                  >
                    {getButtonText(assignment)}
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Column - Upcoming Deadlines */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignments
                .filter(a => a.status !== 'submitted')
                .map((assignment) => (
                  <div key={assignment.id} className="p-3 border rounded-lg">
                    <p className="font-medium text-sm mb-1">{assignment.title}</p>
                    <p className="text-xs text-gray-600 mb-1">{assignment.timeRemaining}</p>
                    <p className="text-xs text-gray-500">Due: {assignment.dueDate}</p>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StudentAssignments

