import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const hashedPassword = await hash(password, 10);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/register`, {
            email,
            password: hashedPassword
        });

        return NextResponse.json({ message: 'success' });
    }
    catch (e) {
        console.log('error');

        return NextResponse.json({ message: e });
    }

    
}