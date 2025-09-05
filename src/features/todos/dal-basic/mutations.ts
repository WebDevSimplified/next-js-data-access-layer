import { db, TodoTable } from "@/db"
import { getCurrentUser } from "@/features/auth/lib/getCurrentUser"
import { and, eq } from "drizzle-orm"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export async function insertTodo(
  todo: Omit<typeof TodoTable.$inferInsert, "userId">,
) {
  const user = await getCurrentUser()
  if (user == null) return redirect("/login")

  const [newTodo] = await db
    .insert(TodoTable)
    .values({ ...todo, userId: user.id })
    .returning({ id: TodoTable.id })

  revalidateTag("todos")
  revalidateTag(`todos:${newTodo.id}`)

  return newTodo
}

export async function updateTodo(
  id: number,
  todo: Partial<Omit<typeof TodoTable.$inferInsert, "userId">>,
) {
  const user = await getCurrentUser()
  if (user == null) return redirect("/login")

  const { changes } = await db
    .update(TodoTable)
    .set(todo)
    .where(and(eq(TodoTable.id, id), eq(TodoTable.userId, user.id)))

  if (changes === 0) return "You do not have permission to update this todo."

  revalidateTag(`todos:${id}`)
  revalidateTag("todos")
}
