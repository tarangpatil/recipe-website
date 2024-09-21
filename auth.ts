import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./app/lib/prisma";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials, request) {
        // auth start
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user) throw new Error("User not found");
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
});
