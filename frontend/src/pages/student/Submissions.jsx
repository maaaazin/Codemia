import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { History, Code, Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react'

const StudentSubmissions = () => {
  const submissions = [
    {
      id: 1,
      assignment: 'Array Manipulation Basics',
      submittedAt: 'Nov 8, 2025 14:30',
      score: '95%',
      status: 'accepted',
      language: 'Python',
      runtime: '120ms',
      memory: '15MB',
      testCases: '10/10 passed'
    },
    {
      id: 2,
      assignment: 'Sorting Algorithms',
      submittedAt: 'Nov 5, 2025 10:15',
      score: '88%',
      status: 'accepted',
      language: 'Python',
      runtime: '250ms',
      memory: '22MB',
      testCases: '9/10 passed'
    },
    {
      id: 3,
      assignment: 'Data Structures',
      submittedAt: 'Nov 3, 2025 16:45',
      score: '92%',
      status: 'accepted',
      language: 'Java',
      runtime: '180ms',
      memory: '18MB',
      testCases: '10/10 passed'
    },
    {
      id: 4,
      assignment: 'Recursion Challenge',
      submittedAt: 'Nov 1, 2025 09:20',
      score: '75%',
      status: 'partial',
      language: 'C++',
      runtime: '350ms',
      memory: '25MB',
      testCases: '7/10 passed'
    },
    {
      id: 5,
      assignment: 'Binary Search',
      submittedAt: 'Oct 28, 2025 11:00',
      score: '0%',
      status: 'failed',
      language: 'Java',
      runtime: 'N/A',
      memory: 'N/A',
      testCases: '0/10 passed'
    },
  ]

  const getStatusBadge = (status) => {
    const variants = {
      'accepted': { variant: 'success', label: 'Accepted', icon: CheckCircle2 },
      'partial': { variant: 'secondary', label: 'Partial', icon: Clock },
      'failed': { variant: 'destructive', label: 'Failed', icon: XCircle },
    }
    const config = variants[status] || variants['failed']
    const Icon = config.icon
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <History className="w-8 h-8" />
        Recent Submissions
      </h1>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Submissions</p>
            <p className="text-2xl font-bold">{submissions.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Average Score</p>
            <p className="text-2xl font-bold">
              {Math.round(submissions.reduce((acc, s) => acc + parseInt(s.score), 0) / submissions.length)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Accepted</p>
            <p className="text-2xl font-bold text-green-600">
              {submissions.filter(s => s.status === 'accepted').length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submission History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assignment</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Test Cases</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.assignment}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Code className="w-4 h-4" />
                      {submission.language}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {submission.submittedAt}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">{submission.score}</TableCell>
                  <TableCell className="text-sm">{submission.testCases}</TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentSubmissions

