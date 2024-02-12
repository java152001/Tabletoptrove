import { NextResponse } from "next/server";
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import axios from 'axios';
require('dotenv').config();

export async function POST(req: Request) {
    const {email, password} = await req.json();

    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    })

    const createUser = await db.run(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        email,
        password
    );

    const newUser = await db.get(
        'SELECT id, email FROM users WHERE email = ?',
        email
    );

    const mutations = [
        {
            create: {
                _type: 'users',
                email: newUser.email,
                id: newUser.id
            }
        }
    ]

    const sanityUrl = `https://${process.env.SANITY_PROJ_ID}.api.sanity.io/${process.env.SANITY_VERSION}/data/mutate/${process.env.SANITY_DATASET}`

    const sanityRes = await axios({
        url: sanityUrl,
        method: 'post',
        headers: {
            Authorization: `Bearer ${process.env.SANITY_API_KEY}`
        },
        data: { mutations }
    })

    return NextResponse.json({ hello: 'world', method: req.method, db: createUser })
}