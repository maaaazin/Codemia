import React from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogClose } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'

const AnalyticsModal = ({ open, onOpenChange, assignment }) => {
  if (!assignment) return null

  const scoreDistribution = [
    { range: '90-100%', students: 12, color: 'bg-green-500', width: '100%' },
    { range: '70-89%', students: 9, color: 'bg-blue-500', width: '75%' },
    { range: '50-69%', students: 4, color: 'bg-yellow-500', width: '33%' },
    { range: '<50%', students: 3, color: 'bg-red-500', width: '25%' },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Analytics: {assignment.title}</DialogTitle>
        <DialogClose onClick={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogContent>
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <p className="text-sm text-blue-600 mb-1">Submission Rate</p>
                <p className="text-2xl font-bold">93%</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50">
              <CardContent className="p-4">
                <p className="text-sm text-green-600 mb-1">Average Score</p>
                <p className="text-2xl font-bold">85%</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50">
              <CardContent className="p-4">
                <p className="text-sm text-purple-600 mb-1">Pass Rate (&gt;60%)</p>
                <p className="text-2xl font-bold">82%</p>
              </CardContent>
            </Card>
          </div>

          {/* Score Distribution */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Score Distribution</h3>
            <div className="space-y-3">
              {scoreDistribution.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.range}</span>
                    <span className="text-sm text-gray-600">{item.students} students</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div
                      className={`${item.color} h-8 flex items-center justify-end pr-2 text-white text-sm font-medium`}
                      style={{ width: item.width }}
                    >
                      {item.students}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AnalyticsModal

