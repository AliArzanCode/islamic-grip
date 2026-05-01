import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

const facebookSecret = process.env.FACEBOOK_SECRET;

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.AUTH_LOGIN_EMAIL;
        const adminPassword = process.env.AUTH_LOGIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
          return null;
        }

        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;

        if (email !== adminEmail.trim().toLowerCase() || password !== adminPassword) {
          return null;
        }

        return {
          id: "credentials-user",
          name: "Islamic Grip User",
          email,
        };
      },
    }),
   
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: facebookSecret,
    }),
   
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],
  pages: {
    signIn: "/Login",
  },
});

export { handler as GET, handler as POST };