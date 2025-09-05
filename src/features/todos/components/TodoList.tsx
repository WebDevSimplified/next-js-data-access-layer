"use client"

import { TodoTable } from "@/db"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { toggleTodoAction } from "../actions/actions"
import { toast } from "sonner"

type Todo = Pick<
  typeof TodoTable.$inferSelect,
  "id" | "title" | "description" | "completed" | "priority" | "dueDate"
>

interface TodoListProps {
  todos: Todo[]
  showCount?: boolean
}

export function TodoList({ todos, showCount = true }: TodoListProps) {
  return (
    <div className="space-y-3">
      {showCount && (
        <div className="text-sm text-muted-foreground mb-3">
          {todos.length} todo{todos.length !== 1 ? "s" : ""}
        </div>
      )}
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {todos.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No todos found
        </p>
      )}
    </div>
  )
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "destructive"
    case "medium":
      return "default"
    case "low":
      return "secondary"
    default:
      return "default"
  }
}

function TodoItem({ todo }: { todo: Todo }) {
  const handleToggleComplete = async (checked: boolean) => {
    try {
      const result = await toggleTodoAction(todo.id, checked)
      if (result) {
        toast.error(result)
      }
    } catch (error) {
      console.error("Failed to toggle todo:", error)
      toast.error("Failed to update todo. Please try again.")
    }
  }

  return (
    <div
      className={`p-3 rounded-lg border ${
        todo.completed ? "bg-muted text-muted-foreground" : "bg-background"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-3 flex-1">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleToggleComplete}
            className="mt-1"
          />
          <div className="flex-1">
            <h4
              className={`font-medium ${todo.completed ? "line-through" : ""}`}
            >
              {todo.title}
            </h4>
          </div>
        </div>
        <Badge
          variant={getPriorityColor(todo.priority)}
          className="ml-2 text-xs"
        >
          {todo.priority}
        </Badge>
      </div>
      {todo.description && (
        <div className="ml-7">
          <p
            className={`text-sm text-muted-foreground ${
              todo.completed ? "line-through" : ""
            }`}
          >
            {todo.description}
          </p>
        </div>
      )}
      {todo.dueDate && (
        <div className="ml-7">
          <p className="text-xs text-muted-foreground mt-2">
            Due: {new Date(todo.dueDate).toLocaleDateString()}
          </p>
        </div>
      )}
      <div className="flex items-center justify-between mt-2 ml-7">
        <span
          className={`text-xs ${
            todo.completed
              ? "text-green-600 font-medium"
              : "text-muted-foreground"
          }`}
        >
          {todo.completed ? "✓ Completed" : "Pending"}
        </span>
      </div>
    </div>
  )
}
