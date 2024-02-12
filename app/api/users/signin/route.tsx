import { NextResponse } from 'next/server';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function POST(req: Request) {
    const { email } = await req.json();

    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    const user = await db.get(
        'SELECT * FROM users WHERE email = ?',
        email
    );

    return NextResponse.json({
        user: user
    });
}