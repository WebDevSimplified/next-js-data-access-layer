import { db } from "@/db"

const currentUserId = 2

export function getCurrentUser() {
  return db.query.UserTable.findFirst({
    where: (table, { eq }) => eq(table.id, currentUserId),
  })
}
