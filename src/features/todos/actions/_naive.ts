"use server"

import { db, TodoTable } from "@/db"
import { getCurrentUser } from "@/features/auth/lib/getCurrentUser"
import { and, eq } from "drizzle-orm"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export async function addTodoAction(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const priority = formData.get("priority") as "low" | "medium" | "high"
  const dueDateString = formData.get("dueDate") as string

  if (!title || title.trim().length === 0) {
    throw new Error("Title is required")
  }

  const dueDate = dueDateString ? new Date(dueDateString) : null

  const user = await getCurrentUser()
  if (user == null) return redirect("/login")

  const [newTodo] = await db
    .insert(TodoTable)
    .values({
      title: title.trim(),
      description: description?.trim() || null,
      priority,
      dueDate,
      completed: false,
      userId: user.id,
    })
    .returning({ id: TodoTable.id })

  revalidateTag("todos")
  revalidateTag(`todos:${newTodo.id}`)
}

export async function toggleTodoAction(todoId: number, completed: boolean) {
  const user = await getCurrentUser()
  if (user == null) return redirect("/login")

  const { changes } = await db
    .update(TodoTable)
    .set({ completed })
    .where(and(eq(TodoTable.id, todoId), eq(TodoTable.userId, user.id)))

  if (changes === 0) return "You do not have permission to update this todo."

  revalidateTag("todos")
  revalidateTag(`todos:${todoId}`)
}
