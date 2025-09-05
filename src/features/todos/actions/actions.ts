"use server"

import { dalFormatErrorMessage, dalLoginRedirect } from "@/dal/helpers"
import { insertTodo, updateTodo } from "@/features/todos/dal-advanced/mutations"

export async function addTodoAction(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const priority = formData.get("priority") as "low" | "medium" | "high"
  const dueDateString = formData.get("dueDate") as string

  if (!title || title.trim().length === 0) {
    throw new Error("Title is required")
  }

  const dueDate = dueDateString ? new Date(dueDateString) : null

  const res = dalLoginRedirect(
    await insertTodo({
      title: title.trim(),
      description: description?.trim() || null,
      priority,
      dueDate,
      completed: false,
    })
  )

  if (res.success) return
  return dalFormatErrorMessage(res.error)
}

export async function toggleTodoAction(todoId: number, completed: boolean) {
  const res = dalLoginRedirect(
    await updateTodo(todoId, {
      completed,
    })
  )

  if (res.success) return
  return dalFormatErrorMessage(res.error)
}
