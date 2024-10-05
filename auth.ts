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
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: "/authentication/error",
    newUser: "/authentication/sign-up",
    signIn: "/authentication/sign-in",
    signOut: "/authentication/sign-out",
  },
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
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
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
  // debug: process.env.NODE_ENV === "development"
});
