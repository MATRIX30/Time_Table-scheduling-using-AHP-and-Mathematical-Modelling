import CredentialsProvider from "next-auth/providers/credentials";

import NextAuth, { AuthOptions, User } from "next-auth"
import { loginUser } from "@/actions/users.actions";


export const authOptions: AuthOptions = {
    providers: [

        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'ivantom'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: '************'
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid Credentials');
                }

                const {email,password} = credentials

                const res = await loginUser(email,password)

                if(res){
                    return res;
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: '/login',
        // signOut: '/'
    },
    debug:true, //process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt",

    },
    callbacks:{
        jwt({token,user}) {

            token.user = user as User;
            
            // return token;
            return {...token,...user};
        },
        session({session,token}) {
            delete token.exp;
            delete token.iat;
            delete token.sub;
            delete token.jti;
            delete token.picture;
            delete token.user;
            session.user = token;
            
            return session;
        },
        
    },
    secret: process.env.NEXTAUTH_SCRET,
};