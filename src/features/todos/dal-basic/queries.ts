import { eq } from "drizzle-orm"
import { db, TodoTable } from "../../../db"
import { getCurrentUser } from "@/features/auth/lib/getCurrentUser"
import { redirect } from "next/navigation"

export async function getCurrentUserTodos<
  const T extends { [K in keyof typeof TodoTable.$inferSelect]?: boolean }
>(columns: T) {
  // cacheTag("todos")

  const user = await getCurrentUser()
  if (user == null) return redirect("/login")

  return await db.query.TodoTable.findMany({
    where: eq(TodoTable.userId, user.id),
    columns,
  })
}

export async function getAllTodos() {
  // cacheTag("todos")

  const user = await getCurrentUser()
  if (user == null) return redirect("/login")
  if (user.role !== "admin") return redirect("/")

  return await db.query.TodoTable.findMany({
    columns: {
      id: true,
      title: true,
      description: true,
      priority: true,
      dueDate: true,
      completed: true,
    },
    with: {
      user: {
        columns: { id: true, name: true, email: true, role: true },
      },
    },
  })
}
