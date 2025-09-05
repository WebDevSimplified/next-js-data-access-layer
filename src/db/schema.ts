import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { relations } from "drizzle-orm"

export const userRoles = ["user", "admin", "moderator"] as const
export type UserRole = (typeof userRoles)[number]

// Users table
export const UserTable = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role", { enum: userRoles }).notNull().default("user"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Projects table
export const ProjectTable = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  ownerId: integer("owner_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Todos table
export const TodoTable = sqliteTable("todos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  priority: text("priority", { enum: ["low", "medium", "high"] })
    .notNull()
    .default("medium"),
  dueDate: integer("due_date", { mode: "timestamp" }),
  userId: integer("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  projectId: integer("project_id").references(() => ProjectTable.id, {
    onDelete: "set null",
  }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Relations
export const usersRelations = relations(UserTable, ({ many }) => ({
  projects: many(ProjectTable),
  todos: many(TodoTable),
}))

export const projectsRelations = relations(ProjectTable, ({ one, many }) => ({
  owner: one(UserTable, {
    fields: [ProjectTable.ownerId],
    references: [UserTable.id],
  }),
  todos: many(TodoTable),
}))

export const todosRelations = relations(TodoTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [TodoTable.userId],
    references: [UserTable.id],
  }),
  project: one(ProjectTable, {
    fields: [TodoTable.projectId],
    references: [ProjectTable.id],
  }),
}))
