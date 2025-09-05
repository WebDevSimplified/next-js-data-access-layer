"use server"

import { insertTodo, updateTodo } from "../dal-basic/mutations"

export async function addTodoAction(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const priority = formData.get("priority") as "low" | "medium" | "high"
  const dueDateString = formData.get("dueDate") as string

  if (!title || title.trim().length === 0) {
    throw new Error("Title is required")
  }

  const dueDate = dueDateString ? new Date(dueDateString) : null

  await insertTodo({
    title: title.trim(),
    description: description?.trim() || null,
    priority,
    dueDate,
    completed: false,
  })
}

export async function toggleTodoAction(todoId: number, completed: boolean) {
  return await updateTodo(todoId, { completed })
}
