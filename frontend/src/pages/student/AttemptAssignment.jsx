import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Editor from '@monaco-editor/react'
import ReactMarkdown from 'react-markdown'
import { Play, Send, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react'

const AttemptAssignment = () => {
  const { assignmentId } = useParams()
  const navigate = useNavigate()
  
  // Mock assignment data - in real app, fetch by assignmentId
  const assignment = {
    id: assignmentId || '1',
    title: 'Array Manipulation Basics',
    language: 'python',
    description: `# Array Manipulation Basics

## Problem Description

You are given an array of integers. Your task is to:

1. Find the sum of all elements in the array
2. Find the maximum element
3. Find the minimum element

## Input Format

The first line contains an integer \`n\` representing the number of elements.
The second line contains \`n\` space-separated integers.

## Output Format

Print three lines:
- First line: Sum of all elements
- Second line: Maximum element
- Third line: Minimum element

## Example

**Input:**
\`\`\`
5
1 2 3 4 5
\`\`\`

**Output:**
\`\`\`
15
5
1
\`\`\`

## Constraints

- 1 ≤ n ≤ 1000
- -10^9 ≤ array elements ≤ 10^9

## Hints

- Use built-in functions like \`sum()\`, \`max()\`, and \`min()\` in Python
- Make sure to handle edge cases properly`,
    testCases: [
      {
        id: 1,
        input: '5\n1 2 3 4 5',
        expectedOutput: '15\n5\n1',
        isPublic: true
      },
      {
        id: 2,
        input: '3\n10 20 30',
        expectedOutput: '60\n30\n10',
        isPublic: true
      }
    ]
  }

  const [code, setCode] = useState(
    assignment.language === 'python' 
      ? '# Write your solution here\n\n'
      : assignment.language === 'javascript'
      ? '// Write your solution here\n\n'
      : '// Write your solution here\n\n'
  )
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState([])

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput('Running code...')
    
    // Mock execution - in real app, call API
    setTimeout(() => {
      setOutput('15\n5\n1')
      setIsRunning(false)
    }, 1000)
  }

  const handleSubmit = async () => {
    setIsRunning(true)
    setOutput('Submitting...')
    
    // Mock submission - in real app, call API
    setTimeout(() => {
      setOutput('All test cases passed!')
      setTestResults([
        { testCaseId: 1, passed: true },
        { testCaseId: 2, passed: true }
      ])
      setIsRunning(false)
    }, 1500)
  }

  const getLanguageForEditor = (lang) => {
    const langMap = {
      'python': 'python',
      'javascript': 'javascript',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c'
    }
    return langMap[lang?.toLowerCase()] || 'python'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/student/assignments')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{assignment.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{assignment.language}</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleRunCode}
              disabled={isRunning}
            >
              <Play className="w-4 h-4 mr-2" />
              Run Code
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
              disabled={isRunning}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Problem Description */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Problem Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{assignment.description}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Code Editor */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Code Editor</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[500px] border-t">
                  <Editor
                    height="500px"
                    language={getLanguageForEditor(assignment.language)}
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    theme="vs-light"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      wordWrap: 'on',
                      automaticLayout: true,
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            {output && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Output</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-4 rounded-md font-mono text-sm whitespace-pre-wrap">
                    {output}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Test Cases - Below both columns */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Test Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignment.testCases.map((testCase) => {
                const result = testResults.find(r => r.testCaseId === testCase.id)
                return (
                  <div key={testCase.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">Test Case {testCase.id}</h4>
                      {result && (
                        result.passed ? (
                          <Badge variant="success" className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Passed
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            Failed
                          </Badge>
                        )
                      )}
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Input:</p>
                        <pre className="bg-gray-100 p-2 rounded text-xs font-mono whitespace-pre-wrap">
                          {testCase.input}
                        </pre>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Expected Output:</p>
                        <pre className="bg-gray-100 p-2 rounded text-xs font-mono whitespace-pre-wrap">
                          {testCase.expectedOutput}
                        </pre>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AttemptAssignment

