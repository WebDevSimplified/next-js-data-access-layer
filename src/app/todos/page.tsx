import { dalVerifySuccess } from "@/dal/helpers"
import { TodoList } from "@/features/todos/components/TodoList"
import { AddTodoForm } from "@/features/todos/components/AddTodoForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUserTodos } from "@/features/todos/dal-advanced/queries"
import Link from "next/link"

export default async function TodosPage() {
  const todos = dalVerifySuccess(
    await getCurrentUserTodos({
      id: true,
      title: true,
      completed: true,
      priority: true,
      dueDate: true,
      description: true,
    })
  )

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
