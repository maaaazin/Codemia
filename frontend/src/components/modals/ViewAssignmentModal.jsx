import React from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogClose } from '@/components/ui/dialog'

const ViewAssignmentModal = ({ open, onOpenChange, assignment }) => {
  if (!assignment) return null

  const recentSubmissions = [
    { name: 'Alice Chen', score: '95%', color: 'text-green-600' },
    { name: 'Bob Kumar', score: '88%', color: 'text-green-600' },
    { name: 'Carol Zhang', score: '65%', color: 'text-orange-600' },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>{assignment.title}</DialogTitle>
        <DialogClose onClick={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogContent>
        <div className="space-y-6">
          {/* Assignment Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Language</p>
              <p className="text-lg font-bold">{assignment.language}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Deadline</p>
              <p className="text-lg font-bold">{assignment.dueDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Submissions</p>
              <p className="text-lg font-bold">{assignment.submissions}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Score</p>
              <p className="text-lg font-bold">{assignment.avgScore}</p>
            </div>
          </div>

          {/* Recent Submissions */}
          <div>
            <h3 className="font-semibold mb-3">Recent Submissions</h3>
            <div className="space-y-2">
              {recentSubmissions.map((submission, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{submission.name}</span>
                  <span className={`font-semibold ${submission.color}`}>
                    {submission.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ViewAssignmentModal

