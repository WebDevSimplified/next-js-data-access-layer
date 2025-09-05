import { eq } from "drizzle-orm"
import { db, TodoTable } from "../../../db"
import { dalDbOperation, dalRequireAuth } from "@/dal/helpers"

export async function getCurrentUserTodos<
  const T extends { [K in keyof typeof TodoTable.$inferSelect]?: boolean },
>(columns: T) {
  // cacheTag("todos")

  return dalRequireAuth(user =>
    dalDbOperation(() => {
      return db.query.TodoTable.findMany({
        columns,
        where: eq(TodoTable.userId, user.id),
      })
    }),
  )
}

export async function getAllTodos() {
  // cacheTag("todos")

  return dalRequireAuth(
    () =>
      dalDbOperation(() => {
        return db.query.TodoTable.findMany({
          with: {
            user: true,
          },
        })
      }),
    { allowedRoles: ["admin"] },
  )
}
