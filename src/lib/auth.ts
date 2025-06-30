import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "./mongoDB";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!valid) return null;

        // Pass role to token
        return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Add role to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role; // Add role to the session
      }
      return session;
    },
  },
};
