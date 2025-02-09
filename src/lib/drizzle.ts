import { pgTable, serial, varchar, } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { InferInsertModel, InferSelectModel, } from "drizzle-orm";
import { sql } from "@vercel/postgres";

export const todoTable = pgTable("todos", {
    id: serial("id").primaryKey(),
    task: varchar("task", { length: 255 }).notNull()
})

export type Todo = InferSelectModel<typeof todoTable>;
export type NewTodo = InferInsertModel<typeof todoTable>;

export const db = drizzle(sql);

