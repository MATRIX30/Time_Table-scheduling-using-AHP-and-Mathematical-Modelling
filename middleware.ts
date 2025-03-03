import {withAuth} from "next-auth/middleware"
import type { NextAuthOptions } from "next-auth";


export type {NextMiddlewareWithAuth} from "next-auth/middleware"

export default withAuth({
    pages: {
        signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export const config = {
    matcher: [
        "/dashboard/:path*",
    ]
}