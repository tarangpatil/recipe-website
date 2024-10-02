import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./app/lib/prisma";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "string",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // auth start
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user) throw new Error("Shakalakabombom");
        const authorized = await compare(
          credentials.password as string,
          user.password
        );
        if (!authorized) throw new Error("Incorrect password");
        return { email: user.email, id: user.id, name: user.name } as any;
        // auth end
      },
    }),
  ],
  callbacks: {
    jwt({ user, token }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as any;
      return session;
    },
  },
});
