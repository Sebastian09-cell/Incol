import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { username: credentials.username as string },
        });

        if (!user) {
          throw new Error("usuario o contraseña no concidentes");
        }

        const passwordOk = bcrypt.compareSync(
          credentials.password as string,
          user.password,
        );

        if (!passwordOk) {
          throw new Error("usuario o contraseña no concidentes");
        }

        return { id: user.id, name: user.username };
      },
    }),
  ],
});
