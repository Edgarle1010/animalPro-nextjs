import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { dbUsers } from "@/database";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    Credentials({
      name: "Custom Login",
      credentials: {
        email: {
          label: "Correo",
          type: "email",
          placeholder: "correo@google.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials) {
        console.log({ credentials });

        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),
  ],

  // Custom Pages
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },

  session: {
    maxAge: 2592000, // 30d
    strategy: "jwt",
    updateAge: 86400, // cada día
  },

  // Callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      // console.log({ token, account, user });

      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "oauth":
            token.user = await dbUsers.oAuthToDbUser(
              user?.email || "",
              user?.name || ""
            );
            break;
          case "credentials":
            token.user = user;
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      // console.log({ session, token, user });

      session.accessToken = token.accessToken as any;
      session.user = token.user as any;

      return session;
    },
  },
};
export default NextAuth(authOptions);
