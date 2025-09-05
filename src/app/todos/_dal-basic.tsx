import { TodoList } from "@/features/todos/components/TodoList"
import { AddTodoForm } from "@/features/todos/components/AddTodoForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { getCurrentUserTodos } from "@/features/todos/dal-basic/queries"

export default async function TodosPage() {
  const todos = await getCurrentUserTodos({
    id: true,
    completed: true,
    title: true,
    description: true,
    priority: true,
    dueDate: true,
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
