import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { UserLoginValidation } from "./lib/validations/UserValidation";
import { findByEmail } from "./lib/actions/UserActions";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./db";


export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    async session({session, token}) {

      if (session.user) {
        session.user.id = token.id as string || token.sub as string;
      }
      
      return session
    }
  },
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SERCRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = await UserLoginValidation.safeParseAsync(
          credentials
        );

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await findByEmail(email);

          if (!user || !user.password || !user.email) return null;

          const result = await bcrypt.compare(password, user.password);
          if (!result) return null;

          return user;
        }

        return null;
      },
    }),
  ],
});
