import { Backend_URL } from "@/lib/Constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth, { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

//RefreshToken
async function refreshToken(token: JWT): Promise<JWT> {
  //console.log("token", token);
  const res = await fetch(`${Backend_URL}/auth/token/refresh`, {
    method: "POST",
    headers: {
      authorization: token.backendTokens.refreshToken,
    },
  });
  const response = await res.json();

  return {
    ...token,
    data: response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "graciesold-store-api",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        //console.log(Backend_URL);
        const res = await fetch(`${Backend_URL}/auth/sign-in`, {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status == 401) {
          console.log(res.statusText);
          return null;
        }
        const user = await res.json();
        console.log("user", user);
        return user.data;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      return await refreshToken(token);
    },

    async session({ token, session, user }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-in",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export const getServerAuthSession = () => getServerSession(authOptions);
