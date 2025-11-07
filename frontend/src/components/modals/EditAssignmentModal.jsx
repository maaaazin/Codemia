import React, { useState, useEffect } from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Calendar } from 'lucide-react'

const EditAssignmentModal = ({ open, onOpenChange, assignment }) => {
  const [formData, setFormData] = useState({
    title: '',
    language: 'python',
    deadline: '',
    description: ''
  })

  useEffect(() => {
    if (assignment) {
      setFormData({
        title: assignment.title || '',
        language: assignment.language?.toLowerCase() || 'python',
        deadline: '',
        description: ''
      })
    }
  }, [assignment])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Updating assignment:', formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Edit Assignment</DialogTitle>
        <DialogClose onClick={() => onOpenChange(false)} />
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Assignment Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-language">Language</Label>
              <Select
                id="edit-language"
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
              <Label htmlFor="edit-deadline">Deadline</Label>
              <div className="relative">
                <Input
                  id="edit-deadline"
                  type="datetime-local"
                  placeholder="dd/mm/yyyy, --:--"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <textarea
                id="edit-description"
                className="w-full min-h-[100px] px-3 py-2 text-sm border border-input rounded-md bg-background resize-y"
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
            Save Changes
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  )
}

export default EditAssignmentModal

