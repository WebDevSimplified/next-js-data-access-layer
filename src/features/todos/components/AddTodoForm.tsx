"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { addTodoAction } from "../actions/actions"
import { Plus } from "lucide-react"
import { toast } from "sonner"

export function AddTodoForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    try {
      const result = await addTodoAction(formData)
      if (result) {
        toast.error(result)
      } else {
        setIsOpen(false)
      }
    } catch (error) {
      console.error("Failed to add todo:", error)
      toast.error("Failed to add todo. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="mb-6">
        <Plus className="w-4 h-4 mr-2" />
        Add New Todo
      </Button>
    )
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add New Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title *
            </label>
            <Input
              id="title"
              name="title"
              placeholder="Enter todo title"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter todo description (optional)"
              disabled={isLoading}
              rows={3}
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium mb-1"
            >
              Priority
            </label>
            <Select name="priority" defaultValue="medium" disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
              Due Date
            </label>
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Todo"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
