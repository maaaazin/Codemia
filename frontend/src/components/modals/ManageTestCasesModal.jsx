import React, { useState } from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { FileText, Code } from 'lucide-react'

const ManageTestCasesModal = ({ open, onOpenChange }) => {
  const [mode, setMode] = useState('manual') // 'manual' or 'auto'
  const [testCases, setTestCases] = useState([
    { input: '5\n10', expectedOutput: '15', points: 10, isPublic: true }
  ])
  const [autoGenData, setAutoGenData] = useState({
    language: 'python',
    referenceSolution: '# Your correct solution\na = int(input())\nb = int(input())\nprint(a + b)',
    testInputs: ['5', '10']
  })

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', expectedOutput: '', points: 10, isPublic: true }])
  }

  const updateTestCase = (index, field, value) => {
    const updated = [...testCases]
    updated[index] = { ...updated[index], [field]: value }
    setTestCases(updated)
  }

  const addTestInput = () => {
    setAutoGenData({
      ...autoGenData,
      testInputs: [...autoGenData.testInputs, '']
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (mode === 'manual') {
      console.log('Saving test cases:', testCases)
    } else {
      console.log('Generating test cases:', autoGenData)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} maxWidth="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Manage Test Cases</DialogTitle>
        <DialogClose onClick={() => onOpenChange(false)} />
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className="space-y-6">
            {/* Mode Selection */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setMode('manual')}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  mode === 'manual'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FileText className="w-8 h-8 mb-2 text-gray-600" />
                <p className="font-semibold">Manual Entry</p>
                <p className="text-sm text-gray-600">Add test cases manually</p>
              </button>
              <button
                type="button"
                onClick={() => setMode('auto')}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  mode === 'auto'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Code className="w-8 h-8 mb-2 text-gray-600" />
                <p className="font-semibold">Auto-Generate</p>
                <p className="text-sm text-gray-600">From reference solution</p>
              </button>
            </div>

            {mode === 'manual' ? (
              <>
                {testCases.map((testCase, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <h4 className="font-semibold">Test Case {index + 1}</h4>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Input (stdin)</Label>
                        <textarea
                          className="w-full min-h-[80px] px-3 py-2 text-sm border border-input rounded-md bg-background resize-y font-mono"
                          value={testCase.input}
                          onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Expected Output</Label>
                        <textarea
                          className="w-full min-h-[80px] px-3 py-2 text-sm border border-input rounded-md bg-background resize-y font-mono"
                          value={testCase.expectedOutput}
                          onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Points</Label>
                          <Input
                            type="number"
                            value={testCase.points}
                            onChange={(e) => updateTestCase(index, 'points', parseInt(e.target.value))}
                            required
                          />
                        </div>
                        <div className="flex items-end">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={testCase.isPublic}
                              onChange={(e) => updateTestCase(index, 'isPublic', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-sm">Public (students can see)</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-dashed"
                  onClick={addTestCase}
                >
                  + Add Another Test Case
                </Button>
              </>
            ) : (
              <>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>How it works:</strong> Provide your reference solution and test inputs. We'll run your solution to automatically generate the expected outputs.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={autoGenData.language}
                      onChange={(e) => setAutoGenData({ ...autoGenData, language: e.target.value })}
                    >
                      <option value="python">Python</option>
                      <option value="javascript">JavaScript</option>
                      <option value="cpp">C++</option>
                      <option value="java">Java</option>
                      <option value="c">C</option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Reference Solution Code</Label>
                    <textarea
                      className="w-full min-h-[150px] px-3 py-2 text-sm border border-input rounded-md bg-background resize-y font-mono"
                      value={autoGenData.referenceSolution}
                      onChange={(e) => setAutoGenData({ ...autoGenData, referenceSolution: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Test Inputs</Label>
                    {autoGenData.testInputs.map((input, index) => (
                      <textarea
                        key={index}
                        className="w-full min-h-[60px] px-3 py-2 text-sm border border-input rounded-md bg-background resize-y font-mono mb-2"
                        value={input}
                        onChange={(e) => {
                          const updated = [...autoGenData.testInputs]
                          updated[index] = e.target.value
                          setAutoGenData({ ...autoGenData, testInputs: updated })
                        }}
                        required
                      />
                    ))}
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto text-sm"
                      onClick={addTestInput}
                    >
                      + Add Input
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {mode === 'manual' ? 'Save Test Cases' : 'Generate Test Cases'}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  )
}

export default ManageTestCasesModal

