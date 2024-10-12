import { type SQLiteDatabase } from "expo-sqlite"

export async function initDb(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      stock INTEGER NOT NULL,
      price INTEGER NOT NULL
    );
  `)
}
