import React, { useState } from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Calendar } from 'lucide-react'

const CreateAssignmentModal = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    title: '',
    language: 'python',
    deadline: '',
    batch: 'B1',
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Creating assignment:', formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      title: '',
      language: 'python',
      deadline: '',
      batch: 'B1',
      description: ''
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Create New Assignment</DialogTitle>
        <DialogClose onClick={() => onOpenChange(false)} />
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Assignment Title</Label>
              <Input
                id="title"
                placeholder="e.g., Array Manipulation Basics"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                id="language"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="c">C</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <div className="relative">
                <Input
                  id="deadline"
                  type="datetime-local"
                  placeholder="dd/mm/yyyy, --:--"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  required
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="batch">Batch</Label>
              <Select
                id="batch"
                value={formData.batch}
                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                className="border-orange-500"
              >
                <option value="B1">Batch B1</option>
                <option value="B2">Batch B2</option>
                <option value="B3">Batch B3</option>
                <option value="A1">Batch A1</option>
                <option value="A2">Batch A2</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="w-full min-h-[100px] px-3 py-2 text-sm border border-input rounded-md bg-background resize-y"
                placeholder="Assignment instructions..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Create Assignment
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  )
}

export default CreateAssignmentModal

