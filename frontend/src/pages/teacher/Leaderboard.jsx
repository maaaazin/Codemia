import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trophy, Medal, Download } from 'lucide-react'

const TeacherLeaderboard = () => {
  const leaderboard = [
    { rank: 1, name: 'Alice Chen', score: '95%', submissions: 12, medal: 'gold' },
    { rank: 2, name: 'Bob Kumar', score: '92%', submissions: 12, medal: 'silver' },
    { rank: 3, name: 'Carol Zhang', score: '89%', submissions: 11, medal: 'bronze' },
    { rank: 4, name: 'David Lee', score: '87%', submissions: 10 },
    { rank: 5, name: 'Emma Wilson', score: '85%', submissions: 9 },
    { rank: 6, name: 'Frank Miller', score: '83%', submissions: 8 },
    { rank: 7, name: 'Grace Taylor', score: '80%', submissions: 7 },
    { rank: 8, name: 'Henry Brown', score: '78%', submissions: 6 },
  ]

  const getMedalIcon = (medal) => {
    if (medal === 'gold') return <Medal className="w-5 h-5 text-yellow-500" />
    if (medal === 'silver') return <Medal className="w-5 h-5 text-gray-400" />
    if (medal === 'bronze') return <Medal className="w-5 h-5 text-amber-600" />
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          Leaderboard
        </h1>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Students</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Average</TableHead>
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
                  <TableCell className="font-semibold">{student.score}</TableCell>
                  <TableCell>{student.submissions}</TableCell>
                  <TableCell>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${parseInt(student.score)}%` }} 
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default TeacherLeaderboard

