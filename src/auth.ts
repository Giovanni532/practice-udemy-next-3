import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { db } from "./db";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHU_CLIENT_SECRET

if(!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET){
    throw new Error("Il manque la connexion avec github")
}

export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Github({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({session, user}: any) {
            if(session && user) {
                session.user.id = user.id
            }
            return session
        }
    }
})