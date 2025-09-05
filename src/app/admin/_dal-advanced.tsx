import { dalVerifySuccess } from "@/dal/helpers"
import { getAllTodos } from "@/features/todos/dal-advanced/queries"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TodoList } from "@/features/todos/components/TodoList"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function AdminPage() {
  const res = await getAllTodos()

  if (res.success === false && res.error.type === "no-access") {
    return (
      <h1 className="text-3xl font-bold mb-6">
        You do not have access to this data
      </h1>
    )
  }

  const todos = dalVerifySuccess(res)

  const todosByUser = todos.reduce((acc, todo) => {
    const userId = todo.user.id
    if (!acc[userId]) {
      acc[userId] = {
        user: todo.user,
        todos: [],
      }
    }
    acc[userId].todos.push(todo)
    return acc
  }, {} as Record<number, { user: (typeof todos)[0]["user"]; todos: typeof todos }>)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Todos</h1>
      <Link href="/todos" className="mb-4 inline-block underline">
        Go to Todos
      </Link>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.values(todosByUser).map(({ user, todos }) => (
          <Card className="h-fit" key={user.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <Badge variant={getRoleColor(user.role)}>{user.role}</Badge>
              </div>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <TodoList todos={todos} />
            </CardContent>
          </Card>
        ))}
      </div>

      {Object.keys(todosByUser).length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">No todos found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "destructive"
    case "moderator":
      return "default"
    case "user":
      return "secondary"
    default:
      return "secondary"
  }
}
