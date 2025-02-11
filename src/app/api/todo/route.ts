// import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from "next/server";
import { todoTable, db } from "@/lib/drizzle"
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    // const client = await db.connect();

    try {
        // await sql`CREATE TABLE IF NOT EXISTS Todos(id serial, task varchar(255));`
        const res = await db.select().from(todoTable);
        console.log(res)
        // const res = await client.sql`SELECT * from Todos`
        // console.log(res.rows.find((item) => item.id === 1))
        return NextResponse.json({ data: res })
    } catch (err) {
        console.log((err as { message: string }).message)
        return NextResponse.json({ message: "Something went Wrong" }, { status: 500 })
    };

    // return NextResponse.json({ message: "You called this api" })
}

export async function POST(request: NextRequest) {
    // const client = await db.connect();
    const req = await request.json();
    try {
        if (req.task) {
            const res = await db.insert(todoTable).values({
                task: req.task,
            }).returning();
            // console.log(res)
            return NextResponse.json({ message: "Data added sucessfully", data: res })
        } else throw new Error("Task field is required")
    } catch (error) {
        return NextResponse.json({ message: (error as { message: string }).message }, { status: 400 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ message: "Task id is required" }, { status: 400 })
        }

        const res = await db.delete(todoTable).where(eq(todoTable.id, Number(id))).returning();
        console.log(res);
        if (res.length === 0) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "task deleted succenfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "error deleting task", error: (error as { message: string }).message }, { status: 500 })
    }
}