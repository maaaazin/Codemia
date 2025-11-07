import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trophy, Medal } from 'lucide-react'

const StudentLeaderboard = () => {
  const { user } = useAuth()

  const leaderboard = [
    { rank: 1, name: 'Alice Chen', score: '95%', submissions: 12, medal: 'gold' },
    { rank: 2, name: 'Bob Kumar', score: '92%', submissions: 12, medal: 'silver' },
    { rank: 3, name: 'Carol Zhang', score: '89%', submissions: 11, medal: 'bronze' },
    { rank: 4, name: 'David Lee', score: '87%', submissions: 10 },
    { rank: 5, name: user?.name || 'You', score: '87%', submissions: 10, isCurrentUser: true },
    { rank: 6, name: 'Emma Wilson', score: '85%', submissions: 9 },
    { rank: 7, name: 'Frank Miller', score: '83%', submissions: 8 },
    { rank: 8, name: 'Grace Taylor', score: '80%', submissions: 7 },
  ]

  const getMedalIcon = (medal) => {
    if (medal === 'gold') return <Medal className="w-5 h-5 text-yellow-500" />
    if (medal === 'silver') return <Medal className="w-5 h-5 text-gray-400" />
    if (medal === 'bronze') return <Medal className="w-5 h-5 text-amber-600" />
    return null
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Trophy className="w-8 h-8 text-yellow-500" />
        Leaderboard
      </h1>

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
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((student) => (
                <TableRow 
                  key={student.rank} 
                  className={student.isCurrentUser ? 'bg-blue-50 font-semibold' : ''}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getMedalIcon(student.medal)}
                      <span className="font-semibold">{student.rank}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {student.isCurrentUser ? `${student.name} (You)` : student.name}
                  </TableCell>
                  <TableCell className={student.isCurrentUser ? 'text-blue-600 font-bold' : ''}>
                    {student.score}
                  </TableCell>
                  <TableCell>{student.submissions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentLeaderboard

