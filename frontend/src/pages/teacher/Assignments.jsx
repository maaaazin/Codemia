import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Download,
  Plus
} from 'lucide-react'
import CreateAssignmentModal from '@/components/modals/CreateAssignmentModal'
import ViewAssignmentModal from '@/components/modals/ViewAssignmentModal'
import AnalyticsModal from '@/components/modals/AnalyticsModal'
import EditAssignmentModal from '@/components/modals/EditAssignmentModal'
import ManageTestCasesModal from '@/components/modals/ManageTestCasesModal'

const TeacherAssignments = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [testCasesModalOpen, setTestCasesModalOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)

  // Mock assignments data
  const assignments = [
    {
      id: 1,
      title: 'Array Manipulation Basics',
      dueDate: 'Nov 10, 2025',
      language: 'Python',
      submissions: '28/30',
      avgScore: '85%',
      status: 'active',
      createdAt: 'Oct 25, 2025'
    },
    {
      id: 2,
      title: 'Recursion Challenge',
      dueDate: 'Nov 12, 2025',
      language: 'C++',
      submissions: '15/30',
      avgScore: '78%',
      status: 'active',
      createdAt: 'Oct 28, 2025'
    },
    {
      id: 3,
      title: 'Binary Search Implementation',
      dueDate: 'Nov 15, 2025',
      language: 'Java',
      submissions: '10/30',
      avgScore: '82%',
      status: 'active',
      createdAt: 'Oct 30, 2025'
    },
    {
      id: 4,
      title: 'Sorting Algorithms',
      dueDate: 'Nov 5, 2025',
      language: 'Python',
      submissions: '30/30',
      avgScore: '88%',
      status: 'closed',
      createdAt: 'Oct 20, 2025'
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Assignments</h1>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Assignment
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-xl">{assignment.title}</h3>
                    <Badge variant={assignment.status === 'active' ? 'success' : 'secondary'}>
                      {assignment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                    <span>Language: {assignment.language}</span>
                    <span>Due: {assignment.dueDate}</span>
                    <span>Created: {assignment.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-700">
                      <strong>{assignment.submissions}</strong> submissions
                    </span>
                    <span className="text-gray-700">
                      Average Score: <strong>{assignment.avgScore}</strong>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedAssignment(assignment)
                      setViewModalOpen(true)
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedAssignment(assignment)
                      setAnalyticsModalOpen(true)
                    }}
                  >
                    <BarChart3 className="w-4 h-4 mr-1" />
                    Analytics
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedAssignment(assignment)
                      setEditModalOpen(true)
                    }}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setTestCasesModalOpen(true)}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Test Cases
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modals */}
      <CreateAssignmentModal 
        open={createModalOpen} 
        onOpenChange={setCreateModalOpen} 
      />
      <ViewAssignmentModal 
        open={viewModalOpen} 
        onOpenChange={setViewModalOpen}
        assignment={selectedAssignment}
      />
      <AnalyticsModal 
        open={analyticsModalOpen} 
        onOpenChange={setAnalyticsModalOpen}
        assignment={selectedAssignment}
      />
      <EditAssignmentModal 
        open={editModalOpen} 
        onOpenChange={setEditModalOpen}
        assignment={selectedAssignment}
      />
      <ManageTestCasesModal 
        open={testCasesModalOpen} 
        onOpenChange={setTestCasesModalOpen} 
      />
    </div>
  )
}

export default TeacherAssignments

