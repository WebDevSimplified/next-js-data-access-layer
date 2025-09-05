import { TodoList } from "@/features/todos/components/TodoList"
import { AddTodoForm } from "@/features/todos/components/AddTodoForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { db, TodoTable } from "@/db"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "@/features/auth/lib/getCurrentUser"
import { redirect } from "next/navigation"

export default async function TodosPage() {
  const user = await getCurrentUser()
  if (user == null) return redirect("/login")

  const todos = await db.query.TodoTable.findMany({
    where: eq(TodoTable.userId, user.id),
  })

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Todos</h1>
      <Link href="/admin" className="mb-4 inline-block underline mr-4">
        Go to Admin
      </Link>

      <AddTodoForm />

      <Card>
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <TodoList todos={todos} />
        </CardContent>
      </Card>
    </div>
  )
}
