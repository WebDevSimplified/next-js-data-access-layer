import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import * as schema from "./schema"

// Create SQLite database
const sqlite = new Database("./database.db")

// Create Drizzle database instance
export const db = drizzle(sqlite, { schema })

// Export the schema for easy access
export * from "./schema"
