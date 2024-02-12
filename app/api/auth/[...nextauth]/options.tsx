import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt';
import axios from 'axios';
require('dotenv').config();

export const options: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'Your email'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Your Password'
                }
            },
            async authorize(credentials, req) {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/signin`, {
                    email: credentials?.email
                })

                const userData = response.data.user;

                const passwordCorrect = await compare(credentials?.password || '', userData.password);

                if (passwordCorrect) {
                    return {
                        id: userData.id,
                        email: userData.email
                    }
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {

            if (user?.id) {
                token.id = user.id
            } 

            return token;
        },
        async session({session, token}) {

            session.user!.id = token.id;
            
            return session;
        }
    }
}