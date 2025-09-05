# Database Setup

This project uses Drizzle ORM with SQLite for data management. The database includes three main tables: users, projects, and todos.

## Database Schema

### Users

- `id`: Auto-incrementing primary key
- `email`: Unique user email
- `name`: User's display name
- `createdAt`: Timestamp when user was created
- `updatedAt`: Timestamp when user was last updated

### Projects

- `id`: Auto-incrementing primary key
- `name`: Project name
- `description`: Optional project description
- `ownerId`: Foreign key to users table
- `createdAt`: Timestamp when project was created
- `updatedAt`: Timestamp when project was last updated

### Todos

- `id`: Auto-incrementing primary key
- `title`: Todo title
- `description`: Optional todo description
- `completed`: Boolean indicating if todo is completed
- `priority`: Enum ('low', 'medium', 'high')
- `dueDate`: Optional due date
- `userId`: Foreign key to users table
- `projectId`: Optional foreign key to projects table
- `createdAt`: Timestamp when todo was created
- `updatedAt`: Timestamp when todo was last updated

## Available Scripts

### Database Management

- `npm run db:generate` - Generate migration files from schema changes
- `npm run db:push` - Push schema changes directly to database (development)
- `npm run db:migrate` - Run pending migrations
- `npm run db:studio` - Open Drizzle Studio (database viewer)
- `npm run db:seed` - Populate database with sample data

## Database Access Layer (DAL)

The project includes organized DAL files for each entity:

### Todos

- `src/features/todos/dal/queries.ts` - Todo read operations
- `src/features/todos/dal/mutations.ts` - Todo write operations

### Projects

- `src/features/projects/dal/queries.ts` - Project read operations
- `src/features/projects/dal/mutations.ts` - Project write operations

### Users

- `src/dal/users/queries.ts` - User read operations
- `src/dal/users/mutations.ts` - User write operations

## Usage Examples

### Import the database connection

```typescript
import { db } from "./src/db"
```

### Import specific DAL functions

```typescript
import { getTodosByUserId, createTodo } from "./src/features/todos/dal/queries"
import { createProject } from "./src/features/projects/dal/mutations"
```

### All DAL functions return a consistent `DalReturn<T>` type:

```typescript
type DalReturn<T> =
  | { success: true; data: T }
  | { success: false; error: DalError }
```

This provides type-safe error handling throughout the application.

## Getting Started

1. The database file (`database.db`) is created automatically when you first run the application
2. Run `npm run db:seed` to populate with sample data
3. Use `npm run db:studio` to view and edit data in a web interface
4. Import DAL functions in your components to interact with the database

## File Structure

```
src/
├── db/
│   ├── index.ts          # Database connection and exports
│   └── schema.ts         # Database schema definitions
├── dal/
│   ├── types.ts          # Shared DAL types
│   └── users/            # User DAL functions
├── features/
│   ├── todos/dal/        # Todo DAL functions
│   └── projects/dal/     # Project DAL functions
└── scripts/
    └── seed.ts           # Database seeding script
```
