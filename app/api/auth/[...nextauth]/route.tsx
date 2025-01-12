import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import NextAuth from 'next-auth';
import bcrypt from "bcryptjs";
import  CredentialsProvider  from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

const handler = NextAuth({
    session:{
        strategy:"jwt",
    },
    providers:[
        // Google(
        //     {
        //         clientId: process.env.GOOGLE_CLIENT_ID,
        //         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        //     }
        // ),
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                email:{},
                password:{}
            },
            async authorize(Credentials){
                try{
                    await dbConnect();
                    const user= await User.findOne({email:Credentials?.email});
                    if (!user){
                        throw new Error("")
                    }
                    const isValidPassword = await bcrypt.compare(
                        Credentials?.password ?? "", user.password as string
                    );
                    if(!isValidPassword){
                        throw new Error("")
                    }
                    return user;
                }catch{
                    return null
                }
            }
        })
        
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id=user.id;
                token.email=user.email;
            }
            return token;
        },
        async session({session,token}){
            if(token){
                session.user={
                    email:token.email,
                    name:token.name,
                    image:token.picture,
                };
            };
            return session;
        }
    },
    pages:{
        signIn:"/signin",
    },
    secret:process.env.NEXTAUTH_SECRET
});

export {handler as GET,handler as POST}