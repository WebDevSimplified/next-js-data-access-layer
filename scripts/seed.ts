import { db, UserTable, ProjectTable, TodoTable } from "../src/db"

async function seed() {
  console.log("Seeding database...")

  try {
    // Create sample users
    const [user1, user2] = await db
      .insert(UserTable)
      .values([
        {
          email: "john@example.com",
          name: "John Doe",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "jane@example.com",
          name: "Jane Smith",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .returning()

    console.log("Created users:", user1, user2)

    // Create sample projects
    const [project1, project2] = await db
      .insert(ProjectTable)
      .values([
        {
          name: "Personal Tasks",
          description: "My personal todo items",
          ownerId: user1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Work Project",
          description: "Important work-related tasks",
          ownerId: user1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .returning()

    console.log("Created projects:", project1, project2)

    // Create sample todos
    const sampleTodos = await db
      .insert(TodoTable)
      .values([
        {
          title: "Buy groceries",
          description: "Milk, bread, eggs, and fruits",
          completed: false,
          priority: "medium",
          userId: user1.id,
          projectId: project1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Complete project proposal",
          description: "Write and submit the Q1 project proposal",
          completed: false,
          priority: "high",
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
          userId: user1.id,
          projectId: project2.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Call dentist",
          description: "Schedule annual checkup",
          completed: true,
          priority: "low",
          userId: user1.id,
          projectId: project1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Learn Drizzle ORM",
          description: "Study the documentation and build a sample app",
          completed: false,
          priority: "medium",
          userId: user2.id,
          projectId: null, // No project assigned
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .returning()

    console.log("Created todos:", sampleTodos)

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seed()
